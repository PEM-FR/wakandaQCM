
guidedModel =// @startlock
{
	User :
	{
		entityMethods :
		{// @endlock
			saveAnswers:function(/* Qcm */ qcm, /* array */ qcmQuestions)
			{// @lock
				// saving questions
				qcm = ds.Qcm(qcm.ID);
				var qcmScore = 0;
				qcmQuestions.forEach(function(question){
					
					var answers = question.answersCollection,
						userRights = 0,
						userAnswers = [],
						idQuestion = question.question.ID
					;

					//score base by question is 1, but you can have 0,5point if you missed one correct answer on 2
					answers.forEach(function(answer){
						// we compare if the user answer is the right one
						var realAnswer = ds.QuestionAnswer.find("ID = " + answer.ID);
						if(!!answer.isRightAnswer){
							userAnswers.push(realAnswer.answer);
						}
						if(!!realAnswer.isRightAnswer == !!answer.isRightAnswer){
							// user found the right question
							userRights++;
						}
					}, this);
					
					var questionScore = 0;
					if(userRights == answers.length){
						// there were no good answers, and the user did not check any answer
						questionScore = 1;
					}else{
						questionScore = Math.ceil(((1 / answers.length) * userRights) * 100) / 100;
					}
					qcmScore += questionScore;
					
					var qcmQuestion = ds.QcmQuestion.find("qcm.ID = " + qcm.ID + " AND question.ID = " + idQuestion);
					userAnswers.forEach(function(answer){
						var userAnswer = new ds.UserQcmAnswer({
							user: this, 
							answer: answer, 
							score: questionScore, 
							qcmQuestion: qcmQuestion
						});
						userAnswer.save();
					}, this);
					
				}, this);
				
				// now we save the qcm after updating its score
				qcm.score = qcmScore;
				qcm.save();
				qcm = ds.Qcm(qcm.ID);
				return qcm;				
			},// @lock
			createQcm:function(/* int */ keyword, /* int */ noq)
			{// @lock
				var questions =	ds.Question.query("keywords.ID = :1 order by randomIndex", keyword);
				if(isNaN(noq) || noq > questions.length){
					noq = questions.length;	
				}
				var newQcm = new ds.Qcm({score: 0});
				newQcm.save();
				for (var i = 0; i < noq; ++i) {
					var quest = questions[i];
					var newQcmQuestion = new ds.QcmQuestion({qcm: newQcm, question: quest});
					newQcmQuestion.save();
					var newUserQcmAnswer = new ds.UserQcmAnswer({user: this, qcmQuestion: newQcmQuestion, score: 0});
					newUserQcmAnswer.save();
				}
				newQcm = ds.Qcm(newQcm.ID);
				var qcm = newQcm.allQuestions.toArray("ID, question.ID, questionContent, answersCollection.ID, answersCollection.answerContent, answersCollection.isRightAnswer");
				qcm.forEach(function(question){
					question.answersCollection.forEach(function(answer){
						answer.isRightAnswer = false;	
					} ,this);	
				}, this);
				return {qcm: newQcm, questions: qcm};
			}// @startlock
		}
	},
	UserQcmAnswer :
	{
		collectionMethods :
		{// @endlock
			getScore:function()
			{// @lock
				// Add your code here
			}// @startlock
		}
	},
	Qcm :
	{
		entityMethods :
		{// @endlock
			addQuestion:function(/* Question */ newQuestion)
			{// @lock
				ds.startTransaction();
				try{
					var newQcmQuestion = new ds.QcmQuestion({qcm: this, question: newQuestion});
					newQcmQuestion.save();
					ds.commit();
					this.save();
					return newQcmQuestion;
				}catch(err){
					ds.rollBack();
				}
			}// @startlock
		}
	},
	Question :
	{
		randomIndex :
		{
			onGet:function()
			{// @endlock
				return Math.random();
			}// @startlock
		},
		entityMethods :
		{// @endlock
			addKeywords:function(/* Array Keywords */ newKeywords)
			{// @lock
				ds.startTransaction();
				try{
					this.keywords.remove();
					newKeywords.forEach(function(keyword){
						if(null == keyword.ID){
							// we have to save it first before creating the association
							var newKeyword = new ds.Keyword(keyword);
							newKeyword.save();
							keyword = newKeyword;
						}else{
							if(!!this.keywords.find("ID = :1", keyword.ID)){
								throw "Keyword already associated with Question";
							}
							keyword = ds.Keyword.find("ID = :1", keyword.ID);
						}
						new ds.QuestionKeyword({question: this, keyword: keyword}).save();
					}, this);
					ds.commit();
				}catch(err){
					ds.rollBack();
				}					
			},// @lock
			addAnswers:function(/* Array Answers */ newAnswers)
			{// @lock
				ds.startTransaction();
				try{
					this.answers.remove();
					newAnswers.forEach(function(answer){
						if(null == answer.ID){
							// we have to save it first before creating the association
							var newAnswer = new ds.Answer(answer);
							newAnswer.save();
							answer = newAnswer;
						}else{
							if(!!this.answers.find("ID = :1", answer.ID)){
								throw "Answer already associated with Question";
							}
							answer = ds.Answer.find("ID = :1", answer.ID);
						}
						new ds.QuestionAnswer({question: this, answer: answer}).save();
					}, this);
					ds.commit();
				}catch(err){
					ds.rollBack();
				}
			}// @startlock
		}
	}
};// @endlock

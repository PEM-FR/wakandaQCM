
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var restart = {};	// @button
	var nextButton = {};	// @button
	var comboNoQ = {};	// @combobox
	var startButton = {};	// @button
// @endregion// @endlock
var currentQuestionIndex = 0;
var qcmQuestions = null;
var currentQcm = null;
var nbOfQuestions = 0;


// eventHandlers// @lock

	restart.click = function restart_click (event)// @startlock
	{// @endlock
		resetQcm();
	};// @lock

	nextButton.click = function nextButton_click (event)// @startlock
	{// @endlock
		// first we update the answers
		var currentQuestion = qcmQuestions[currentQuestionIndex];
		var checkedAnswers = $("div#checkboxList_" + currentQuestion.ID + " input:checked");
		if(!!checkedAnswers && checkedAnswers.length > 1){
			$.each(checkedAnswers, function(index, domAnswer){
				var answerId = domAnswer.value;
				var answers = currentQuestion.answersCollection;
				answers.forEach(function(answer){
					if(answer.ID == answerId){
						answer.isRightAnswer = true;
					}
				}, this);
			});
		}else{
			if(checkedAnswers.length == 1){
				var answerId = checkedAnswers.val();
				var answers = currentQuestion.answersCollection;
				answers.forEach(function(answer){
					if(answer.ID == answerId){
						answer.isRightAnswer = true;
					}
				}, this);
			}	
		}
		// then we proceed to the next question if any, or save
		currentQuestionIndex++;
		$$("answersContainer").clear();
		if(currentQuestionIndex >= qcmQuestions.length){
			$$("qcmPage").disable();
			sources.user.saveAnswers({onSuccess: function(event){
				$$("userScore").setValue(event.result.score.getValue() + " / " + nbOfQuestions);
				$$("scoreContainer").show();
			}}, currentQcm, qcmQuestions);
		}else{
			renderQuestion(qcmQuestions[currentQuestionIndex]);
		}
	};// @lock
	
	var resetQcm = function(){
		currentQcm = null;
		qcmQuestions = null;
		nbOfQuestions = 0;
		currentQuestionIndex = 0;
		$$("scoreContainer").hide();
		$$("userScore").setValue("");
		$$("qcmPage").enable();
		$$("userInfo").enable();
	};

	comboNoQ.change = function comboNoQ_change (event)// @startlock
	{// @endlock
		if(isNaN($$("comboNoQ").getValue())){
			alert("Numbers of questions MUST be a number! And I thought that was obvious...");	
			return;
		}
	};// @lock
	
	var renderQuestion = function(currentQuestion){
		$$("questionContent").setValue('« ' + currentQuestion.questionContent + ' »');
		currentQuestion.answersCollection.forEach(function(answer){
			var newAnswer = $(
				"<div style='margin:0.8em;font-size:1.8em;' id='checkboxList_" + currentQuestion.ID + "'>"
				+ "<input id='" + answer.ID + "' name='" + currentQuestion.ID + "[]' type='checkbox' value='" + answer.ID + "'/> "
				+ "<label for='" + answer.ID + "' >" + answer.answerContent + "</label>"
				+ "</div>"
			).appendTo($$("answersContainer").domNode);
		}, this);
	};

	var createQcm = function(user, keyword, noq) {
		// we have to create the QCM with random question for the user
		user.createQcm({
			onSuccess: function(event){
				// debugger;
				sources.user.serverRefresh();
				// reinit of these global vars
				currentQcm = event.result.qcm;
				qcmQuestions = event.result.questions;
				nbOfQuestions = qcmQuestions.length;
				currentQuestionIndex = 0;
				var currentQuestion = qcmQuestions[currentQuestionIndex];
				renderQuestion(currentQuestion);
			},
			onError: function(errorMsg){
				throw errorMsg;
			}
		}, keyword, noq);
	};

	startButton.click = function startButton_click (event)// @startlock
	{// @endlock
		$$("userInfo").disable();
		var email = $$("inputEmail").getValue(),
			name = $$("inputName").getValue()
		;
		sources.user.query("user.email = '" + email + "'", {
			onSuccess: function(event){
				// user already exists, no need to create him again in the user db.
				createQcm(event.element, $$("comboKeyword").getValue());
			}, onError: function(errorMsg){
				// the user does not exist yet, let's register him/her
				sources.user.addNewElement();
				sources.user.name = $$("inputName").getValue();
				sources.user.email = $$("inputEmail").getValue();
				sources.user.save({
					onSuccess: function(event){
						sources.user.serverRefresh();
						sources.user.autoDispatch();
						// now we create the qcm
						createQcm(event.dataSource, $$("comboKeyword").getValue(), $$("comboNoQ").getValue());
					},
					onError: function(errorMsg){
						throw errorMsg;
					}
				});
		}});
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("restart", "click", restart.click, "WAF");
	WAF.addListener("nextButton", "click", nextButton.click, "WAF");
	WAF.addListener("comboNoQ", "change", comboNoQ.change, "WAF");
	WAF.addListener("startButton", "click", startButton.click, "WAF");
// @endregion
};// @endlock

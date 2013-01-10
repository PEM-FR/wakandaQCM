
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var bindButton = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock
sources.question.declareDependencies("answersCollection.answer.content");

	bindButton.click = function bindButton_click (event)// @startlock
	{// @endlock
		var selection = sources.answer.getSelection(),
			positions = selection.getSelectedRows(),
			answers = []
		;
		positions.forEach(function(position){
			sources.answer.getElement(position, {sync: true, onSuccess: function(event){
				answers.push({ID: event.element.ID, content: event.element.content});	
			}});
		});
		sources.question.addAnswers({onSuccess: function(event){
			sources.question.serverRefresh();
			sources.questionAnswer.serverRefresh();
			sources.answer.serverRefresh();
			sources.questionAnswer.autoDispatch();
		}}, answers);

		// same goes for the keywords
		selection = sources.keyword.getSelection();
		positions = selection.getSelectedRows();
		var keywords = [];

		positions.forEach(function(position){
			sources.keyword.getElement(position, {sync: true, onSuccess: function(event){
				keywords.push({ID: event.element.ID, content: event.element.keyword});	
			}});
		});
		sources.question.addKeywords({onSuccess: function(event){
			sources.question.serverRefresh();
			sources.keyword.serverRefresh();
			sources.questionKeyword.serverRefresh();
			sources.questionKeyword.autoDispatch();
			console.log("Binding keyword done");
		}}, keywords);
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("bindButton", "click", bindButton.click, "WAF");
// @endregion
};// @endlock

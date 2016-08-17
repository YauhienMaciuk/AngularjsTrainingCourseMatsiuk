(function(){
	"use strict";
	angular.module("todoApp", [])

	.run(runApp)

	.value("model", {
		user: "Yauheni",
		userPhoto: "images/Yauheni.png"
	})

	.controller("HomeWork", HomeWork)

	.directive("headerPage", headerPage)

	.directive("formCreateTask", formCreateTask)

	.directive("listAllTasks", listAllTasks);

	function runApp($http, model){
		$http
			.get("listHomeTask.json")
			.success(function(data){
				model.items = data;
			});
	}

	function headerPage(){
		return {
			restrict: "A",
			templateUrl: "header.html"
		}
	}

	function formCreateTask(){
		return {
			restrict: "A",
			templateUrl: "formCreateTask.html"
		};
	}

	function listAllTasks(){
		return {
			restrict: "E",
			templateUrl: "listAllTasks.html"
		};
	}

	function HomeWork($scope, model){
		$scope.homeWork = model;
		$scope.statusView = statusView;
		$scope.createTask = createTask;
		$scope.cutOffDate = cutOffDate;
		$scope.deleteTask = deleteTask;
		$scope.deleteAllClosedTasks = deleteAllClosedTasks;
		$scope.performTask = performTask;
		$scope.closedTaskCount = closedTaskCount;
		$scope.compareDate = compareDate;
		console.log(model);

		function statusView(status){
			var statusOpen = "Open";
			var statusClose = "Close";
			if(status){
				return statusOpen;
			}
			else{
				return statusClose;
			}
		}

		function createTask(items, newItem){
			if(newItem && newItem.deadline && newItem.deadlineResponsible 
				&& newItem.estHours && newItem.estResponsible){
				items.push({
					deadline: newItem.deadline,
					deadlineResponsible: newItem.deadlineResponsible,
					estHours: newItem.estHours,
					estResponsible: newItem.estResponsible,
					status: true
				});
			newItem.deadline = "";
			newItem.deadlineResponsible = "";
			newItem.estHours = "";
			newItem.estResponsible = "";
			}
		}

		function cutOffDate(deadline){
			if(deadline.length < 11){
				return deadline;
			}
			else {
				return moment(deadline, 'MM-DD-YYYY').format('MM-DD-YYYY');
			}
		}

		function deleteTask(items, item){
			var index = items.indexOf(item);
			items.splice(index, 1);
		}

		function deleteAllClosedTasks(items){
			angular.forEach(items, function(item){
				if(item.status === false){
					deleteTask(items, item);
				}
			});
		}

		function performTask(item){
			item.status = false;
		}

		function closedTaskCount(items){
			var closedTask = 0;
			angular.forEach(items, function(item){
				if(item.status === false){
					closedTask++;
				}
			});
			return closedTask;
		}

		function compareDate(deadline){
			var currentDate = moment().toDate();
			var cD = moment(currentDate, 'MM-DD-YYYY').format('MM-DD-YYYY');
			var dD = moment(deadline, 'MM-DD-YYYY').format('MM-DD-YYYY');
			if(cD > dD){
				return false;
			}
			else {
				return true;
			}
		}
	}
	
})();
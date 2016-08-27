angular.module('FirstPageCtrl', []).controller('FirstPageController', function($scope, $sce, $location) {
	//code infos

	//reminderInfo[0][0] : reminder -> hour
	//reminderInfo[0][1] : reminder -> minute
	//reminderInfo[0][2] : reminder -> AMPM
	//reminderInfo[0][3] : reminder -> sunday true false
	//............
	//reminderInfo[0][9] : reminder -> saturday true false
	//nowEditingReminder : 

	//window.today.getFullYear() : today's year
	//window.today.getMonth() : today's month
	//window.today.getDate() : today's date
	//window.currentYear : current displayed year
	//window.currentMonth : current displayed month
	//window.currentDate : current displayed date

	//	init variables
	$scope.DummyText="This is Dummy Page";
	$scope.firstpage_unum_image_src = $sce.trustAsResourceUrl('img/UNUM.png');
	
	//circle for calendar (reminder) image source and hide
	$scope.calendar_reminderCircle1_src = $sce.trustAsResourceUrl('img/quickdate.png');
	$scope.calendar_reminderCircle2_src = $sce.trustAsResourceUrl('img/quickdate.png');
	$scope.calendar_reminderCircle3_src = $sce.trustAsResourceUrl('img/quickdate.png');
	$scope.calendar_reminderCircle4_src = $sce.trustAsResourceUrl('img/quickdate.png');
	$scope.calendar_reminderCircle5_src = $sce.trustAsResourceUrl('img/quickdate.png');
	$scope.calendar_reminderCircle6_src = $sce.trustAsResourceUrl('img/quickdate.png');
	$scope.calendar_reminderCircle7_src = $sce.trustAsResourceUrl('img/quickdate.png');
	$scope.calendar_reminderCircle8_src = $sce.trustAsResourceUrl('img/quickdate.png');
	$scope.calendar_reminderCircle9_src = $sce.trustAsResourceUrl('img/quickdate.png');
	$scope.calendar_reminderCircle10_src = $sce.trustAsResourceUrl('img/quickdate.png');
	$scope.calendar_reminderCircle11_src = $sce.trustAsResourceUrl('img/quickdate.png');
	$scope.calendar_reminderCircle12_src = $sce.trustAsResourceUrl('img/quickdate.png');
	$scope.calendar_reminderCircle13_src = $sce.trustAsResourceUrl('img/quickdate.png');
	$scope.calendar_reminderCircle14_src = $sce.trustAsResourceUrl('img/quickdate.png');
	$scope.calendar_reminderCircle15_src = $sce.trustAsResourceUrl('img/quickdate.png');
	$scope.calendar_reminderCircle16_src = $sce.trustAsResourceUrl('img/quickdate.png');
	$scope.calendar_reminderCircle17_src = $sce.trustAsResourceUrl('img/quickdate.png');
	$scope.calendar_reminderCircle18_src = $sce.trustAsResourceUrl('img/quickdate.png');
	$scope.calendar_reminderCircle19_src = $sce.trustAsResourceUrl('img/quickdate.png');
	$scope.calendar_reminderCircle20_src = $sce.trustAsResourceUrl('img/quickdate.png');
	$scope.calendar_reminderCircle21_src = $sce.trustAsResourceUrl('img/quickdate.png');
	$scope.calendar_reminderCircle22_src = $sce.trustAsResourceUrl('img/quickdate.png');
	$scope.calendar_reminderCircle23_src = $sce.trustAsResourceUrl('img/quickdate.png');
	$scope.calendar_reminderCircle24_src = $sce.trustAsResourceUrl('img/quickdate.png');
	$scope.calendar_reminderCircle25_src = $sce.trustAsResourceUrl('img/quickdate.png');
	$scope.calendar_reminderCircle26_src = $sce.trustAsResourceUrl('img/quickdate.png');
	$scope.calendar_reminderCircle27_src = $sce.trustAsResourceUrl('img/quickdate.png');
	$scope.calendar_reminderCircle28_src = $sce.trustAsResourceUrl('img/quickdate.png');
	$scope.calendar_reminderCircle29_src = $sce.trustAsResourceUrl('img/quickdate.png');
	$scope.calendar_reminderCircle30_src = $sce.trustAsResourceUrl('img/quickdate.png');
	$scope.calendar_reminderCircle31_src = $sce.trustAsResourceUrl('img/quickdate.png');
	$scope.calendar_reminderCircle32_src = $sce.trustAsResourceUrl('img/quickdate.png');
	$scope.calendar_reminderCircle33_src = $sce.trustAsResourceUrl('img/quickdate.png');
	$scope.calendar_reminderCircle34_src = $sce.trustAsResourceUrl('img/quickdate.png');
	$scope.calendar_reminderCircle35_src = $sce.trustAsResourceUrl('img/quickdate.png');
	$scope.calendar_reminderCircle36_src = $sce.trustAsResourceUrl('img/quickdate.png');
	$scope.calendar_reminderCircle37_src = $sce.trustAsResourceUrl('img/quickdate.png');
	$scope.calendar_reminderCircle38_src = $sce.trustAsResourceUrl('img/quickdate.png');
	$scope.calendar_reminderCircle39_src = $sce.trustAsResourceUrl('img/quickdate.png');
	$scope.calendar_reminderCircle40_src = $sce.trustAsResourceUrl('img/quickdate.png');
	$scope.calendar_reminderCircle41_src = $sce.trustAsResourceUrl('img/quickdate.png');
	$scope.calendar_reminderCircle42_src = $sce.trustAsResourceUrl('img/quickdate.png');

	for (var i = 0; i < 42; i++) {
		document.getElementById("reminderCircle" + (i+1).toString()).style.visibility = "hidden";
	}


	$scope.lineSrc = $sce.trustAsResourceUrl('img/line.png');
	document.getElementById('settingView').style.opacity = "0.6";
	document.getElementById('settingView').style.visibility = "hidden";
	document.getElementById('settingContent').style.visibility = "hidden";
	document.getElementById('settingContentForAccount').style.visibility = "hidden";
	document.getElementById('captionBackground').style.opacity = "0.6";
	document.getElementById('captionBackground').style.visibility = "hidden";
	document.getElementById('captionContent').style.visibility = "hidden";

	document.getElementById('custompost_content').style.visibility = "hidden";
	document.getElementById('calendar_content').style.visibility = "hidden";

	document.getElementById("trashDialog").style.visibility = "hidden";
	document.getElementById("trashDialogContent").style.visibility = "hidden";

	document.getElementById("remindar_update_content").style.visibility = "hidden";
	document.getElementById("reminder_add_content").style.visibility = "hidden";

	window.dayOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'TUR', 'FRI', 'SAT'];
	window.monthOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	window.unleapmonthdays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	window.leapmonthdays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	// for calendar

	window.today = new Date();
	document.getElementById('datetitle').innerHTML = window.monthOfYear[window.today.getMonth()] + " " + window.today.getFullYear();

	window.currentyear = 0;
	window.currentmonth = 0;
	window.currentdate = 0;

	window.caption = [];
	for (var i = 0; i < 18; i++) {
		window.caption.push("aaa" + i);
	}
	window.multiSelectID = [];

	window.reminderInfo = [];
	for (var i = 0; i < 5; i++) {
		window.reminderInfo.push([]);
	}

	window.remindarCount = 0;
	window.worldReminder = [];
	window.createdHour = 0;
	window.createdMinute = 0;
	window.createdPM = 0;
	window.createdMon = false;
	window.createdTue = false;
	window.createdWed = false;
	window.createdTur = false;
	window.createdFri = false;
	window.createdSat = false;
	window.createdSun = false;

	window.nowEditingReminder = 0;

	for (var i = 0; i < 5; i++) {
		window.worldReminder.push("mon:f tue:f wed:f thr:f fri:f sat:f sun:f h:00 m:00 pm:f");
	}

	//	implement methods
	$scope.$on('$viewContentLoaded', function() {
		var firstdayofweek = getFirstDayOfCurrentPage();
		var dayscount = window.unleapmonthdays[window.today.getMonth()];
		if (getIfLeapYear(window.today.getFullYear()) == true) {
			dayscount = window.leapmonthdays[window.today.getMonth()];
		}

		for (var i = 0; i < dayscount; i++) {
			document.getElementById('date' + (i+1+firstdayofweek).toString()).innerHTML = (i+1).toString();
			document.getElementById('date' + (i+1+firstdayofweek).toString()).style.color = "black";
		}

		if (firstdayofweek > 0) {
			for (var k = 0; k < firstdayofweek; k++) {
				document.getElementById('date' + (k+1).toString()).innerHTML = (getPreviousMonthCount() - firstdayofweek + k + 1).toString();
				document.getElementById('date' + (k+1).toString()).style.color = "lightgray";
			}
		}

		if (dayscount + firstdayofweek != 42) {
			var forwarddays = 42 - dayscount - firstdayofweek;
			for (var i = 0; i < forwarddays; i++) {
				document.getElementById('date' + (dayscount + firstdayofweek + i + 1).toString()).innerHTML = (i+1).toString();
				document.getElementById('date' + (dayscount + firstdayofweek + i + 1).toString()).style.color = "lightgray";
			}
		}
		window.currentyear = window.today.getFullYear();
		window.currentmonth = window.today.getMonth();
		window.currentdate = window.today.getDate();

		if (window.remindarCount == 0) {
			for (var i = 1; i <= 5; i++) {
				document.getElementById('reminder' + i).style.visibility = "hidden";
			}
		}

	});

	window.dotPos = [
		[40, 85], [130, 85], [220, 85], [310, 85], [400, 85], [490, 85], [580, 85],
		[40, 150], [130, 150], [220, 150], [310, 150], [400, 150], [490, 150], [580, 150],
		[40, 220], [130, 220], [220, 220], [310, 220], [400, 220], [490, 220], [580, 220],
		[40, 290], [130, 290], [220, 290], [310, 290], [400, 290], [490, 290], [580, 290],
		[40, 360], [130, 360], [220, 360], [310, 360], [400, 360], [490, 360], [580, 360],
		[40, 430], [130, 430], [220, 430], [310, 430], [400, 430], [490, 430], [580, 430]
	];

	$scope.nextmonth = function() {
		displayCalendar(1);
	}

	$scope.prevmonth = function() {
		displayCalendar(-1);
	}

	getDaysOfPreviousMonthWithID = function() {

		if (window.currentmonth == 0) {
			return 31;
		} else {
			var countofdays = window.unleapmonthdays[window.currentmonth - 1];
			if (getIfLeapYear(window.currentyear) == true) {
				countofdays = window.leapmonthdays[window.currentmonth - 1];
			}
			return countofdays;
		}
	}

	getDaysOfNextMonthWithID = function() {

		if (window.currentmonth == 11) {
			return 31;
		} else {
			var countofdays = window.unleapmonthdays[window.currentmonth + 1];
			if (getIfLeapYear(window.currentyear) == true) {
				countofdays = window.leapmonthdays[window.currentmonth + 1];
			}
			return countofdays;
		}
	}

	displayCalendar = function(pageID) {

		if (pageID == 1) { //next

			if (window.currentmonth == 11) {
				window.currentmonth = 0;
				window.currentyear++;
			} else {
				window.currentmonth++;
			}

			document.getElementById('datetitle').innerHTML = window.monthOfYear[window.currentmonth] + " " + window.currentyear;

			var forwardday = new Date(window.currentyear, window.currentmonth);
			var firstdayofweek = forwardday.getDay();

			for (var i = 0; i < 42; i++) {
				document.getElementById('date' + (i+1).toString()).innerHTML = "";
			}

			var countofmonth = window.unleapmonthdays[window.currentmonth];
			if (getIfLeapYear(window.currentyear) == true) {
				countofmonth = window.leapmonthdays[window.currentmonth];
			}

			for (var i = 0; i < countofmonth; i++) {
				document.getElementById('date' + (i+1+firstdayofweek).toString()).innerHTML = (i+1).toString();
				document.getElementById('date' + (i+1+firstdayofweek).toString()).style.color = "black";
			}

			for (var i = 0; i < firstdayofweek; i++) {
				document.getElementById('date' + (i+1).toString()).innerHTML = (getDaysOfPreviousMonthWithID() - firstdayofweek + i + 1).toString();
				document.getElementById('date' + (i+1).toString()).style.color = "lightgray";
			}

			for (var i = 0; i < 42 - countofmonth - firstdayofweek; i++) {
				document.getElementById('date' + (countofmonth + firstdayofweek + 1 + i).toString()).innerHTML = (i+1).toString();
				document.getElementById('date' + (countofmonth + firstdayofweek + 1 + i).toString()).style.color = "lightgray";
			}

		} else { //prev
			if (window.currentmonth == 0) {
				window.currentmonth = 11;
				window.currentyear--;
			} else {
				window.currentmonth--;
			}

			document.getElementById('datetitle').innerHTML = window.monthOfYear[window.currentmonth] + " " + window.currentyear;

			var forwardday = new Date(window.currentyear, window.currentmonth);
			var firstdayofweek = forwardday.getDay();

			for (var i = 0; i < 42; i++) {
				document.getElementById('date' + (i+1).toString()).innerHTML = "";
			}

			var countofmonth = window.unleapmonthdays[window.currentmonth];
			if (getIfLeapYear(window.currentyear) == true) {
				countofmonth = window.leapmonthdays[window.currentmonth];
			}

			for (var i = 0; i < countofmonth; i++) {
				document.getElementById('date' + (i+1+firstdayofweek).toString()).innerHTML = (i+1).toString();
				document.getElementById('date' + (i+1+firstdayofweek).toString()).style.color = "black";
			}

			for (var i = 0; i < firstdayofweek; i++) {
				document.getElementById('date' + (i+1).toString()).innerHTML = (getDaysOfPreviousMonthWithID() - firstdayofweek + i + 1).toString();
				document.getElementById('date' + (i+1).toString()).style.color = "lightgray";
			}
			for (var i = 0; i < 42 - countofmonth - firstdayofweek; i++) {
				document.getElementById('date' + (countofmonth + firstdayofweek + 1 + i).toString()).innerHTML = (i+1).toString();
				document.getElementById('date' + (countofmonth + firstdayofweek + 1 + i).toString()).style.color = "lightgray";
			}
		}

		//add reminder circles to the calendar
		// for (var i = 0; i < 5; i++) {
		// 	if (window.reminderInfo[i][3] == 1) {
		// 		window.addCircleWeek = 0;
		// 		addCirclesToCalendar();
		// 		break;
		// 	}
		// }
		window.addCircleWeek = 1;
		addCirclesToCalendar();

	}

	addCirclesToCalendar = function() {
		for (var i = 0; i < 6; i++) {
			if (document.getElementById('date' + (window.addCircleWeek + i * 7).toString()).style.color == "black") {
				if (window.today.getFullYear() < window.currentyear) {
					document.getElementById('reminderCircle' + (window.addCircleWeek + i * 7).toString()).style.visibility = "visible";
				} else if (window.today.getFullYear() == window.currentyear) {
					if (window.today.getMonth() < window.currentmonth) {
						document.getElementById('reminderCircle' + (window.addCircleWeek + i * 7).toString()).style.visibility = "visible";
					} else if (window.today.getMonth() == window.currentmonth) {
						if (window.addCircleWeek + i * 7 > window.today.getDate()) {
							document.getElementById('reminderCircle' + (window.addCircleWeek + i * 7).toString()).style.visibility = "visible";
						} else {
							document.getElementById('reminderCircle' + (window.addCircleWeek + i * 7).toString()).style.visibility = "hidden";
						}
					} else {
						document.getElementById('reminderCircle' + (window.addCircleWeek + i * 7).toString()).style.visibility = "hidden";
					}
				} else {
					document.getElementById('reminderCircle' + (window.addCircleWeek + i * 7).toString()).style.visibility = "hidden";
				}
			} else {
				document.getElementById('reminderCircle' + (window.addCircleWeek + i * 7).toString()).style.visibility = "hidden";
			}
		}
	}

	getFirstDayOfCurrentPage = function() {
		var x = new Date(window.today.getFullYear(), window.today.getMonth());
		return x.getDay();
	}

	getPreviousMonthCount = function() {
		if(window.today.getMonth() == 0) {
			return 31;
		} else if(window.today.getMonth() == 2) {
			if (getIfLeapYear(window.today.getFullYear()) == true) {
				return 29;
			} else {
				return 28;
			}
		} else {
			return window.leapmonthdays[window.today.getMonth() - 1];
		}
	}

	getIfLeapYear = function(year) {
		if (year % 4 == 0) {
			if (year % 100 != 0) {
				return true;
			}
		}

		return false;
	}

	window.mode = "left";
	window.schedule_select_id = 0;
	window.edit_reminder_repeat_sun = [];
	window.edit_reminder_repeat = [];

	for (var i = 0; i < 7; i++) {
		window.edit_reminder_repeat_sun.push(false);
		window.edit_reminder_repeat.push(false);
	}

	$scope.dropDown = function() {
		alert("dropdown");
	}

	$scope.setting = function() {
		document.getElementById('settingView').style.visibility = "visible";
		document.getElementById('settingContent').style.visibility = "visible";
	}

	$scope.support = function() {
		alert("support");
	}

	$scope.downArrowSrc = $sce.trustAsResourceUrl('img/downarrow.png');
	$scope.firstpage_toolbar_rect_src = $sce.trustAsResourceUrl('img/toolbar/Rectangle.png');
	$scope.firstpage_tipbar_rect_src = $sce.trustAsResourceUrl('img/toolbar/Rectangle.png');
	$scope.firstpage_schedule_card_src = $sce.trustAsResourceUrl('img/schedule_card/rect2.png');
	$scope.firstpage_schedule_card_top_src = $sce.trustAsResourceUrl('img/schedule_card/rect1.png');
	
	$scope.closeSrc = $sce.trustAsResourceUrl('img/settings/cancel.png');
	$scope.close = function() {
		document.getElementById('settingView').style.visibility = "hidden";
		document.getElementById('settingContent').style.visibility = "hidden";
		document.getElementById('settingContentForAccount').style.visibility = "hidden";
	}

	$scope.onaccount = function() {
		document.getElementById('settingContentForAccount').style.visibility = "visible";
	}

	$scope.closeForAccount = function() {
		document.getElementById('settingView').style.visibility = "hidden";
		document.getElementById('settingContent').style.visibility = "hidden";
		document.getElementById('settingContentForAccount').style.visibility = "hidden";
	}

	$scope.onappearanceForAccount = function() {
		document.getElementById('settingContentForAccount').style.visibility = "hidden";
	}

	$scope.bar_appearance_forappearance_image_src = $sce.trustAsResourceUrl('img/settings/bar1.png');
	$scope.bar_account_forappearance_image_src = $sce.trustAsResourceUrl('img/settings/bar2.png');
	$scope.bar_appearance_foraccount_image_src = $sce.trustAsResourceUrl('img/settings/bar2.png');
	$scope.bar_account_foraccount_image_src = $sce.trustAsResourceUrl('img/settings/bar1.png');
	$scope.changemodeSrc = $sce.trustAsResourceUrl('img/settings/switchon.png');

	$scope.changemode = function() {
		if (window.mode == "left") {
			window.mode = "right";
			$scope.changemodeSrc = $sce.trustAsResourceUrl('img/settings/switchoff.png');
			changeScene();
		} else if (window.mode == "right") {
			window.mode = "left";
			$scope.changemodeSrc = $sce.trustAsResourceUrl('img/settings/switchon.png');
			changeScene();
		} else {
			alert("hihaha");
		}
	}

//change setting functions
	changeScene = function() {
		if (window.mode == "left") {
			document.getElementById('settingContent').style.background = "white";
			document.getElementById('settingContentForAccount').style.background = "white";
			document.getElementById('changemodebutton').style.background = "white";
			document.getElementById('remindar_update_content').style.background = "white";
			document.getElementById('custompost_content').style.background = "white";
			document.getElementById('calendar_content').style.background = "white";

			for (var i = 1; i < 43; i++) {
				if (document.getElementById('date' + i).style.color == "white") {
					document.getElementById('date' + i).style.color = "black";
				}
			}

			document.getElementById('mainbar').style.background = "lightgray";

		} else {
			document.getElementById('settingContent').style.background = "black";
			document.getElementById('settingContentForAccount').style.background = "black";
			document.getElementById('changemodebutton').style.background = "gray";
			document.getElementById('remindar_update_content').style.background = "black";			
			document.getElementById('custompost_content').style.background = "black";
			document.getElementById('calendar_content').style.background = "black";

			for (var i = 1; i < 43; i++) {
				if (document.getElementById('date' + i).style.color == "black") {
					document.getElementById('date' + i).style.color = "white";
				}
			}
			document.getElementById('mainbar').style.background = "black";
		}
	}

	window.selectedImageId = 0;
	window.expandImageId = 0;
	window.multiselect = [];
	window.position_x = [];
	window.position_y = [];
	for (var i = 0; i < 18; i++) {
		window.multiselect[i] = 0;
		window.position_x[i] = 122 * (i%3);
		if (i / 3 < 1) {
			window.position_y[i] = 0;
		} else if (i / 3 < 2) {
			window.position_y[i] = 122;
		} else if (i / 3 < 3) {
			window.position_y[i] = 244;
		} else if (i / 3 < 4) {
			window.position_y[i] = 366;
		} else if (i / 3 < 5) {
			window.position_y[i] = 488;
		} else {
			window.position_y[i] = 610;
		}
	}

	setborder = function(id) {
		if (id < 1) {
			id = 18;
		}

		if (id > 18) {
			id = 1;
		}

		var src = 'img/temp/' + id + '.jpeg';
		$scope.firstpage_expandimage_src = $sce.trustAsResourceUrl(src);
		window.selectedImageId = id;

		var str = 'grid' + id;
		if (window.multiselect[id-1] == 1) {
			document.getElementById(str).style = "border: thin solid orange";
			window.swapOrder[window.swapOrder.length] = id;
		} else {
			document.getElementById(str).style = "border: none !important";
			var index = window.swapOrder.indexOf(id);
			window.swapOrder.splice(index, 1);
		}
	}

	setborderdbl = function(id) {
		var src = 'img/temp/' + id + '.jpeg';
		$scope.firstpage_expandimage_src = $sce.trustAsResourceUrl(src);
		window.expandImageId = id;
		setborder(id);
		document.getElementById('expandBackView').style.visibility = "visible";
		document.getElementById('expandContent').style.visibility = "visible";
		document.getElementById('nextImage').style.visibility = "visible";
		document.getElementById('prevImage').style.visibility = "visible";
	}

	$scope.onGrid1 = function() {
		if (window.multiselect[0] == 0) {
			window.multiselect[0] = 1;
		} else if (window.multiselect[0] == 1) {
			window.multiselect[0] = 0;
		} else {

		}
		setborder(1);
	}
	$scope.onGrid2 = function() {
		if (window.multiselect[1] == 0) {
			window.multiselect[1] = 1;
		} else if (window.multiselect[1] == 1) {
			window.multiselect[1] = 0;
		} else {

		}
		setborder(2);
	}
	$scope.onGrid3 = function() {
		if (window.multiselect[2] == 0) {
			window.multiselect[2] = 1;
		} else if (window.multiselect[2] == 1) {
			window.multiselect[2] = 0;
		} else {

		}
		setborder(3);
	}
	$scope.onGrid4 = function() {
		if (window.multiselect[3] == 0) {
			window.multiselect[3] = 1;
		} else if (window.multiselect[3] == 1) {
			window.multiselect[3] = 0;
		} else {

		}
		setborder(4);
	}
	$scope.onGrid5 = function() {
		if (window.multiselect[4] == 0) {
			window.multiselect[4] = 1;
		} else if (window.multiselect[4] == 1) {
			window.multiselect[4] = 0;
		} else {

		}
		setborder(5);
	}
	$scope.onGrid6 = function() {
		if (window.multiselect[5] == 0) {
			window.multiselect[5] = 1;
		} else if (window.multiselect[5] == 1) {
			window.multiselect[5] = 0;
		} else {

		}
		setborder(6);
	}
	$scope.onGrid7 = function() {
		if (window.multiselect[6] == 0) {
			window.multiselect[6] = 1;
		} else if (window.multiselect[6] == 1) {
			window.multiselect[6] = 0;
		} else {

		}
		setborder(7);
	}
	$scope.onGrid8 = function() {
		if (window.multiselect[7] == 0) {
			window.multiselect[7] = 1;
		} else if (window.multiselect[7] == 1) {
			window.multiselect[7] = 0;
		} else {

		}
		setborder(8);
	}
	$scope.onGrid9 = function() {
		if (window.multiselect[8] == 0) {
			window.multiselect[8] = 1;
		} else if (window.multiselect[8] == 1) {
			window.multiselect[8] = 0;
		} else {

		}
		setborder(9);
	}
	$scope.onGrid10 = function() {
		if (window.multiselect[9] == 0) {
			window.multiselect[9] = 1;
		} else if (window.multiselect[9] == 1) {
			window.multiselect[9] = 0;
		} else {

		}
		setborder(10);
	}
	$scope.onGrid11 = function() {
		if (window.multiselect[10] == 0) {
			window.multiselect[10] = 1;
		} else if (window.multiselect[10] == 1) {
			window.multiselect[10] = 0;
		} else {

		}
		setborder(11);
	}
	$scope.onGrid12 = function() {
		if (window.multiselect[11] == 0) {
			window.multiselect[11] = 1;
		} else if (window.multiselect[11] == 1) {
			window.multiselect[11] = 0;
		} else {

		}
		setborder(12);
	}
	$scope.onGrid13 = function() {
		if (window.multiselect[12] == 0) {
			window.multiselect[12] = 1;
		} else if (window.multiselect[12] == 1) {
			window.multiselect[12] = 0;
		} else {

		}
		setborder(13);
	}
	$scope.onGrid14 = function() {
		if (window.multiselect[13] == 0) {
			window.multiselect[13] = 1;
		} else if (window.multiselect[13] == 1) {
			window.multiselect[13] = 0;
		} else {

		}
		setborder(14);
	}
	$scope.onGrid15 = function() {
		if (window.multiselect[14] == 0) {
			window.multiselect[14] = 1;
		} else if (window.multiselect[14] == 1) {
			window.multiselect[14] = 0;
		} else {

		}
		setborder(15);
	}
	$scope.onGrid16 = function() {
		if (window.multiselect[15] == 0) {
			window.multiselect[15] = 1;
		} else if (window.multiselect[15] == 1) {
			window.multiselect[15] = 0;
		} else {

		}
		setborder(16);
	}
	$scope.onGrid17 = function() {
		if (window.multiselect[16] == 0) {
			window.multiselect[16] = 1;
		} else if (window.multiselect[16] == 1) {
			window.multiselect[16] = 0;
		} else {

		}
		setborder(17);
	}
	$scope.onGrid18 = function() {
		if (window.multiselect[17] == 0) {
			window.multiselect[17] = 1;
		} else if (window.multiselect[17] == 1) {
			window.multiselect[17] = 0;
		} else {

		}
		setborder(18);
	}

	$scope.onGrid1Dbl = function() {
		setborderdbl(1);
	}
	$scope.onGrid2Dbl = function() {
		setborderdbl(2);
	}
	$scope.onGrid3Dbl = function() {
		setborderdbl(3);
	}
	$scope.onGrid4Dbl = function() {
		setborderdbl(4);
	}
	$scope.onGrid5Dbl = function() {
		setborderdbl(5);
	}
	$scope.onGrid6Dbl = function() {
		setborderdbl(6);
	}
	$scope.onGrid7Dbl = function() {
		setborderdbl(7);
	}
	$scope.onGrid8Dbl = function() {
		setborderdbl(8);
	}
	$scope.onGrid9Dbl = function() {
		setborderdbl(9);
	}
	$scope.onGrid10Dbl = function() {
		setborderdbl(10);
	}
	$scope.onGrid11Dbl = function() {
		setborderdbl(11);
	}
	$scope.onGrid12Dbl = function() {
		setborderdbl(12);
	}
	$scope.onGrid13Dbl = function() {
		setborderdbl(13);
	}
	$scope.onGrid14Dbl = function() {
		setborderdbl(14);
	}
	$scope.onGrid15Dbl = function() {
		setborderdbl(15);
	}
	$scope.onGrid16Dbl = function() {
		setborderdbl(16);
	}
	$scope.onGrid17Dbl = function() {
		setborderdbl(17);
	}
	$scope.onGrid18Dbl = function() {
		setborderdbl(18);
	}

	document.getElementById('expandBackView').style.opacity = "0.6";
	document.getElementById('expandBackView').style.visibility = "hidden";
	document.getElementById('expandContent').style.visibility = "hidden";
	document.getElementById('nextImage').style.visibility = "hidden";
	document.getElementById('prevImage').style.visibility = "hidden";
	$scope.closeExpand = function() {
		document.getElementById('expandBackView').style.visibility = "hidden";
		document.getElementById('expandContent').style.visibility = "hidden";
		document.getElementById('nextImage').style.visibility = "hidden";
		document.getElementById('prevImage').style.visibility = "hidden";
	}
	$scope.prevImageSrc = $sce.trustAsResourceUrl('img/expand/next.png');
	$scope.nextImageSrc = $sce.trustAsResourceUrl('img/expand/prev.png');

	$scope.onnext = function() {
		setborder(window.selectedImageId - 1);
	}
	$scope.onprev = function() {
		setborder(window.selectedImageId + 1);
	}

	$scope.firstpage_toolbar_add_src = $sce.trustAsResourceUrl('img/toolbar/Add.png');
	$scope.onToolbarAdd = function() {
		document.getElementById('the-photo-file-field').click();
	}

	$scope.firstpage_toolbar_trash_src = $sce.trustAsResourceUrl('img/toolbar/Trash.png');
	$scope.onToolbarTrash = function() {
		document.getElementById("trashDialog").style.visibility = "visible";
		document.getElementById("trashDialogContent").style.visibility = "visible";

		var temp = 0;
		for (var i = 0; i < 18; i++) {
			if (window.multiselect[i] == 1) {
				temp++;
			}
		}

		document.getElementById("firstpage caption close_Trash_TopLabel").innerHTML = "Delete " + temp + " Selected Images";
	}

	$scope.firstpage_toolbar_swap_src = $sce.trustAsResourceUrl('img/toolbar/Swap.png');
	window.swapOrder = [];
	window.targetPos = [];
	$scope.onToolbarSwap = function() {
		nextStep();
		var count = window.swapOrder.length;
		if (count > 2) {
			// for (var i = 0; i < count - 1; i++) {
			// 	var elem = document.getElementById('grid' + (window.swapOrder[i]).toString());
			// 	move(elem, window.swapOrder[i+1]);
			// }
			// var lastelem = document.getElementById('grid' + (window.swapOrder[count - 1]).toString());
			// move(lastelem, window.swapOrder[0]);

			for (var i = 0; i < count; i++) {
				var elem = document.getElementById('grid' + (window.swapOrder[i]).toString());
				move(elem, window.targetPos[i]);
			}

		} else if (count == 2) {
			var elem1 = document.getElementById('grid' + (window.swapOrder[0]).toString());
			move(elem1, window.targetPos[0]);
			var elem2 = document.getElementById('grid' + (window.swapOrder[1]).toString());
			move(elem2, window.targetPos[1]);
		} else {

		}
	}

	nextStep = function() {
		if (window.targetPos.length == 0) {
			window.targetPos = window.swapOrder;
		}

		var count = window.targetPos.length;
		var temp = [];
		for (var i = 0; i < count - 1; i++) {
			temp.push(window.targetPos[i + 1]);
		}
		temp.push(window.targetPos[0]);
		window.targetPos = temp;
	}

	move = function(elem, id) {
		moveActionX(elem, window.position_x[id - 1] - elem.offsetLeft, elem.offsetLeft, id);
		moveActionY(elem, window.position_y[id - 1] - elem.offsetTop, elem.offsetTop, id);
	}

	moveActionX = function(elem, deltaX, currentX, i) {
		if (deltaX != 0) {
			var pos = 0;
			var id = setInterval(frameX, 10);
			function frameX() {
				if (Math.abs(pos) >= Math.abs(deltaX)) {
					elem.style.left = window.position_x[i-1] + 'px';
					clearInterval(id);
				} else {
					pos += deltaX / 50;
					elem.style.left = currentX + pos + 'px';
				}
			}
		}
	}

	moveActionY = function(elem, deltaY, currentY, i) {
		if (deltaY != 0) {
			var pos = 0;
			var id = setInterval(frameY, 10);
			function frameY() {
				if (Math.abs(pos) >= Math.abs(deltaY)) {
					elem.style.top = window.position_y[i-1] + 'px';
					clearInterval(id);
				} else {
					pos += deltaY / 50;
					elem.style.top = currentY + pos + 'px';
				}
			}
		}
	}

	$scope.firstpage_toolbar_caption_src = $sce.trustAsResourceUrl('img/toolbar/Caption.png');
	$scope.onToolbarCaption = function() {
		document.getElementById('captionBackground').style.visibility = "visible";
		document.getElementById('captionContent').style.visibility = "visible";
		$scope.closeCaptionSrc = $sce.trustAsResourceUrl('img/settings/cancel.png');
		var tempCount = 0;
		var tempStr = "";
		for (var i = 0; i < 18; i++) {
			if (window.multiselect[i] == 1) {
				tempCount++;
				tempStr = window.caption[i];
			}
		}

		if (tempCount == 1) {
			var str = tempStr;
			$scope.captionImageSrc = $sce.trustAsResourceUrl('img/temp/' + window.selectedImageId + '.jpeg');
			document.getElementById("firstpage caption comment").value = window.caption[window.selectedImageId - 1];
		} else if (tempCount > 1) {
			document.getElementById("firstpage caption comment").value = "";
		} else {
			tempCount = 0;
			$scope.captionImageSrc = $sce.trustAsResourceUrl('img/temp/23.jpg');
			document.getElementById("firstpage caption comment").value = "";
		}
	}

	$scope.firstpage_toolbar_schedule_src = $sce.trustAsResourceUrl('img/toolbar/Schedule.png');
	$scope.onToolbarSchedule = function() {

	}

	$scope.firstpage_toolbar_analytics_src = $sce.trustAsResourceUrl('img/toolbar/Analytics.png');
	$scope.onToolbarAnalytics = function() {

	}

	$scope.firstpage_templateimage1_src = $sce.trustAsResourceUrl('img/temp/1.jpeg');
	$scope.firstpage_templateimage2_src = $sce.trustAsResourceUrl('img/temp/2.jpeg');
	$scope.firstpage_templateimage3_src = $sce.trustAsResourceUrl('img/temp/3.jpeg');
	$scope.firstpage_templateimage4_src = $sce.trustAsResourceUrl('img/temp/4.jpeg');
	$scope.firstpage_templateimage5_src = $sce.trustAsResourceUrl('img/temp/5.jpeg');
	$scope.firstpage_templateimage6_src = $sce.trustAsResourceUrl('img/temp/6.jpeg');
	$scope.firstpage_templateimage7_src = $sce.trustAsResourceUrl('img/temp/7.jpeg');
	$scope.firstpage_templateimage8_src = $sce.trustAsResourceUrl('img/temp/8.jpeg');
	$scope.firstpage_templateimage9_src = $sce.trustAsResourceUrl('img/temp/9.jpeg');
	$scope.firstpage_templateimage10_src = $sce.trustAsResourceUrl('img/temp/10.jpeg');
	$scope.firstpage_templateimage11_src = $sce.trustAsResourceUrl('img/temp/11.jpeg');
	$scope.firstpage_templateimage12_src = $sce.trustAsResourceUrl('img/temp/12.jpeg');
	$scope.firstpage_templateimage13_src = $sce.trustAsResourceUrl('img/temp/13.jpeg');
	$scope.firstpage_templateimage14_src = $sce.trustAsResourceUrl('img/temp/14.jpeg');
	$scope.firstpage_templateimage15_src = $sce.trustAsResourceUrl('img/temp/15.jpeg');
	$scope.firstpage_templateimage16_src = $sce.trustAsResourceUrl('img/temp/16.jpeg');
	$scope.firstpage_templateimage17_src = $sce.trustAsResourceUrl('img/temp/17.jpeg');
	$scope.firstpage_templateimage18_src = $sce.trustAsResourceUrl('img/temp/18.jpeg');

	$scope.closeCaption = function() {
		document.getElementById('captionBackground').style.visibility = "hidden";
		document.getElementById('captionContent').style.visibility = "hidden";
	}
	$scope.closeForCaption = function() {
		document.getElementById('captionBackground').style.visibility = "hidden";
		document.getElementById('captionContent').style.visibility = "hidden";

		var tempCount = 0;
		for (var i = 0; i < 18; i++) {
			if (window.multiselect[i] == 1) {
				tempCount++;
			}
		}

		if (tempCount == 1) {
			window.caption[window.selectedImageId - 1] = document.getElementById("firstpage caption comment").value;
		} else if (tempCount > 1) {
			for (var i = 0; i < 18; i++) {
				if (window.multiselect[i] == 1) {
					window.caption[i] = document.getElementById("firstpage caption comment").value;
				}
			}

		} else {

		}

	}
	$scope.firstpage_schedule_card_title_image_src = $sce.trustAsResourceUrl('img/toolbar/Schedule.png');
	$scope.onReminder = function() {
		window.schedule_select_id = 0;
		// document.getElementById('remindar_update_content').style.visibility = "visible";
		document.getElementById('custompost_content').style.visibility = "hidden";
		document.getElementById('calendar_content').style.visibility = "hidden";

		for (var i = 1; i < 43; i++) {
			document.getElementById('reminderCircle' + i).style.visibility = "hidden";
		}
	}
	$scope.onCustomPost = function() {
		window.schedule_select_id = 1;
		// document.getElementById('remindar_update_content').style.visibility = "visible";
		document.getElementById('custompost_content').style.visibility = "visible";
		document.getElementById('calendar_content').style.visibility = "hidden";

		for (var i = 1; i < 43; i++) {
			document.getElementById('reminderCircle' + i).style.visibility = "hidden";
		}
	}
	$scope.onCalendar = function() {
		window.schedule_select_id = 2;
		// document.getElementById('remindar_update_content').style.visibility = "visible";
		document.getElementById('custompost_content').style.visibility = "visible";
		document.getElementById('calendar_content').style.visibility = "visible";

		window.addCircleWeek = 1;
		addCirclesToCalendar();

	}
	$scope.firstpage_underbuttonbar_src = $sce.trustAsResourceUrl('img/settings/bar2.png');
	$scope.firstpage_underbuttonbar_reminder_src = $sce.trustAsResourceUrl('img/settings/bar1.png');
	$scope.firstpage_underbuttonbar_custom_src = $sce.trustAsResourceUrl('img/settings/bar1.png');
	$scope.firstpage_underbuttonbar_calendar_src = $sce.trustAsResourceUrl('img/settings/bar1.png');

	$scope.makeHours = [
		{ "value": 0, "text": "00" },
		{ "value": 1, "text": "01" },
		{ "value": 2, "text": "02" },
		{ "value": 3, "text": "03" },
		{ "value": 4, "text": "04" },
		{ "value": 5, "text": "05" },
		{ "value": 6, "text": "06" },
		{ "value": 7, "text": "07" },
		{ "value": 8, "text": "08" },
		{ "value": 9, "text": "09" },
		{ "value": 10, "text": "10" },
		{ "value": 11, "text": "11" }
	];
	$scope.selectedHour = function(value) {
		alert(value);
		window.createdHour = value;
	}

	$scope.makeMins = [
		{ "value": 0, "text": "00" },
		{ "value": 1, "text": "01" },
		{ "value": 2, "text": "02" },
		{ "value": 3, "text": "03" },
		{ "value": 4, "text": "04" },
		{ "value": 5, "text": "05" },
		{ "value": 6, "text": "06" },
		{ "value": 7, "text": "07" },
		{ "value": 8, "text": "08" },
		{ "value": 9, "text": "09" },
		{ "value": 10, "text": "10" },
		{ "value": 11, "text": "11" },
		{ "value": 12, "text": "12" },
		{ "value": 13, "text": "13" },
		{ "value": 14, "text": "14" },
		{ "value": 15, "text": "15" },
		{ "value": 16, "text": "16" },
		{ "value": 17, "text": "17" },
		{ "value": 18, "text": "18" },
		{ "value": 19, "text": "19" },
		{ "value": 20, "text": "20" },
		{ "value": 21, "text": "21" },
		{ "value": 22, "text": "22" },
		{ "value": 23, "text": "23" },
		{ "value": 24, "text": "24" },
		{ "value": 25, "text": "25" },
		{ "value": 26, "text": "26" },
		{ "value": 27, "text": "27" },
		{ "value": 28, "text": "28" },
		{ "value": 29, "text": "29" },
		{ "value": 30, "text": "30" },
		{ "value": 31, "text": "31" },
		{ "value": 32, "text": "32" },
		{ "value": 33, "text": "33" },
		{ "value": 34, "text": "34" },
		{ "value": 35, "text": "35" },
		{ "value": 36, "text": "36" },
		{ "value": 37, "text": "37" },
		{ "value": 38, "text": "38" },
		{ "value": 39, "text": "39" },
		{ "value": 40, "text": "40" },
		{ "value": 41, "text": "41" },
		{ "value": 42, "text": "42" },
		{ "value": 43, "text": "43" },
		{ "value": 44, "text": "44" },
		{ "value": 45, "text": "45" },
		{ "value": 46, "text": "46" },
		{ "value": 47, "text": "47" },
		{ "value": 48, "text": "48" },
		{ "value": 49, "text": "49" },
		{ "value": 50, "text": "50" },
		{ "value": 51, "text": "51" },
		{ "value": 52, "text": "52" },
		{ "value": 53, "text": "53" },
		{ "value": 54, "text": "54" },
		{ "value": 55, "text": "55" },
		{ "value": 56, "text": "56" },
		{ "value": 57, "text": "57" },
		{ "value": 58, "text": "58" },
		{ "value": 59, "text": "59" }
	];
	$scope.selectedMin = function(value) {
		alert(value);
		window.createdMinute = value;
	}

	$scope.makeAMPMs = [{ "value": 0, "text": "AM" }, { "value": 1, "text": "PM" }];
	$scope.selectedAMPM = function(value) {
		alert(value);
		window.createdPM = value;
	}
	$scope.onSun_createReminder = function() {
		toggleButton(0);
	}
	$scope.onMon_createReminder = function() {
		toggleButton(1);
	}
	$scope.onTue_createReminder = function() {
		toggleButton(2);
	}
	$scope.onWed_createReminder = function() {
		toggleButton(3);
	}

	$scope.onTur_createReminder = function() {
		toggleButton(4);
	}
	$scope.onFri_createReminder = function() {
		toggleButton(5);
	}
	$scope.onSat_createReminder = function() {
		toggleButton(6);
	}

	$scope.onSun_editReminder = function() {
		toggleButton_editReminder(0);
	}
	$scope.onMon_editReminder = function() {
		toggleButton_editReminder(1);
	}
	$scope.onTue_editReminder = function() {
		toggleButton_editReminder(2);
	}
	$scope.onWed_editReminder = function() {
		toggleButton_editReminder(3);
	}
	$scope.onTur_editReminder = function() {
		toggleButton_editReminder(4);
	}
	$scope.onFri_editReminder = function() {
		toggleButton_editReminder(5);
	}
	$scope.onSat_editReminder = function() {
		toggleButton_editReminder(6);
	}
	toggleButton = function(id) {
		var i = id + 1;
		if (window.edit_reminder_repeat_sun[id] == false) {
			window.edit_reminder_repeat_sun[id] = true;
			document.getElementById('repeatdaybutton' + i).style.background = 'orange';
			document.getElementById('repeatdaybutton' + i).style.border = 'none';
		} else if (window.edit_reminder_repeat_sun[id] == true) {
			window.edit_reminder_repeat_sun[id] = false;
			document.getElementById('repeatdaybutton' + i).style.background = 'white';
			document.getElementById('repeatdaybutton' + i).style.border = '1px solid #000';
		} else {
			
		}
	}

	toggleButton_editReminder = function(id) {
		var i = id + 1;
		if (window.edit_reminder_repeat[id] == false) {
			window.edit_reminder_repeat[id] = true;
			document.getElementById('repeatdaybutton' + i + '_edit').style.background = 'orange';
			document.getElementById('repeatdaybutton' + i + '_edit').style.border = 'none';
		} else if (window.edit_reminder_repeat[id] == true) {
			window.edit_reminder_repeat[id] = false;
			document.getElementById('repeatdaybutton' + i + '_edit').style.background = 'white';
			document.getElementById('repeatdaybutton' + i + '_edit').style.border = '1px solid #000';
		} else {
			
		}
	}

	$scope.temp = function() {
		var html = "<label> wahaha </label>";
		document.getElementById('calendarcalendar').innerHTML=html;
	}
	$scope.temp1 = function() {
		var html = "<label> muhaha </label>";
		document.getElementById('calendarcalendar').innerHTML=html;
	}

	$scope.calendar_heightline1_src = $sce.trustAsResourceUrl('img/calendar/heightline.png');
	$scope.calendar_heightline2_src = $sce.trustAsResourceUrl('img/calendar/heightline.png');
	$scope.calendar_heightline3_src = $sce.trustAsResourceUrl('img/calendar/heightline.png');
	$scope.calendar_heightline4_src = $sce.trustAsResourceUrl('img/calendar/heightline.png');
	$scope.calendar_heightline5_src = $sce.trustAsResourceUrl('img/calendar/heightline.png');
	$scope.calendar_heightline6_src = $sce.trustAsResourceUrl('img/calendar/heightline.png');

	$scope.calendar_lengthline1_src = $sce.trustAsResourceUrl('img/calendar/lengthline.png');
	$scope.calendar_lengthline2_src = $sce.trustAsResourceUrl('img/calendar/lengthline.png');
	$scope.calendar_lengthline3_src = $sce.trustAsResourceUrl('img/calendar/lengthline.png');
	$scope.calendar_lengthline4_src = $sce.trustAsResourceUrl('img/calendar/lengthline.png');
	$scope.calendar_lengthline5_src = $sce.trustAsResourceUrl('img/calendar/lengthline.png');

	$scope.xs = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

	$scope.closeTrashDialog = function() {
		document.getElementById("trashDialog").style.visibility = "hidden";
		document.getElementById("trashDialogContent").style.visibility = "hidden";
	}
	$scope.closeTrashSrc = $sce.trustAsResourceUrl('img/settings/cancel.png');

	$scope.trashYes = function() {
		for (var i = 0; i < 18; i++) {
			if (window.multiselect[i] == 1) {
				deleteImage(i);
			}
		}
		document.getElementById("trashDialog").style.visibility = "hidden";
		document.getElementById("trashDialogContent").style.visibility = "hidden";
	}

	deleteImage = function(i) {
		if (i == 0) {
			$scope.firstpage_templateimage1_src = $sce.trustAsResourceUrl('img/temp/23.jpg');
		}
		if (i == 1) {
			$scope.firstpage_templateimage2_src = $sce.trustAsResourceUrl('img/temp/23.jpg');
		}
		if (i == 2) {
			$scope.firstpage_templateimage3_src = $sce.trustAsResourceUrl('img/temp/23.jpg');
		}
		if (i == 3) {
			$scope.firstpage_templateimage4_src = $sce.trustAsResourceUrl('img/temp/23.jpg');
		}
		if (i == 4) {
			$scope.firstpage_templateimage5_src = $sce.trustAsResourceUrl('img/temp/23.jpg');
		}
		if (i == 5) {
			$scope.firstpage_templateimage6_src = $sce.trustAsResourceUrl('img/temp/23.jpg');
		}
		if (i == 6) {
			$scope.firstpage_templateimage7_src = $sce.trustAsResourceUrl('img/temp/23.jpg');
		}
		if (i == 7) {
			$scope.firstpage_templateimage8_src = $sce.trustAsResourceUrl('img/temp/23.jpg');
		}
		if (i == 8) {
			$scope.firstpage_templateimage9_src = $sce.trustAsResourceUrl('img/temp/23.jpg');
		}
		if (i == 9) {
			$scope.firstpage_templateimage10_src = $sce.trustAsResourceUrl('img/temp/23.jpg');
		}
		if (i == 10) {
			$scope.firstpage_templateimage11_src = $sce.trustAsResourceUrl('img/temp/23.jpg');
		}
		if (i == 11) {
			$scope.firstpage_templateimage12_src = $sce.trustAsResourceUrl('img/temp/23.jpg');
		}
		if (i == 12) {
			$scope.firstpage_templateimage13_src = $sce.trustAsResourceUrl('img/temp/23.jpg');
		}
		if (i == 13) {
			$scope.firstpage_templateimage14_src = $sce.trustAsResourceUrl('img/temp/23.jpg');
		}
		if (i == 14) {
			$scope.firstpage_templateimage15_src = $sce.trustAsResourceUrl('img/temp/23.jpg');
		}
		if (i == 15) {
			$scope.firstpage_templateimage16_src = $sce.trustAsResourceUrl('img/temp/23.jpg');
		}
		if (i == 16) {
			$scope.firstpage_templateimage17_src = $sce.trustAsResourceUrl('img/temp/23.jpg');
		}
		if (i == 17) {
			$scope.firstpage_templateimage18_src = $sce.trustAsResourceUrl('img/temp/23.jpg');
		}
	}

	$scope.trashNo = function() {
		document.getElementById("trashDialog").style.visibility = "hidden";
		document.getElementById("trashDialogContent").style.visibility = "hidden";
	}

	$("#the-photo-file-field").change(function() {
        renderImage(this.files[0]);
    });

    function renderImage(file){
        var reader = new FileReader();
        reader.onload = function(event){
            the_url = event.target.result;
           	for (var i = 0; i < 18; i++) {
           		if (window.multiselect[i] == 1) {
		            $('#grid' + (i+1).toString()).html("<img style='height: 100%; width: 100%; object-fit: contain' src='"+the_url+"' />");
           		}
           	}
        }
     
        reader.readAsDataURL(file);
    }

    $scope.addReminder = function () {
		document.getElementById("reminder_add_content").style.visibility = "visible";
    }

    $scope.reminderCreate = function() {
    	if (window.remindarCount == 5) {
			document.getElementById("reminder_add_content").style.visibility = "hidden";
    		return;
    	}
    	alert("reminder created");
		document.getElementById("reminder_add_content").style.visibility = "hidden";
		alert(window.createdHour.toString() + window.createdMinute.toString() + window.createdPM.toString());
		window.remindarCount++;
		if (window.remindarCount == 1) {
			document.getElementById("reminder1").style.visibility = "visible";
			document.getElementById("reminder2").style.visibility = "hidden";
			document.getElementById("reminder3").style.visibility = "hidden";
			document.getElementById("reminder4").style.visibility = "hidden";
			document.getElementById("reminder5").style.visibility = "hidden";

			window.reminderInfo[0][0] = window.createdHour;
			var hour = window.createdHour.toString();
			if (window.createdHour < 10) {
				hour = "0" + hour;
			}

			window.reminderInfo[0][1] = window.createdMinute;
			var minute = window.createdMinute.toString();
			if (window.createdMinute < 10) {
				minute = "0" + minute;
			}

			var ampm = "AM";
			window.reminderInfo[0][2] = window.createdPM;
			if (window.createdPM == 1) {
				ampm = "PM";
			}
			document.getElementById("firstpage schedule reminder_content1 time").innerHTML = hour + ":" + minute + " " + ampm;

			var week = "";
			window.reminderInfo[0][3] = 0;
			if (window.edit_reminder_repeat_sun[0] == true) {
				window.reminderInfo[0][3] = 1;
				if (week == "") {
					week = "Sunday";
				} else {
					week += ", Sunday";
				}
			}

			window.reminderInfo[0][4] = 0;
			if (window.edit_reminder_repeat_sun[1] == true) {
				window.reminderInfo[0][4] = 1;
				if (week == "") {
					week = "Monday";
				} else {
					week += ", Monday";
				}
			}

			window.reminderInfo[0][5] = 0;
			if (window.edit_reminder_repeat_sun[2] == true) {
				window.reminderInfo[0][5] = 1;
				if (week == "") {
					week = "Tuesday";
				} else {
					week += ", Tuesday";
				}
			}

			window.reminderInfo[0][6] = 0;
			if (window.edit_reminder_repeat_sun[3] == true) {
				window.reminderInfo[0][6] = 1;
				if (week == "") {
					week = "Wednesday";
				} else {
					week += ", Wednesday";
				}
			}

			window.reminderInfo[0][7] = 0;
			if (window.edit_reminder_repeat_sun[4] == true) {
				window.reminderInfo[0][7] = 1;
				if (week == "") {
					week = "Thursday";
				} else {
					week += ", Thursday";
				}
			}

			window.reminderInfo[0][8] = 0;
			if (window.edit_reminder_repeat_sun[5] == true) {
				window.reminderInfo[0][8] = 1;
				if (week == "") {
					week = "Friday";
				} else {
					week += ", Friday";
				}
			}

			window.reminderInfo[0][9] = 0;
			if (window.edit_reminder_repeat_sun[6] == true) {
				window.reminderInfo[0][9] = 1;
				if (week == "") {
					week = "Saturday";
				} else {
					week += ", Saturday";
				}
			}

			document.getElementById("firstpage schedule reminder_content1 weekday").innerHTML = week;

		} else if (window.remindarCount == 2) {
			document.getElementById("reminder1").style.visibility = "visible";
			document.getElementById("reminder2").style.visibility = "visible";
			document.getElementById("reminder3").style.visibility = "hidden";
			document.getElementById("reminder4").style.visibility = "hidden";
			document.getElementById("reminder5").style.visibility = "hidden";


			window.reminderInfo[1][0] = window.createdHour;
			var hour = window.createdHour.toString();
			if (window.createdHour < 10) {
				hour = "0" + hour;
			}

			window.reminderInfo[1][1] = window.createdMinute;
			var minute = window.createdMinute.toString();
			if (window.createdMinute < 10) {
				minute = "0" + minute;
			}

			var ampm = "AM";
			window.reminderInfo[1][2] = window.createdPM;
			if (window.createdPM == 1) {
				ampm = "PM";
			}

			var week = "";
			window.reminderInfo[1][3] = 0;
			if (window.edit_reminder_repeat_sun[0] == true) {
				window.reminderInfo[1][3] = 1;
				week += "Sunday";
			}

			window.reminderInfo[1][4] = 0;
			if (window.edit_reminder_repeat_sun[1] == true) {
				week += "Monday";
				window.reminderInfo[1][4] = 1;
				if (week == "") {
					week = "Monday";
				} else {
					week += ", Monday";
				}
			}

			window.reminderInfo[1][5] = 0;
			if (window.edit_reminder_repeat_sun[2] == true) {
				window.reminderInfo[1][5] = 1;
				if (week == "") {
					week = "Tuesday";
				} else {
					week += ", Tuesday";
				}
			}

			window.reminderInfo[1][6] = 0;
			if (window.edit_reminder_repeat_sun[3] == true) {
				window.reminderInfo[1][6] = 1;
				if (week == "") {
					week = "Wednesday";
				} else {
					week += ", Wednesday";
				}
			}

			window.reminderInfo[1][7] = 0;
			if (window.edit_reminder_repeat_sun[4] == true) {
				window.reminderInfo[1][7] = 1;
				if (week == "") {
					week = "Thursday";
				} else {
					week += ", Thursday";
				}
			}

			window.reminderInfo[1][8] = 0;
			if (window.edit_reminder_repeat_sun[5] == true) {
				window.reminderInfo[1][8] = 1;
				if (week == "") {
					week = "Friday";
				} else {
					week += ", Friday";
				}
			}

			window.reminderInfo[1][9] = 0;
			if (window.edit_reminder_repeat_sun[6] == true) {
				window.reminderInfo[1][9] = 1;
				if (week == "") {
					week = "Saturday";
				} else {
					week += ", Saturday";
				}
			}

			document.getElementById("firstpage schedule reminder_content2 time").innerHTML = hour + ":" + minute + " " + ampm;
			document.getElementById("firstpage schedule reminder_content2 weekday").innerHTML = week;
			
		} else if (window.remindarCount == 3) {
			document.getElementById("reminder1").style.visibility = "visible";
			document.getElementById("reminder2").style.visibility = "visible";
			document.getElementById("reminder3").style.visibility = "visible";
			document.getElementById("reminder4").style.visibility = "hidden";
			document.getElementById("reminder5").style.visibility = "hidden";


			window.reminderInfo[2][0] = window.createdHour;
			var hour = window.createdHour.toString();
			if (window.createdHour < 10) {
				hour = "0" + hour;
			}

			window.reminderInfo[2][1] = window.createdMinute;
			var minute = window.createdMinute.toString();
			if (window.createdMinute < 10) {
				minute = "0" + minute;
			}

			var ampm = "AM";
			window.reminderInfo[2][2] = window.createdPM;
			if (window.createdPM == 1) {
				ampm = "PM";
			}
			document.getElementById("firstpage schedule reminder_content3 time").innerHTML = hour + ":" + minute + " " + ampm;

			var week = "";
			window.reminderInfo[2][3] = 0;
			if (window.edit_reminder_repeat_sun[0] == true) {
				window.reminderInfo[2][3] = 1;
				week += "Sunday";
			}

			window.reminderInfo[2][4] = 0;
			if (window.edit_reminder_repeat_sun[1] == true) {
				week += "Monday";
				window.reminderInfo[2][4] = 1;
				if (week == "") {
					week = "Monday";
				} else {
					week += ", Monday";
				}
			}

			window.reminderInfo[2][5] = 0;
			if (window.edit_reminder_repeat_sun[2] == true) {
				window.reminderInfo[2][5] = 1;
				if (week == "") {
					week = "Tuesday";
				} else {
					week += ", Tuesday";
				}
			}

			window.reminderInfo[2][6] = 0;
			if (window.edit_reminder_repeat_sun[3] == true) {
				window.reminderInfo[2][6] = 1;
				if (week == "") {
					week = "Wednesday";
				} else {
					week += ", Wednesday";
				}
			}

			window.reminderInfo[2][7] = 0;
			if (window.edit_reminder_repeat_sun[4] == true) {
				window.reminderInfo[2][7] = 1;
				if (week == "") {
					week = "Thursday";
				} else {
					week += ", Thursday";
				}
			}

			window.reminderInfo[2][8] = 0;
			if (window.edit_reminder_repeat_sun[5] == true) {
				window.reminderInfo[2][8] = 1;
				if (week == "") {
					week = "Friday";
				} else {
					week += ", Friday";
				}
			}

			window.reminderInfo[2][9] = 0;
			if (window.edit_reminder_repeat_sun[6] == true) {
				window.reminderInfo[2][9] = 1;
				if (week == "") {
					week = "Saturday";
				} else {
					week += ", Saturday";
				}
			}

			document.getElementById("firstpage schedule reminder_content3 weekday").innerHTML = week;
			
		} else if (window.remindarCount == 4) {
			document.getElementById("reminder1").style.visibility = "visible";
			document.getElementById("reminder2").style.visibility = "visible";
			document.getElementById("reminder3").style.visibility = "visible";
			document.getElementById("reminder4").style.visibility = "visible";
			document.getElementById("reminder5").style.visibility = "hidden";

			window.reminderInfo[3][0] = window.createdHour;
			var hour = window.createdHour.toString();
			if (window.createdHour < 10) {
				hour = "0" + hour;
			}

			window.reminderInfo[3][1] = window.createdMinute;
			var minute = window.createdMinute.toString();
			if (window.createdMinute < 10) {
				minute = "0" + minute;
			}

			var ampm = "AM";
			window.reminderInfo[3][2] = window.createdPM;
			if (window.createdPM == 1) {
				ampm = "PM";
			}
			document.getElementById("firstpage schedule reminder_content4 time").innerHTML = hour + ":" + minute + " " + ampm;

			var week = "";
			window.reminderInfo[3][3] = 0;
			if (window.edit_reminder_repeat_sun[0] == true) {
				window.reminderInfo[3][3] = 1;
				week += "Sunday";
			}

			window.reminderInfo[3][4] = 0;
			if (window.edit_reminder_repeat_sun[1] == true) {
				week += "Monday";
				window.reminderInfo[3][4] = 1;
				if (week == "") {
					week = "Monday";
				} else {
					week += ", Monday";
				}
			}

			window.reminderInfo[3][5] = 0;
			if (window.edit_reminder_repeat_sun[2] == true) {
				window.reminderInfo[3][5] = 1;
				if (week == "") {
					week = "Tuesday";
				} else {
					week += ", Tuesday";
				}
			}

			window.reminderInfo[3][6] = 0;
			if (window.edit_reminder_repeat_sun[3] == true) {
				window.reminderInfo[3][6] = 1;
				if (week == "") {
					week = "Wednesday";
				} else {
					week += ", Wednesday";
				}
			}

			window.reminderInfo[3][7] = 0;
			if (window.edit_reminder_repeat_sun[4] == true) {
				window.reminderInfo[3][7] = 1;
				if (week == "") {
					week = "Thursday";
				} else {
					week += ", Thursday";
				}
			}

			window.reminderInfo[3][8] = 0;
			if (window.edit_reminder_repeat_sun[5] == true) {
				window.reminderInfo[3][8] = 1;
				if (week == "") {
					week = "Friday";
				} else {
					week += ", Friday";
				}
			}

			window.reminderInfo[3][9] = 0;
			if (window.edit_reminder_repeat_sun[6] == true) {
				window.reminderInfo[3][9] = 1;
				if (week == "") {
					week = "Saturday";
				} else {
					week += ", Saturday";
				}
			}

			document.getElementById("firstpage schedule reminder_content4 weekday").innerHTML = week;
			
		} else if (window.remindarCount == 5) {
			document.getElementById("reminder1").style.visibility = "visible";
			document.getElementById("reminder2").style.visibility = "visible";
			document.getElementById("reminder3").style.visibility = "visible";
			document.getElementById("reminder4").style.visibility = "visible";
			document.getElementById("reminder5").style.visibility = "visible";

			window.reminderInfo[4][0] = window.createdHour;
			var hour = window.createdHour.toString();
			if (window.createdHour < 10) {
				hour = "0" + hour;
			}

			window.reminderInfo[4][1] = window.createdMinute;
			var minute = window.createdMinute.toString();
			if (window.createdMinute < 10) {
				minute = "0" + minute;
			}

			var ampm = "AM";
			window.reminderInfo[4][2] = window.createdPM;
			if (window.createdPM == 1) {
				ampm = "PM";
			}
			document.getElementById("firstpage schedule reminder_content5 time").innerHTML = hour + ":" + minute + " " + ampm;

			var week = "";
			window.reminderInfo[4][3] = 0;
			if (window.edit_reminder_repeat_sun[0] == true) {
				window.reminderInfo[4][3] = 1;
				week += "Sunday";
			}

			window.reminderInfo[4][4] = 0;
			if (window.edit_reminder_repeat_sun[1] == true) {
				week += "Monday";
				window.reminderInfo[4][4] = 1;
				if (week == "") {
					week = "Monday";
				} else {
					week += ", Monday";
				}
			}

			window.reminderInfo[4][5] = 0;
			if (window.edit_reminder_repeat_sun[2] == true) {
				window.reminderInfo[4][5] = 1;
				if (week == "") {
					week = "Tuesday";
				} else {
					week += ", Tuesday";
				}
			}

			window.reminderInfo[4][6] = 0;
			if (window.edit_reminder_repeat_sun[3] == true) {
				window.reminderInfo[4][6] = 1;
				if (week == "") {
					week = "Wednesday";
				} else {
					week += ", Wednesday";
				}
			}

			window.reminderInfo[4][7] = 0;
			if (window.edit_reminder_repeat_sun[4] == true) {
				window.reminderInfo[4][7] = 1;
				if (week == "") {
					week = "Thursday";
				} else {
					week += ", Thursday";
				}
			}

			window.reminderInfo[4][8] = 0;
			if (window.edit_reminder_repeat_sun[5] == true) {
				window.reminderInfo[4][8] = 1;
				if (week == "") {
					week = "Friday";
				} else {
					week += ", Friday";
				}
			}

			window.reminderInfo[4][9] = 0;
			if (window.edit_reminder_repeat_sun[6] == true) {
				window.reminderInfo[4][9] = 1;
				if (week == "") {
					week = "Saturday";
				} else {
					week += ", Saturday";
				}
			}

			document.getElementById("firstpage schedule reminder_content5 weekday").innerHTML = week;
			
		}
    }

    $scope.reminderEdit1 = function() {
    	alert("reminder1 edit");
    	document.getElementById('remindar_update_content').style.visibility = "visible";
    	window.nowEditingReminder = 1;
    }
    $scope.reminderDelete1 = function() {
    	alert("reminder1 delete");
    	for (var i = 0; i < 10; i++) {
	    	window.reminderInfo[0][i] = window.reminderInfo[1][i];
	    	window.reminderInfo[1][i] = window.reminderInfo[2][i];
	    	window.reminderInfo[2][i] = window.reminderInfo[3][i];
	    	window.reminderInfo[3][i] = window.reminderInfo[4][i];
    	}

    	swipeReminder(0);
    	swipeReminder(1);
    	swipeReminder(2);
    	swipeReminder(3);

    	document.getElementById("reminder" + window.remindarCount).style.visibility = "hidden";
    	window.remindarCount--;
    }
    $scope.reminderEdit2 = function() {
    	alert("reminder2 edit");
    	document.getElementById('remindar_update_content').style.visibility = "visible";
    	window.nowEditingReminder = 2;
    }
    $scope.reminderDelete2 = function() {
    	alert("reminder2 delete");
    	for (var i = 0; i < 10; i++) {
	    	window.reminderInfo[1][i] = window.reminderInfo[2][i];
	    	window.reminderInfo[2][i] = window.reminderInfo[3][i];
	    	window.reminderInfo[3][i] = window.reminderInfo[4][i];
    	}

    	swipeReminder(1);
    	swipeReminder(2);
    	swipeReminder(3);

    	document.getElementById("reminder" + window.remindarCount).style.visibility = "hidden";
    	window.remindarCount--;
    }
    $scope.reminderEdit3 = function() {
    	alert("reminder3 edit");
    	document.getElementById('remindar_update_content').style.visibility = "visible";
    	window.nowEditingReminder = 3;
    }
    $scope.reminderDelete3 = function() {
    	alert("reminder3 delete");

    	for (var i = 0; i < 10; i++) {
	    	window.reminderInfo[2][i] = window.reminderInfo[3][i];
	    	window.reminderInfo[3][i] = window.reminderInfo[4][i];
    	}

    	swipeReminder(2);
    	swipeReminder(3);

    	document.getElementById("reminder" + window.remindarCount).style.visibility = "hidden";
    	window.remindarCount--;

    }
    $scope.reminderEdit4 = function() {
    	alert("reminder4 edit");
    	document.getElementById('remindar_update_content').style.visibility = "visible";
    	window.nowEditingReminder = 4;
    }
    $scope.reminderDelete4 = function() {
    	alert("reminder4 delete");
    	document.getElementById("reminder" + window.remindarCount).style.visibility = "hidden";

    	for (var i = 0; i < 10; i++) {
	    	window.reminderInfo[3][i] = window.reminderInfo[4][i];
    	}

    	swipeReminder(3);


    	window.remindarCount--;

    }
    $scope.reminderEdit5 = function() {
    	alert("reminder5 edit");
    	document.getElementById('remindar_update_content').style.visibility = "visible";
    	window.nowEditingReminder = 5;
    }
    $scope.reminderDelete5 = function() {
    	alert("reminder5 delete");
    	document.getElementById("reminder5").style.visibility = "hidden";
    	window.remindarCount--;
    }


    $scope.updateReminder = function() {
    	window.reminderInfo[window.nowEditingReminder - 1][0] = window.createdHour;
    	window.reminderInfo[window.nowEditingReminder - 1][1] = window.createdMinute;
    	window.reminderInfo[window.nowEditingReminder - 1][2] = window.createdPM;

    	if (window.edit_reminder_repeat[0] == true) {
    		window.reminderInfo[window.nowEditingReminder - 1][3] = 1;
    	} else {
    		window.reminderInfo[window.nowEditingReminder - 1][3] = 0;
    	}

    	if (window.edit_reminder_repeat[1] == true) {
    		window.reminderInfo[window.nowEditingReminder - 1][4] = 1;
    	} else {
    		window.reminderInfo[window.nowEditingReminder - 1][4] = 0;
    	}

    	if (window.edit_reminder_repeat[2] == true) {
    		window.reminderInfo[window.nowEditingReminder - 1][5] = 1;
    	} else {
    		window.reminderInfo[window.nowEditingReminder - 1][5] = 0;
    	}

    	if (window.edit_reminder_repeat[3] == true) {
    		window.reminderInfo[window.nowEditingReminder - 1][6] = 1;
    	} else {
    		window.reminderInfo[window.nowEditingReminder - 1][6] = 0;
    	}

    	if (window.edit_reminder_repeat[4] == true) {
    		window.reminderInfo[window.nowEditingReminder - 1][7] = 1;
    	} else {
    		window.reminderInfo[window.nowEditingReminder - 1][7] = 0;
    	}

    	if (window.edit_reminder_repeat[5] == true) {
    		window.reminderInfo[window.nowEditingReminder - 1][8] = 1;
    	} else {
    		window.reminderInfo[window.nowEditingReminder - 1][8] = 0;
    	}

    	if (window.edit_reminder_repeat[6] == true) {
    		window.reminderInfo[window.nowEditingReminder - 1][9] = 1;
    	} else {
    		window.reminderInfo[window.nowEditingReminder - 1][9] = 0;
    	}

    	document.getElementById("remindar_update_content").style.visibility = "hidden";

    	var tempText1 = window.reminderInfo[window.nowEditingReminder - 1][0];
    	if (window.reminderInfo[window.nowEditingReminder - 1][0] < 10) {
    		tempText1 = "0" + tempText1;
    	}

    	var tempText2 = window.reminderInfo[window.nowEditingReminder - 1][1];
    	if (window.reminderInfo[window.nowEditingReminder - 1][1] < 10) {
    		tempText2 = "0" + tempText2;
    	}

    	var tempText3 = "AM";
    	if (window.reminderInfo[window.nowEditingReminder - 1][2] == 1) {
    		tempText3 = "PM";
    	}

    	document.getElementById("firstpage schedule reminder_content" + window.nowEditingReminder + " time").innerHTML = tempText1 + ":" + tempText2 + " " + tempText3;

    	var week = "";
    	if (window.reminderInfo[window.nowEditingReminder - 1][3] == 1) {
    		if (week == "") {
    			week = "Sunday";
    		} else {
    			week += ", Sunday";
    		}
    	}
    	if (window.reminderInfo[window.nowEditingReminder - 1][4] == 1) {
    		if (week == "") {
    			week = "Monday";
    		} else {
    			week += ", Monday";
    		}
    	}
    	if (window.reminderInfo[window.nowEditingReminder - 1][5] == 1) {
    		if (week == "") {
    			week = "Tuesday";
    		} else {
    			week += ", Tuesday";
    		}
    	}
    	if (window.reminderInfo[window.nowEditingReminder - 1][6] == 1) {
    		if (week == "") {
    			week = "Wednesday";
    		} else {
    			week += ", Wednesday";
    		}
    	}
    	if (window.reminderInfo[window.nowEditingReminder - 1][7] == 1) {
    		if (week == "") {
    			week = "Thursday";
    		} else {
    			week += ", Thursday";
    		}
    	}
    	if (window.reminderInfo[window.nowEditingReminder - 1][8] == 1) {
    		if (week == "") {
    			week = "Friday";
    		} else {
    			week += ", Friday";
    		}
    	}
    	if (window.reminderInfo[window.nowEditingReminder - 1][9] == 1) {
    		if (week == "") {
    			week = "Saturday";
    		} else {
    			week += ", Saturday";
    		}
    	}
		document.getElementById("firstpage schedule reminder_content" + window.nowEditingReminder + " weekday").innerHTML = week;
    }

    swipeReminder = function(id) {

		var week = "";

    	if (window.reminderInfo[id][3] == 1) {
    		if (week == "") {
    			week = "Sunday";
    		} else {
    			week += ", Sunday";
    		}
    	}
    	if (window.reminderInfo[id][4] == 1) {
    		if (week == "") {
    			week = "Monday";
    		} else {
    			week += ", Monday";
    		}
    	}
    	if (window.reminderInfo[id][5] == 1) {
    		if (week == "") {
    			week = "Tuesday";
    		} else {
    			week += ", Tuesday";
    		}
    	}
    	if (window.reminderInfo[id][6] == 1) {
    		if (week == "") {
    			week = "Wednesday";
    		} else {
    			week += ", Wednesday";
    		}
    	}
    	if (window.reminderInfo[id][7] == 1) {
    		if (week == "") {
    			week = "Thursday";
    		} else {
    			week += ", Thursday";
    		}
    	}
    	if (window.reminderInfo[id][8] == 1) {
    		if (week == "") {
    			week = "Friday";
    		} else {
    			week += ", Friday";
    		}
    	}
    	if (window.reminderInfo[id][9] == 1) {
    		if (week == "") {
    			week = "Saturday";
    		} else {
    			week += ", Saturday";
    		}
    	}

		document.getElementById("firstpage schedule reminder_content" + (id + 1).toString() + " weekday").innerHTML = week;

		var tempText1 = window.reminderInfo[id][0];
		if (tempText1 < 10) {
			tempText1 = "0" + tempText1;
		}
		var tempText2 = window.reminderInfo[id][1];

		var tempText3 = "AM";
		if (window.reminderInfo[id][2] == 1) {
			tempText3 = "PM";
		}

		document.getElementById("firstpage schedule reminder_content" + (id + 1).toString() + " time").innerHTML = tempText1 + ":" + tempText2 + " " + tempText3;
    }
});



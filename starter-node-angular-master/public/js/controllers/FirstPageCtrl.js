angular.module('FirstPageCtrl', ['sessionApp','InstagramCtrl','ngCookies']).controller('FirstPageController', function($http,$scope, $sce, $location,init,SessionUser,$q,Multiuser,$cookies,Photo,Endpoint) {
	

	//Properties
	var draftId = null;
	var photos = Array();
	var emptyCell = $sce.trustAsResourceUrl($location.protocol() + "://" + $location.host() + ":" + $location.port()+'/img/temp/23.jpg');

	window.selectedCells = Array();
	window.queuedPhotos = Array();

	//Photos
	function initTiles(){
		for (var i = 0; i < 18; i++) {
			photos[i] = {"index":i};
			$scope["grid"+(i+1)+"_HTML"] = $sce.trustAsHtml("<img src='"+emptyCell+"' class='firstpage templateimage"+(i+1)+"' id='grid"+(i+1)+"_image'/>");
		
			var indexString = "onGrid"+(i+1)
			console.log(indexString);
			$scope[indexString] = createClickFunction(i);

		}
	}

	function initDropzone(){

		window.myDropzone = new Dropzone(document.body, { // Make the whole body a dropzone
		  url: "/target-url", // Set the url
		  uploadMultiple: true,
		  thumbnailWidth: 120,
		  thumbnailHeight: 120,
		  parallelUploads: 3,
		  previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-image\"><img data-dz-thumbnail /></div>\n <div class=\"dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></div>\n </div>"
,
		  autoQueue: false, // Make sure the files aren't queued until manually added
		  clickable: ".addbutton" // Define the element that should be used as click trigger to select files.
		});


		// window.myDropzone.on("processingmultiple", function(file) {
		//   // Hookup the start button
		//   console.log(file);
		//   // file.previewElement.querySelector(".start").onclick = function() { myDropzone.enqueueFile(file); };
		
		// });

		window.myDropzone.on("addedfile", function(file) {

			file.imageUrl = "/hello";


			if(window.myDropzone.getAddedFiles().length == $(".dz-hidden-input").get(0).files.length){
				console.log("DONE ADDING FILES");
				uploadMedia(window.myDropzone.getAddedFiles().slice());
				window.myDropzone.removeAllFiles(false);
			}
		});

		function uploadMedia(array){

			var selectedCellsToFill = Array();
			var unselectedCellsToFill = Array();
			var freeAndSelectedMap = Array();

			for (var i = 0; i<18;i++){
				freeAndSelectedMap.push({"selected":false,"free":false});
			}

			var sortedSelectedIndexes = window.selectedCells.sort(function (a, b) {  return a - b;  });
			sortedSelectedIndexes.forEach(function(cellIndex){
				freeAndSelectedMap[cellIndex].selected = true;
			});

			for (var i = 17; i >= 0; i--){
				console.log(i);
				if (cellAtIndexIsFree(i)){
					freeAndSelectedMap[i].free = true;

					if (freeAndSelectedMap[i].selected){
						selectedCellsToFill.push(i);
					}else{
						unselectedCellsToFill.push(i);
					}

				}
			}

			var cellsToFill = selectedCellsToFill.concat(unselectedCellsToFill);
			var nextCellToFill = 0;

			array.forEach(function(file){
				var cellIndex = cellsToFill[nextCellToFill];

				setImageAtIndex(file,cellIndex);

				nextCellToFill = nextCellToFill + 1;
			});
		}

		function cellAtIndexIsFree(cellIndex){

   			if (cellIndex >= 0){
   				if (photos[cellIndex]._id){
   					return false;
   				}else{
   					return true;
   				}
   			}else{
   				return false;
   			}
    	}
  
    	function setImageAtIndex(file,cellIndex){
    		console.log("setImageAtIndex()");
    		// console.log(file);
    		// console.log($(file.previewElement).find('img').attr('src'));
    		// console.log(file.previewElement);

			file.photoIndex = cellIndex;
			file.previewElement.id = "grid"+(cellIndex+1)+"_preview";
			


			console.log("dsfasdfasdfas");
			console.log($("#grid"+(file.photoIndex+1)+"_preview").find($("img"))[0]);
			
			$("#grid"+(file.photoIndex+1)).html(file.previewElement);
			$scope.$apply();


    		// var imageElement = $("#grid"+cellIndex+"_preview");
    		// console.log(image1);
    		// var imageElementSrc = imageElement[0];

    		// console.log(imageElement);



			// window.myDropzone.processFile(file);

    		let photo = {};
    	}

		window.myDropzone.on("success", function(file) {
	      console.log("success")
	    });

		window.myDropzone.on("complete", function() {
	      console.log("complete")
	    });

		window.myDropzone.on("processing", function(file) {
			console.log("processing");

			console.log(file.photoIndex);


    		// var image1 = document.getElementById(""+fdfds).getElementsByClassName();




			this.options.url = file.imageUrl;

	    });
	}


	initTiles();
	initDropzone();


	init($q,$cookies,Multiuser)
	.then(function(user){

		$scope["username"] = user.currentUser.username;

		var drafts = user.currentUser.drafts;
		for (var i = 0; i < drafts.length; i++){
			var draft = drafts[i];
			if(draft.isDefault == true){
				draftId = draft._id;
			}
		}

		Photo.list()
		.then(function(photos){

			loadPhotos(photos)

		},function(error){

		});

	},function(error){
		//Input error condition

	});

    function getNumFreeSpaces(){
    	var count = 0
    	photos.forEach(function(photo){
    		if (photo._id){
    			count = count + 1;
    		}
    	});
    	return count;
    }


	function loadPhotos(photoArray){
		console.log("photosArray:")
		console.log(photoArray);
		for (var i = 0; i < photoArray.length; i++) {

			var photo = photoArray[i];
			var indexString = "grid"+(photo.index+1)+"_HTML";
			// $scope[indexString] = $sce.trustAsResourceUrl('img/Unum_Black_Gif.gif');
			console.log(photo.draft+":"+draftId);

			if (photo.draft == draftId){
				photos[photo.index] = photo;
				
				if (photo.imageUrl){
					console.log("image added");
					console.log(photo);
					$scope[indexString] = $sce.trustAsHtml("<img src='"+photo.imageUrl+"' class='firstpage templateimage"+(photo.index+1)+"' id='grid"+(photo.index+1)+"_image'/>");
				}else if (photo.videoUrl){
					$scope[indexString] = $sce.trustAsHtml("<div style='overflow:hidden; height:inherit; width:inherit;'><video style='height: auto; width: 100%;' src='"+photo.videoUrl+"' /></div>");
				}

			}
		}
	}

	function reloadData(){
		console.log(photos)
		for (var i = 0; i < photos.length; i++) {

			var photo = photos[i];

			if (photo._id){

				var indexString = "grid"+(photo.index+1)+"_HTML";
				// $scope[indexString] = $sce.trustAsResourceUrl('img/Unum_Black_Gif.gif');

				if (photo.imageUrl && photo.draft == draftId){
					$scope[indexString] = $sce.trustAsHtml("<img src='"+photo.imageUrl+"' class='firstpage templateimage"+(photo.index+1)+"' id='grid"+(photo.index+1)+"_image'/>");
				}else if (photo.videoUrl){
					$scope[indexString] = $sce.trustAsHtml("<div style='overflow:hidden; height:inherit; width:inherit;'><video style='height: auto; width: 100%;' src='"+photo.videoUrl+"' /></div>");

					// var img = renderVideoThumbnail(photo.videoUrl);
					// $scope[indexString] = img;

				}
			}else{
				var indexString = "grid"+(i+1)+"_HTML";
				$scope[indexString] = $sce.trustAsHtml("<img src='"+emptyCell+"' class='firstpage templateimage"+(i+1)+"' id='grid"+(i+1)+"_image'/>");
			}
		}
	}

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
	for (var i = 0;i<42;i++){
		$scope["calendar_reminderCircle"+(i+1)+"_src"] = $sce.trustAsResourceUrl('img/quickdate.png');
	}

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
			window.selectedCells.push(id-1);
		} else {
			document.getElementById(str).style = "border: none !important";
			var index = window.selectedCells.indexOf(id-1);
			window.selectedCells.splice(index, 1);
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

	function createClickFunction(i) {
	    return function() {

				if (window.multiselect[i] == 0) {
					window.multiselect[i] = 1;
				} else if (window.multiselect[i] == 1) {
					window.multiselect[i] = 0;
				} else {

				}
				setborder(i+1);
			}
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
	// $scope.onToolbarAdd = function() {
	// 	document.getElementById('the-photo-file-field').click();
	// }


	$scope.firstpage_toolbar_trash_src = $sce.trustAsResourceUrl('img/toolbar/Trash.png');
	$scope.onToolbarTrash = function() {
		document.getElementById("trashDialog").style.visibility = "visible";
		document.getElementById("trashDialogContent").style.visibility = "visible";

		document.getElementById("firstpage caption close_Trash_TopLabel").innerHTML = "Delete " + window.selectedCells.length + " Selected Images";
	}


	$scope.firstpage_toolbar_swap_src = $sce.trustAsResourceUrl('img/toolbar/Swap.png');
	window.targetPos = [];
	$scope.onToolbarSwap = function() {

		var sortedSelectedIndexes = window.selectedCells.sort(function (a, b) {  return a - b;  });
		console.log(sortedSelectedIndexes);
		var shiftedSortedSelectedIndex = rotateIndexes(sortedSelectedIndexes,1);
		console.log(shiftedSortedSelectedIndex);
		var shiftedPhotos = shiftedSortedSelectedIndex.map(function(index){

			return photos[index];
		});
		// console.log(shiftedPhotos);

		var fromToIndexPaths = Array();
		var selectedJson = Array();

		console.log(sortedSelectedIndexes);

		for (var i = 0; i<sortedSelectedIndexes.length;i++){

			photos[i] = shiftedPhotos[i];

			photos[i].index = sortedSelectedIndexes[i];

			if (photos[i]._id){
				selectedJson.push(photos[i]);
			}

			// var elem = document.getElementById('grid' + (shiftedSortedSelectedIndex[i]+1).toString());
			// move(elem,shiftedSortedSelectedIndex[i]+1,sortedSelectedIndexes[i]+1);
		}

		//Save to Backend
      	var cookie = $cookies.get("auth");
      	var data = {"arr":selectedJson};
		$http.post(Endpoint.baseUrl+'/v1/posts/updates/',data,{headers: {
		'Authorization': 'Basic '+cookie
		}});

		reloadData();

	}

	function rotateIndexes(arrayShift,shift){
		var array = Array();
		if (arrayShift.length > 0){
			array = arrayShift.slice();
			if (shift > 0){
				for (var i = 0; i < shift; i++ ){
					var removedArray = 
					  array = array.concat(array.splice(0, 1));
					
				}
			}
		}
		return array;
	}

	move = function(elem, beginning ,id) {

		console.log((beginning)+":"+(id));

      var deferred = $q.defer();

		$q.all([moveActionX(elem, window.position_x[id - 1] - elem.offsetLeft, elem.offsetLeft, id),
		moveActionY(elem, window.position_y[id - 1] - elem.offsetTop, elem.offsetTop, id)])
		.then(function(){
        	deferred.resolve();
		});
      return deferred.promise;
	}

	moveActionX = function(elem, deltaX, currentX, i) {
      var deferred = $q.defer();
		if (deltaX != 0) {
			var pos = 0;
			var id = setInterval(frameX, 10);
			function frameX() {
				if (Math.abs(pos) >= Math.abs(deltaX)) {
					elem.style.left = window.position_x[i-1] + 'px';
					clearInterval(id);
					elem.style.left = null;
        			deferred.resolve();
				} else {
					pos += deltaX / 50;
					elem.style.left = currentX + pos + 'px';
				}
			}
		}else{
			deferred.resolve()
		}
      return deferred.promise;
	}

	moveActionY = function(elem, deltaY, currentY, i) {
      var deferred = $q.defer();
		if (deltaY != 0) {
			var pos = 0;
			var id = setInterval(frameY, 10);
			function frameY() {
				if (Math.abs(pos) >= Math.abs(deltaY)) {
					elem.style.top = window.position_y[i-1] + 'px';
					clearInterval(id);
					elem.style.top = null;

        			deferred.resolve();
				} else {
					pos += deltaY / 50;
					elem.style.top = currentY + pos + 'px';
				}
			}
		}else{
			deferred.resolve()
		}
      return deferred.promise;
	}

	$scope.firstpage_toolbar_caption_src = $sce.trustAsResourceUrl('img/toolbar/Caption.png');
	$scope.onToolbarCaption = function() {

		document.getElementById('captionBackground').style.visibility = "visible";
		document.getElementById('captionContent').style.visibility = "visible";
		$scope.closeCaptionSrc = $sce.trustAsResourceUrl('img/settings/cancel.png');
		// $scope.imageUrl = emptyCell;

		var queue = Array();

		window.selectedCells.forEach(function(cellIndex){
			var photo = photos[cellIndex];
			if(photo._id){
				queue.push(photos[cellIndex]);
			}
		});

		$scope.captionPhotos = queue;

		if (queue.length>0){
			$scope.caption = queue[0].message;
		}

		/*
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
		*/
	}

	$scope.firstpage_toolbar_schedule_src = $sce.trustAsResourceUrl('img/toolbar/Schedule.png');
		$scope.onToolbarSchedule = function() {
	}

	$scope.firstpage_toolbar_analytics_src = $sce.trustAsResourceUrl('img/toolbar/Analytics.png');
	$scope.onToolbarAnalytics = function() {

	}
	$scope.closeCaption = function() {
		document.getElementById('captionBackground').style.visibility = "hidden";
		document.getElementById('captionContent').style.visibility = "hidden";
		$scope.captionPhotos = Array();
		$scope.caption = "";

	}
	$scope.saveCaption = function() {

		$scope.captionPhotos.forEach(function(photo){
			photo.message = $scope.caption;
		});

		Photo.updatePhotos($scope.captionPhotos);

		$scope.closeCaption();
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

		// for (var i = 0; i < 18; i++) {
		// 	if (window.multiselect[i] == 1) {
		// 		deleteImage(i);
		// 	}
		// }
		var deleteArray = Array();
		console.log(window.selectedCells);
		var selectedArray = window.selectedCells.slice();
		selectedArray.forEach(function(cellIndex){

			if (photos[cellIndex]._id){
				deleteArray.push(photos[cellIndex]);
				photos[cellIndex] = {"index":cellIndex};

			var indexString = "grid"+(cellIndex+1)+"_HTML";
			$scope[indexString] = $sce.trustAsHtml("<img src='"+emptyCell+"' class='firstpage templateimage"+(cellIndex+1)+"' id='grid"+(cellIndex+1)+"_image'/>");

			}
			var click = createClickFunction(cellIndex);
			click(cellIndex);
		});

		document.getElementById("trashDialog").style.visibility = "hidden";
		document.getElementById("trashDialogContent").style.visibility = "hidden";
		console.log(deleteArray);
		Photo.deletePhotos(deleteArray);

	}

	$scope.trashNo = function() {
		document.getElementById("trashDialog").style.visibility = "hidden";
		document.getElementById("trashDialogContent").style.visibility = "hidden";
	}

	$("#the-photo-file-field").change(function() {
		console.log("RENDERING FILE");
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



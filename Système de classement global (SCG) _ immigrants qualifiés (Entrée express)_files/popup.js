//random = number of times to randomize 
	var random = 1; //set to 1 if not randomized	
	var multiple = false;
	
	var today = new Date();
	
	//var today = new Date("2020-07-07");
	var dd = today.getDate();
	var mm = today.getMonth()+1; 
	var yyyy = today.getFullYear();
	
	if(dd<10){dd='0'+dd;} 
	if(mm<10){mm='0'+mm;}	
	

	
	var getPopups = document.getElementsByClassName("notification");	
	//var getKeys = Object.entries(localStorage);
	
	var getKeys = new Array();
	for ( var i = 0, len = localStorage.length; i < len; ++i ) {

		
		getKeys.push(localStorage.key( i ) );
}
	
	
//	console.log("objects = " + Object.entries(localStorage))
//	console.log("localStorage = " + window.localStorage)
	
	var notifKey = new Array();
	var tempKey, parentDiv;
	var tempvar;
	var showPopup = false;
	var dateIssued, diffTime, diffDays;
	var popups = new Array();
	
	//Building the list of notifications on this page, and putting them into an array
	//Looping through each storage key
	for(var i = 0; i < getKeys.length; i++){
		// If the key contains the string "notif", assign it to a temporarily variable.
		if (getKeys[i].search("notification") >= 0 ) {
			tempKey  = getKeys[i]; 
//			console.log("test getting keys = " + getKeys[i] );
		}
		else{
			showPopup = true;
		}
		
		// Loop through the list of notifications on this page
		for (var j = 0; j < getPopups.length; j++){
			// If the temporarily variable is the same as the ID of the current popup in the loop, add the storage key to the array.
			// The storage key and the notification ID would be the same			
			if (tempKey == $(getPopups[j]).attr("data-notification"))	{ 
				notifKey.push(tempKey) 
			}									
		}
	}
	
	
	// Now we know the list of notifications on the page, and the list of storage keys that have already been set up on the user's machine.
	// I need to figure out 1) if key doesn't exist but popup does, show the popup. 2) if exists, check date. 3) if date is more than 14 days, show again and reset value, else don't show popup.
	
	for (var k = 0; k < getPopups.length; k++) {
			
			if (notifKey.length > 0) {
				for (l = 0; l < notifKey.length; l++) {
					if ($(getPopups[k]).attr("data-notification") == notifKey[l]) {
						//check if date is > 14 days
						dateIssued = window.localStorage.getItem( notifKey[l] + "_dateIssued");
						dateIssued = new Date(dateIssued);



						diffTime = Math.abs(dateIssued - today);
						diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

						if (diffDays  >= 14 ) {
							window.localStorage.removeItem(notifKey[l] + "_dateIssued");
							window.localStorage.removeItem(notifKey[l]);
							popups.push($(getPopups[k]).closest(".notification"));
							showPopup = true;
						}

					}
					else {
						//show the popup
						popups.push($(getPopups[k]).closest(".notification"));
						showPopup = true;

					}
				}	
			}
			else {
				popups.push($(getPopups[k]).closest(".notification"));
				showPopup = true;
			}
		}
	
	
	
	function showPopupFN(){
//		var i = Math.floor(Math.random() * (popups.length+1) );
		var i = Math.floor(Math.random() * (popups.length) );
		
//			console.log("popup length = " + popups.length);
//			console.log("popup length + 1 = " + (popups.length+1));
//			console.log(popups[i]);
		
//		if(i != (popups.length+1)){	
//			console.log("showing popup");
//			$(popups[i]).closest(".notification").removeClass("hidden");
//		}
		
			$(popups[i]).closest(".notification").removeClass("hidden");
	}
	

	
	$( document ).on( "wb-ready.wb", function( event ) {
		if (showPopup) {
			showPopupFN();			
		}
		
		
		
		$(".custom-content-dismiss").on("click vclick", function(event){			
			$(this).closest(".wb-dismissable-wrapper").siblings(".content-dismiss").trigger("click");			
		});
		
	
		$(".content-dismiss").on("click vclick", function(event){
			tempvar = this.parentElement.firstChild.firstChild.getAttribute("id");
			window.localStorage.setItem(tempvar + "_dateIssued", yyyy + "-" + mm + "-" + dd);
		})					
									
	});
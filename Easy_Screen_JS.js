

var clicked_once_timer_on = false;
var clicked_twice_timer_on = false;
var clicked_three_timer_on = false;

var first_click_timeout_function = null;
var second_click_timeout_function = null;
var third_click_timeout_function = null;

var the_start = true;


//future --- set EVENT_SCREEN_ROTATE to update these when needed
var screenHeight = null;
var screenWidth = null;


var waiting_screen_receive = false;


var check_screen_ready_timeout = null;
var request_screen_timeout = null;


//window.alert('hey');

function Startup(){

	screenHeight = screen.height;
	screenWidth = screen.width;
	
	//Request_Screen_Timeout();
 	document.getElementById('click_frame').onclick = Screen_Click ;

}
Startup();


function Request_Screen() {
	//send an AJAX request for the image source as an image element, set the waiting_screen_receive to true then false once the response arrives
	

	var requestString = "request_screen";
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {

		//out with the old, in with the new
	  	if (xhttp.readyState == 4 && xhttp.status == 200) {

	  		waiting_screen_receive = false;

	  		var image_frame = document.getElementById('image_frame');
	  		image_frame.src = '';
	  		image_frame.src = xhttp.responseText +'/' + new Date().getTime();
	  		//window.alert(image_frame.src);


	  	}
	
	}

	xhttp.open("GET", requestString, true);
  	xhttp.send();
  	waiting_screen_receive = true;


}


function Request_Screen_Timeout() {
	// //clear any timeouts then request a screen and set the new timeout, (but only set it once a screen has been received)
	clearTimeout(request_screen_timeout);
	clearTimeout(check_screen_ready_timeout);

	Request_Screen();

	//once request screen is called, check every 500ms to see if an image has been received yet, Check_Screen_Ready will handle resetting timers
	check_screen_ready_timeout = setTimeout(function(){ Check_Screen_Ready(); }, 500);
}





function Check_Screen_Ready() {

	//check if the ajax response is received and set screen request timeout again, else set the screen ready timeout
	clearTimeout(check_screen_ready_timeout);

	if(waiting_screen_receive == true) {
		// true means its still waiting, set to check still waiting again in 500ms
		check_screen_ready_timeout = setTimeout(function(){ Check_Screen_Ready(); }, 500);
	}
	else{
		//no longer waiting, so set to request again in 2000ms
		clearTimeout(request_screen_timeout);
		request_screen_timeout = setTimeout(function(){ Request_Screen_Timeout(); }, 2000);
	}
}





function Started() {
	window.alert('a');
	the_start = false;
}

setTimeout(function(){ Started(); }, 2000);


function Screen_Click(e) {
	
	//check to see if is a timer on, then set the timeout function
	var click_coords = GetCoordinates(e);
	if(the_start == true) {
		window.alert('start timer still on');
		return;
	}
	
	if (clicked_once_timer_on == false) {
		
		//if not clicked then set the timeout
		clicked_once_timer_on = true;
		first_click_timeout_function = setTimeout(function(){ Clicked_Once_Timeout(click_coords); }, 500);
	}
	else{

		//if is already clicked within timeout, clear the single click and set double click, leave the single indicated
		clearTimeout(first_click_timeout_function);

		if(clicked_twice_timer_on == false) {
			//window.alert('here3');
			clicked_twice_timer_on = true;
			second_click_timeout_function = setTimeout(function(){ Clicked_Twice_Timeout(click_coords); }, 500);
		}
		
		else {
			clearTimeout(second_click_timeout_function);
			if(clicked_three_timer_on == true) {
				clearTimeout(third_click_timeout_function);
				third_click_timeout_function = setTimeout(function(){ Clicked_Three_Timeout(click_coords); }, 500);
			}
			else{
				clicked_three_timer_on = true;
				clearTimeout(third_click_timeout_function);
				third_click_timeout_function = setTimeout(function(){ Clicked_Three_Timeout(click_coords); }, 500);
			}
		}
	}
}

function Clicked_Once_Timeout(the_coords) {
	//if the timeout occurs without interupt, then set the cursor to coords
	clicked_once_timer_on = false;

	first_click_timeout_function = null;

	Send_Coords(the_coords);
	//Request_Screen_Timeout();
	Request_Screen();
}


function Clicked_Twice_Timeout(the_coords) {

	//if the timeout occurs without interupt, then set cursor to coords and click
	clicked_twice_timer_on = false;
	clicked_once_timer_on = false;

	second_click_timeout_function = null;

	Send_Coords_Click(the_coords);
	//Request_Screen_Timeout();
	Request_Screen();
}

function Clicked_Three_Timeout(the_coords) {

	//if the timeout occurs without interupt, then set cursor to coords and double click
	clicked_three_timer_on = false;
	clicked_twice_timer_on = false;
	clicked_once_timer_on = false;

	third_click_timeout_function = null;

	Send_Coords_Double_Click(the_coords);
	//Request_Screen_Timeout();
	Request_Screen();
}




function On_Screen_Pressed(coords) {

}

function On_Screen_Up(corrds) {

}

function Get_Coord_Ratio_String(coords) {
	//build the coord pair as    double|||double
	var widthRatio = coords[1]/screenWidth;
	var heightRatio = coords[2]/screenHeight;

	//window.alert(widthFactor);
	var coordsString = widthRatio + '|||' + heightRatio;


	return coordsString;
}

function Send_Coords(coords) {
	//send the coords ratio string to move_mouse
	var coordsString = Get_Coord_Ratio_String(coords);
	var xhttp = new XMLHttpRequest();

	var requestString = "move_mouse?coordsString=" + coordsString;

	xhttp.open("GET", requestString, true);
  	xhttp.send();
}

function Send_Coords_Click(coords) {
	//send the coords ratio string to click_mouse
	var coordsString = Get_Coord_Ratio_String(coords);
	var xhttp = new XMLHttpRequest();

	var requestString = "click_mouse?coordsString=" + coordsString;

	xhttp.open("GET", requestString, true);
  	xhttp.send();
}

function Send_Coords_Double_Click(coords) {
	//send the coords ratio string to double_click_mouse
	var coordsString = Get_Coord_Ratio_String(coords);
	var xhttp = new XMLHttpRequest();

	var requestString = "double_click_mouse?coordsString=" + coordsString;

	xhttp.open("GET", requestString, true);
  	xhttp.send();
}


function GetCoordinates(e) {
	//Get the numerical w x h dimensions of the event 
	var PosX = 0;
	var PosY = 0;
	
	if (!e) var e = window.event;
	if (e.pageX || e.pageY)
	{

	  PosX = e.pageX;
	  PosY = e.pageY;
	}
	else if (e.clientX || e.clientY)
	{

	    PosX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		PosY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}

	var ReturnArray = new Object();
	ReturnArray[1] = PosX;
	ReturnArray[2] = PosY;

	return ReturnArray;
}
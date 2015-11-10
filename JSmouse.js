var real_control_width = screen.width;
var real_control_height = screen.width;


var control_view_width = real_control_width;
var control_view_height = real_control_height;


var screenWidth = 0;
var screenHight = 0;


var width_ratio = 0.5;

var widthFactor = 0;

window.alert("WHUT");
window.addEventListener("load", function() {
            function onTouchPreventDefault(event) { event.preventDefault(); };
            document.addEventListener("touchmove", onTouchPreventDefault, false);
            // //document.addEventListener("touchstart", onTouchPreventDefault, false);
        }, false);

//must hold down to 


function Size_Control_View(new_width_ratio) {
	// Reshape  


	if (new_width_ratio <= 1 && new_width_ratio >=0.001){
		width_ratio = new_width_ratio;
		widthFactor = (screenWidth*width_ratio) / real_control_width;
		control_view_width = real_control_width * widthFactor;
		control_view_height = real_control_height * widthFactor;
	}
}



	//from hidden input elements to pass dimension values
	screenHight = document.getElementById('height').value;
	


	screenWidth = document.getElementById('width').value;
		
	

	
	//set up the controler to represent half the width

	Size_Control_View(0.5);




//Press and release, Tap, Double Tap, Press and Drag

var is_pressed = false;

var StartMillis = -1;
var endMillis = -1;



// function Pressed_Down(e){
// 	//Start the clock to see how long it takes to release
// 		//
// 	var StartDate = new Date();
// 	StartMillis = StartDate.getTime();

// 	is_pressed = true;

// 	while(is_presseds){
// 		set_timout for delay between polls

// 		window.setInterval(Poll_Pressed(e), 1000)

// 	}
// }

// function Poll_Pressed(e){
// 	if(is_pressed){
// 		GetCoordinates(e)
// 		return true;
// 	}
// }


// function Released(e){
// 	var endDate = new Date();
// 	endMillis = endDate.getTime();

// 	is_pressed = false;

	

// }


/*




Map the various actions and event sequences to commands

Must have different action types to differentiate - these are crucial

on 'Record . '  have onmousedown, onmouseup, onmousemove, can also restrict cpu usage through timed polling

	The Goal is to translate the events into a keypress/mouse command such as "move cursur to <x, y>," or "left click and release"


Double click and hold will be singular left click


Must have 1 more "click action for each command" that will be translated

So the onmousedown will start the polling
	-->if unclicked by next poll then is a click

	-->hold will begin to poll the movement and record
			



	->>double click and hold is a click and hold



*/



var latestCoordinates = -1;
var is_pressed = false;


function mouseDown(e){
	latestCoordinates = GetCoordinates(e);
	is_pressed = true;
	
}

function Poll_Movement(e){
	
}




var clicked_once_timer_on = false;

var clicked_twice_timer_on = false;
var clicked_three_timer_on = false;

var first_click_timeout_function = null;
var second_click_timeout_function = null;
var third_click_timeout_function = null;

function Screen_Click(e) {
	//check to see if is a timer on, then set the timeout function
	var click_coords = GetCoordinates(e);

	if (clicked_once_timer_on == false) {
		//if not clicked then set the timeout
		clicked_once_timer_on = true;
		first_click_timeout_function = setTimeout(function(){ Clicked_Once_Timeout(click_coords) }, 500);
	}
	else{
		//if is already clicked within timeout, clear the single click and set double click, leave the single indicated
		clearTimeout(first_click_timeout_function);

		if(clicked_twice_timer_on == false) {
			clicked_twice_timer_on = true;
			second_click_timeout_function = setTimeout(function(){ Clicked_Twice_Timeout(click_coords) }, 500);
		}
		
		else {
			clearTimeout(second_click_timeout_function);
			if(clicked_three_timer_on == true) {
				third_click_timeout_function = setTimeout(function(){ Clicked_Three_Timeout(click_coords)}, 500);
			}
			else{
				clicked_three_timer_on = true;
				clearTimeout(third_click_timeout_function);
				third_click_timeout_function = setTimeout(function(){ Clicked_Three_Timeout(click_coords) }, 500);
			}
		}
	}
}

function Clicked_Once_Timeout(the_coords) {
	//if the timeout occurs without interupt, then set the cursor to coords
	clicked_once_timer = false;
	Send_Coords(the_coords);
}


function Clicked_Twice_Timeout(the_coords) {
	//if the timeout occurs without interupt, then set cursor to coords and click
	clicked_twice_timer = false;
	clicked_once_timer = false;
	Send_Coords_Click(the_coords);
}

function Clicked_Three_Timeout(the_coords) {
	//if the timeout occurs without interupt, then set cursor to coords and double click
	clicked_three_timer = false;
	clicked_twice_timer = false;
	clicked_once_timer = false;
	Send_Coords_Double_Click(the_coords);
}




function On_Screen_Pressed(coords) {

}

function On_Screen_Up(corrds) {

}


function Send_Coords(coords) {
//send the coordinate pair back to display
	var finalWidth = Math.floor(coords[1]*widthFactor);
	var finalHeight = Math.floor(coords[2]*widthFactor);

	//window.alert(widthFactor);
	var coordsString = finalWidth + '|||' + finalHeight;
	var xhttp = new XMLHttpRequest();

	var requestString = "move_mouse?coordsString=" + coordsString;

	xhttp.open("GET", requestString, true);
  	xhttp.send();
}

function Send_Coords_Click(coords) {
//send the coordinate pair back to display
	var finalWidth = Math.floor(coords[1]*widthFactor);
	var finalHeight = Math.floor(coords[2]*widthFactor);

	//window.alert(widthFactor);
	var coordsString = finalWidth + '|||' + finalHeight;
	var xhttp = new XMLHttpRequest();

	var requestString = "click_mouse?coordsString=" + coordsString;

	xhttp.open("GET", requestString, true);
  	xhttp.send();
}

function Send_Coords_Double_Click(coords) {
//send the coordinate pair back to display
	var finalWidth = Math.floor(coords[1]*widthFactor);
	var finalHeight = Math.floor(coords[2]*widthFactor);

	//window.alert(widthFactor);
	var coordsString = finalWidth + '|||' + finalHeight;
	var xhttp = new XMLHttpRequest();

	var requestString = "double_click_mouse?coordsString=" + coordsString;

	xhttp.open("GET", requestString, true);
  	xhttp.send();
}



var CONTROL_FRAME = document.getElementById('CONTROL_FRAME');


CONTROL_FRAME.onmousedown = DISPLAY_MOUSEDOWN;
CONTROL_FRAME.onmouseup = mouseupFunction;


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
var is_up = true;

function mouseupFunction(el){
	is_up = true;
}

function DISPLAY_MOUSEDOWN(e){


	is_up = false;

	While_wrapper(e);

}

var last_time = -1028;
var last_coords = -1;

function While_wrapper(e){
//currently not looping, wile to have such a check may be infaliable
	if(is_up == false) {
		var current_time = new Date();
		var current_millis = current_time.getTime();
		if (current_millis - last_time < 1000) {
			last_time = current_millis
			var xhttp = new XMLHttpRequest();
			xhttp.open("GET", "left_click?left_click=Clicked", true);
  			xhttp.send();
  			last_coords = GetCoordinates(e);
		}
		else{
			last_time = current_millis;
			if(last_coords != -1) {
				Send_Coords(last_coords);
			}
			last_coords = GetCoordinates(e);
		}

	}
}


function Send_Coords(coords) {
//send the coordinate pair back to display
	var finalWidth = Math.floor(coords[1]*widthFactor);
	var finalHeight = Math.floor(coords[2]*widthFactor);

	//window.alert(widthFactor);
	var coordsString = finalWidth + '|||' + finalHeight;
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "move_mouse?coordsString=" + coordsString, true);
  	xhttp.send();
}


//used the find the corner position of n element
function FindPosition(oElement) {
  if(typeof( oElement.offsetParent ) != 'undefined')
  {
    for(var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent)
    {
      posX += oElement.offsetLeft;
      posY += oElement.offsetTop;
    }
      return [ posX, posY ];
    }
    else
    {
      return [ oElement.x, oElement.y ];
    }
}
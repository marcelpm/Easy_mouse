<?php


if(isset($_GET['coordsString'])) {
	$value_string = $_GET['coordsString'];
	$width =  explode('|||', $value_string)[0];
	$height =  explode('|||', $value_string)[1];
	exec('sudo java '.width[0].' '.width[1]);
	print("")
	return 'ping'
}




?>
from bottle import *
import os
from subprocess import call




@route('/')
def Home():
	with open('JSmouse.js', 'r') as content_file:
		script = content_file.read()
	return """<html>hey<input type="hidden" id="width" value="3600"></input><input type="hidden" id="height" value="1080"></input><div style="width:100%;height:100%;" id="CONTROL_FRAME"></div><script>""" + script +"</script></html>"

@route('/move_mouse')
def Input():

	value_string = request.query.coordsString
	width = [n for n in value_string.split('|||')]
	print(value_string)

	os.system("java mouse_move " + width[0] + ' ' + width[1])
	
	return 'ping'

@route('/left_click')
def Left_Click():
	value_string = request.query.left_click
	
	if value_string == 'Clicked':
		print("ASDASDASDADADADADAD")
		print(value_string)
		os.system("java mouse_left_click")
		return 'ping'






run(port=8080, host="192.168.4.28")
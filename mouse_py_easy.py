from bottle import *
import os
from subprocess import call
import pyscreenshot as ImageGrab
from bottle import static_file


@route('/')
def Home():
	with open('Easy_Screen_JS.js', 'r') as content_file:
		script = content_file.read()
	return '<html><div style="width:100%;height:100%" id="click_frame"><img id="image_frame" style="width:100%;height:100%"/></div><script>' + script +'</script></html>'

@route('/move_mouse')
def Move_Mouse():
	value_string = request.query.coordsString
	coordinates = [n for n in value_string.split('|||')]
	print(value_string)

	os.system("java mouse_move " + coordinates[0] + ' ' + coordinates[1])
	return 'ping'




@route('/left_click')
def Left_Click():
	value_string = request.query.left_click
	
	if value_string == 'Clicked':
		print("ASDASDASDADADADADAD")
		print(value_string)
		os.system("java mouse_left_click")
		return 'ping'





@route('/click_mouse')
def Click_Mouse():
	Move_Mouse()
	os.system("java mouse_left_click")
	return 'ping'

@route('/double_click_mouse')
def Double_Click_Mouse():
	Move_Mouse()
	os.system("java mouse_left_click")
	os.system("java mouse_left_click")
	return 'ping'


@route('/request_screen')
def Send_Screen():
	ImageGrab.grab_to_file('im.png')
	return 'im'


@route('/im/<varriable>')
def image(varriable):
	return static_file('im.png', root='/home/marcel/code/FOR_GIT_PUBLIC/Easy_mouse', mimetype='image/png')

run(port=8080, host="192.168.4.28")
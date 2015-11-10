
import java.lang.StringBuilder;

import java.io.*;
import java.lang.System;
import java.io.IOException;

import java.awt.event.InputEvent;


import java.awt.Dimension;
import java.awt.Toolkit;
import java.awt.Robot;



import java.net.ServerSocket;
import java.net.Socket;



public class mouse_left_click {
 
	 public static void main(String[] args) throws Exception {

	 	System.out.println("AFAFDAFA");
        Robot robot = new Robot();
        // Click the first button 
        robot.mousePress(InputEvent.BUTTON1_MASK);
        robot.mouseRelease(InputEvent.BUTTON1_MASK);


		System.out.println("Stopping Server");

	 
	 }
}
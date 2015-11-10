
import java.lang.StringBuilder;

import java.io.*;
import java.lang.System;
import java.io.IOException;


import java.lang.Math;


import java.awt.Dimension;
import java.awt.Toolkit;
import java.awt.Robot;



import java.net.ServerSocket;
import java.net.Socket;



public class mouse_move {
 
	 public static void main(String[] args) throws Exception {



        Robot robot = new Robot();
        Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();

		double width = screenSize.getWidth();
		double height = screenSize.getHeight();


		double cursorX = width * Double.valueOf(args[0]);
		double cursorY = height * Double.valueOf(args[1]);
		

		int cursorX_int = (int) cursorX;
		int cursorY_int = (int) cursorY;

        // SET THE MOUSE X Y POSITION
        robot.mouseMove(cursorX_int, cursorY_int );


		System.out.println("Stopping Server");

	 
	 }
}
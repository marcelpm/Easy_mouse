
import java.lang.StringBuilder;

import java.io.*;
import java.lang.System;
import java.io.IOException;



import java.awt.Dimension;
import java.awt.Toolkit;
import java.awt.Robot;



import java.net.ServerSocket;
import java.net.Socket;



public class mouse_move {
 
	 public static void main(String[] args) throws Exception {


	            Robot robot = new Robot();
	            // SET THE MOUSE X Y POSITION
	            robot.mouseMove(Integer.parseInt(args[0]), Integer.parseInt(args[1]));


		
				System.out.println("Stopping Server");

	 
	 }
}
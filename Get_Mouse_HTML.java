import java.lang.System;
import java.io.IOException;

import java.io.FileInputStream;
import java.io.File;

import java.io.InputStream;

import java.awt.Dimension;
import java.awt.Toolkit;




public class Get_Mouse_HTML {
	public static void main(String[] args) throws Exception{
		Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();

		String outString;

		String screenHeight = String.valueOf(screenSize.height);
		String screenWidth = String.valueOf(screenSize.width);
		File file = new File("JSmouse.js");
		try{
			FileInputStream fis = new FileInputStream(file);
			byte[] data = new byte[(int) file.length()];
			fis.read(data);
			fis.close();

			String scriptString = new String(data, "UTF-8");

			outString = "<input type='hidden' id='width' value='" + screenWidth + "'></input><input type='hidden' id='height' value='" + screenHeight + "'></input><div style='width:100%;height:100%;' id='CONTROL_FRAME'></div>" + scriptString ;
		}
		catch(IOException e){

		}
	}
}
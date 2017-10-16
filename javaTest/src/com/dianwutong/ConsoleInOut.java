package com.dianwutong;
import java.io.*;
public class ConsoleInOut {
  public static void main(String args[]) throws IOException{
    InputStreamReader isr = null;
    try {
      isr = new InputStreamReader(System.in);
      System.out.println("Enter characters, 'q' to quit.");
      char c;
      do {
        c = (char) isr.read();
        System.out.println(c);
      }while ( c != 'q');
    }finally {
        if (isr != null){
          isr.close();
        }
    }
  }
}

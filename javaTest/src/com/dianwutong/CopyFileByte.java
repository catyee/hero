package com.dianwutong;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class CopyFileByte {
  public static void main(String args[]) throws IOException{
    FileInputStream in = null;
    FileOutputStream out = null;
    try {
      in  = new FileInputStream("input.txt");
      out = new FileOutputStream("output.txt");
      int c;
      while ((c = in.read()) != -1){
        out.write(c);
      }
    }finally {
        if ( in != null){
          in.close();
        }
        if (out != null){
          out.close();
        }
    }
  }
}
//标准流
//所有的编程语言都提供了对标准I/O流的支持，即用户可以从键盘上进行输入，并且从控制台屏幕上输出。java提供了以下的三种标准流
// Standard Input: 用以将数据输入给用户的程序，通常键盘作为标准输入流，表示为System.in，其类型是InputStream
//Standard Output: 用以输出用户程序产生的数据，通过控制台屏幕作为标准输出流，表示为System.out,其类型是PrintStream
//Standard Error:这是用来输出用户产生的错误数据，通常控制台屏幕作为标准错误流，表示为System.err,类型和System.out相同的是PrintStream
//这些流都有默认的设备(鼠标和屏幕)，但它们可以重定向到任何兼容的输入/输出设备

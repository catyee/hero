package com.dianwutong;

import java.io.*;

public class FileStreamTest {
    public static void main(String args[]){
      try {
//        byte bWrite [] = {10,20,30,40,50};
//        OutputStream os = new FileOutputStream("test.txt");
//        for (int x = 0; x < bWrite.length ; x++){
//          os.write(bWrite[x]);
//          System.out.println(bWrite[x]);
//        }
//        os.close();
        InputStream is = new FileInputStream("test.txt");
        int size = is.available();
        for (int i = 0; i < size; i++){
          System.out.print((char)is.read() + "");
        }
        is.close();
      }catch (IOException e){
        System.out.print("IOException");
      }
    }
}
//文件流最常用的两个流是FileInputStream和FileOutputStream
//对于FileInpuStream，可以以文件名的字符串为参数来创建一个输入流对象去读文件
//也可以以一个文件对象作为参数来创建一个输入流对象去读文件

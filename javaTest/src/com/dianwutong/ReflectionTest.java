package com.dianwutong;
public class ReflectionTest {
    //任何一个类都有getClass()方法，调用该方法即可获得一个表示类信息的对象Class
  public static void main(String[] args) throws Exception {
//    ReflectionTest reflectionTest = new ReflectionTest();
//    System.out.println(reflectionTest.getClass().getName());
      Class<?> class1 = null;
      Class<?> class2 = null;
      Class<?> class3 = null;
      //Class这个类用来表示“类”本身这个概念，获取类的信息有
      //第一种方式
      class1 = Class.forName("com.dianwutong.ReflectionTest");

      //第二种方式
      class2 = new ReflectionTest().getClass();

      //第三种方式
      class3 = ReflectionTest.class;
      System.out.println("类名称 " + class1.getName());
      System.out.println("类名称 " + class2.getName());
      System.out.println("类名称 " + class3.getName());
  }
}
//反射是一种动态获取信息以及动态调用对象方法的机制。在程序运行状态中，通过反射能够知道某个类具有哪些属性和方法；能够访问某一个对象的方法和属性
//具体来说反射主要提供了以下功能
//在运行时判断任意一个对象所属的类
//在运行时构造任意一个类的对象
//在运行时判断任意一个类所具有的成员变量和方法
//在运行时调用任意一个对象的方法
//生成动态代理

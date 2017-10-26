package com.dianwutong;

import java.lang.reflect.Constructor;

public class ReflectionTest2 {
  public static void main(String[] args) throws Exception {
    Class<?> class1 = Class.forName("com.dianwutong.User");
    //第一种方法，调用Class的newInstance()方法，这会调用类的默认构造方法
    User user = (User) class1.newInstance();
    user.setAge(20);
    user.setName("dianwutong");
    System.out.println(user);
    //第二种方法 先取得全部的构造函数，然后使用构造函数创建对象
    Constructor <?> cons[] = class1.getConstructors();
    for (int i = 0;i < cons.length;i++){
      //查看每个构造函数需要的参数
      Class<?> clazzs[] = cons[i].getParameterTypes();
      //打印构造函数的签名
      System.out.print("cons["+i+"](");
      for(int j = 0;j < clazzs.length;j++){
       // if ( j == clazzs.length-1)

      }

    }
  }
}

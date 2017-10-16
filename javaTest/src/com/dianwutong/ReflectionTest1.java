package com.dianwutong;

import java.io.Serializable;

public class ReflectionTest1 implements Serializable{
    private static final long serialVersionUID = -1L;
    public static void main(String[] args) throws Exception {
      Class<?> clazz = Class.forName("com.dianwutong.ReflectionTest1");
      //取得父类
      Class<?> parentClass = clazz.getSuperclass();
      System.out.println("clazz的父类为：" + parentClass.getName());
      //获取所有的接口
      Class<?> intes[] = clazz.getInterfaces();
      System.out.println("clazz实现的接口有 ");
      for(int i = 0; i < intes.length;i++){
        System.out.println((i + 1) + ":"+intes[i].getName());
      }
    }
}

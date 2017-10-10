package com.dianwutong;

public class Post {
     private  static  int count = 0;
     static {
       count = 100;
     }

    protected String title;//成员变量
    //String content = "content";//成员变量 成员变量的初始化一般通过构造器完成，也可以直接给类的属性增加赋值
  //也可以通过final修饰的方法来进行赋值
      String content = initContent();
      private final String initContent() {
        return  "默认内容";
      }
      //可以初始化构造块 构造块可用于多个构造器复用代码
      {
        title = "默认标题";
        content = "默认内容";
      }
      String name = "David";
      int age = 18;
      String hobby = "篮球";
      String formatString = "我的名字是%s,我今年%d岁,我的爱好是%s";
      String output = String.format(formatString,name,age,hobby);

    //成员方法
    void print(){
        System.out.println(output);
        System.out.println(title);
        System.out.println(content);
    }


}
//字符串的 format方法
//StringBuffer 表示可变长的和可修改的字符序列，

//StringBuffer和String类的区别在于String是不可变的对象，因此每次对String对象进行改变的时候都会生成一个新的String对象，所以经常改变内容的字符串最好不要用String，因为每次生成对象都会对系统功能产生影响 而使用StringBuffer类会对StringBuffer对象本身进行操作，而不是生成新的对象，所以在一般情况下我们推荐使用StringBuffer


//静态变量与静态方法
//当为一个类创建实例时，每个不同的实例的成员变量都有自己特定的值
//有时我们希望定义一个类成员，使其作为该类的公共成员，所有的实例都共享该成员变量，此时需要使用static关键字
//static是java语言中的修饰符，它可以修饰变量和方法，根据字面意思我们可以猜测static是静态的意思，被它们修饰的变量或者方法就含有静态的性质，与静态对应的就是实例，因为实例实在程序运行时动态生成的

//类的成员变量中，用static修饰的变量称为静态变量或者类变量，没有用static修饰的变量就是普通变量
//对于普通成员变量，每创建一个该类的实例就会创建该成员变量的一个拷贝，分配一次内存，由于成员变量是和类的实例绑定的，所以需要通过对象名进行访问，而不能通过类名对它进行访问
//而对于静态变量在内存中只有一份，java虚拟机只为静态变量分配一次内存，在加载类的过程中完成静态变量的内存分配，由于静态变量属于类，与类的实例无关，因而可以直接通过类名访问这类变量

//声明static的方法有几条限制
//仅能调用其他的static方法 只能访问static数据 不能以任何方式引用this或super ***

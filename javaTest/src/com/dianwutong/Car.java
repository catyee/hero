package com.dianwutong;
public class Car {
    private String title;
    private String content;
    public Car(String title){ //显示地增加默认构造器

    }
    public Car(String title,String content){//构造器
        this(title);//表示调用第一个构造器***
        this.content = content;
    }
}
//这个构造函数有两个参数，this表示的是当前对象，表示将参数title和content赋值给自己对应的成员变量
//用这个构造器来创建对象，则需要传入参数
//Car car = new Car('标题','内容');
//如果自行定义了构造器，则编译器就不再会为我们生成默认构造器，比如上述如果通过 Car car = new Car();来创建Car对象将会产生编译错误，除非现实地增加构造器

//如果一个类的方法或者构造器中的参数与与自己的成员变量重名的时候，就可以使用this


//使用this访问构造器

//Car myCar = new Car();//Car myCar 声明了一个Car类型的变量myCar，即myCar是一个引用类型变量，new关键字表示创建一个对象，Car是构造器的调用，对创建的对象进行初始化
//每次用new创建一个对象，就会在堆中分配新的内存来保存新的对象信息，而myCar这个引用变量本身则存储在栈中

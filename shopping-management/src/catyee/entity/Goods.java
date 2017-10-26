public final class Goods{
  //数据库Goods表主键
  private int gid;
  private String gname;
  private float gprice;
  private int   gnum;
  /**
   * 添加商品信息
   */
  public Goods(String gname,float gprice,int gnum){
    this.gname  = gname;
    this.gprice = gprice;
    this.gnum   = gnum;
  }
  /**
   * 展示所有商品
   */
  public Goods(int gid,String gname,float gprice,int gnum){
    this.gid    = gid;
    this.gname  = gname;
    this.gprice = gprice;
    this.gnum   = gnum;
  }
  /**
   * 根据编号更改商品信息
   *
   */
  public Goods(int gid,int gnum){
    this.gid  = gid;
    this.gnum = gnum;
  }
  /**
   * 根据编号更改商品信息
   */
  public Goods(int gid,float gprice){
    this.gid = gid;
    this.gprice = gprice;
  }
  /**
   * 根据编号更改商品信息
   */
  public Goods(int gid,String gname){
    this.gid = gid;
    this.gname = gname;
  }
  //共有的-get、set-方法
  public int getGid(){
    return gid;
  }
  public void setGid(int gid){
    this.gid = gid;
  }
  public String getGname(){
    return gname;
  }
  public float getGprice(){
    return gprice;
  }
  public void setGprice(double gprice)
  {
    this.gprice = gprice;
  }
  public int getGnum()
  {
    return gnum;
  }
  public void setGnum(int gnum)
  {
    this.gnum = gnum;
  }
}

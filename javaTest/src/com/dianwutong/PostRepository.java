package com.dianwutong;

import java.util.ArrayList;

public class PostRepository {
  private static ArrayList<Post> posts = new ArrayList<Post>();
  public static void add(Post post){
    posts.add(post);
  }
  public static Post getPostById(long id){
    for (Post post : posts){
      if (post.getId() == id){
          return  post;
      }
    }
    return null;
  }
  public static  void  remove(long id){
    for (Post post : posts){
      if (post.getId() == id){
        posts.remove(post);
        return;
      }
    }
  }
  public static ArrayList<Post> getAll(){
    return posts;
  }
}

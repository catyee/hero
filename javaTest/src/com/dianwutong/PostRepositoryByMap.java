package com.dianwutong;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PostRepositoryByMap {
  private static Map<Long,Post> postMap = new HashMap<Long,Post>();
  public static void add(Post post){
    postMap.put(post.getId(),post);
  }
  public static Post getPostById(long id){
    return postMap.get(id);
  }
  public static void remove(long id){
    postMap.remove(id);
  }
  public static List<Post> getAll(){
//    List<Post> posts = new ArrayList<>();
//    posts.addAll(postMap.values());
//    return posts;
    List<Post> posts = new ArrayList<>();
    for (Map.Entry<Long,Post> postEntry : postMap.entrySet()){
      long id = postEntry.getKey();
      Post post = postEntry.getValue();
      posts.add(post);
    }
    return  posts;
  }
}

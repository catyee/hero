/**
 * 页面守卫 
 * 在页面上引入改守卫之后
 * 如果检测到用户为登录
 * 则直接重定向到登录页
 */

import{ Common } from './common';
if(!Common.privilege){
    window.location.href = 'login.html';
}
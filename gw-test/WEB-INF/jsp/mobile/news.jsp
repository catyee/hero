<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="format-detection" content="telephone=no">
    <meta name="renderer" content="webkit">
    <meta http-equiv="Cache-Control" content="no-siteapp" />
    <%@ include file="common/common.jsp" %>
    <title><%=title %></title>
    <link rel="stylesheet" href="<%=basePath %>/css/mobile/common.css">
    <link rel="stylesheet" href="<%=basePath %>/css/mobile/news.css">
</head>
<body>
<%@ include file="./common/header.jsp"%>
<div class="bg-black" style="height: 3.75rem;width: 100%"></div>
<div class="container">
    <div class="news-con" style="padding: 0 0.8333rem;">
        <div class="height9"></div>
        <c:choose>
            <c:when test="${news.title == '' || news.title == null}">
                <div class="news-title" style="font-size: 1.25rem;font-weight: bold">没有新闻的详细信息</div>
            </c:when>
        </c:choose>
        <div class="news-title" style="font-size: 1.25rem;font-weight: bold">${news.title}</div>
        <div class="height7"></div>
        <div style="display: flex;font-size: 1rem;color: #737373">
            <div class="date">${news.lastModifyTime.substring(0, 10)}</div>
            <div class="source" style="margin: 0 1rem">${news.source}</div>
            <div class="author">${news.author}</div>
        </div>
        <div class="height5"></div>
        <div style="color: #000" class=" news-con">${news.content}</div>
    </div>
</div>
<script src="lib/jquery.min.js"></script>
<script src="js/mobile/common.js"></script>
</body>
</html>

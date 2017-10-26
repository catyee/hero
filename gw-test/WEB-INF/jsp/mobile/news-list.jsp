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
    <link rel="stylesheet" href="<%=basePath %>/css/mobile/news-list.css">
</head>
<body>
    <%@ include file="./common/header.jsp" %>
    <input type="hidden" id="prefix" value=${prefix}>
    <div class="bg-black" style="height: 3.75rem;width: 100%"></div>
    <div class="news-header bg-white">
        <div class="height9 "></div>
        <div class="news-header-title ">电务通动态</div>
        <div class="height9 "></div>
    </div>
    <div class="container" id="news-con">

    </div>
    <%--<div class="load-tip">加载中。。。</div>--%>
    <script src="<%=basePath%>/lib/jquery.min.js"></script>

    <script src="<%=basePath%>/js/mobile/common.js"></script>
    <script src="<%=basePath%>/js/mobile/news-list.js"></script>
</body>
</html>

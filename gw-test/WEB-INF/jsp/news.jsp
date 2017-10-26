<%--
  新闻详情
--%>
<%--
  首页
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="format-detection" content="telephone=no">
    <meta name="renderer" content="webkit">
    <meta http-equiv="Cache-Control" content="no-siteapp" />
    <%@ include file="./common/common.jsp" %>
    <title><%=title %></title>
    <link rel="stylesheet" href="/css/common.css">
    <link rel="stylesheet" href="/css/news.css">

</head>
<body>
<%@ include file="./common/header.jsp"%>
<div class="height60 bg-black fixed"></div>
<div class="height60"></div>
<div class="container width-con">
    <div class="inline-block-row-news">
        <div class="active-news">
            <div class="left-header">
                <div class="height38"></div>
                <div class="active-news-header height30 font15"><a href="./news-list.do"><span class="color-yellow">电务通动态</span></a><span>&nbsp;>&nbsp;动态详情</span></div>
                <div class="height18"></div>
            </div>
            <div class="active-news-list">
                    <div class="active-news-item">
                        <div class="height29"></div>
                        <div class="active-news-title font18">${news.title}</div>
                        <div class="height21"></div>
                        <div class="inline-block-row">
                            <div class="date">${news.lastModifyTime.substring(0, 10)}</div>
                            <div class="source">来源：<span>${news.source}</span></div>
                        </div>
                        <div class="height20"></div>
                        <div style="color: #737373" class="color-black font14 news-con">${news.content}</div>
                    </div>
            </div>
            <div class="height60 news-detail-border"></div>
            <div class="height50"></div>
            <div class="change-news">
                <c:choose>
                    <c:when test="${lastNews.title!= '' && lastNews.title!= null}">
                        <a href="./news.do?id=${lastNews.id}">
                            <div class="prev-news inline-block-row"><span class="color-black font14">上一篇：</span><span class="change-news-color font14 change-news-hover">${lastNews.title}</span></div>
                        </a>
                        <div class="height20"></div>
                    </c:when>
                    <c:otherwise>
                        <div class="prev-news inline-block-row"><span class="color-black font14">上一篇：</span><span class="change-news-color font14">没有上一篇</span></div>
                        <div class="height20"></div>
                    </c:otherwise>
                </c:choose>
                <c:choose>
                    <c:when test="${nextNews.title!= '' && nextNews.title!= null}">
                        <a href="./news.do?id=${nextNews.id}">
                            <div class="next-news inline-block-row"><span class="color-black font14">下一篇：</span><span class="change-news-color font14 change-news-hover" >${nextNews.title}</span></div>
                        </a>
                    </c:when>
                    <c:otherwise>
                        <div class="next-news inline-block-row"><span class="color-black font14">下一篇：</span><span class="change-news-color font14" >没有下一篇</span></div>
                    </c:otherwise>
                </c:choose>


            </div>
            <div class="height50"></div>
        </div>
        <%--热门新闻--%>
        <div class="hot-news">
            <div class="right-header">
                <div class="height38"></div>
                <div class="hot-news-header inline-block-row-news">
                    <span></span>
                    <div class=" font24">热门新闻</div>
                </div>
                <div class="height18"></div>
            </div>
            <div class="hot-news-con">
                <c:forEach var="news" items="${hotNews}" begin="0" end="${totalCount}" step="1" varStatus="varStatus">
                    <c:choose>
                        <c:when test="${news.picture!= '' && news.picture!= null }">
                            <a href="<%=basePath %>/news.do?id=${news.id}">
                                <div class="hot-news-item">
                                    <div class="height20"></div>
                                    <div class="hot-news-item-pic">
                                        <div style="background: url(${prefix}${news.picture});width: 240px; height: 90px;background-size: cover">
                                        </div>
                                        <div class="height20 "></div>
                                        <div class="hot-news-item-title font14 color-black"><span class="center hot-hover">${news.title}</span></div>
                                        <div class="height20 "></div>
                                    </div>
                                </div>
                            </a>
                        </c:when>
                        <c:otherwise>
                            <a href="<%=basePath %>/news.do?id=${news.id}">
                                <div class="hot-news-item" style="height: 38px;line-height: 38px">
                                    <div class=" font14 ellipsis"><span class="titile-index font14 ">${varStatus.index+1}</span><span class="color-black  hot-hover">${news.title}</span></div>
                                    <div class="height20 "></div>
                                </div>
                            </a>
                        </c:otherwise>
                    </c:choose>

                </c:forEach>
                <%--<c:forEach var="news" items="${news}" begin="3" end="${pageResult.totalCount}" step="1" varStatus="status">--%>

                <%--</c:forEach>--%>
            </div>

        </div>

    </div>
    </div>
<%@ include file="./common/footer.jsp"%>
<script src="<%=basePath %>/lib/jquery.min.js"></script>
<script src="<%=basePath %>/js/common.js"></script>
<script>
    $('.nav-list li a').removeClass(' nav-border-yellow');
    $('.nav-list .nav-index a').addClass(' nav-border-yellow');
</script>
</body>
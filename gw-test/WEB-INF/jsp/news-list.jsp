<%--
 新闻列表
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="format-detection" content="telephone=no">
    <meta name="renderer" content="webkit">
    <meta http-equiv="Cache-Control" content="no-siteapp"/>
    <%@ include file="./common/common.jsp" %>
    <title><%=title %>
    </title>
    <link rel="stylesheet" href="/css/common.css">
    <link rel="stylesheet" href="/css/news-list.css">
</head>
<body>
<%@ include file="./common/header.jsp" %>
<div class="height60"></div>
<div class="container width-con ">
    <div class="inline-block-row-news">
        <div class="active-news">
            <%--动态列标题--%>
            <div class="left-header">
                <div class="height38"></div>
                <div class="active-news-header height30 font24">电务通动态</div>
                <div class="height18"></div>
            </div>
            <%--动态列表--%>
            <div class="active-news-list">
                <c:forEach var="news" items="${news}">
                    <a  href="<%=basePath %>/news.do?id=${news.id}"><div class="active-news-item news-hover" >
                        <div class="height29"></div>
                        <div class="active-news-title font18 color-black">${news.title}</div>
                        <div class="height21"></div>
                        <div class="inline-block-row-news" >
                            <c:choose>
                                <c:when test="${news.picture!= '' && news.picture!= null }">
                                    <div class="active-news-pic" style="vertical-align: middle">
                                        <img style="background: url(${prefix}${news.picture});width: 200px; height: 150px;background-size: cover;">
                                    </div>
                                <div class="active-news-text " style="width: 590px;vertical-align: middle">
                                    <c:choose>
                                        <c:when test="${(news.newsDesc).length()>100}">
                                            <div class="font14 active-news-con  color-black" style="display: inline-block">${news.newsDesc.substring(0,100)}...</div>
                                        </c:when>
                                        <c:otherwise>
                                            <div class="font14 active-news-con  color-black" style="display: inline-block">${news.newsDesc}</div>
                                        </c:otherwise>
                                    </c:choose>
                                    <div class="height24"></div>
                                    <div class="active-news-footer inline-block-row-news ">
                                        <div class="active-news-date font14">${news.lastModifyTime.substring(0, 10)}</div>
                                        <div class="active-news-source font14">${news.source}</div>
                                    </div>
                                </div>
                        </div>
                    </div></a>
                                </c:when>
                                <c:otherwise>
                                    <div class="active-news-text">
                                        <div class="font14 active-news-con  color-black" style="display: inline-block">${news.newsDesc.substring(0, 200)}...</div>
                                        <div class="height24"></div>
                                        <div class="active-news-footer inline-block-row-news ">
                                            <div class="active-news-date font14">${news.lastModifyTime.substring(0, 10)}</div>
                                            <div class="active-news-source font14">${news.source}</div>
                                        </div>
                                    </div>
                            </div>
                        </div></a>
                                </c:otherwise>
                            </c:choose>
                </c:forEach>
            </div>
            <div style="height: 96px;width: 100%"></div>
            <%--分页--%>
            <c:choose>
                <c:when test="${pageResult.totalCount!= 0}">
                <ul style="height: 30px;width: 100%;text-align: center"  class="page inline-block-row">
                    <c:choose>
                        <c:when test="${pageResult.currentPage == 1}">
                            <li class="disabled  prev"><a href="javascript:;">&laquo;</a></li>
                            <li class="active"><a href="./news-list.do?currentPage=1" class="color-black ">1</a></li>
                        </c:when>
                        <c:otherwise>
                            <li><a href="./news-list.do?currentPage=${prePage}">&laquo;</a></li>
                            <li><a href="./news-list.do?currentPage=1" class="font14 color-black" >1</a></li>
                        <c:choose>
                        <c:when test="${pageResult.currentPage >3}">
                            <li class="disabled"><a href="javascript:;" class="color-black">...</a></li>
                        </c:when>
                        </c:choose>
                        </c:otherwise>
                    </c:choose>
                    <c:forEach  var="i" begin="${start}" end="${end}" step="1">
                        <c:choose>
                            <c:when test="${i == pageResult.currentPage}">
                                <li class="active"><a href="./news-list.do?currentPage=${i}">${i}</a></li>
                            </c:when>
                            <c:otherwise>
                                <li ><a href="./news-list.do?currentPage=${i}">${i}</a></li>
                            </c:otherwise>
                        </c:choose>
                    </c:forEach>
                <c:choose>
                    <c:when test="${(pageResult.currentPage+2) < pageResult.totalPages}">
                        <li class="disabled"><a href="javascript:;">...</a></li>
                    </c:when>
                </c:choose>
                <c:choose>
                    <c:when test="${pageResult.currentPage ==  pageResult.totalPages}">
                        <%--<li class="active"><a href="./news-list.do?currentPage=${pageResult.totalPages}">${pageResult.totalPages}</a></li>--%>
                        <li class="disabled" ><a href="javascript:;">&raquo;</a></li>
                    </c:when>
                    <c:otherwise>
                        <c:choose>
                        <c:when test="${pageResult.totalPages!=1}">
                            <%--<li><a class="page-item" href="./news-list.do?currentPage=${pageResult.totalPages}">${pageResult.totalPages}</a></li>--%>
                            <li ><a href="./news-list.do?currentPage=${nextPage}">&raquo;</a></li>
                        </c:when>
                         <c:otherwise>
                             <li class="disabled"><a href="./news-list.do?currentPage=${nextPage}">&raquo;</a></li>
                         </c:otherwise>
                        </c:choose>
                    </c:otherwise>
                </c:choose>
            </ul>
                </c:when>
            </c:choose>
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
        <c:forEach var="news" items="${hotNews}" begin="0" end="${hotResult.totalCount}" step="1" varStatus="varStatus">
                <c:choose>
                    <c:when test="${news.picture!= '' && news.picture!= null }">
                            <a href="<%=basePath %>/news.do?id=${news.id}">
                                <div class="hot-news-item ">
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
                                <div class=" font14 ellipsis"><span class="titile-index font14 ">${varStatus.index+1}</span><span class="color-black hot-hover">${news.title}</span></div>
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
<div class="height50"></div>
</div>
<%@ include file="./common/footer.jsp" %>
<script src="<%=basePath %>/lib/jquery.min.js"></script>
<script src="<%=basePath %>/js/common.js"></script>
<script>
    $('.nav-list li a').removeClass(' nav-border-yellow');
    $('.nav-list .nav-news a').addClass(' nav-border-yellow');
    $('#head').addClass('nav-shadow')
</script>
</body>
</html>

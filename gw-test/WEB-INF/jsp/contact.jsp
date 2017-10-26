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
    <link rel="stylesheet" href="/css/contact.css">

</head>
<body>
<%@ include file="./common/header.jsp" %>
<div>
    <div class="contact-us">
        <img src="/images/contact/contact-us.jpg">
    </div>
    <div class="height90"></div>
    <div class="width-con">
        <div class="title">招贤纳士 &nbsp;&nbsp;<span>RECRUITING</span></div>
        <div class="height33"></div>
        <div class="position-list">
            <c:forEach var="position" items="${positions}">
                <div class="position-item">
                    <div class="job-name default-border pointer">
                        <div class="name-con">
                            <i></i>
                            <div class="name">${position.posName}</div>
                            <div class="detail">
                                <div class="arrow"></div>
                                <div class="showDetail">查看详情</div>
                            </div>
                        </div>
                    </div>
                    <div class="detail-content none">
                        <div class="job-requirement">
                            <div class="line">
                                <div><span>工作地点：</span><span>${position.place}</span></div>
                                <div><span>部门：</span><span>${position.department}</span></div>
                                <div><span>发布日期：</span><span>${position.publishDate}</span></div>
                            </div>
                            <div class="line">
                                <div><span>招聘人数：</span><span>${position.peopleCount}</span></div>
                                <div><span>工作年限：</span><span>${position.jobYear}</span></div>
                                <div><span>学历：</span><span>${position.education}</span></div>
                            </div>
                        </div>
                        <div class="job-con">
                                ${position.jobRequirements}
                        </div>

                    </div>
                    <div class="height17"></div>
                </div>
            </c:forEach>
        </div>

        <div class="height50"></div>
        <%--分页--%>
        <c:choose>
            <c:when test="${pageResult.totalCount!= 0}">
                <ul style="height: 30px;width: 100%;text-align: center" class="page inline-block-row">
                    <c:choose>
                        <c:when test="${pageResult.currentPage == 1}">
                            <li class="disabled  prev"><a href="javascript:;">&laquo;</a></li>
                            <li class="active"><a href="./contact.do?currentPage=1" class="color-black ">1</a></li>
                        </c:when>
                        <c:otherwise>
                            <li><a href="./contact.do?currentPage=${prePage}">&laquo;</a></li>
                            <li><a href="./contact.do?currentPage=1" class="font14 color-black">1</a></li>
                            <c:choose>
                                <c:when test="${pageResult.currentPage >3}">
                                    <li class="disabled"><a href="javascript:;" class="color-black">...</a></li>
                                </c:when>
                            </c:choose>
                        </c:otherwise>
                    </c:choose>
                    <c:forEach var="i" begin="${start}" end="${end}" step="1">
                        <c:choose>
                            <c:when test="${i == pageResult.currentPage}">
                                <li class="active"><a href="./contact.do?currentPage=${i}">${i}</a></li>
                            </c:when>
                            <c:otherwise>
                                <li><a href="./contact.do?currentPage=${i}">${i}</a></li>
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
                            <li class="disabled"><a href="javascript:;">&raquo;</a></li>
                        </c:when>
                        <c:otherwise>
                            <c:choose>
                                <c:when test="${pageResult.totalPages!=1}">
                                    <%--<li><a class="page-item" href="./news-list.do?currentPage=${pageResult.totalPages}">${pageResult.totalPages}</a></li>--%>
                                    <li><a href="./contact.do?currentPage=${nextPage}">&raquo;</a></li>
                                </c:when>
                                <c:otherwise>
                                    <li class="disabled"><a href="./contact.do?currentPage=${nextPage}">&raquo;</a>
                                    </li>
                                </c:otherwise>
                            </c:choose>
                        </c:otherwise>
                    </c:choose>
                </ul>
            </c:when>
        </c:choose>

        <div class="height70"></div>
        <div class="width-con">
            <div class="title">联系我们 &nbsp;&nbsp;<span>CONTACT US</span></div>
            <div class="address">
                <div>
                    <div class="company">北京电务通能源股份有限公司</div>
                    <div class="height12 "></div>
                    <div class="lineHeight25 ">网址：www.dianwutong.com</div>
                    <div class="lineHeight25">电话：010-87927006-8206</div>
                    <div class="lineHeight25">传真：01087927006</div>
                    <div class="lineHeight25">邮编：100176</div>
                    <div class="lineHeight25">地址：北京亦庄经济开发区经海四路35号院2号楼5区</div>
                </div>
            </div>
            <div class="map" id="company-address"></div>
        </div>

    </div>
    <div class="height60"></div>

</div>
<%@ include file="./common/footer.jsp" %>
<script src="<%=basePath %>/lib/jquery.min.js"></script>
<script src="<%=basePath %>/js/common.js"></script>
<script src="http://api.map.baidu.com/api?v=2.0&ak=TT0RktRPwhEbTvTRK5I416aW"></script>
<script src="<%=basePath %>/js/contact.js"></script>
</body>
</html>

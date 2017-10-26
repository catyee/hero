<%--

--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="format-detection" content="telephone=no">
    <meta name="renderer" content="webkit">
    <meta http-equiv="Cache-Control" content="no-siteapp"/>
    <link rel="stylesheet" href="lib/swiper-3.4.2.min.css">
    <link rel="stylesheet" href="../css/mobile/solution.css">
    <%@ include file="common/common.jsp" %>
    <title><%=title %></title>
</head>
<body>
    <%@ include file="common/header.jsp" %>
    <div class="solution-banner">
        <img src="./images/mobile/solution-banner.png" class="width100">
    </div>
    <div class="padding1">

        <div class="title">区域电力云运营中心构架</div>
        <div class="height10"></div>
        <div class="">
            通过对配电室进行改造，可以将配电室的运行状况纳入到电力云系统的监控下，从而实现无人化管理；数十家地域相邻的配电室可以被划分为一个区域，并归该区域的区域电力云所管辖，并且由该区域的检修人员进行维护。客户可以通过手机APP和EDP系统来查看自己配电室的运行状态。
        </div>
        <div class="height10"></div>
    </div>
    <div class="bg-white padding1">
        <img src="images/solution/area.png" class="width100">
    </div>

    <div class="height10"></div>
    <div class="padding1">

        <div class="title">全国电力云运营中心构架</div>
        <div class="height10"></div>
        <div class="">
            所有区域电力云系统均连接至全国运营中心总控中心，由总控中心负责电力云系统的升级和维护，确保所有区域电力云系统的正常运行。
        </div>
        <div class="height10"></div>
    </div>
    <div class="bg-white padding1">
        <img src="images/solution/nation.png" class="width100">
    </div>

    <div class="height10"></div>
    <div class="padding1">

        <div class="title">IEMS综合能源管理解决方案</div>
        <div class="height10"></div>
        <div class="" id="solution-desc">
            EMS能源管理系统+EDP京能大数据平台简称IEMS综合能源解决方案，该解决方案以绿色环保为核心，坚持“低碳”、“环保”、“节能”的理念，打造全新的配电室运维模式。
        </div>
        <div class="height10"></div>
    </div>

    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <div class="solution ems-solution">

                </div>
            </div>
            <div class="swiper-slide">
                <div class="solution edp-solution">

                </div>
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination" style="bottom:2.5rem;"></div>
    </div>

    <div class="height20"></div>
    <%@ include file="common/footer.jsp" %>
    <script src="lib/jquery.min.js"></script>
    <script src="lib/swiper-3.4.2.min.js"></script>
    <script src="js/mobile/solution.js"></script>
</body>
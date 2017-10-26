<%--
  首页
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
    <link rel="stylesheet" href="<%=basePath%>/lib/swiper-3.4.2.min.css">
    <link rel="stylesheet" href="<%=basePath%>/css/common.css">
    <link rel="stylesheet" href="<%=basePath%>/css/sprite.css">
    <link rel="stylesheet" href="<%=basePath%>/css/index.css">
</head>
<body>
<%@ include file="./common/header.jsp" %>
<input type="hidden" id="cus-value" value=${cusNumber}>
<input type="hidden" id="pr-value" value=${prNumber}>
<div>
    <%--banner start--%>
    <div class="swiper-container height-banner slider" id="banner-swiper">
        <div class=" swiper-wrapper height-banner">
            <%--banner2--%>
            <div class="swiper-slide slider2">
                <div class="slider-panel slider-panel2">
                    <div class="banner2-title">
                        <div class="space1 banner-title">专业变配电智能集中运维服务商</div>
                        <div class="space1">倡导·链接·共享 </div>
                    </div>
                </div>
            </div>
            <%--banner3--%>
            <div class="swiper-slide slider3">
                <div class="slider-panel slider-panel3">
                    <div class="dot" style="top:322px;left:361px">
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                    </div>
                    <div class="dot" style="top:453px;left:326px">
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                    </div>
                    <div class="dot" style="top:334px;left:522px">
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                    </div>
                    <div class="dot" style="top:365px;left:601px">
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                    </div>
                    <div class="dot" style="top:470px;left:482px">
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                    </div>
                    <div class="dot" style="top:438px;left:481px">
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                    </div>
                    <div class="dot" style="top:368px;left:609px">
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                    </div>
                    <div class="dot" style="top:368px;left:609px">
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                    </div>

                    <div class="dot" style="top:333px;left:649px">
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                    </div>
                    <div class="dot" style="top:333px;left:649px">
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                    </div>
                    <div class="dot" style="top:331px;left:709px">
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                    </div>
                    <span class="color-dot-yellow dot-text" style="top:370px;left:864px">抢修站</span>
                    <div class="dot" style="top:359px;left:800px">
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                    </div>
                    <div class="dot" style="top:302px;left:968px">
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                    </div>
                    <div class="dot" style="top:300px;left:1070px">
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                    </div>
                    <div class="dot" style="top:133px;left:985px">
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                    </div>
                    <div class="dot" style="top:125px;left:938px">
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                    </div>
                    <div class="dot" style="top:135px;left:938px">
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                    </div>
                    <div class="dot" style="top:434px;left:976px">
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                        <div class="bg-dot-yellow"></div>
                    </div>
                    <div class="dot" style="top:130px;left:434px">
                        <div class="bg-dot-red"></div>
                        <div class="bg-dot-red"></div>
                        <div class="bg-dot-red"></div>
                        <div class="bg-dot-red"></div>
                    </div>
                    <div class="dot" style="top:162px;left:434px">
                        <div class="bg-dot-red"></div>
                        <div class="bg-dot-red"></div>
                        <div class="bg-dot-red"></div>
                        <div class="bg-dot-red"></div>
                    </div>
                    <div class="dot" style="top:437px;left:606px">
                        <div class="bg-dot-red"></div>
                        <div class="bg-dot-red"></div>
                        <div class="bg-dot-red"></div>
                        <div class="bg-dot-red"></div>
                    </div>
                    <span class="color-dot-red dot-text" style="top:408px;left:949px">数据中心</span>
                    <div class="dot" style="top:397px;left:885px">
                        <div class="bg-dot-red"></div>
                        <div class="bg-dot-red"></div>
                        <div class="bg-dot-red"></div>
                        <div class="bg-dot-red"></div>
                    </div>
                    <div class="dot" style="top:155px;left:985px">
                        <div class="bg-dot-blue"></div>
                        <div class="bg-dot-blue"></div>
                        <div class="bg-dot-blue"></div>
                        <div class="bg-dot-blue"></div>
                    </div>
                    <span class="color-dot-blue dot-text" style="top:272px;left:651px">服务站</span>
                    <div class="dot" style="top:261px;left:587px">
                        <div class="bg-dot-blue"></div>
                        <div class="bg-dot-blue"></div>
                        <div class="bg-dot-blue"></div>
                        <div class="bg-dot-blue"></div>
                    </div>
                    <div class="dot" style="top:423px;left:469px">
                        <div class="bg-dot-blue"></div>
                        <div class="bg-dot-blue"></div>
                        <div class="bg-dot-blue"></div>
                        <div class="bg-dot-blue"></div>
                    </div>
                    <div class="dot" style="top:432px;left:756px">
                        <div class="bg-dot-blue"></div>
                        <div class="bg-dot-blue"></div>
                        <div class="bg-dot-blue"></div>
                        <div class="bg-dot-blue"></div>
                    </div>
                    <div class="dot" style="top:366px;left:990px">
                        <div class="bg-dot-blue"></div>
                        <div class="bg-dot-blue"></div>
                        <div class="bg-dot-blue"></div>
                        <div class="bg-dot-blue"></div>
                    </div>

                    <div class="banner3-title">
                        <div class="space1 banner-title">专业运维团队 每天巡检<span class="color-orange-gradient" style="font-size: 36px"> 2 </span>次以上</div>
                        <div class="space1" style="color: #e3e2e2">抢修20分钟直达现场，<span class="color-orange-gradient" style="font-size: 30px"> 2 </span>小时内解决问题</div>
                    </div>
                </div>
            </div>
            <%--banner1--%>
            <div class="swiper-slide slider1 ">
                <div class="slider-panel width-con pointer banner1" id="slider1">
                    <div class="banner1-title ">
                        <div class="space1 banner-title">PB级/月电力数据</div>
                        <div class="spaceLetter">
                            EMS通过专业的巡检PAD和抢修PAD，结合GIS系统、光纤及移动通信网络实现变配电室运维全流程信息化。EDP可以针对每月PB级的电力数据进行多维度模型分析，为用电用户提供各种报表和增值服务。
                        </div>
                    </div>
                    <div class="left-panel left-panel-1" id="left-panel">
                        <div class="banner1-platform-b">
                            <img src="/images/index-banner1-platform-b.png">
                        </div>
                        <div class="banner1-platform-m">
                            <img src="/images/index-banner1-platform-m.png">
                        </div>
                        <div class="banner1-platform-t">
                            <img src="/images/index-banner1-platform-t.png">
                        </div>
                        <div class=" color-blue font26 number">电力数据总量 : <span class="num" id="number"></span></div>
                    </div>
                </div>
            </div>

        </div>
        <div class="swiper-button-prev swiper-button-white hide btn"></div>
        <div class="swiper-button-next swiper-button-white hide btn"></div>
        <%--news--%>
        <div class="news-panel pointer">
            <div class="width-con news-panel-con" style="position: relative;overflow: hidden">
                <div class="width90 inline-block-row color-white" style="overflow: hidden;" id="news-wrap">
                    <c:forEach var="news" items="${news}" varStatus="varStatus">
                    <c:choose>
                    <c:when test="${varStatus.index%2 == 0}">
                        <div class="news-row inline-block-row" style="height: 100%">
                        <div class="width44 ellipsis news-list">
                            <a class="news inline-block-row" href="<%=basePath %>/news.do?id=${news.id}">
                                <div class="news-normal news-icon"></div>
                                <c:choose>
                                    <c:when test="${(news.title).length()>30}">
                                        <div style="font-size: 14px">${news.title.substring(0, 25)}...</div>
                                    </c:when>
                                    <c:otherwise>
                                        <div style="font-size: 14px">${news.title}</div>
                                    </c:otherwise>
                                </c:choose>
                                <div class="news-width30"></div>
                                <div class="date">[ ${news.lastModifyTime.substring(0, 10)} ]</div>
                            </a>
                        </div>
                        <c:if test="${varStatus.last}">
                            </div>
                        </c:if>
                    </c:when>
                    <c:otherwise>
                    <div class="width44 ellipsis news-list">
                        <a class="news inline-block-row" href="<%=basePath %>/news.do?id=${news.id}">
                            <div class="news-normal news-icon"></div>
                            <c:choose>
                                <c:when test="${(news.title).length()>30}">
                                    <div style="font-size: 14px">${news.title.substring(0, 25)}...</div>
                                </c:when>
                                <c:otherwise>
                                    <div style="font-size: 14px">${news.title}</div>
                                </c:otherwise>
                            </c:choose>
                            <div class="news-width30"></div>
                            <div class="date">[ ${news.lastModifyTime.substring(0, 10)} ]</div>
                        </a>
                    </div>
                </div>
                </c:otherwise>
                </c:choose>
                </c:forEach>
            </div>
            <a href="./news-list.do">
                <div style="position: absolute;right: 0;top: 0" class="color-white font14">更多动态 >></div>
            </a>
        </div>

    </div>
    <%--banner end--%>

</div>
<%--section 2 start--%>
<div class="width-con">
    <div class="section2-title section-title-font">
        变配电室运行维护，升级线上线下生命周期
    </div>
    <div class="section2-list">
        <div class="section2-item-box pointer">
            <div class="section2-item-pic box-item flip out">
                <img src="/images/index/chengben_pic.jpg" >
            </div>
            <div class="section2-item box-item flip ">
                <div class="height40"></div>
                <img src="/images/index/opex_icon.png">
                <div class="height30"></div>
                <div class="center section2-item-title" >运维成本降低约50%</div>
                <div class="height15"></div>
                <div class="grey-border center"></div>
                <div class="height12"></div>
                <div class="section2-item-desc">
                    人工巡检需要大量人力资源，电工从业人员连年下降，但人工成本逐年上升。不如电务通远程监控，无人值班少人值守。
                </div>
            </div>

        </div>
        <div class="section2-item-box pointer">
            <div class="section2-item-pic box-item flip">
                <img src="/images/index/yunweizhiliangn_pic.jpg" >
            </div>
            <div class="section2-item box-item flip">
                <div class="height40"></div>
                <img src="/images/index/yunweizhiliang_icon-.png">
                <div class="height30"></div>
                <div class="center section2-item-title" >运维质量提升</div>
                <div class="height15"></div>
                <div class="grey-border center"></div>
                <div class="height12"></div>
                <div class="section2-item-desc">
                    设备带电，人工巡检智能检查表面，内部隐患无法监测预防。不如电务通智能运维，预警报警，提前排除事故减少企业损失。
                </div>
            </div>

        </div>
        <div  class="section2-item-box pointer">
            <div class="section2-item-pic box-item flip ">
                <img src="/images/index/guzhangweixiu_pic.jpg" >
            </div>
            <div class="section2-item box-item flip">
                <div class="height40"></div>
                <img src="/images/index/guzhangweixiu_icon.png">
                <div class="height30"></div>
                <div class="center section2-item-title" >故障维修有保障</div>
                <div class="height15"></div>
                <div class="grey-border center"></div>
                <div class="height12"></div>
                <div class="section2-item-desc">
                    人工模式缺乏专业指导，故障后报修为主，无法自己排除，维修慢，时间成本上升导致企业经济损失。不如电务通即时抢修，20分钟抵达现场，2小时排除故障。
                </div>
            </div>
        </div>
        <div  class="section2-item-box pointer">
            <div class="section2-item-pic box-item flip out ">
                <img src="/images/index/yongdiananquan_pic.jpg" >
            </div>
            <div class="section2-item box-item flip">
                <div class="height40"></div>
                <img src="/images/index/yongdiananquan_icon-.png">
                <div class="height30"></div>
                <div class="center section2-item-title" >用电安全有保障</div>
                <div class="height15"></div>
                <div class="grey-border center"></div>
                <div class="height12"></div>
                <div class="section2-item-desc">
                    35%的掉闸事故系由用户设备故障引起，企业面临高额补偿，设备故障带来的经济损失无法估量。不如电务通专有模式，72项专业化检测标准，全方位监测，打造安全模式。
                </div>
            </div>
        </div>

    </div>
</div>
<div class="height80"></div>
<%--section 2 end--%>

<%--section3 start--%>
    <div class="section3">
        <div class="height70"></div>
        <div class="section3-title ">
            <div class="center section-title-font">强化产品动能，提升服务质量</div>
            <div class="height30 "></div>
            <div class="center section3-title-desc">因为专注 所以专业/7＊24小时实时数据监控/标准化检测72项/精确的事故预警报警/全方位的服务，守护你的每分每秒</div>
        </div>
        <div class="height24"></div>
        <div class="center">
            <img src="/images/index/keshihualiulan.png">
        </div>
    </div>
<%--section3 end--%>

<%--section4 start--%>
    <div class="section4">
        <div class="height60"></div>
        <div class="height8"></div>
        <div class="section-title-font center">
            全维度无遗漏，立体化管理电力运维
        </div>

        <div class="height100"></div>
        <div class="height40"></div>
        <div class="section4-content">

            <div class="content">
                <div class="section4-cover">

                </div>
                <div class="section4-item pointer" style="left: 96px">
                    <div class="item-active">
                        <img src="/images/index/section4-item-01.jpg" >
                        <div class="bottom"></div>
                        <div class="middle"></div>
                        <div class="top "></div>
                    </div>
                </div>
                <div class="section4-item pointer" style="left: 413px">
                    <img src="/images/index/section4-item-02.jpg" >
                    <div class="bottom"></div>
                    <div class="middle"></div>
                    <div class="top "></div>
                </div>
                <div class="section4-item pointer" style="left: 730px">
                    <img src="/images/index/section4-item-03.jpg" >
                    <div class="bottom"></div>
                    <div class="middle"></div>
                    <div class="top "></div>
                </div>
                <div class="section4-item pointer" style="left: 1047px">
                    <img src="/images/index/section4-item-04.jpg" >
                    <div class="bottom"></div>
                    <div class="middle"></div>
                    <div class="top "></div>
                </div>
            </div>
        </div>
    </div>
<%--section4 end--%>

<%--section5 start--%>
    <div>
        <div class="height90"></div>
        <div class="height6"></div>
        <div class="section-title-font center">凝聚资源，长效守护</div>
        <div class="height18"></div>
        <div class="title--desc-font">案例展示&nbsp; <span class="arrow"></span></div>
        <div class="height44"></div>
        <div class="section5-content pointer" id="section5">
            <div id="marquee">
                <dl>
                    <dt>
                        <img src="/images/index/anli_1.jpg">
                        <img src="/images/index/anli_2.jpg">
                        <img src="/images/index/anli_3.jpg">
                        <img src="/images/index/anli_4.jpg">
                        <img src="/images/index/anli_5.jpg">
                        <img src="/images/index/anli_6.jpg">
                        <img src="/images/index/anli_7.jpg">
                        <img src="/images/index/anli_8.jpg">
                        <img src="/images/index/anli_9.jpg">
                        <img src="/images/index/anli_10.jpg">
                        <img src="/images/index/anli_11.jpg">
                        <img src="/images/index/anli_12.jpg">
                        <img src="/images/index/anli_13.jpg">
                        <img src="/images/index/anli_14.jpg">
                        <img src="/images/index/anli_15.jpg">
                    </dt>
                    <dd></dd>
                </dl>
            </div>


            <%--<div class="swiper-container" id="section5-swiper">--%>
                <%--<div class="swiper-wrapper pic-content">--%>
                    <%--<div class="swiper-slide">--%>
                        <%--<img src="/images/index/anli_1.png">--%>

                    <%--</div>--%>
                    <%--<div class="swiper-slide"><img src="/images/index/anli_2.png"></div>--%>
                    <%--<div class="swiper-slide"><img src="/images/index/anli_3.png"></div>--%>
                    <%--<div class="swiper-slide"><img src="/images/index/anli_4.png"></div>--%>
                    <%--<div class="swiper-slide"><img src="/images/index/anli_5.png"></div>--%>
                    <%--<div class="swiper-slide"><img src="/images/index/anli_6.png"></div>--%>
                    <%--<div class="swiper-slide"><img src="/images/index/anli_7.png"></div>--%>
                    <%--<div class="swiper-slide"><img src="/images/index/anli_8.png"></div>--%>
                    <%--<div class="swiper-slide"><img src="/images/index/anli_9.png"></div>--%>
                    <%--<div class="swiper-slide"><img src="/images/index/anli_10.png"></div>--%>
                    <%--<div class="swiper-slide"><img src="/images/index/anli_11.png"></div>--%>
                    <%--<div class="swiper-slide"><img src="/images/index/anli_12.png"></div>--%>
                    <%--<div class="swiper-slide"><img src="/images/index/anli_13.png"></div>--%>
                    <%--<div class="swiper-slide"><img src="/images/index/anli_14.png"></div>--%>
                    <%--<div class="swiper-slide"><img src="/images/index/anli_15.png"></div>--%>
                <%--</div>--%>
            <%--</div>--%>
        </div>

    </div>

<%--section5 end--%>

<%--section6 start--%>
    <div class="section6">
    <div class="height90"></div>
    <div class="height5"></div>
    <div class="section-title-font center">凝聚资源，长效守护</div>
    <div class="height20"></div>
    <div class="title--desc-font">合作伙伴展示&nbsp; <span class="arrow"></span></div>
    <div class="height100"></div>
    <div class="center">
        <img src="/images/index/hezuohuoban.png" >
    </div>
</div>
<%--section6 end--%>
<div class="height50"></div>
<div class="height8"></div>


<%@ include file="./common/footer.jsp" %>
<script src="<%=basePath %>/lib/jquery.min.js"></script>
<script src="<%=basePath %>/lib/swiper-3.4.2.min.js"></script>
<script src="<%=basePath %>/js/common.js"></script>
<script src="<%=basePath %>/js/index.js"></script>
</body>
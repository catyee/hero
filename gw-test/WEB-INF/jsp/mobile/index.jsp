
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
    <link rel="stylesheet" href="<%=basePath %>/css/mobile/index.css">
    <link rel="stylesheet" href="<%=basePath%>/lib/swiper-3.4.2.min.css">
</head>
<body>
    <%@ include file="common/header.jsp" %>
    <input type="hidden" id="cus-value" value=${cusNumber}>
    <input type="hidden" id="pr-value" value=${prNumber}>
    <div class="container">
        <%--banner--%>
        <div class="swiper-container banner-con">
            <div class="swiper-wrapper ">
                <%--banner1--%>
                <div class="swiper-slide index-banner1 slider">
                    <div class="count-con">
                        <%--<div class="count">--%>
                            <%--<div class="user">--%>
                                <%--<div class="user-wrap">--%>
                                    <%--<img src="<%=basePath %>/images/mobile/index/rectangle.png">--%>
                                    <%--<div class="user-text color-blue user-number cusNumber"></div>--%>
                                <%--</div>--%>
                                <%--<div class="user-light">--%>
                                    <%--<div class="height9"></div>--%>
                                    <%--<div class="color-white count-title">全国用户</div>--%>
                                    <%--<img src="<%=basePath %>/images/mobile/index/light.png">--%>
                                <%--</div>--%>

                            <%--</div>--%>
                            <%--<div class="count-space"></div>--%>
                            <%--<div class="user">--%>
                                <%--<div class="user-wrap">--%>
                                    <%--<img src="<%=basePath %>/images/mobile/index/rectangle.png">--%>
                                    <%--<div class="user-text color-blue prNumber "></div>--%>
                                <%--</div>--%>
                                <%--<div class="user-light">--%>
                                    <%--<div class="height9"></div>--%>
                                    <%--<div class="color-white count-title">全国配电室</div>--%>
                                    <%--<img src="<%=basePath %>/images/mobile/index/light.png">--%>
                                <%--</div>--%>

                            <%--</div>--%>
                        <%--</div>--%>

                    </div>
                    <img src="<%=basePath %>/images/mobile/index/banner1.png">
                    <div class="total-count">
                        <div class="total-count-desc color-blue">电力数据总量</div>
                        <div class="height7"></div>
                        <div class="total-count-text color-blue num">1111111111</div>
                    </div>
                </div>
                <%--banner2--%>
                <div class="swiper-slide index-banner2 slider">
                    <img src="<%=basePath %>/images/mobile/index/banner2.png">
                </div>
                <%--banner3--%>
                <div class="swiper-slide index-banner3 slider">
                    <img src="<%=basePath %>/images/mobile/index/banner3.png">
                </div>
            </div>
            <%--news--%>
            <a href="./news-list.do">
                <div class="news-panel">

                    <div class="news-panel-con" style="position: relative;overflow: hidden">
                        <c:forEach var="news" items="${news}" varStatus="varStatus" >
                            <div class="news-list">
                            <span class="news-icon">
                                <img src="<%=basePath %>/images/mobile/index/news-normal.png">
                              </span>
                                <span class="ellipsis news ">${news.title}</span>
                                <span class="news-date noWrap">[ ${news.lastModifyTime.substring(0, 10)} ]</span>
                            </div>
                        </c:forEach>
                    </div>

                </div>
            </a>

        </div>
        <%--tech--%>
        <div class="height-tech"></div>
        <div class="tech-title">
            <span>先进的分布式互联网计算技术</span>
        </div>
        <div class="height-tech"></div>
        <div class="tech-list-con ">
            <div class="tech-list bg-active cloud-computing-list ">
                <div class="tech-list-left">
                    <div class="icon-bg">
                        <span class="cloud-computing cloud-computing-icon  tech-icon-font"></span>
                    </div>
                    <span class="tech-list-text">云计算</span>
                </div>
                <span class="tech-arrow show-detail"></span>
            </div>
            <div class="tech-list-detail hide">
                <div class="height-tech-detail-space1"></div>
                <p>移动互联网/物联网/大数据</p>
                <div class="height-tech-detail-space1"></div>
                <p>智能化/信息化</p>
                <div class="height-tech-detail-space2"></div>
            </div>
        </div>
        <div class="height-techlist-space"></div>
        <div class="tech-list-con">
            <div class="tech-list bg-active BGS-list">
                <div class="tech-list-left">
                    <div class="icon-bg">
                        <span class="BGS tech-icon-font BGS-icon"></span>
                    </div>
                    <span class="tech-list-text">大数据分析</span>
                </div>
                <span class="tech-arrow show-detail"></span>
            </div>
            <div class="tech-list-detail hide">
                <div class="height-tech-detail-space1"></div>
                <p>实时数据/实时报警/实时预警</p>
                <div class="height-tech-detail-space1"></div>
                <p>高频次/智能/稳定</p>
                <div class="height-tech-detail-space2"></div>
            </div>

        </div>
        <div class="height-techlist-space"></div>
        <div class="tech-list-con">
            <div class="tech-list bg-active IOM-list">
                <div class="tech-list-left">
                    <div class="icon-bg">
                        <span class="IOM tech-icon-font IOM-icon"></span>
                    </div>
                    <span class="tech-list-text">智能运维</span>
                </div>
                <span class="tech-arrow show-detail"></span>
            </div>
            <div class="tech-list-detail hide">
                <div class="height-tech-detail-space1"></div>
                <p>运维安全/7*24小时/无人值守</p>
                <div class="height-tech-detail-space1"></div>
                <p>巡检/抢修/实时监测</p>
                <div class="height-tech-detail-space2"></div>
            </div>

        </div>
        <div class="height-techlist-space"></div>
        <div class="tech-list-con">
            <div class="tech-list bg-active DATA-SERVICE-list">
                <div class="tech-list-left">
                    <div class="icon-bg">
                        <span class="DATA-SERVICE tech-icon-font DATA-SERVICE-icon"></span>
                    </div>
                    <span class="tech-list-text">数据服务</span>
                </div>
                <span class="tech-arrow show-detail"></span>
            </div>
            <div class="tech-list-detail hide">
                <div class="height-tech-detail-space1"></div>
                <p>超大规模时序数据/PB级电力数据</p>
                <div class="height-tech-detail-space1"></div>
                <p>提供电力报表/增值服务</p>
                <div class="height-tech-detail-space2"></div>
            </div>

        </div>
        <%--data-service--%>
        <div class="height-tech"></div>
        <div class="tech-title">
            <span>超大规模时序数据存储方案</span>
        </div>
        <div class="height-tech"></div>
        <div class="height-data-service-space1 bg-white"></div>
        <div class="data-service-pic bg-white">
            <img src="<%=basePath %>/images/mobile/index/data-service-pic.png">
        </div>
        <div class="height-data-service-space1 bg-white"></div>
        <p class="data-service-text bg-white">
            IEMS系统整体架构由10多年互联网从事经验资深首席架构团队进行设计，采用目前稳定并先进的分布式互联网云计算技术，实现了业务流程的分布式高吞吐量响应和超大规模时序数据存储方案。
        </p>
        <div class="height-data-service-space1 bg-white"></div>
        <%--PB--%>
        <div class="height-tech"></div>
        <div class="tech-title">
            <span>PB级/月的电力数据</span>
        </div>
        <div class="height-tech"></div>
        <div class="height-data-service-space1 bg-white"></div>
        <div class="data-service-pic bg-white PB-pic">
            <img src="<%=basePath %>/images/mobile/index/PB-pic.png">
        </div>
        <div class="height-data-service-space1 bg-white"></div>
        <p class="data-service-text bg-white">
            IEMS通过专业的巡检PAD和抢修PAD，结合GIS系统、光纤及移动通信网络实现变配电室运维全流程信息化。EDP可以针对每月PB级的电力数据进行多维度模型分析，为用电用户提供各种报表和增值服务。
        </p>
        <div class="height-data-service-space1 bg-white"></div>
        <div class="height-tech"></div>
        <div class="height-tech"></div>
        <%--moniter--%>
        <div class="moniter-panel">
            <div class="moniter-title color-white">在云端7*24小时监测你的业务</div>
            <div class="moniter-pic">
                <img src="<%=basePath %>/images/mobile/index/moniter-pic.png">
            </div>
        </div>
        <%--paterner--%>
        <div class="height-tech"></div>
        <div class="tech-title">
            <span>合作伙伴</span>
        </div>
        <div class="height-tech"></div>
        <div class="paterner-pic">
            <img src="<%=basePath %>/images/mobile/index/paterner-pic.png">
        </div>
        <div class="height20"></div>
    </div>

    <%@ include file="common/footer.jsp" %>
    <script src="<%=basePath %>/lib/swiper-3.4.2.min.js"></script>
    <script src="<%=basePath %>/js/mobile/index.js"></script>
</body>
</html>

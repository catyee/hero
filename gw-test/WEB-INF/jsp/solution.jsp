<%--
  电务通解决方案
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
    <link rel="stylesheet" href="/css/solution.css">

</head>
<body>
<%@ include file="./common/header.jsp"%>
<div class="solution-banner">
    <div class="container">
        <div class="title-con">
            <div class="height150"></div>
            <div class="title">
                智能化概念引入电力运维领域为客户带来怎样的变化
            </div>
            <div class="height35"></div>
            <div class="sub-title color-white font14">
                电务云服务主要通过提炼检测与运营方面的共同点，形成统一的客户、数据分析、运维、报表等管理模式和企业标准，通过打造综合运营服务平台，将地理信息、环境、系统、报警、设施管理等多种业务，凝聚在一个统一的系统平台上，在庞大的业务范围内实现集中统一管理，为用户提供统一的网上门户及掌上门户，实现对用户数据的信息化、业务流程的信息化和决策的信息化。
            </div>
        </div>
        <div class="legend">
            <div class="height50"></div>
            <img src="/images/solution/banner-pic.png">
        </div>
    </div>
</div>

<div class="container">
    <div class="height70"></div>
    <div class="center font20">调整电力运维的异构化与复杂化为客户节约人力、时间成本</div>
    <div class="height30"></div>
    <div class="center font14 color-gray">
        电务通电力运维模式致力于为用户提供从规划、设计、施工、监测、数据分析、运营维护一站式技术支持和系统服务立足于电力运维行业。
    </div>
    <div class="height50"></div>
    <div class="center">
        <img src="<%=basePath %>/images/solution/services.png">
    </div>
    <div class="height50"></div>
</div>

<div class="big-screen">
    <div class="container">
        <div class="height45"></div>
        <div class="center font20 color-white">大屏监控中心分布</div>
        <div class="height25"></div>
        <div class="center font14" style="color: #cccccc">
            电务云服务主要通过提炼检测与运营方面的共同点，形成统一的客户、数据分析、运维、报表等管理模式和企业标准，通过打造 综合运营服务平台，将地理信息、环境、系统、报警、设施管理等多种业务，凝聚在一个统一的系统平台上。
        </div>
        <div class="height30"></div>
        <div class="center">
            <img src="/images/solution/big-screen.png">
        </div>
        <div class="height10"></div>
    </div>
</div>


<div style="background:#f4f4f4">
    <div class="container">
        <div class="height45"></div>
        <div class="center font20">大屏监控中心分布</div>
        <div class="height25"></div>
        <div class="center font14 color-gray">
            基于供电可靠性的、经标准化处理的线下巡视和检修作业流程被植入具有GIS功能的手持电脑。作业任务和进度实时推送，前端执行和后端技术监管人员共享信息,用户随时了解变电室运行、检修情况。强大的线上数据与线下专业团队支持，以及在线的备件供应功能，使一般故障恢复时间不超过2小时。
        </div>
        <div class="height30"></div>
        <div class="buttons">
            <button index="3" class="active">电务通APP登录页</button>
            <button index="2">功能操作页</button>
            <button index="1">历史数据</button>
            <button index="0">实时数据</button>
            <button index="4">对比分析</button>
            <button index="5">分时分析</button>
        </div>

        <div class="height50"></div>
        <div class="pages" id="pages">
            <div class="item left" index="0" n="1">
                <img src="/images/solution/page-0.jpg">
            </div>
            <div class="item left" index="1" n="2">
                <img src="/images/solution/page-1.jpg">
            </div>
            <div class="item left" index="2" n="3">
                <img src="/images/solution/page-2.jpg">
            </div>
            <div class="item center" id="center" index="3" n="4">
                <img src="/images/solution/page-3.jpg">
            </div>
            <div class="item right" index="4" n="5">
                <img src="/images/solution/page-4.jpg">
            </div>
            <div class="item right" index="5" n="6">
                <img src="/images/solution/page-5.jpg">
            </div>

        </div>

        <div class="app-desc">

            <div class="desc center none" index="0">
                <div class="title font16">24h远程实时监控</div>
                <div class="content font14 color-gray">每天52至73项标准化内容检测，实时监控。人员、设备、安全事故处理风险降低。</div>
            </div>

            <div class="desc center none" index="1">
                <div class="title font16">历史数据浏览</div>
                <div class="content font14 color-gray">随时查阅线下巡检日志、检修记录、操作票、工作票，提供导出月报，年报等服务。</div>
            </div>

            <div class="desc center none" index="2">
                <div class="title font16">实现联动运营</div>
                <div class="content font14 color-gray">在运维过程中记录海量数据，利用大数据分析、挖掘、清洗、脱敏等处理手段，将数据封装为服务，实现大数据应用领域的拓展和商业模式的创新，真正实现联动运营。</div>
            </div>

            <div class="desc center" index="3">
                <div class="title font16">基于Android与IOS移动APP应用服务</div>
                <div class="content font14 color-gray">可提供运维工作记录查询、跟踪及反馈等功能服务。</div>
            </div>

            <div class="desc center none" index="4">
                <div class="title font16">对比分析</div>
                <div class="content font14 color-gray">可进行电量系统分析、同比环比、为生产规划提供参考和依据。 </div>
            </div>

            <div class="desc center none" index="5">
                <div class="title font16">分时分析</div>
                <div class="content font14 color-gray">可进行电量系统分析、尖峰谷平、环境参数监测、电能质量监测分析、操作及事件记录。 </div>
            </div>
        </div>

    </div>
    <div class="height40"></div>
</div>

<div class="height40"></div>

<%@ include file="./common/footer.jsp"%>
<script src="<%=basePath %>/lib/jquery.min.js"></script>
<script src="<%=basePath %>/js/common.js"></script>
<script src="<%=basePath %>/js/solution.js"></script>
<script>
    $('.nav-list li a').removeClass(' nav-border-yellow');
    $('.nav-list .nav-solution a').addClass(' nav-border-yellow');
</script>
</body>

<%--
  关于我们
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
    <link rel="stylesheet" href="/css/about.css">

</head>
<body>
<%@ include file="./common/header.jsp"%>
<div class="about-banner">
    <div class="banner-inner">
    <div class="banner-content">
            <div>
                电务通能源针对我国变配电设施，自主研发远程监控系统，该系统是通过安装在现场的智能硬件设备将变配电设施运行状态、数据、温度、视频等能源信息上传至云平台，并在监控中心对其进行24小时远程监控，在能源数据采集的基础上，配合线下自主研发的运维系统，将线下人工运维情况智能化、标准化，对巡检记录、工作票内容、抢修调度、备品备件管理等运维必要数据，进行线上管理和存储，真正实现全面智能化、可视化的能源管理。该平台可同时监控成百上千家用户，做到线上集约化管理，线下科学标准化运维，实现绿色低碳发展。
            </div>
        </div>
    </div>
</div>

<div style="background: #fafafa">
    <div class="container center">
        <div class="height65"></div>
        <div class="center font20">企业文化</div>
        <div class="height20"></div>
        <div class="culture-content">
            <span>使命，以创新、安全为核心与通过精细化运营数据价值服务，打造全新电力运维模式，帮助客户提升经济效益和运行效率，引领中国能源行业管理创新。</span>
            <span>愿景，致力于成为国内知名、国际领先的大型电力运维和数据服务解决方案供应商。</span>
            <span>核心价值观，倡导、链接、共享。</span>
        </div>
        <div class="height40"></div>
        <img src="/images/about-culture.png" class="culture-pic">
    </div>
    <div class="height45"></div>
</div><!--企业文化-->

<div class="culture">
    <div class="container center">
        <div class="height65"></div>
        <div class="center font20">组织构架</div>
        <div class="height40"></div>
        <img src="/images/about-structure.png" >
        <div class="height20"></div>
        <div class="height100"></div>
    </div>
</div></div><!--组织构架-->


<div class="service">
    <div class="container center">
        <div class="height65"></div>
        <div class="center font20">四“心”级服务</div>
        <div class="height40"></div>
        <div class="service-con">
            <div>
                <img id="service-pic" src="/images/about-service-0.png">
            </div>
            <div>

                <div class="service-item active">
                    <span class="font18">放心服务:</span>
                    <span class="font14">7×24小时线上监控，线下每天52项、每周73项标准化检测，精确的预警报警。</span>
                </div>

                <div class="service-item">
                    <span class="font18">贴心服务:</span>
                    <span class="font14">24小时单一入口客服专员，提供全系列的应急预案和保障，随时随地的贴心服务。</span>
                </div>

                <div class="service-item">
                    <span class="font18">安心服务:</span>
                    <span class="font14">全方位的巡检、专业化的抢修，设备、零部件集成化管理，快速及时的安心服务。</span>
                </div>

                <div class="service-item">
                    <span class="font18">舒心服务:</span>
                    <span class="font14">一体化操作流程，一站式优质服务，一系列规范标准，化繁为简的管理模式。</span>
                </div>

            </div>
        </div>
    </div>
</div></div><!--组织构架-->


<div class="height45"></div>




<div class="height40"></div>

<%@ include file="./common/footer.jsp"%>
<script src="<%=basePath %>/lib/jquery.min.js"></script>
<script src="<%=basePath %>/js/common.js"></script>
<script>
    $(function () {

    	$(".service-item").click(function () {

    		var index = $(this).index();

    		$(".service-item").removeClass('active');

    		$(this).addClass('active');

    		$("#service-pic").attr('src', '/images/about-service-'+ index +".png");

		})

        $('.nav-list li a').removeClass(' nav-border-yellow');
        $('.nav-list .nav-about a').addClass(' nav-border-yellow');

	})
</script>
</body>

<%--
  关于我们
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
    <meta http-equiv="Cache-Control" content="no-siteapp" />
    <%@ include file="common/common.jsp" %>
    <title><%=title %></title>
    <link rel="stylesheet" href="./css/mobile/about.css">

</head>
<body>
<%@ include file="common/header.jsp" %>
<div class="about-banner">
    <img src="./images/mobile/about-banner.png" class="width100">
</div>


<div class="padding1">

    <div class="title">增值服务</div>
    <div class="height10"></div>
    <div class="value-added-service">
        <div class="service">
            <div class="service-head bg-active">
                <div class="icon"></div>
                <div class="name">用电服务</div>
                <div class="arrow"></div>
            </div>
            <div class="height13"></div>
            <div class="service-body">
                <div class="content">
                    <div>用电服务</div>
                    <div>清扫、传动、试验</div>
                    <div>多能源融合分析</div>
                    <div>解决方案</div>
                </div>

                <div class="overlay">

                    <div class="font10">能源综合管理</div>
                    <div class="font8">为用户提供“新增、增容与变更用电、减容”等能源综合服务。</div>

                    <div class="height10"></div>
                    <div class="font10">清扫、传动、试验</div>
                    <div class="font8">为用户提供大清扫、传动、试验服务。</div>

                    <div class="height10"></div>
                    <div class="font10">多能源融合分析</div>
                    <div class="font8">提供多能源融合分析服务。</div>

                    <div class="height10"></div>
                    <div class="font10">解决方案</div>
                    <div class="font8">提供咨询，解决方案等多种服务。</div>

                </div>
            </div>
        </div>

        <div class="service">
            <div class="service-head  bg-active">
                <div class="icon"></div>
                <div class="name">需求侧管理服务</div>
                <div class="arrow"></div>
            </div>
            <div class="height13"></div>
            <div class="service-body">
                <div class="content">
                    <div>开源</div>
                    <div>节流</div>
                </div>

                <div class="overlay">

                    <div class="font10">开源</div>
                    <div class="font8">新能源接入，提升用电质量、可靠性，实现低成本用电。</div>

                    <div class="height10"></div>
                    <div class="font10">节流</div>
                    <div class="font8">通过对用户侧的电力仪表等设备进行实时数据采集和监控，根据用电状态，通过策略控制实现需求侧管理。</div>

                </div>
            </div>
        </div>

        <div class="service">
            <div class="service-head  bg-active">
                <div class="icon"></div>
                <div class="name">集中售电服务</div>
                <div class="arrow"></div>
            </div>
            <div class="height13"></div>
            <div class="service-body">
                <div class="content">
                    <div>负载曲线</div>
                    <div>负荷叠加</div>
                    <div>代理售电</div>
                </div>
                <div class="overlay">
                    <div class="font10">负载曲线 负荷叠加 代理售电</div>
                    <div class="font8">通过把多个用户的负荷叠加起来，得到一个较为稳定的负载曲线，代表用户跟发电企业签署合同，进行代理售电。</div>
                </div>
            </div>
        </div>

        <div class="service  bg-active">
            <div class="service-head  bg-active">
                <div class="icon"></div>
                <div class="name">合同能源服务</div>
                <div class="arrow"></div>
            </div>
            <div class="height13"></div>
            <div class="service-body">
                <div class="content">
                    <div>能源审计</div>
                    <div>改造方案设计</div>
                    <div>基础设施</div>
                    <div>项目运营管理和维护</div>
                </div>
                <div class="overlay">
                    <div class="font10">能源审计</div>
                    <div class="font9">提供节能咨询服务，提供能源审计服务，出具能源审计报告。</div>

                    <div class="height10"></div>
                    <div class="font10">改造方案设计</div>
                    <div class="font9">提供项目建议书，负责改造方案设计。</div>

                    <div class="height10"></div>
                    <div class="font10">基础设施</div>
                    <div class="font9">提供项目融资、施工、设备安装、调试和人员培训服务。</div>

                    <div class="height10"></div>
                    <div class="font10">项目运营管理和维护</div>
                    <div class="font9">提供项目运行管理和维护等服务。</div>
                </div>
            </div>
        </div>
    </div>
</div><!--增值服务-->

<div class="padding1">
    <div class="title">特色服务</div>
    <div class="height10"></div>
    <img src="images/mobile/special-service.png" class="width100"/>
</div><!--特色服务-->

<div class="padding1 bg-white">
    <div class="height15"></div>
    <div class="center font14">为什么加入我们</div>
    <div class="height10"></div>

    <div class="center">
        <img src="images/mobile/common-logo.png" class="width18">
    </div>

    <div class="font12">
        <div class="height10"></div>
        <div class="indent">
            北京电务通能源股份有限公司注册于北京经济技术开发区。一家致力于使全国大多数用户变配电设施实现“低碳运维”的国家级高新技术企业。基于创始人在中国20多年的变配电设施运维服务经验。于2013年开始自主创新，在原有服务实践的基础上，研发并部署了具有自主知识产权的“变电设施运维支持系统EMS”和”基于海量用户用电大数据的数据分析系统EDP”。
        </div>
        <div class="height10"></div>
        <div class="indent"> 我们的核心理念是“倡导，链接，共享”，着力于“现代电力运维和数据服务”产业整合者的角色定位，力争在5年内成为国内最优秀的“电力运维和数据服务解决方案供应商”。</div>
    </div>
    <div class="height15"></div>
</div>

<div class="padding1">
    <div class="reason">
        <div class="reason-header ">
            <div class="icon"></div>
            <div class="center font14">共享数据</div>
        </div>

        <div class="reason-detail">
            依托云计算互联网数据传输
        </div>
        <div class="reason-detail">
            共享智能电网系统软硬件等电力运维大数据
        </div>
        <div class="reason-detail">
            降低成本
        </div>
        <div class="reason-detail">
            提升经济效益
        </div>
        <div class="height5"></div>
    </div>

    <div class="reason">
        <div class="reason-header">
            <div class="icon"></div>
            <div class="center font14">深度合作</div>
        </div>

        <div class="height15"></div>

        <div class="reason-detail font12">
            辅助运维管理人员提升配电室安全管理水平
        </div>
        <div class="reason-detail font12">
            降低用电费用
        </div>

        <div class="reason-detail font12">
            减少管理成本
        </div>
        <div class="reason-detail font12">
            使客户省时、省心、省力
        </div>
        <div class="height5"></div>
    </div>

    <div class="reason">
        <div class="reason-header">
            <div class="icon"></div>
            <div class="font14">企业用电生态网</div>
        </div>

        <div class="height15"></div>
        <div class="reason-detail font12">
            企业数据互通
        </div>

        <div class="reason-detail font12">
            形成互联网企业用电生态网
        </div>
        <div class="height5"></div>
    </div>
</div>

<div class="height10"></div>
<%@ include file="common/footer.jsp" %>
</body>
<script src="./lib/jquery.min.js"></script>
<script src="./js/mobile/about.js"></script>
</html>
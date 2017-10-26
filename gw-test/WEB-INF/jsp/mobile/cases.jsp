<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>

<head lang="en">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="format-detection" content="telephone=no">
    <meta name="renderer" content="webkit">
    <meta http-equiv="Cache-Control" content="no-siteapp" />
    <link rel="stylesheet" href="./lib/swiper-3.4.2.min.css">
    <link rel="stylesheet" href="./css/mobile/cases.css">
    <%@ include file="common/common.jsp" %>
    <title>
        <%=title %>
    </title>
</head>

<body>
    <%@ include file="common/header.jsp" %>
    <div class="banner">
        <img class="banner-background" src="./images/mobile/cases-banner-bg.png" />
    </div>
    <div class="case-icons">
        <div class="icon-class">
            <img src="./images/mobile/icon-car.png" />
            <span>汽车交通</span>
        </div>
        <div class="icon-class">
            <img src="./images/mobile/icon-medicine.png" />
            <span>科研/医疗/卫生</span>
        </div>
        <div class="icon-class">
            <img src="./images/mobile/icon-land.png" />
            <span>企业及商业地产</span>
        </div>
        <div class="icon-class">
            <img src="./images/mobile/icon-edu.png" />
            <span>文化教育</span>
        </div>
        <div class="icon-class">
            <img src="./images/mobile/icon-data.png" />
            <span>数据中心</span>
        </div>
    </div>
    <div class="title bg-gray-a">
        <div class="bar bg-yellow"></div>
        <span>汽车交通</span>
    </div>
    <div id="car-case" class="cases-show">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="case-container">
                        <span class="case-title">北京海纳川汽车部件股份有限公司配电室智能运维</span><br/>
                        <span class="case-content">海纳川公司旗下目前拥有20余家零部件企业。其中有与世界500强以及国际知名零部件供应商江森、德尔福、李尔、伟世通、博格华纳、天纳克等公司共同设立的中外合资企业。该项目2个配电室，总用电量5200KVA，目前已经投入使用。我公司可根据客户用电量和稳定性的要求，根据汽车企业生产线的特点制定能源解决方案，并对电力的稳定性提供保障。</span><br/>
                        <img class="case-img" src="./images/mobile/car-case-1.png" />
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="case-container">
                        <span class="case-title">北京奔驰零部件产业园配电室工程</span><br/>
                        <span class="case-content">北京海纳川汽车部件股份有限公司主要从事奔驰汽车零部件生产业务，项目总用电6800KVA，临电800KVA，7公里外电源。2公里园区管井线路于2014年12月发电投入使用。该工程临电、永久电报装、方案、审图、施工供电均由我公司完成。后期将由我公司安排配电室升级改造，实现无人值班配电室，智能控制能源消耗，减少甚至消除因突然停电引发风险。</span><br/>
                        <img class="case-img" src="./images/mobile/car-case-2.png" />
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="case-container">
                        <span class="case-title">北汽光华汽车零部件配电室工程</span><br/>
                        <span class="case-content">北汽光华汽车部件有限公司是北京地区最大的汽车零配件供应商之一，属于新能源汽车生产基地。项目用电4000KVA，临时用电400KVA。中港世能承揽此项目的临时与永久用电工程，于2013年7月发电投入使用。设备通入运营后一直运转正常，但为了进一步追求节能减排的目标，京能世纪物联网开发，世能电务进行运营的智能配电室业务，以求在激烈竞争中能够通过成本控制，扩大竞争优势。</span><br/>
                        <img class="case-img" src="./images/mobile/car-case-3.png" />
                    </div>
                </div>
            </div>
        </div>
        <!-- 分页器 -->
        <div class="swiper-pagination"></div>
    </div>
    <div class="title bg-gray-a">
        <div class="bar bg-yellow"></div>
        <span>文化教育</span>
    </div>
    <div id="edu-case" class="cases-show">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="case-container">
                        <span class="case-title">四达时代软件技术股份有限公司软件园配电室工程</span><br/>
                        <span class="case-content">北京四达时代软件园是北京亦庄经济开发区国家认定的高新技术企业和国家文化出口重点企业，项目总用电5700KVA，于2012年9月发电投入使用。四达时代已经采用我公司智能运维系统，目前已经开始采集原始数据，并就配电室运维情况进行跟踪，不久就会产生节能效益。</span><br/>
                        <img class="case-img" src="./images/mobile/edu-case-1.png" />
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="case-container">
                        <span class="case-title">北京大学勺园配电室项目</span><br/>
                        <span class="case-content">北京大学勺园的曾是明代著名书法家米万钟的府第。清乾隆年间，改名为弘雅园，是英王二世的使者马戈尔尼居住的地方。因此，勺园也成为中国最早接待外国使团的场地。现在的勺园包括留学生的公寓和配套设施。中港世能承建了勺园的配电室项目，因为勺园承担了很多综合性能的服务功能，对用电需求差异化较大。如果使用世能电务的智能代维系统，可以有效减少值班室工作人员，降低管理成本，同时能够保证用电安全可靠。</span><br/>
                        <img class="case-img" src="./images/mobile/edu-case-2.png" />
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="case-container">
                        <span class="case-title">鸿坤体育公园</span><br/>
                        <span class="case-content">鸿坤体育公园地处北京大兴，位于国门商务区核心，集合了体育场馆、户外活动区、训练中心、运动娱乐、游泳中心、运动主题餐饮、体育用品销售等功能区域，旨在打造北京最值得期待的运动主题公园。鸿坤体育公园占地约23728平方米，中港世能为该公园提供了电力施工服务，后续预计配套配电室运维。</span><br/>
                        <img class="case-img" src="./images/mobile/edu-case-3.png" />
                    </div>
                </div>
            </div>
        </div>
        <!-- 分页器 -->
        <div class="swiper-pagination"></div>
    </div>
    <div class="title bg-gray-a">
        <div class="bar bg-yellow"></div>
        <span>企业及商业地产</span>
    </div>
    <div class="case-landscape">
        <a href="./casesdetail.do"><img class="case-landscape-img" src="./images/mobile/land-case-1.png"/></a>
        <a href="./casesdetail.do"><img class="case-landscape-img" src="./images/mobile/land-case-2.png"/></a>
        <a href="./casesdetail.do"><img class="case-landscape-img" src="./images/mobile/land-case-3.png"/></a>
        <a href="./casesdetail.do"><img class="case-landscape-img" src="./images/mobile/land-case-4.png"/></a>
    </div>
    <div class="title bg-gray-a">
        <div class="bar bg-yellow"></div>
        <span>科研/医疗/卫生</span>
    </div>
    <div id="medicine-case" class="cases-show">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="case-container">
                        <span class="case-title">拜耳药业保健有限公司配电室工程运维项目</span><br/>
                        <span class="case-content">拜耳药业位于北京亦庄经济开发区荣京东街7号，是世界非处方药三强企业。该项目用电总量4800KVA。于2012年9月发电投入使用。 医药企业对温湿度要求严格，重要仪器设备不可断电。根据这些特点，世能电务专门制定一套适合医药企业用电需求的方案，该方案可解决重要试验设备安全运转，冷冻储藏装置平稳运行。</span><br/>
                        <img class="case-img" src="./images/mobile/medicine-case-1.png" />
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="case-container">
                        <span class="case-title">北京杰富瑞科技有限公司配电室工程</span><br/>
                        <span class="case-content">北京杰富瑞科技有限公司拥有中国、美国和德国三个研发中心，多年来一直从事和研究与睡眠呼吸相关的研发，是全球领先的呼吸机和睡眠诊断产品与服务的供应商。 世能电务可以为杰富瑞提供智能的能源管理系统服务，为用户合理用电、用好电提供可靠的数据支撑。并在此基础上提出专业的配电改造意见，为节能减排提供可靠保障。</span><br/>
                        <img class="case-img" src="./images/mobile/medicine-case-2.png" />
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="case-container">
                        <span class="case-title">赛升药业有限公司工程</span><br/>
                        <span class="case-content">北京赛升药业成立于1999年，是一家专注于研发、生产、销售生物药物的高新技术企业。为保证只要企业用电环境，世能电务借助各种信息传感技术将配电设备相关信息聚合到统一的信息网络中，实现运行监控，利用云计算、大数据挖掘和分析、融合、处理，最终实现各种电力设备的互联互通、运行抢修应急指挥、能源的合理调配。</span><br/>
                        <img class="case-img" src="./images/mobile/medicine-case-3.png" />
                    </div>
                </div>
            </div>
        </div>
        <!-- 分页器 -->
        <div class="swiper-pagination"></div>
    </div>
    <div class="title bg-gray-a">
        <div class="bar bg-yellow"></div>
        <span>数据中心</span>
    </div>
    <div id="data-case" class="cases-show">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="case-container">
                        <img class="case-img-large" src="./images/mobile/data-case-1.png" />
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="case-container">
                        <img class="case-img-large" src="./images/mobile/data-case-2.png" />
                    </div>
                </div>
            </div>
        </div>
        <!-- 分页器 -->
        <div class="swiper-pagination swiper-pagination-above"></div>
    </div>
    <%@ include file="common/footer.jsp" %>
    <script src="./lib/jquery.min.js"></script>
    <script src="./lib/swiper-3.4.2.min.js"></script>
    <script src="./js/mobile/cases.js"></script>
</body>
</html>
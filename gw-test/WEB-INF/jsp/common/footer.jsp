<%--
    尾部
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="footer">
    <div class="footer-con width-con">
        <div class="height60"></div>
        <div class="footer-list">
            <div class="font12 footer-item">
                <div><a href="javascript:;" class="font14">联系我们</a></div>
                <div class="height28"></div>
                <div><a href="./contact.do">在线咨询</a></div>
                <div class="height17"></div>
                <div><a href="http://edp.dianwutong.com">申请试用</a></div>
                <div class="height17"></div>
                <div><a href="mailto://developer@dianwutong.com">开发者邮箱</a></div>
            </div>
            <div class="font12 footer-item">
                <div><a href="javascript:;" class="font14">快速入口</a></div>
                <div class="height28"></div>
                <div><a href="javascript:;" title="研发中">售电系统</a></div>
                <div class="height17"></div>
                <div><a href="http://edp.dianwutong.com">EDP系统</a></div>
                <div class="height17"></div>
                <div><a href="http://erp.dianwutong.com">ERP系统</a></div>
                <div class="height17"></div>
                <div><a href="javascript:;">企业邮箱 </a></div>
            </div>
            <div class="font12 footer-item">
                <div><a href="javascript:;" class="font14">服务支持</a></div>
                <div class="height28"></div>
                <div><a href="./solution.do">服务介绍</a></div>
                <div class="height17"></div>
            </div>
            <div class="font12 footer-item">
                <div><a href="javascript:;" class="font14">合作伙伴</a></div>
                <div class="height28"></div>
                <div><a href="http://www.sino-hk.net/">中港世能</a></div>
                <div class="height17"></div>
                <div><a href="javascript:;">服务特点</a></div>
            </div>
            <div class="font12 footer-item">
                <div><a href="javascript:;" class="font14">关于电务通</a></div>
                <div class="height28"></div>
                <div><a href="javascript:;">电务通App</a></div>
                <div class="height17"></div>
                <div><a href="javascript:;">手机官网</a></div>
                <div class="height17"></div>
                <div><a href="javascript:;">微博</a></div>
                <div class="height17"></div>
                <div><a href="javascript:;">公众号</a></div>
            </div>
            <div  class="font12 footer-item">
                <div class="qrcode-con">
                    <div>
                        <img src="<%=basePath %>/images/download_app.png" class="width100">
                        <div class="height10"></div>
                        <div class=" center font16 color-white" width="20%">电务通APP</div>
                    </div>
                    <div>
                        <img src="<%=basePath %>/images/wechat_icon.png" class="width100">
                        <div class="height10"></div>
                        <div class=" center font16 color-white" width="20%">电务通官方微信</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="height45"></div>
        <div class="color-white font14">Copyright ©2015-2016 北京电务通能源股份有限公司
            <% if(serverName.equals("www.jingnengyun.com")){ %>
                <a href="http://www.miitbeian.gov.cn">&nbsp;京ICP备16028363号</a>
            <% } else if(serverName.equals("www.dianwutong.com")){%>
                <a href="http://www.miitbeian.gov.cn">&nbsp;京ICP备16028363号</a>
            <%}%>
        </div>
        <div class="height25"></div>
    </div>
</div>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>

<%@ page language="java" import="java.util.*" %>

<%
    String path = request.getContextPath();
    String serverName = request.getServerName();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
    String baseUrl = request.getServerName()+":"+request.getServerPort()+path;
    String title = "北京电务通能源股份有限公司";


%>

<input type="hidden" id="basePath" value="<%=basePath %>" />

<link rel="stylesheet" href="./css/mobile/common.css">
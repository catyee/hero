
import { moni} from '../common/common';
import { commonModel } from '../common/common-model';

let workOrderDetailModel = {
	orderId     : null,     //工作票id
	order       : null,     //工作票内容
	prefix      : null,     //图片前缀
	logs        : [],       //工作流
	getOrderTpl : {},       //获取工作票模板
	getOrder    : {},       //获取工作票
	handleOrder : {},       //对操作票数据进行处理
	saveOrder   : {},       //保存工作票
	approveOrder: {},       //审核工作票
	sendEmail   : {},       //发送邮件
	savePics    : {},       //保存图片
};

//获取工作票模板

workOrderDetailModel.getOrderTpl = function (id) {
	var param = {
		path: '/dwt/iems/bussiness/gzp/get_tpl_by_id',
		data: {
			id : id
		}
	};

	return commonModel.post(param);
};

//获取工作票内容

workOrderDetailModel.getOrder = function(){
	var param = {
		path : '/dwt/iems/bussiness/gzp/get_gzp_by_id',
		data : {
			id : this.orderId
		}
	};
        
	return commonModel.post(param).map(function (res) {
		if(res.code == '0'){
			workOrderDetailModel.order = res.entity;
			workOrderDetailModel.prefix = res.prefix;
			workOrderDetailModel.logs = workOrderDetailModel.order.logs;
			workOrderDetailModel.handleOrder();
			return true;
		}else{
			return false;
		}
	});
};

//处理工作票的内容数据

workOrderDetailModel.handleOrder = function(){

	//记录目前状态

	var statusContent = '';
	var order = this.order;
	var status = this.order.staus;

	if(order.isComplete == '1'){
		statusContent = '<span style="color:#03b679;">已归档</span>';
	}else if(status[0] == '0'){
		statusContent = '<span style="color:orange;">已保存</span>';
	}else{
		if(status[1] == '0'){
			statusContent = '<span style="color:orange;">安全员未审核</span>';
		}else if(status[1] == '1'){
			statusContent = '<span style="color:#03b679;">安全员通过</span>';
		}else if(status[1] == '2'){
			statusContent = '安全员驳回';
		}

		if(status[2] == '0'){
			statusContent += ',<span style="color:orange;">组团长未审核</span>';
		}else if(status[2] == '1'){
			statusContent += ',<span style="color:#03b679;">组团长通过</span>';
		}else if(status[2] == '2'){
			statusContent += ',组团长未通过';
		}

		if(status[1] == '1' && status[2] == '1'){
			if(status[3] == '0'){
				statusContent = '客户未审核';
			}else if(status[3] == '1'){
				statusContent = '<span style="color:#03b679;">客户通过</span>';
			}else if(status[3] == '2'){
				statusContent = '客户未通过';
			}
		}

		if (order.isComplete == '1'){
			statusContent = '<span style="color:#03b679;">已归档</span>';
		}else if (status == '11111' && order.ret == '1' ){

			statusContent = '<span style="color:#03b679;">已完成</span>';

		}else if (status == '11111'){

			statusContent = '<span style="color:#03b679;">上传工作结果中</span>';

		}

	}

	order.statusContent = statusContent;
};

//保存工作票

workOrderDetailModel.saveOrder = function (data) {
	var param = {
		path : '/dwt/iems/bussiness/gzp/add_or_update_gzp',
		data : data
	};

	return commonModel.post(param);
};

//审核工作票

workOrderDetailModel.approveOrder = function (data) {
	var param = {
		'path' : '/dwt/iems/bussiness/gzp/approve_gzp',
		'data' : data
	};
	return commonModel.post(param);
};

//发送邮件

workOrderDetailModel.sendEmail = function (data) {
	var param = {
		path : '/dwt/iems/bussiness/gzp/send_gzp_email_to_cus',
		data : data
	};
	return commonModel.post(param);
};

//保存图片

workOrderDetailModel.savePics = function (data) {
	var param = {
		path : '/dwt/iems/bussiness/gzp/add_gzp_pic',
		data : data
	};
	return commonModel.post(param);
};

exports.workOrderDetailModel = workOrderDetailModel;

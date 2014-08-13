(function(){
	var self = null;
	var $newActivityList = $("#newActivityList");//最新活动列表
	var newActivity = {
		init:function(){
			self = this;
			self.getActivityList();
			self.bind();
		},bind:function(){
			
		},
		/**
		 * 得到最新活动的列表
		 */
		getActivityList:function(){
			$.ajax({
				url:"/BaiingBusinessEngine/rest/knowledge/search",
				dataType: "json",
				type: 'post',
				data:JSON.stringify({
					os:"ios",
					vercode:0,
					keyword:"优惠活动",
					startPos:0,
					pageSize:10,
					scene:"deals"
					
				}),success:function(data){
					$newActivityList.html($("#activityTmpl").tmpl(data.body.entities));
				}
			})
		}
	}
	newActivity.init();
})();
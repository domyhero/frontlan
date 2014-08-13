(function(){
	var self = null;
	var kid = 0;
	var newActivity = {
		init:function(){
			self = this;
			
			kid = units.getSearchValue("kid");
			self.getActivityDetail();
			self.bind();
		},bind:function(){
			
		},getActivityDetail:function(){
			$.ajax({
				url:"/BaiingBusinessEngine/rest/knowledge/detail",
				dataType: "json",
				type: 'post',
				data:JSON.stringify({
					os:"ios",
					vercode:0,
					scene:"deals",
					kid:kid
					
				}),success:function(data){
					$("#wrapContent").html($("#activityDetailTmpl").tmpl(data.body));
					
				}
			})
		}
	}
	newActivity.init();
})();
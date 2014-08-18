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
					
					var sedate = data.body.sedate;
					sedate = sedate.split("，");
					if(sedate.length==1){
						sedate = sedate.toString().split(" ");
						sedate[1] = "-";
					}else{
						sedate[1] = sedate[1].slice(1);
					}
					sedate[0] = sedate[0].slice(1,-1);
					
					data.body.sedate = sedate;
					$("#wrapContent").html($("#activityDetailTmpl").tmpl(data.body));
					
				}
			})

		}
	}
	newActivity.init();
})();
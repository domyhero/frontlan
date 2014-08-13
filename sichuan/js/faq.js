(function(){
	var self = this;questionList
	var $questionList = $("#questionList");
	var kid = "";
	var faq = {
		init:function(){
			self = this;
			kid = units.getSearchValue("kid");
			if(kid){
				
			}else{
				self.getFaqList();
			}
			
			self.bind();
		},bind:function(){
			$(document).on("click","li",function(){
				$(this).find("i").toggleClass('down');
			});
			$questionList.on("click",".rightArrow",function(){
				location.assign("faqDetail.html");
			})

		},getFaqList:function(){
			$.ajax({
				url:"/BaiingBusinessEngine/rest/knowledge/search",
				dataType: "json",
				type: 'post',
				data:JSON.stringify({
					os:"ios",
					vercode:0,
					keyword:"FAQ",
					startPos:0,
					pageSize:10
					
				}),success:function(data){
					//$newActivityList.html($("#activityTmpl").tmpl(data.body.entities));
				}
			})
		}
	}
	faq.init();
})();
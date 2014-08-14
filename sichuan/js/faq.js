(function(){
	var self = this;questionList
	var $questionList = $("#questionList");
	var kid = "";
	var faq = {
		init:function(){
			self = this;
			kid = units.getSearchValue("kid");
			if(kid){
				self.getFaqDetai();
			}else{
				self.getFaqList();
			}
			
			self.bind();
		},bind:function(){
			$(document).on("click","li",function(){
				$(this).find("i").toggleClass('down');
			});
			$questionList.on("click",".rightArrow",function(){
				var kid = $(this).closest('li').data("id");
				location.assign("faqDetail.html?kid="+kid+"");
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
					
					$questionList.html($("#questionTmpl").tmpl(data.body.entities));
				}
			})
		},
		/**
		 * 得到某一条faq的详细信息
		 */
		getFaqDetai:function(){
			$.ajax({
				url:"/BaiingBusinessEngine/rest/knowledge/detail",
				dataType: "json",
				type: 'post',
				data:JSON.stringify({
					os:"ios",
					vercode:0,
					kid:kid,
					scene:"FAQ",
					
				}),success:function(data){
					$questionList.html($("#answerTmpl").tmpl(data.body.entities));
					
				}
			})
		}
	}
	faq.init();
})();
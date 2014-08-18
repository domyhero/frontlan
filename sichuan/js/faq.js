(function(){
	var self = this;questionList
	var $questionList = $("#questionList");
	var $timeSort = $("#timeSort");
	var kid = "";
	var faqList = [];
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
			$timeSort.click(function(event) {
				$i.toggleClass('down');
				self.faqListSort();
			});

		},getFaqList:function(){
			$.ajax({
				url:"/BaiingBusinessEngine/rest/knowledge/search",
				data:JSON.stringify({
					os:"ios",
					vercode:0,
					keyword:"FAQ",
					startPos:0,
					pageSize:10
					
				}),success:function(data){
					faqList = data.body.entities;
					self.faqListSort({
						entities:data.body.entities
					})
					//$questionList.html($("#questionTmpl").tmpl(data.body.entities));
				}
			})
		},
		/**
		 * 得到某一条faq的详细信息
		 */
		getFaqDetai:function(){
			$.ajax({
				url:"/BaiingBusinessEngine/rest/knowledge/detail",
				data:JSON.stringify({
					os:"ios",
					vercode:0,
					kid:kid,
					scene:"FAQ",
					
				}),success:function(data){
					$questionList.html($("#answerTmpl").tmpl(data.body.entities));

					
				}
			})
		},
		/**
		 * faq列表的排序
		 */
		faqListSort:function(paramData){
			var entities = [];
			var sort = "";
			
			if(paramData&&paramData.entities){
				entities = paramData.entities;
			}else{
				entities = faqList;
			}
			
			var start = 0;end = 0;//默认降序
			
			if($("#timeSort").children("i").hasClass('down')){
				sort = "down";
			}else{
				sort = "up";
			}
			/*if(paramData.sort){
				sort = paramData.sort;
			}*/
			
			
			if(sort=="down"){
				start = -1;
				end = 1;
			}else{
				start = 1;
				end = -1;
			}
			/*for(var i=0;i<entities.length;i++){
				entities[i].monthlyBaseFee = parseInt(Math.random()*100);
			}*/
			entities.sort(function(a,b){
				
                return a.date>b.date?start:end;
            });
            //$comboList.html($("#comboTmpl").tmpl(entities));
            $questionList.html($("#questionTmpl").tmpl(entities));
		}
	}
	faq.init();
})();
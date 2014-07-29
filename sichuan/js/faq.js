(function(){
	var self = this;questionList
	var $questionList = $("#questionList");
	var faq = {
		init:function(){
			self = this;
			self.bind();
		},bind:function(){
			$(document).on("click","li",function(){
				$(this).find("i").toggleClass('down');
			});
			$questionList.on("click",".rightArrow",function(){
				location.assign("faqDetail.html");
			})

		}
	}
	faq.init();
})();
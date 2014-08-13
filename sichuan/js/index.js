(function(){
	var self = null;
	var $mainList = $("#mainList");
	var $moreContent = $("#moreContent");
	var $mySwipe = null;
	var index = {
		init:function(){//初始化方法is
			self = this;
			self.getActivityList();
			var startSlide = 0;
			var swipeLength = 0;//有多少个要轮播的元素
			var $position = $("#position");
			/*swipeLength = $("#slider .swipe-wrap").children().length;
			
			for(var i=0;i<swipeLength;i++){
				$position.append("<li></li>");
			}*/
			window.mySwipe = Swipe(document.getElementById('slider'),{
			  startSlide: startSlide,
			  speed: 400,
			  auto: 0,
			  continuous: true,
			  disableScroll: true,
			  stopPropagation: false,
			  callback: function(pos) {
			  	
			      var i = bullets.length;
			      while (i--) {
			        bullets[i].className = ' ';
			      }
			      bullets[pos].className = 'on';
			    },

			  transitionEnd: function(index, elem) {}
			});
			
			 var bullets = document.getElementById('position').getElementsByTagName('li');
			 $(bullets).eq(startSlide).addClass('on');
			this.bind();
		},bind:function(){
			$mainList.on("click","li",function(){
				$(this).addClass('active').siblings().removeClass('active');
			})
			$("#more").click(function(event) {
				
				$moreContent.show();
			});
			$(document).click(function(event) {
				
				if($(event.target).closest('#moreContent').length<1&&$(event.target).closest('#more').length<1){
					$moreContent.hide();
				}
			});
		},
		/**
		 * 得到最新活动的列表
		 * @return {[type]} [description]
		 */
		getActivityList:function(){
			console.log("2");
			$.ajax({
				url:"/BaiingBusinessEngine/rest/knowledge/search",
				dataType: "json",
				type: 'post',
				contentType:"application/json",
				data:JSON.stringify({
					os:"ios",
					vercode:0,
					keyword:"优惠活动",
					startPos:0,
					pageSize:10,
					scene:"deals"
					
				}),success:function(data){

				}
			})
		}
	}
	index.init();
})();
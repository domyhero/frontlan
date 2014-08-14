(function(){
	var self = null;
	var common = {
		host:"http://118.194.212.98:7446/BaiingBusinessEngine/rest/knowledge/",
		
		init:function(){
			self = this;
			self.ajaxCommonRequest();
			self.bind();
		},bind:function(){
			$(document).on("click",".share",function(){
				debugger;
				window.$shareObj = $(this).closest('.shareObj');
				$('#shareModal').modal('show')
			})
			$(".shareTrigger").click(function(event) {
				var id = $(this).attr("id");
				
				var $shareObj = window.$shareObj;
				var title = $shareObj.find("h2").html();
				var link = location.href;
				var source = "2992571369";
				var img = location.host+"/"+$shareObj.find("img").attr("src");
				if(id.indexOf("sina")>-1){
					self.shareTSina(title,link,source,img);
				}else{
					self.shareToWb(title,link,source,img);
				}
				
			});

			
		},
		/**
		 * 每个ajax请求都必须有这些设置,所以在这里统一设置
		 */
		ajaxCommonRequest:function(){
			console.log("1");
			$.ajaxSetup({
				//cache:false,
				
				dataType:"json",
				contentType:"application/json",
				method:"POST",
				data:JSON.stringify({
					os:"ios",
					vercode:0
				})
			})
		},
		shareTSina:function(title,rLink,site,pic){
			
		    window.open('http://service.weibo.com/share/share.php?title='+encodeURIComponent(title)+'&url='+encodeURIComponent(rLink)+'&appkey='+encodeURIComponent(site)+'&pic='+encodeURIComponent(pic),'_blank','scrollbars=no,width=600,height=450,left=75,top=20,status=no,resizable=yes');       
		},
		shareToWb:function(title,rLink,site,pic){
		    window.open('http://v.t.qq.com/share/share.php?url='+encodeURIComponent(rLink)+'&title='+encodeURI(title)+'&appkey='+encodeURI(site)+'&pic='+encodeURI(pic),'_blank','scrollbars=no,width=600,height=450,left=75,top=20,status=no,resizable=yes')   
		}
	}
	common.init();
	window.sichuan = common;
})();
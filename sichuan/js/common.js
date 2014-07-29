(function(){
	var self = null;
	var common = {
		init:function(){
			self = this;
			self.bind();
		},bind:function(){
			$(document).on("click",".share",function(){
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

		shareTSina:function(title,rLink,site,pic){
			
		    window.open('http://service.weibo.com/share/share.php?title='+encodeURIComponent(title)+'&url='+encodeURIComponent(rLink)+'&appkey='+encodeURIComponent(site)+'&pic='+encodeURIComponent(pic),'_blank','scrollbars=no,width=600,height=450,left=75,top=20,status=no,resizable=yes');       
		},
		shareToWb:function(title,rLink,site,pic){
		    window.open('http://v.t.qq.com/share/share.php?url='+encodeURIComponent(rLink)+'&title='+encodeURI(title)+'&appkey='+encodeURI(site)+'&pic='+encodeURI(pic),'_blank','scrollbars=no,width=600,height=450,left=75,top=20,status=no,resizable=yes')   
		}
	}
	common.init();
})();
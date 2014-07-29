(function(){
	var self = null;
	var $nationSelectList = $("#nationSelectList");
	var $nationMap = $("#nationMap");
	var $continentList = $("#continentList");
	var abroadService = {
		init:function(){
			self =  this;
			self.getNationList({
				continentName:"热门"
			});
			
			self.bind();
		},bind:function(){
			$(".itemList").on("click","li",function(){
				
			})
			$("#nationSelectList").on("click","li",function(){
				$(this).addClass('active').siblings().removeClass('active');
			})
			$continentList.on("click","span",function(){
				
				var className = this.className;
				var ab = this.className;
				$(this).addClass('active').siblings().removeClass('active');
				var continentName = $(this).html();
				
				self.getNationList({
					continentName:continentName
				});
				$(this).addClass('active').siblings().removeClass('active');
				$nationMap.find("span").hide();
				
				if(className!="active"&&className!=""){
					$nationMap.find("div").each(function(index,elem){
					
						if($(elem).attr("id").indexOf(className)>-1){
							$(elem).find("span").show("inline-block");
							return false;
						}
					})
				}
				
			})
			$nationSelectList.on("click","li",function(){
				location.assign("abroadServiceDetail.html");
			})
			$("#confirmCardlist").on("click","li",function(){
				$(this).addClass('active').siblings().removeClass('active');
			})
			$("#roamList").on('click', 'li', function(event) {
				$(this).addClass('active').siblings().removeClass('active');
			});
			//弹出提示用户怎么选择卡的提示框nationMap
			$("#howValidateCard").click(function(event) {
				$("#validateCardModal").modal("show");
			});
			$("#searchAbroadCard").click(function(event) {
				alert("查询");
			});
			$nationMap.find("i").click(function(event) {

				var name = $(this).data("name");
				$nationMap.find('span').hide();
				$(this).next().show();
				$continentList.find('.'+name+'').click();
			});
		},
		/**
		 * 得到一个洲的国家列表
		 * @return {[type]} [description]
		 */
		getNationList:function(paramData){
			
			containent = paramData.continentName;
			var nationList = [];
			for(var i =0;i<continentList.length;i++){
				if(continentList[i].name==containent){
					nationList = continentList[i].nation;
					$nationSelectList.html($("#nationTmpl").tmpl(nationList));
				}
			}
			$nationSelectList.children('li:first').addClass('active');
		}
	}
	abroadService.init();
})();
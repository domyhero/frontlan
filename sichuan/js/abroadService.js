(function(){
	var self = null;
	var keyword = "international_roaming_fee";
	var nationName = "";
	var roamingType = ""; //漫游方式
	var $nationSelectList = $("#nationSelectList");
	var $nationMap = $("#nationMap");
	var $continentList = $("#continentList");
	var $confirmCardlist = $("#confirmCardlist");//这个国家有哪些卡list
	var $roamList = $("#roamList");//漫游方式list
	var abroadService = {
		init:function(){

			self =  this;
			//self.getHotNation();
			
			self.getNationList({
				continentName:"热门"
			});
			
			self.bind();
		},bind:function(){
			$(".itemList").on("click","li",function(){
				
			})
			$("#nationSelectList").on("click","li",function(){
				if(!$(this).hasClass('active')){
					$(this).addClass('active').siblings().removeClass('active');
					self.getNationData();
				}
				
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
				//location.assign("abroadServiceDetail.html");
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
				roamingType = $roamList.children('li:first').html();
				cardType = $confirmCardlist.children('li:first').html();

				location.assign("abroadServiceDetail.html?nationName="+nationName+"&roamingType="+roamingType+"&cardType="+cardType+"");
			});
			$nationMap.find("i").click(function(event) {

				var name = $(this).data("name");
				$nationMap.find('span').hide();
				$(this).next().show();
				$continentList.find('.'+name+'').click();
			});
		},
		getHotNation:function(){
			$.ajax({
				url:"/routeServer/rest/base/getCountryByContinent",
				dataType: "json",
				type: 'post',
				contentType:"application/json",
				data:JSON.stringify({
					os:"ios",
					vercode:0
					
				}),success:function(data){
					
				}
			})
		},
		/**
		 * 得到一个洲的国家列表
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
			self.getNationData();
		},
		/**
		 * 得到一个国家的漫游方式等等
		 */
		getNationData:function(){
			nationName = $nationSelectList.children('li.active').html();
			
			$.ajax({
				url:"/BaiingBusinessEngine/rest/knowledge/getRoamCardByCountry",
				dataType: "json",
				type: 'post',
				contentType:"application/json",
				data:JSON.stringify({
					country:nationName
					
				}),success:function(data){
					
					//$newActivityList.html($("#activityTmpl").tmpl(data.body.entities));
					$confirmCardlist.html($("#cardTmpl").tmpl(data.body.cards)).children('li:first').addClass('active');
					$roamList.html($("#roamTmpl").tmpl(data.body.roams)).children('li:first').addClass('active');
				}
			})
			
		}
	}
	abroadService.init();
})();
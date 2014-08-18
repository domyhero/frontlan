(function(){
	var self = null;
	var $distList = $("#distList");
	var $filterMod = $("#filterMod");
	var $comboList = $("#comboList"); //套餐列表
	var $comboTypeList = $("#comboTypeList");
	var $feeList = $("#feeList");
	var phonePriceList = ["0-9","20-49","50-99","100-299","300及以上"];
	var otherPriceList =  ["90及以下","90-149","150-169","170-199","200及以上"];
	var comboList = [];
	var priceList = [];
	var combo = {
		init:function(){
			
			self = this;
			self.getComboList();
			//self.getDistList();
			self.bind(); 
		},bind:function(){
			priceList = phonePriceList;
			//$feeList.html($("#feeTmpl").tmpl(otherPriceList));
			$(document).click(function(event) {
				
				if($distList.is(":visible")){
					if($(event.target).closest('#distList').length<1&&$(event.target).closest('#distTrigger').length<1){
						$distList.hide();
					}
				}
				
			});
			/*$filterMod.on("click","li",function(){
				$(this).addClass('active');
				$(this).siblings().removeClass('active');
			})*/
			//用户筛选套餐类型
			$("#comboTypeList").on("click","li",function(event) {
				
				$(this).toggleClass('active');
				var network = false,phone = false,itv=false,tel = false;
				
				var $activeList = $comboTypeList.children('.active');
				
				$activeList.each(function(index, el) {
					$el = $(el);
					if($el.hasClass('network')){
						network = true;
					}else if($el.hasClass('phone')){
						phone = true;
					}else if($el.hasClass('itv')){
						itv = true;
					}else if($el.hasClass('tel')){
						tel = true;
					}
				});
				if($activeList.length==0){

					$feeList.empty();
					$comboTypeList.next("h2").hide();
					return;
				}else if(phone& $activeList.length==1){
					priceList = phonePriceList;
				}else if(tel&& $activeList.length100-299==1){
					priceList = ["0-1","2-5"];
				}else if(itv&& $activeList.length==1){
					priceList = ["20"];
				}else if(itv&& $activeList.length==1){
					priceList = ["20"];
				}else if(tel&&network&&!phone&&!itv){
					priceList = ["40-69","70-99","100-120"];
				}else{ //$activeList.length==4
					priceList = otherPriceList;
				}
				$comboTypeList.next("h2").show();
				//$feeList.empty().html($("#feeTmpl").tmpl(priceList));

			});
			$("#feeList").on("click","li",function(){
				$(this).toggleClass('active').siblings("li").removeClass('active');
				self.getComboList();

			})
			$("#distTrigger").click(function(event) {
				$(this).children('i').toggleClass('active');
				$distList.slideToggle();
			});
			//点击具体城市名,进行筛选
			$distList.on("click","li",function(){
				$distList.hide();
			})
			$("#feeTrigger").click(function(event) {
				var $i = $(this).children('i');
				
				$i.toggleClass('down');
				self.comboListSort();
			});
			/*$distList.on("click","li",function(){
				$(this).addClass('active');
				$(this).siblings().removeClass('active');
			})*/
		},
		/**
		 * 根据用户的筛选条件获取具体套餐信息的列表
		 */
		getComboList:function(){
			var reqData = {
				os:"ios",
				vercode:0,
				keyword:"套餐",
				startPos:0,
				pageSize:10,
				scene:"bundle"
				
			};
			var $feedActive = $feeList.children('.active');
			if($feedActive.length){
				reqData.filter={};
				reqData.filter.packPay = $feedActive.text();
				
			}
			$.ajax({
				url:"/BaiingBusinessEngine/rest/knowledge/search",
				data:JSON.stringify(reqData),
				success:function(data){
					var body = data.body;
					var entities = body.entities;
					comboList = entities;
					//alert("数据长度"+data.body.entities.length);
		            self.comboListSort({
		            	entities:entities
		            });
					$comboTypeList.html($("#comboTypeTmpl").tmpl(body.filter.bundleType)).children('li:first').addClass('active');
					
					if(!(reqData.filter&&reqData.filter.packPay)){//这个不能删
						$feeList.html($("#feeTmpl").tmpl(body.filter.packPay));
					}else{
						
					}
					
				}
			})
		},
		/**
		 * 套餐列表的排序
		 * @return {[type]} [description]
		 */
		comboListSort:function(paramData){
			var entities = [];
			var sort = "";
			
			if(paramData&&paramData.entities){
				entities = paramData.entities;
			}else{
				entities = comboList;
			}
			
			var start = 0;end = 0;//默认降序
			
			if($("#feeTrigger").children("i").hasClass('down')){
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

                return a.monthlyBaseFee>b.monthlyBaseFee?start:end;
            });
            $comboList.html($("#comboTmpl").tmpl(entities));
		},
		getDistList:function(){
			$.ajax({
				url:"/BaiingBusinessEngine/rest/knowledge/provinces",
				data:JSON.stringify({
					os:"ios",
					vercode:0,
					keyword:"四川",
					startPos:0,
					pageSize:10
					
				}),success:function(data){
					var body = data.body;
					$comboTypeList.html($("#comboTypeTmpl").tmpl(body.filter.bundleType)).children('li:first').addClass('active');
					$comboList.html($("#comboTmpl").tmpl(body.entities));
					$feeList.html($("#feeTmpl").tmpl(body.filter.packPay));
				}
			})
		}
		
	}
	combo.init();
})();
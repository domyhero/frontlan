(function(){
	var self = null;
	var $distList = $("#distList");
	var $filterMod = $("#filterMod");
	var $comboList = $("#comboList"); //套餐列表
	var $comboTypeList = $("#comboTypeList");
	var $feeList = $("#feeList");
	var phonePriceList = ["0-9","20-49","50-99","100-299","300及以上"];
	var otherPriceList =  ["90及以下","90-149","150-169","170-199","200及以上"];
	var priceList = [];
	var combo = {
		init:function(){
			//alert("appVersion里能获取系统和版本号吗?"+navigator.appVersion);
			//for(var a in navigator){alert(a+"的值"+navigator[a])}
			self = this;
			self.getComboList();
			self.bind(); 
		},bind:function(){
			priceList = phonePriceList;
			$feeList.html($("#feeTmpl").tmpl(otherPriceList));
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
				$(this).toggleClass('acgnqtive');
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
				$feeList.empty().html($("#feeTmpl").tmpl(priceList));

			});
			$("#feeList").on("click","li",function(){
				$(this).toggleClass('active');
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
				$(this).children('i').toggleClass('down');
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
			$.ajax({
				url:"/BaiingBusinessEngine/rest/knowledge/search",
				dataType: "json",
				type: 'post',
				data:JSON.stringify({
					os:"ios",
					vercode:0,
					keyword:"套餐",
					startPos:0,
					pageSize:10,
					scene:"bundle"
					
				}),success:function(data){
					$comboList.html($("#comboTmpl").tmpl([{},{},{}]));
				}
			})
			/*$.ajax({
				url:sichuan.host+"bundle",
				data:{
					series:["乐享3G上网版"],
					bundleType:["broadband"],
					packPay:["100以下"]
				},success:function(data){

				}
			})*/
		}
		
	}
	combo.init();
})();
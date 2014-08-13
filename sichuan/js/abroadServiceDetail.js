(function(){
	var self = null;
	var nationName = "";
	var roamingType= "";//漫游方式
	var cardType = "";
	var abroadServiceDetail = {
		init:function(){
			self = this;
			
			nationName = decodeURI(units.getSearchValue("nationName"));
			roamingType = units.getSearchValue("roamingType");
			cardType = decodeURI(units.getSearchValue("cardType"));
			
			self.getNationInfo();
			self.bind();
		},bind:function(){

		},getNationInfo:function(){
			$.ajax({
				url:"/BaiingBusinessEngine/rest/knowledge/search",
				dataType: "json",
				type: 'post',
				data:JSON.stringify({
					os:"ios",
					vercode:0,
					startPos:0,
					pageSize:10,
					keyword:"出国服务",
					filter:{
						des:nationName,
						roamingType:roamingType,
						cardType:cardType
					},
					city:nationName,
					scene:"international_roaming_fee"
					
					
				}),success:function(data){
					$("#nationWrap").html($("#nationTmpl").tmpl(data.body.entities[0]));
					
				}
			})
		}
	}
	abroadServiceDetail.init();
})();
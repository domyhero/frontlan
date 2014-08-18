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
					
					var charge = data.body.entities[0].charge;
					
					//debugger;
					data.body.entities[0].charge.call = charge.call.split("  ");
					data.body.entities[0].charge.sms = charge.sms.split("  ");
					data.body.entities[0].charge.net = charge.net.split("  ");
					$("#nationWrap").html($("#nationTmpl").tmpl(data.body.entities[0]));
					$("#callTable").html($("#callTmpl").tmpl(charge));
					$("#sendMessageMod").html($("#smsTmpl").tmpl(charge));
					
				}
			})
		}
	}
	abroadServiceDetail.init();
})();
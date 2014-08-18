(function(){
	var self = null;
	var $hallSearchList = $("#hallSearchList");//点击搜索框之后出来的列表
	var $hallList = $("#hallList");
	var $indexSearch = $("#indexSearch");//当前页面的搜索框
	var $loadingTip = $("#loadingTip");
	var hall = {
		position:null,//当前用户的地理位置
		city:"",//用户当前在的城市
		init:function(){
			self = this;
			self.bind();
			//self.getHallList();
			this.getUserPosition();
			
			
		},bind:function(){
			$(document).click(function(event) {
				
				if($(event.target).closest('#indexSearch').length<1){
					$hallSearchList.hide();
				}
			});
			$hallSearchList.on("click","li",function(){
				
				var hall = $(this).html();
				$indexSearch.val(hall);
				$hallSearchList.hide();

			})
			$("#map").click(function(event) {
				$(this).addClass('active');
				self.getUserPosition();
			});

			$hallList.on("click",".goTo",function(){
				var $li = $(this).closest('li');
				var lng = $li.data("lng");
				var lat = $li.data("lat");
				/*self.getHallList({
					longitude:lng,
					latitude:lat
				})*/
				alert("lng"+lng+"lat"+lat);
				self.getRoute({
					lng:lng,
					lat:lat
				});
				

				
			})
			$("#indexSearch").click(function(event) {
				$hallSearchList.show();
			});
			/*$(document).on("click",".goTo",function(){
				alert("点击到这里");
				alert("经度"+$(this).closest('li').data("lng"));
			})*/
		},
		/**
		 * 得到用户当前的地理位置(经纬度)
		 */
		getUserPosition:function(){

			/*var longitude = 107.204822;//经度
					var latitude = 31.604321;//纬度
			self.getHallList({
				longitude:longitude,
				latitude:latitude
			});
			
			self.position = {
				coords:{
					longitude:longitude,
					latitude:latitude
				}
			};*/
					
			if(navigator.geolocation){
				// alert("支持");
				$loadingTip.show();
				navigator.geolocation.getCurrentPosition(function(position){
					self.position = position;
					var longitude = position.coords.longitude;//经度
					var latitude = position.coords.latitude;//纬度
					var accuracy = position.coords.accuracy;
					
					var timestamp = position.timestamp;
					
					
					self.getHallList({
						longitude:longitude,
						latitude:latitude
					});
					$loadingTip.hide();
				},function(error){
					$loadingTip.hide();
					$("#notGeolaction").show();
				});
			}else{
				alert("当前浏览器不支持地理定位");
			}
		},
		getSort:function(){
			var tmp ={};
			var tmpval = [];
			var tmpdata ={}
			$.each(wafData, function(index, val) {
			    tmp[val] =index;
			    tmpval.push(val)
			});
			tmpval.sort(function(a,b){
			    return a>b?1:-1;
			});
			$.each(tmpval, function(index, val) {
			    tmpdata[tmp[val]]=val;
			});
		},
		getHallList:function(paramData){
			alert("经度"+paramData.longitude+"纬度"+paramData.latitude);
			$.ajax({
				url:"/BaiingBusinessEngine/rest/knowledge/search",
				data:JSON.stringify({
					os:"ios",
					vercode:0,
					keyword:"营业厅",
					startPos:0,
					pageSize:5,
					scene:"business_office",
					longitude:paramData.longitude,
					latitude:paramData.latitude
					
				}),success:function(data){
					var entities = data.body.entities;
					
					//alert("数据长度"+data.body.entities.length);
					
					
					

					$hallList.html($("#hallTmpl").tmpl(data.body.entities));   
					
				}
			})
		},
		/**
		 * 取得最近的物价电信营业厅的数据
		 */
		getHallData:function(paramData){
			
			
			var hallList = [];
			var map = new BMap.Map("l-map");    
			map.centerAndZoom(new BMap.Point(paramData.x, paramData.y), 11);   
			/*var map = new BMap.Map("allmap");            // 创建Map实例
					map.centerAndZoom(new BMap.Point(longitude, latitude), 5); */
			var options = {
				
				autoViewport:true,    
			      onSearchComplete: function(results){
			       
			          if (local.getStatus() == BMAP_STATUS_SUCCESS){
			          		  
			                // 判断状态是否正确    
			                var s = [];   
			                //alert("几条"+results.getCurrentNumPois()); 
			                for (var i = 0; i < results.getCurrentNumPois(); i ++){
			                	if(i==0){
			                		self.city = results.getPoi(i).city;
			                	}
			                    hallList.push(results.getPoi(i));
			                    s.push(results.getPoi(i).title + ", " + results.getPoi(i).address);    
			                }    
			             //document.getElementById("results").innerHTML = s.join("<br>");
			             $hallList.html($("#hallTmpl").tmpl(hallList));     
			          }else{
			          	alert("接口返回错误")
			          }    
			      }    
			 };
			  
			var local = new BMap.LocalSearch(map,
				options);
			local.searchNearby("电信营业厅", new BMap.Point(paramData.x, paramData.y));
			
			//local.search("电信营业厅"); 
		},
		/**
		 * 展示当前地理位置到点击的某个营业厅的路线
		 */
		getRoute:function(paramData){
			
			var start = {
	     		latlng:new BMap.Point(self.position.coords.longitude,self.position.coords.latitude)
			}
			var end = {
			   latlng:new BMap.Point(paramData.lng,paramData.lat)
			}
			/*var opts = {
			    mode:BMAP_MODE_TRANSIT,
			    region:self.city
			}*/
			var opts = {
			    mode:BMAP_MODE_DRIVING//BMAP_MODE_TRANSIT
			}
			var route = new BMap.RouteSearch();
			var gc = new BMap.Geocoder();
			var ab = new BMap.Point(self.position.coords.longitude,self.position.coords.latitude);
			debugger;
			gc.getLocation(
				ab,function(result){
					var ass = 3;
					debugger;
				}
			);
			alert("start:log"+self.position.coords.longitude+"lat"+self.position.coords.latitude);
			alert("end:lng"+paramData.lng+"lat"+paramData.lat);
			alert("opts"+opts.mode+"-"+opts.region);
			route.routeCall(start,end,opts);
		}
	}
	hall.init();
})();
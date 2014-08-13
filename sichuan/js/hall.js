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
			self.getHallList();
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
			
			if(navigator.geolocation){
				// alert("支持");
				$loadingTip.show();
				navigator.geolocation.getCurrentPosition(function(position){
					self.position = position;
					var longitude = position.coords.longitude;//经度
					var latitude = position.coords.latitude;//纬度
					var accuracy = position.coords.accuracy;
					
					var timestamp = position.timestamp;
					
					
					self.getHallData({
						x:longitude,
						y:latitude
					});
					$loadingTip.hide();
				},function(error){
					$loadingTip.hide();
					$("#notGeolaction").show();
				});
			}else{
				alert("不支持");
			}
		},
		getHallList:function(){
			$.ajax({
				url:"/BaiingBusinessEngine/rest/knowledge/search",
				dataType: "json",
				type: 'post',
				contentType:"application/json",
				data:JSON.stringify({
					os:"ios",
					vercode:0,
					keyword:"营业厅",
					startPos:0,
					pageSize:10,
					scene:"business_office"
					
				}),success:function(data){
					//$newActivityList.html($("#activityTmpl").tmpl(data.body.entities));
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
			 //debugger;    
			var local = new BMap.LocalSearch(map,
				options);
			local.searchNearby("电信营业厅", new BMap.Point(paramData.x, paramData.y));
			
			//local.search("电信营业厅"); 
		},
		/**
		 * 展示当前地理位置到点击的某个营业厅的路线
		 */
		getRoute:function(paramData){
			/*alert("start:lng: "+self.position.coords.longitude+"lat: "+self.position.coords.latitude);
			alert("end:lng: "+paramData.lng+"lat: "+paramData.lat);*/
			var start = {
	     		latlng:new BMap.Point(self.position.coords.longitude,self.position.coords.latitude)
			}
			var end = {
			   latlng:new BMap.Point(paramData.lng,paramData.lat)
			}
			var opts = {
			    mode:BMAP_MODE_TRANSIT,
			    region:self.city
			}
			var route = new BMap.RouteSearch();
			route.routeCall(start,end,opts);
		}
	}
	hall.init();
})();
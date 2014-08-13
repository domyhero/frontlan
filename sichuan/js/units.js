var units = {
	getSearchValue:function(searchStr){
		
		var search = location.search.substring(1);
		search = search.split("&");
		var searchValue = "";
		for(var i=0;i<search.length;i++){
			searchValue = search[i].split("=")[1];
			
			if(search[i].indexOf(searchStr)>-1){
				
				return searchValue;
			}
		}
		return false;


	}
}
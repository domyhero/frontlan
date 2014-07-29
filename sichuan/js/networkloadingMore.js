(function(){
	var self = this;
	var networkLoadingMore = {
		init:function(){
			self = this;
			this.bind();
		},bind:function(){
			$("#loadingMore").click(function(event) {
				$(this).next("div").show();
			});
		}
	}
	networkLoadingMore.init();
})();
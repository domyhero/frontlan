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
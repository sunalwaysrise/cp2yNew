require.config({
  paths : {
    "jquery" : ["jquery-1.8.1"],
		"extend" : "extend",
    "dialog" : "dialog",
		"head"   : "head",
		"login"  : "login",
		"foot"   : "foot",
		"homes"  : "home"
  }
});
 
require(["extend","dialog","head","login","foot","homes"],function($,d,h,l,f,s){
	d.init();
	h.init();
	l.init(); 
	f.init(); 
	s.init();


  var checkHM=function(){
    d.frame({
      title:'方案认购确认信息',
      url:'http://www.cp2y.com/buy/schemeConfirm.htm?schemeId=25693300&money=2&joinType=0',
      ok:'确认投注',
      okFn:function(){alert('确认回调方法');},
      cancel:'取消',
      css:{
        width:584,
        height:320
      }
    });
  }
  checkHM();
})
 
 
 
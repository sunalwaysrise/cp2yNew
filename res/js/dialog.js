define(['jquery','util'],function($,u){
  var d={
    init:function(){
      $('body').on('click','.closeDialog',function(){
        var i=$(this).attr('data');
        d.close(i);
      }).on('mousedown','.dialogTitle',function(event){
        var dragObj=$(this).parent(),pos={top:dragObj.position().top,left:dragObj.position().left},oh=dragObj.outerHeight(),ow=dragObj.outerWidth();
        pos={top:event.clientY-pos.top,left:event.clientX-pos.left};
        $(this).mousemove(function(event){
          try{if(window.getSelection){window.getSelection().removeAllRanges();}else{document.selection.empty();}}catch(e){}
          var s=u.screen(),maxTop=s.sh,maxLeft=s.sw,top = Math.max(event.clientY-pos.top,0),left=Math.max(event.clientX-pos.left,0);
          dragObj.css({top:Math.min(top,maxTop-oh),left:Math.min(left,maxLeft-ow)});
        }).mouseup(function(){
          $(this).off('mousemove');$(this).off('mouseup');
        });
      });
    },
  	_set:function(_obj,i){
	    var t=document.documentElement.scrollTop || document.body.scrollTop,
	        viewHeight=$(window).height(),
	        viewWidth=$(window).width(),
	        _objHeight=_obj.height(),
	        _objWidth=_obj.width(),
	        dialogTop=(viewHeight / 2) - (_objHeight / 2) + t,dialogLeft = (viewWidth / 2) - (_objWidth / 2);
	    _obj.css({top:dialogTop,left:dialogLeft});
      var lockWidth = $(document).width(),lockHeight = $(document).height();
      $("#cp2yLock"+i).css({"width":lockWidth,"height":lockHeight}).show();
  	},
  	alert:function(x,css){
      var i=$(".cp2yLock").size();
  		window.lock=true;
  		this._lock(i);
      var o={t:'提示信息',c:x};
  		this._open(o,i,css);
  	},
    open:function(o,css,cName){
      var i=$(".cp2yLock").size();
      window.lock=true;
      this._lock(i);
      this._open(o,i,css,cName);
    },
    frame:function(){},
    close:function(i){
      $("#cp2yLock"+i).remove();
      $("#cp2yDialogBox"+i).remove();
      if($(".cp2yLock").size()>0){
        window.lock=false;
      }
    },
    _lock:function(i){
      $('body').append('<div class="cp2yLock" id="cp2yLock'+i+'"></div>');
    },
    _open:function(o,i,css,cName){
  		var that=this,d=[];
      d.push('<div class="dialogTitle"><span>'+o.t+'</span><a class="closeDialog" data="'+i+'">X</a></div>');
      d.push('<div class="dialogContent">'+o.c+'</div>');
      $('body').append('<div class="cp2yDialogBox" data="'+i+'" id="cp2yDialogBox'+i+'"></div>');
      var ob=$("#cp2yDialogBox"+i);
      if(cName){
        ob.addClass(cName);
      }
      if(css){
        ob.css(css);
      }
      ob.html(d.join('')).show();
      u.throttle(this._set($("#cp2yDialogBox"+i),i), 50, 100);
  		$(window).resize(function(){
        if(window.lock){
          u.throttle(that._set($("#cp2yDialogBox"+i),i), 50, 100);
        }
      });
  	}
  };
  return d;
});
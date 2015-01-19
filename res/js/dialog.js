define(['jquery','util'],function($,u){
  var d={
    init:function(){
      $('body').on('click','.closeDialog',function(){
        var i=$(this).attr('data');
        d.close(i);
        if(d._flag){d._flag=false;}
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


//      var s = $.browser.msie ?
//      {w:document.documentElement.clientWidth,h:document.documentElement.clientHeight} : ($.browser.opera ?
//      {w:Math.min(window.innerWidth, document.body.clientWidth),h:Math.min(window.innerHeight, document.body.clientHeight)} :
//      {w:Math.min(window.innerWidth, document.documentElement.clientWidth),h:Math.min(window.innerHeight, document.documentElement.clientHeight)});
//      s.left = document.documentElement.scrollLeft || document.body.scrollLeft;
//      s.top = document.documentElement.scrollTop || document.body.scrollTop;
      var s={};
      s.sw = document.documentElement.scrollWidth || document.body.scrollWidth;
      s.sh = document.documentElement.scrollHeight || document.body.scrollHeight;
      var t=document.documentElement.scrollTop || document.body.scrollTop,
        viewHeight=$(window).height(),
        viewWidth=$(window).width(),
        _objHeight=_obj.height(),
        _objWidth=_obj.width(),
        dialogTop=(viewHeight / 2) - (_objHeight / 2) + t,dialogLeft = (viewWidth / 2) - (_objWidth / 2);
      _obj.css({top:dialogTop,left:dialogLeft});
      $("#cp2yLock"+i).css({"width": s.sw,"height": s.sh}).show();

  	},
    _flag:false,
  	alert:function(o){
      if(this._flag){return false;}
      var i=$(".cp2yLock").size();//中间有关闭 i不唯一 加一个 index 来记录
      window.dialogLock=true;
      this._lock(i);
      if(!o.type){o.type='warn';}
      var k={
        t:'提示信息',
        c:''
      },c='<div class="Alert"><span class="'+ o.type+'">'+ o.content+'</span></div><div class="Btns">';
      if(o.link){
        c+='<a href="'+o.link+'" id="frameBtn'+i+'" target="_blank" class="closeDialog btn1" data='+i+'>确定</a></div>';
      }else{
        c+='<a id="frameBtn'+i+'" class="closeDialog btn1" data='+i+'>确定</a></div>';
      }
      k.c=c;
      if(o.okFn){
        k.okFn= o.okFn;
      }
      this._open(k,i);
  	},
    open:function(o,css,cName){
      var i=$(".cp2yLock").size();
      window.dialogLock=true;
      this._lock(i);
      this._open(o,i,css,cName);
    },
    frame:function(o){
      var i=$(".cp2yLock").size();
      window.dialogLock=true;
      this._lock(i);
      var css={width:"584px",height:"391px"},x;
      if(o.css){
        css.width=o.css.width;
        css.height=(o.css.height+92);
      }
      x={
        t: o.title,
        c:'<div style="height:'+(css.height-92)+'px"><iframe src="'+o.url+'" class="iframe" frameborder="0" scrolling="no" marginwidth="0" marginheight="0"></iframe>'
      }
      if(!o.btns){
        x.c+='<div class="Btns">';
        if(o.ok){
          x.c+='<a id="frameBtn'+i+'" class="closeDialog btn1" data='+i+'>'+ o.ok+'</a>';
          x.okFn= o.okFn;
        }
        if(o.cancel){
          x.c+='<a class="closeDialog btn1" data='+i+'>'+ o.cancel+'</a>';
        }
        x.c+='</div>';
      }
      x.c+='</div>';
      this._open(x,i,css,false);
    },
    close:function(i){
      $("#cp2yLock"+i).remove();
      $("#cp2yDialogBox"+i).remove();
      if($(".cp2yLock").size()==0){
        window.dialogLock=false;
      }
    },
    _lock:function(i){
      $('body').append('<div class="cp2yLock" id="cp2yLock'+i+'"></div>');
    },
    _open:function(o,i,css,cName){
  		var that=this,d=[];
      d.push('<div class="dialogTitle"><i class="l"></i><span>'+o.t+'</span><a class="closeDialog" data="'+i+'"></a><i class="r"></i></div>');
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
      if(o.okFn){
        $('#frameBtn'+i).off().on('click',function(){
          o.okFn();
        });
      }
      u.throttle(this._set(ob,i), 50, 100);
  		$(window).resize(function(){
        if(window.dialogLock){
          u.throttle(that._set(ob,i), 50, 100);
        }
      });
  	}
  };
  return d;
});
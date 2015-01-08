require.config({
  baseUrl:'res/js',
  paths:{
    jquery:'jquery.min',
    bootstrap:'bootstrap.min',
    util:'util',
    lottery:'lottery'
  },
  shim:{
    bootstrap:{
      deps:['jquery'],
      exports:'bootstrap'
    }
  } 
});
require(['jquery','dialog','util','bootstrap','minChart'],function($,d,u,bootstrap,minChart){

  window.C=minChart;
  C.init('C.callback');
  C.load();
  $('#minChartBtnArea a').click(function(){
    var d=$(this).attr('data'),d2=$(this).attr('data2');
    $(this).toggleClass('onn');
    if(d){
      C[d+'Hao']=!C[d+'Hao'];
      $('#minChartBox a['+d+']').toggleClass('has'+d);
    }
    if(d2){
      if(d2=='fenQuXian'){
        $("#minChartBox .split").toggle();
      }else if(d2=='yiLou'){
        $("#minChartBox .YL").toggle();
      }else if(d2=='zhuTu'){
        C.zhuTuShow=!C.zhuTuShow;
        C.zhuTu();
      }
    }
  });
  $('#minChartBtn').click(function(){
    $("#settingBg,#setting").show();
    $(this).addClass('onn');
    $('#setLen li').removeClass('onLenBg').eq((C.len/10)-1).addClass('onLenBg');
    $('#areas').val(C.areas);
    $('#fenBu').val(C.fenBu);
  });
  $('#setLen li').click(function(){
    $(this).siblings().removeClass('onLenBg');
    $(this).addClass('onLenBg');
    $(this).parent().attr({'data':$(this).attr('data')});
  });
  $("#calCon").click(function(){
    $("#settingBg,#setting").hide();
    $("#minChartBtn").removeClass('onn');
  });
  $("#sureCon").click(function(){
    C.areas=$('#areas').val();
    C.fenBu=$('#fenBu').val();
    C.len=$("#setLen").attr('data');
    $("#settingBg,#setting").hide();
    $("#minChartBtn").removeClass('onn');
    C.setCondition();
    C.draw();
  });

  d.init();
  $("#buy").click(function(){
    d.alert({type:'warn',content:'测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容测试的内容'});
  });
  $('body').on('click','#kkk',function(){
    var k=$(this).parents(".cp2yDialogBox").attr('data');
    console.log(k);
    d.close(k);
    //d.alert('123345',{width:"200px",height:"120px"});
  });

  var l={};
  l.lid=10046;
  l.name='十一运夺金';
  l.play={
    a0:{
      playName:'任选二',
      inputName:'twoPoly',
      choose:function(){
        var h =[], h2=[], h3=[], i = 1;
        for (i; i < 12; i++) {
          h3.push('<a>'+u.addZero(i)+'</a>');
          h2.push('<b></b>');
        };
        h2=h2.join('');
        h.push('<div class="col-md-2">');
        h.push('<p class="bollTitle text-right">选择号码</p><p class="yl text-right">已出次数</p><p class="yl text-right">当前遗漏</p><p class="yl text-right">上次遗漏</p>');
        h.push('<p class="yl text-right">最大遗漏</p></div><div class="col-md-10">');
        h.push('<p class="bollStyle">'+h3.join("")+'</p><p class="yl">'+h2+'</p><p class="yl">'+h2+'</p><p class="yl">'+h2+'</p>');
        h.push('<p class="yl">'+h2+'</p></div>');
        $('#betArea').html(h.join(''));
        $('#playTip').html('玩法提示：至少选择2个号码，奖金<b>6</b>元。');
      },
      selected:function(o){
        if($(o).hasClass('rb')){
          $(o).removeClass('rb');
          this.tmpBet.oneStar.splice($.inArray($(o).html(),this.tmpBet.oneStar),1);
        }else{
          $(o).addClass('rb');
          this.tmpBet.oneStar.push($(o).html());
        };
        this.count();
      },
      singlebetNum:2,
      count:function(){
        this.tmpU=u.comp(this.tmpBet.oneStar.length,this.singlebetNum);
        console.log(this.tmpBet.oneStar.length,this.tmpU);
        this.setTmpU();
      },
      random:function(){
        this.setTmpBet();
        this.tmpBet.oneStar.push(Math.round(Math.random()*9));
        this.tmpU=1;
      },
      setTmpBet:function(){
        this.tmpBet={
          oneStar:[]
        };
      },
      addContent:function(){
        var t='<li><div><span>'+this.playName+'</span> '+this.tmpBet.oneStar.join(' ')+'</div><p><span>'+this.tmpU+' 注 '+this.tmpU*2+' 元</span><a>删除</a></p></li>'
          ,o={
            u:this.tmpU,
            playName:this.playName,
            inputName:this.inputName,
            bet:this.tmpBet.oneStar.join('')
          };
        $('#betContent').prepend(t);/*写入DOM*/
        this.scheme.unshift(o);/*写入内存*/
        this.calc();/*计算注数*/
      }
    },
    a1:{
      playName:'四星',
      inputName:'fourStarPoly',
      choose:function(){
        var html0 = [], i = 0;
        html0.push('<p>千位</p>');
        for (i; i < 10; i++) {
          html0.push('<a class="gb" data_p="q">' + i + '</a>');
        };
        i = 0;
        html0.push('<p>百位</p>');
        for (i; i < 10; i++) {
          html0.push('<a class="gb" data_p="b">' + i + '</a>');
        };
        i = 0;
        html0.push('<p>十位</p>');
        for (i; i < 10; i++) {
          html0.push('<a class="gb" data_p="s">' + i + '</a>');
        };
        i = 0;
        html0.push('<p>个位</p>');
        for (i; i < 10; i++) {
          html0.push('<a class="gb" data_p="g">' + i + '</a>');
        };
        return html0.join('');
      },
      selected:function(o){
        var w=$(o).attr('data_p');
        if($(o).hasClass('rb')){
          $(o).removeClass('rb');
          this.tmpBet[w].splice($.inArray($(o).html(),this.tmpBet[w]),1);
        }else{
          $(o).addClass('rb');
          this.tmpBet[w].push($(o).html());
        };
        this.count();
      },
      count:function(){
        this.tmpU=this.tmpBet.q.length*this.tmpBet.b.length*this.tmpBet.s.length*this.tmpBet.g.length;
        this.setTmpU();
      },
      random:function(){
        this.setTmpBet();
        this.tmpBet.q.push(Math.round(Math.random()*9));
        this.tmpBet.b.push(Math.round(Math.random()*9));
        this.tmpBet.s.push(Math.round(Math.random()*9));
        this.tmpBet.g.push(Math.round(Math.random()*9));
        this.tmpU=1;
        this.s2();
      },
      setTmpBet:function(){
        this.tmpBet={q:[],b:[],s:[],g:[]};
      },
      addContent:function(){ /*将当前号码缓存写入正式DOM*/
        var t='<li><p><a>'+this.tmpBet.q.join('</a>-<a>')+'</a>|<a>'+this.tmpBet.b.join('</a>-<a>')+'</a>|<a>'+this.tmpBet.s.join('</a>-<a>')+'</a>|<a>'+this.tmpBet.g.join('</a>-<a>')+'</a></p>' +
          '<div>'+this.playName+'<b>'+this.tmpU+'</b>注,<b>'+this.tmpU*2+'</b>元</div><span class="del">X</span></li>',o={
          u:this.tmpU,
          playName:this.playName,
          inputName:this.inputName,
          bet:this.tmpBet.q.join('')+'-'+this.tmpBet.b.join('')+'-'+this.tmpBet.s.join('')+'-'+this.tmpBet.g.join('')
        };
        $('#betList').prepend(t);/*写入DOM*/
        this.scheme.unshift(o);/*写入内存*/
        this.calc();/*计算注数*/
      }
    },
    a2:{
      playName:'五星',
      inputName:'fiveStarPoly',
      choose:function(){
        var html0 = [], i = 0;
        html0.push('<p>万位</p>');
        for (i; i < 10; i++) {
          html0.push('<a class="gb" data_p="w">' + i + '</a>');
        };
        html0.push('<p>千位</p>');
        i=0;
        for (i; i < 10; i++) {
          html0.push('<a class="gb" data_p="q">' + i + '</a>');
        };
        i = 0;
        html0.push('<p>百位</p>');
        for (i; i < 10; i++) {
          html0.push('<a class="gb" data_p="b">' + i + '</a>');
        };
        i = 0;
        html0.push('<p>十位</p>');
        for (i; i < 10; i++) {
          html0.push('<a class="gb" data_p="s">' + i + '</a>');
        };
        i = 0;
        html0.push('<p>个位</p>');
        for (i; i < 10; i++) {
          html0.push('<a class="gb" data_p="g">' + i + '</a>');
        };
        return html0.join('');
      },
      selected:function(o){
        var w=$(o).attr('data_p');
        if($(o).hasClass('rb')){
          $(o).removeClass('rb');
          this.tmpBet[w].splice($.inArray($(o).html(),this.tmpBet[w]),1);
        }else{
          $(o).addClass('rb');
          this.tmpBet[w].push($(o).html());
        };
        this.count();
      },
      count:function(){
        this.tmpU=this.tmpBet.w.length*this.tmpBet.q.length*this.tmpBet.b.length*this.tmpBet.s.length*this.tmpBet.g.length;
        this.setTmpU();
      },
      random:function(){
        this.setTmpBet();
        this.tmpBet.w.push(Math.round(Math.random()*9));
        this.tmpBet.q.push(Math.round(Math.random()*9));
        this.tmpBet.b.push(Math.round(Math.random()*9));
        this.tmpBet.s.push(Math.round(Math.random()*9));
        this.tmpBet.g.push(Math.round(Math.random()*9));
        this.tmpU=1;
        this.s2();
      },
      setTmpBet:function(){
        this.tmpBet={w:[],q:[],b:[],s:[],g:[]};
      },
      addContent:function(){ /*将当前号码缓存写入正式DOM*/
        var t='<li><p><a>'+this.tmpBet.w.join('</a>-<a>')+'</a>|<a>'+this.tmpBet.q.join('</a>-<a>')+'</a>|<a>'+this.tmpBet.b.join('</a>-<a>')+'</a>|<a>'+this.tmpBet.s.join('</a>-<a>')+'</a>|<a>'+this.tmpBet.g.join('</a>-<a>')+'</a></p>' +
          '<div>'+this.playName+'<b>'+this.tmpU+'</b>注,<b>'+this.tmpU*2+'</b>元</div><span class="del">X</span></li>',o={
          u:this.tmpU,
          playName:this.playName,
          inputName:this.inputName,
          bet:this.tmpBet.w.join('')+'-'+this.tmpBet.q.join('')+'-'+this.tmpBet.b.join('')+'-'+this.tmpBet.s.join('')+'-'+this.tmpBet.g.join('')
        };
        $('#betList').prepend(t);/*写入DOM*/
        this.scheme.unshift(o);/*写入内存*/
        this.calc();/*计算注数*/
      }
    }
  };
  //l.setPlay('a0');/*初始化方法*/
  $("#addContent").click(function(){
    l.add();
  });
  $('#betArea a').on('click',function(){
    l.selected(this);
  });
});


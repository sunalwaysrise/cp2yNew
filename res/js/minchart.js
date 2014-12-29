/**
 * Created with JetBrains WebStorm.
 * User: luwenbin
 * Date: 14/12/29
 * Time: 上午9:44
 * To change this template use File | Settings | File Templates.
 *
 */
define(['jquery'],function($){
  var d={
    chongHao:false,
    lianHao:false,
    bianHao:false,
    chuanHao:false,
    fenQuXian:false,
    yiLou:false,
    zhuTu:false,
    len:30,
    areas:4,
    fenBu:1,/*1:普通;2:奇偶;3:质合;4:除3余*/
    init:function(){
      /*从cookies中读取是自定义数据  */
      var d=localStorage.getItem('minChart');
      if(d){
        d=eval("("+d+")");
        if(d.chongHao){this.chongHao=true;}
        if(d.lianHao){this.lianHao=true;}
        if(d.bianHao){this.bianHao=true;}
        if(d.chuanHao){this.chuanHao=true;}
        if(d.fenQuXian){this.fenQuXian=true;}
        if(d.yiLou){this.yiLou=true;}
        if(d.zhuTu){this.zhuTu=true;}
        if(d.len){this.len= d.len;}
        if(d.areas){this.areas= d.areas;}
        if(d.fenBu){this.fenBu= d.fenBu;}
      }
    },
    setCondition:function(){
      /*写入cookies*/
      var k='{chongHao:'+this.chongHao+',lianHao:'+this.lianHao+',bianHao:'+this.bianHao+',chuanHao:'+this.chuanHao+',fenQuXian:'+this.fenQuXian+',yiLou:'+this.yiLou+',zhuTu:'+this.zhuTu+',len:'+this.len+',areas:'+this.areas+',fenBu:'+this.fenBu+'}';
      localStorage.setItem('minChart',k);
    },
    load:function(cb){
      $.getScript('/DATA/miss_issues.js?callback='+cb);
    },
    callback:function(D){
      this.DD1=D;

      //if(this.fenBu==1){}
      this.draw();
    },
    _Chong:function(){
      var ds=this.DD1;
      for(var i=0;i<ds.data.length;i++){
        ds.data[i].chong=[];
        for(var j=0;j<ds.bnl;j++){
          if(this.chongNumber(1,j,i)){
            ds.data[i].chong[j]=true;
          }else{
            ds.data[i].chong[j]=false;
          }
        }
      }
    },
    chongNumber :function(nt,nl,ni){
      var ds=this.DD1;
      var count=0,i;
      if(nt==1)
      {
        i=ni-1;
        if(i>=0)
          if(this.containNumber(ds.data[i].bn,ds.data[ni].bn[nl]))
            count++;
        if(count<1)
        {
          i=ni+1;
          if(i<ds.data.length)
            if(this.containNumber(ds.data[i].bn,ds.data[ni].bn[nl]))
              count++;
        }
      }
      return count>0;
    },
    containNumber:function(ns,n){
      for(var i=0;i<ns.length;i++){
        if(ns[i]==n){
          return true;
        }
      }
      return false;
    },
    _Lian:function(){
      var ds=this.DD1;
      for(var i=0;i<ds.data.length;i++){
        ds.data[i].lian=[];
        for(var j=0;j<ds.bnl;j++)
        {
          if(this.lianNumber(1,j,i)){
            ds.data[i].lian[j]=true;
          }else{
            ds.data[i].lian[j]=false;
          }
        }
      }
    },
    lianNumber:function(nt,nl,ni){
      var ds=this.DD1,count=0,l;
      if(nt==1){
        l=nl-1;
        if(l>=0){
          if(ds.data[ni].bn[nl]==ds.data[ni].bn[l]+1){
            count++;
          }
        }
        if(count<1){
          l=nl+1;
          if(l<ds.bnl){
            if(ds.data[ni].bn[nl]==ds.data[ni].bn[l]-1){
              count++;
            }
          }
        }
      }
      return count>0;
    },
    _Bian:function(){
      var ds=this.DD1;
      for(var i=0;i<ds.data.length;i++){
        ds.data[i].bian=[];
        for(var j=0;j<ds.bnl;j++){
          if(this.bianNumber(1,j,i)){
            ds.data[i].bian[j]=true;
          }else{
            ds.data[i].bian[j]=false;
          }
        }
      }
    },
    bianNumber:function(nt,nl,ni){
      var ds=this.DD1;
      var count=0,i;
      if(nt==1){
        i=ni-1;
        if(i>=0){
          if(this.containBian(ds.data[i].bn,ds.data[ni].bn[nl])){
            count++;
          }
        }
        if(count<1){
          i=ni+1;
          if(i<ds.data.length){
            if(this.containBian(ds.data[i].bn,ds.data[ni].bn[nl])){
              count++;
            }
          }
        }
      }
      return count>0;
    },
    containBian :function(ns,n){
      for(var i=0;i<ns.length;i++) {
        if(ns[i]-1==n || ns[i]+1==n){
          return true;
        }
      }
      return false;
    },
    _Chuan:function(){
      var ds=this.DD1;
      for(var i=0;i<ds.data.length;i++){
        ds.data[i].chuan=[];
        for(var j=0;j<ds.bnl;j++){
          if(this.chuanNumber1(1,j,i) || this.chuanNumber2(1,j,i) || this.chuanNumber3(1,j,i)){
            ds.data[i].chuan[j]=true;
          }else{
            ds.data[i].chuan[j]=false;
          }
        }
      }
    },
    chuanNumber1 :function(nt,nl,ni){
      var ds=this.DD1;
      var count=0,i;
      if(nt==1){
        i=ni-1;
        if(i>=0){
          if(this.containNumber(ds.data[i].bn,ds.data[ni].bn[nl])){
            count++;
            i=ni-2;
            if(i>=0){
              if(this.containNumber(ds.data[i].bn,ds.data[ni].bn[nl])){
                count++;
              }
            }
          }
        }
        if(count<2){
          i=ni+1;
          if(i<ds.data.length)
            if(this.containNumber(ds.data[i].bn,ds.data[ni].bn[nl])){
              count++;
              i=ni+2;
              if(i<ds.data.length){
                if(this.containNumber(ds.data[i].bn,ds.data[ni].bn[nl])){
                  count++;
                }
              }
            }
        }
      }
      return count>1;
    },
    chuanNumber2 :function(nt,nl,ni){
      var ds=this.DD1;
      var count=0,l;
      if(nt==1){
        l=nl-1;
        if(l>=0){
          if(ds.data[ni].bn[nl]==ds.data[ni].bn[l]+1){
            count++;
            l=nl-2;
            if(l>=0){
              if(ds.data[ni].bn[nl]==ds.data[ni].bn[l]+2){
                count++;
              }
            }
          }
        }
        if(count<2){
          l=nl+1;
          if(l<ds.bnl){
            if(ds.data[ni].bn[nl]==ds.data[ni].bn[l]-1){
              count++;
              l=nl+2;
              if(l<ds.bnl){
                if(ds.data[ni].bn[nl]==ds.data[ni].bn[l]-2){
                  count++;
                }
              }
            }
          }
        }
      }
      return count>1;
    },
    chuanNumber3 :function(nt,nl,ni){
      var ds=this.DD1;
      var count=0,i;
      if(nt==1){
        i=ni-1;
        if(i>=0){
          if(this.containBianA(ds.data[i].bn,ds.data[ni].bn[nl])){
            count++;
            i=ni-2;
            if(i>=0){
              if(this.containBianAA(ds.data[i].bn,ds.data[ni].bn[nl])){
                count++;
              }
            }
          }
        }
        if(count<2){
          i=ni+1;
          if(i<ds.data.length){
            if(this.containBianB(ds.data[i].bn,ds.data[ni].bn[nl])){
              count++;
              i=ni+2;
              if(i<ds.data.length){
                if(this.containBianBB(ds.data[i].bn,ds.data[ni].bn[nl])){
                  count++;
                }
              }
            }
          }
        }
        if(count<2){
          count=0;
          i=ni-1;
          if(i>=0){
            if(this.containBianB(ds.data[i].bn,ds.data[ni].bn[nl])){
              count++;
              i=ni-2;
              if(i>=0){
                if(this.containBianBB(ds.data[i].bn,ds.data[ni].bn[nl])){
                  count++;
                }
              }
            }
          }
          if(count<2){
            i=ni+1;
            if(i<ds.data.length){
              if(this.containBianA(ds.data[i].bn,ds.data[ni].bn[nl])){
                count++;
                i=ni+2;
                if(i<ds.data.length){
                  if(this.containBianAA(ds.data[i].bn,ds.data[ni].bn[nl])){
                    count++;
                  }
                }
              }
            }
          }
        }
      }
      return count>1;
    },
    containBianA :function(ns,n){
      for(var i=0;i<ns.length;i++){
        if(ns[i]-1==n){
          return true;
        }
      }
      return false;
    },
    containBianAA :function(ns,n){
      for(var i=0;i<ns.length;i++){
        if(ns[i]-2==n){
          return true;
        }
      }
      return false;
    },
    containBianB :function(ns,n){
      for(var i=0;i<ns.length;i++){
        if(ns[i]+1==n){
          return true;
        }
      }
      return false;
    },
    containBianBB :function(ns,n){
      for(var i=0;i<ns.length;i++){
        if(ns[i]+2==n){
          return true;
        }
      }
      return false;
    },
    draw:function(){
      var D,i= 0,len=this.DD1.bnc.length,html=[],h=[],j= 0,jen,E;
      this._Chong();
      this._Lian();
      this._Bian();
      this._Chuan();
      D=this.DD1;
      //console.log(D);
      //绘制头部
      html.push('<div class="line line1"><div class="issues">奖期</div>');
      function isZhiShu(n){
        if(n<1){
          return false;
        }
        for(var i=2;i<n;i++){
          if(n%i==0){
            return false;
          }
        }
        return true;
      }
      function addZero(n){
        if(n<10){
          return '0'+n;
        }else{
          return ''+n;
        }
      }
      var JI=[],OU=[],ZHI=[],HE=[],Y0=[],Y1=[],Y2=[],sum;
      if(this.fenBu==1){//普通分布
        for(i;i<len;i++){
          h.push(addZero(D.bnc[i]));
        }
      }else if(this.fenBu==2){//奇偶分布
        for(i;i<len;i++){
          if(D.bnc[i]%2==1){
            h.push(addZero(D.bnc[i]));
            JI.push(i);
          }
        }
        i=0;
        for(i;i<len;i++){
          if(D.bnc[i]%2==0){
            h.push(addZero(D.bnc[i]));
            OU.push(i);
          }
        }

      }else if(this.fenBu==3){//质合分布
        for(i;i<len;i++){
          if(isZhiShu(D.bnc[i])){
            h.push(addZero(D.bnc[i]));
            ZHI.push(i);
          }
        }
        i=0;
        for(i;i<len;i++){
          if(!isZhiShu(D.bnc[i])){
            h.push(addZero(D.bnc[i]));
            HE.push(i);
          }
        }
      }else if(this.fenBu==4){//除三余
        for(i;i<len;i++){
          if(D.bnc[i]%3==0){
            h.push(addZero(D.bnc[i]));
            Y0.push(i);
          }
        }
        i=0;
        for(i;i<len;i++){
          if(D.bnc[i]%3==1){
            h.push(addZero(D.bnc[i]));
            Y1.push(i);
          }
        }
        i=0;
        for(i;i<len;i++){
          if(D.bnc[i]%3==2){
            h.push(addZero(D.bnc[i]));
            Y2.push(i);
          }
        }
      }
      html.push('<div class="n">'+ h.join('</div><div class="n">')+'</div>');
      html.push('<div class="hm">号码</div>');
      html.push('<div class="area">'+this.areas+'分区</div>');
      html.push('<div class="hz">和值</div></div>');
      //头部绘制结束
      //开始绘制主体
      //i=0;
      D= this.DD1.data;
      i= D.length-1;
      if(this.fenBu==1){//普通分布
        for(i;i>0;i--){
          html.push('<div class="line"><div class="issues">'+D[i].iss+'</div>');
          E= D[i].ms[0];
          jen= E.length;
          j=0;
          sum=0;
          h=[];
          for(j;j<jen;j++){
            if(E[j]==0){
              //设置重连边串,
              html.push('<div class="n">'+this._markPro(D[i].bian,D[i].chong,D[i].chuan,D[i].lian,D[i].n,addZero(j+1))+'</div>');
              sum=sum+(j+1);
              h.push(1);
            }else{
              html.push('<div class="n"><span class="YL">'+E[j]+'</span></div>')
              h.push(0);
            }
          }
          html.push('<div class="hm">'+D[i].n+'</div>');
          html.push('<div class="area">'+this._fenQu(h)+'</div>');
          html.push('<div class="hz">'+sum+'</div>');
          html.push('</div>');
        }
      }else if(this.fenBu==2){//奇偶分布
        for(i;i>0;i--){
          html.push('<div class="line"><div class="issues">'+D[i].iss+'</div>');
          E= D[i].ms[0];
          jen= JI.length;
          j=0;
          sum=0;
          h=[];
          //循环奇数下标
          for(j;j<jen;j++){
            if(E[JI[j]]==0){
              //html.push('<div class="n"><a>'+addZero(JI[j]+1)+'</a></div>');
              html.push('<div class="n">'+this._markPro(D[i].bian,D[i].chong,D[i].chuan,D[i].lian,D[i].n,addZero(JI[j]+1))+'</div>');
              sum=sum+(JI[j]+1);
              h.push(1);
            }else{
              html.push('<div class="n"><span class="YL">'+E[JI[j]]+'</span></div>');
              h.push(0);
            }
          }
          //循环偶数下标
          j=0;jen=OU.length;
          for(j;j<jen;j++){
            if(E[OU[j]]==0){
              //html.push('<div class="n"><a>'+addZero(OU[j]+1)+'</a></div>');
              html.push('<div class="n">'+this._markPro(D[i].bian,D[i].chong,D[i].chuan,D[i].lian,D[i].n,addZero(OU[j]+1))+'</div>');
              sum=sum+(JI[j]+1);
              h.push(1);
            }else{
              html.push('<div class="n"><span class="YL">'+E[OU[j]]+'</span></div>');
              h.push(0);
            }
          }
          html.push('<div class="hm">'+D[i].n+'</div>');
          html.push('<div class="area">'+this._fenQu(h)+'</div>');
          html.push('<div class="hz">'+sum+'</div>');
          html.push('</div>');
        }
      }else if(this.fenBu==3){//质合分布
        for(i;i>0;i--){
          html.push('<div class="line"><div class="issues">'+D[i].iss+'</div>');
          E= D[i].ms[0];
          jen= ZHI.length;
          j=0;
          sum=0;
          h=[];
          //循环质数下标
          for(j;j<jen;j++){
            if(E[ZHI[j]]==0){
              //html.push('<div class="n"><a>'+addZero(ZHI[j]+1)+'</a></div>');
              html.push('<div class="n">'+this._markPro(D[i].bian,D[i].chong,D[i].chuan,D[i].lian,D[i].n,addZero(ZHI[j]+1))+'</div>');
              sum=sum+(ZHI[j]+1);
              h.push(1);
            }else{
              html.push('<div class="n"><span class="YL">'+E[ZHI[j]]+'</span></div>');
              h.push(0);
            }
          }
          //循环合数下标
          j=0;jen=HE.length;
          for(j;j<jen;j++){
            if(E[HE[j]]==0){
              //html.push('<div class="n"><a>'+addZero(HE[j]+1)+'</a></div>');
              html.push('<div class="n">'+this._markPro(D[i].bian,D[i].chong,D[i].chuan,D[i].lian,D[i].n,addZero(HE[j]+1))+'</div>');
              sum=sum+(HE[j]+1);
              h.push(1);
            }else{
              html.push('<div class="n"><span class="YL">'+E[HE[j]]+'</span></div>');
              h.push(0);
            }
          }
          html.push('<div class="hm">'+D[i].n+'</div>');
          html.push('<div class="area">'+this._fenQu(h)+'</div>');
          html.push('<div class="hz">'+sum+'</div>');
          html.push('</div>');
        }
      }else if(this.fenBu==4){//除三余
        for(i;i>0;i--){
          html.push('<div class="line"><div class="issues">'+D[i].iss+'</div>');
          E= D[i].ms[0];
          jen= Y0.length;
          j=0;
          sum=0;
          h=[];
          //循环余0下标
          for(j;j<jen;j++){
            if(E[Y0[j]]==0){
              //html.push('<div class="n"><a>'+addZero(Y0[j]+1)+'</a></div>');
              html.push('<div class="n">'+this._markPro(D[i].bian,D[i].chong,D[i].chuan,D[i].lian,D[i].n,addZero(Y0[j]+1))+'</div>');
              sum=sum+(Y0[j]+1);
              h.push(1);
            }else{
              html.push('<div class="n"><span class="YL">'+E[Y0[j]]+'</span></div>');
              h.push(0);
            }
          }
          //循环余1下标
          j=0;jen=Y1.length;
          for(j;j<jen;j++){
            if(E[Y1[j]]==0){
              //html.push('<div class="n"><a>'+addZero(Y1[j]+1)+'</a></div>');
              html.push('<div class="n">'+this._markPro(D[i].bian,D[i].chong,D[i].chuan,D[i].lian,D[i].n,addZero(Y1[j]+1))+'</div>');
              sum=sum+(Y1[j]+1);
              h.push(1);
            }else{
              html.push('<div class="n"><span class="YL">'+E[Y1[j]]+'</span></div>');
              h.push(0);
            }
          }
          //循环余2下标
          j=0;jen=Y2.length;
          for(j;j<jen;j++){
            if(E[Y2[j]]==0){
              //html.push('<div class="n"><a>'+addZero(Y2[j]+1)+'</a></div>');
              html.push('<div class="n">'+this._markPro(D[i].bian,D[i].chong,D[i].chuan,D[i].lian,D[i].n,addZero(Y2[j]+1))+'</div>');
              sum=sum+(Y2[j]+1);
              h.push(1);
            }else{
              html.push('<div class="n"><span class="YL">'+E[Y2[j]]+'</span></div>');
              h.push(0);
            }
          }
          html.push('</div>');
        }
      }
      if(this.areas==2){
        html.push('<div class="split line2_1"></div>');
      }else if(this.areas==3){
        html.push('<div class="split line3_1"></div>');
        html.push('<div class="split line3_2"></div>');
      }else if(this.areas==4){
        html.push('<div class="split line4_1"></div>');
        html.push('<div class="split line4_2"></div>');
        html.push('<div class="split line4_3"></div>');
      }else if(this.areas==5){
        html.push('<div class="split line5_1"></div>');
        html.push('<div class="split line5_2"></div>');
        html.push('<div class="split line5_3"></div>');
        html.push('<div class="split line5_4"></div>');
      }
      $('#minChartBox').html(html.join(''));
    },
    _fenQu:function(h){
      var i= 0,len= h.length,r='',a1=[],a2=[];
      if(this.areas==2){
        for(i;i<len;i++){
          if(h[i]!=0){
            if(i<5){
              a1.push(1);
            }else{
              a2.push(1);
            }
          }
        }
        r=a1.length+':'+a2.length;
      }else if(this.areas==3){
        var a3=[];
        for(i;i<len;i++){
          if(h[i]!=0){
            if(i<4){
              a1.push(1);
            }else if(i<7){
              a2.push(1);
            }else{
              a3.push(1);
            }
          }
        }
        r=a1.length+':'+a2.length+':'+a3.length;
      }else if(this.areas==4){
        var a3=[],a4=[];
        for(i;i<len;i++){
          if(h[i]!=0){
            if(i<3){
              a1.push(1);
            }else if(i<6){
              a2.push(1);
            }else if(i<9){
              a3.push(1);
            }else{
              a4.push(1);
            }
          }
        }
        r=a1.length+':'+a2.length+':'+a3.length+':'+a4.length;
      }else if(this.areas==5){
        var a3=[],a4=[],a5=[];
        for(i;i<len;i++){
          if(h[i]!=0){
            if(i<2){
              a1.push(1);
            }else if(i<4){
              a2.push(1);
            }else if(i<6){
              a3.push(1);
            }else if(i<8){
              a4.push(1);
            }else{
              a5.push(1);
            }
          }
        }
        r=a1.length+':'+a2.length+':'+a3.length+':'+a4.length+':'+a5.length;
      }
      return r;
    },
    _markPro:function(bian,chong,chuan,lian,n,a){
      var i= n.split(' ').indexOf(a),p='';
      console.log(i);
      console.log(n,a);
      if(bian[i]){p+=' bian';}
      if(chong[i]){p+=' chong';}
      if(chuan[i]){p+=' chuan';}
      if(lian[i]){p+=' lian';}
      return '<a '+p+'>'+a+'</a>';
    }
  };
  return d;
});

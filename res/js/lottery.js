define(['jquery','util'],function($,u){
  return {
  	scheme:[],/*方案内容*/
    tmpBet:{/*缓存当前号码*/},
    tmpU:0,/*选号注数*/
    u:0,/*确认注数*/
    setPlay:function(o){/*初始化玩法*/
      this.play[o].choose();
      this.tmpBet={};/*清除当前号码缓存*/
      this.setTmpBet=this.play[o].setTmpBet;/*重写临时号码缓存格式方法*/
      this.setTmpBet();/*设置临时号码缓存格式*/
      this.count=this.play[o].count;/*重写注数计算方法*/
      this.selected=this.play[o].selected;/*重写点击事件*/
      this.playName=this.play[o].playName;/*重写玩法名称*/
      this.inputName=this.play[o].inputName;/*重写玩法提交名称*/
      this.random=this.play[o].random;/*重写机选方法*/
      this.addContent=this.play[o].addContent;/*重写添加方法*/
      this.tmpU=0;
      this.setTmpU();
    },
    setTmpU:function(){
    	$("#curBets").html(this.tmpU);
      $("#curMoney").html(this.tmpU*2);
    },
    clear:function(){
      $('.rb').removeClass('rb');
      this.setTmpBet();
      this.tmpU=0;
      this.setTmpU();
    },
    add:function(){
      if(this.tmpU==0){
      	var that=this;
        u.confirm('您选择的方案不构成注,机选一注么？',function(){
          that.random();
          that.addContent();
          that.clear();
        });
      }else{
        this.addContent();
        this.clear();
      }
    },
    calc:function(){/*计算注数*/
      var i= 0,len=this.scheme.length,u=0;
      for(i;i<len;i++){
        u+=this.scheme[i].u;
      }
      this.u=u;
      this.showMoney();
    },
    mul:1,
    muls:[],
    issueIds:[],
    totalIssueIds:[],
    setMuls:function(o){
      var s=$(o.target).val(),i=0;
      $("#muls").html(s);
      this.mul=s;
      this.muls=[];
      for(i;i<this.issueIds.length;i++){
        this.muls.push(s);
      }
      this.showMoney();
    },
    getIssues:function(){
      var that=this;
      $.ajax({
        url:"/traceIssueList.json",
        dataType:'json',
        data:{lotteryId:10038,random:new Date().getTime()},
        success:function(data){
          if(data.flag==1){
            var D=data.dataList,i=0,len=D.length,a=[];
            for(i;i<len;i++){
              a.push(D[i].issueId);
            }
            window.totalIssueIds=a;
            window.issueIds=[];
            window.issueIds.push(a[0]);
            that.totalIssueIds=a;
            that.issueIds=[];
            that.issueIds.push(a[0]);
          }else{
            window.issueIds=[];
          }
        }
      });
    },
    setIssues:function(o){
      var s=$(o.target).val(),i=0;
      $("#issues").html(s);
      this.issueIds=[];
      for(i;i<s;i++){
        this.issueIds.push(this.totalIssueIds[i]);
      }
      window.issueId=this.issueId;
      this.showMoney();
    },
    showMoney:function(){
      $("#Bets").html(this.u);
      $("#singleBetMoney").html(this.u*2);
      $("#Money").html(this.u*this.mul*this.issueIds.length*2);
    },
    countDown:function(){
      $.ajax({
        url:"/query_cur_issue.json",
        dataType:'text',
        data:{lotteryId:10038,random:new Date().getTime()},
        success:function(result){
          window.getIssues();
          if (result == "" || result.indexOf('ERROR') != -1){return false;}
          var o = eval("("+result+")");
          if(o.flag!=1){return false;}
          window.serverTime = parseInt(o.time);
          window.currentIssueId = o.issueId;
          window.sellEndTime = o.sellEndTime;
          $('#curIssue').html(o.issue);
          if(window.serverTime>1001){
            window.autoRun();
          }else{
            setTimeout('window.countDown()',5000);
          }
        }
      });
    },
    autoRun:function(){
      window.serverTime -= 1000;
      if (window.serverTime <= 0){
        window.countDown();
      }else{
        var day = Math.floor(this.serverTime / (24 * 60 * 60 * 1000)),tmp,hour,munites,second,html='';
        tmp = window.serverTime - (day * 24 * 60 * 60 * 1000);
        hour = Math.floor(tmp / (60 * 60 * 1000));
        tmp = window.serverTime - (day * 24 * 60 * 60 * 1000) - (hour * 60 * 60 * 1000);
        munites = Math.floor(tmp / (60 * 1000));
        tmp = window.serverTime - (day * 24 * 60 * 60 * 1000) - (hour * 60 * 60 * 1000) - (munites * 60 * 1000);
        second = Math.floor(tmp / 1000);
        if(day){
          html+=day+"天";
        }
        if(hour){
          html+=hour+"小时";
        }
        munites=munites<10?'0'+munites:munites;
        second=second<10?'0'+second:second;
        html+=munites+':'+second;
        $("#curCountDown").html(html);
        try{clearTimeout(window.autoRunMark);}catch(e){}
        window.autoRunMark=setTimeout('window.autoRun()', 1000);
      }
    },
    submit:function(){
      var i= 0,D=this.scheme,scheme={},schemeNumber=[],d;
      for(i;i< D.length;i++){
        if(scheme[D[i].inputName]==undefined){
          scheme[D[i].inputName]=[];
        }
        scheme[D[i].inputName].push(D[i].bet);
      }
      i=0;
      for(i in scheme){
        schemeNumber.push(i+"="+scheme[i].join("|"));
      }
      d={
        schemeNumber:schemeNumber.join(';'),
        multiple:this.mul,
        multiples:this.muls,
        money:this.u*this.mul*2,
        issueId:window.issueIds[0],
        issueIds:window.issueIds
      }
      console.log(d);
    }
  };
});
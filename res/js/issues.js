/**
 * Created with JetBrains WebStorm.
 * User: luwenbin
 * Date: 14/12/16
 * Time: 上午10:36
 * To change this template use File | Settings | File Templates.
 */
define(['jquery','util'],function($,u){
  return {
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
    }
  };
});

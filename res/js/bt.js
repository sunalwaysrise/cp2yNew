openBox:function(){
      $('#bModal').modal();
    },
    alert:function(m){
      $("#alertTxt").html(m)
      $('#alert').modal();
    },
    confirm:function(m,fn){
      $("#confirmTxt").html(m);
      $('#confirm').modal();
      $("#confirmBtn").off().on("click",function(){fn();});
    },
    login:function(){
      $("#myModalLabel").html('请先登录');
      $("#cancel").html("取消");
      $("#ok").html("登录").off().on("click",function(){
        o.signIn();
      });
      var h=[];
      h.push('<form role="form">');
      h.push('<div class="form-group"><input type="text" id="username" class="form-control" placeholder="用户名"></div>');
      h.push('<div class="form-group"><input type="password" id="password" class="form-control" placeholder="密码"></div></form> ');
      $("#modalBody").html(h.join(''));
      this.openBox();
    },
    signIn:function(){
      var d={
        username:$("#username").val().trim(),
        password:$("#password").val().trim()
      };
      if(!d.username || !d.password){
        return o.alert('用户名密码不能为空');
      }
      $.ajax({
        url:config.WEB_APP+"/signIn.php",
        type:"post",
        data:d,
        beforeSend:function(){$("#ok").off();},
        success:function(data){
          data=eval("("+data+")");
          $("#ok").on("click",function(){
            o.signIn();
          });
          if(data.flag==1){
            $('#bModal').modal('hide');
          }else{
            o.alert(data.msg);
          }
        },error:function(){
          $("#ok").on("click",function(){
            o.signIn();
          });
        }
      });
    },
    addZero:function(i){
      if(i<10){
        return "0"+i;
      }else{
        return i;
      }
    },
    comp:function (n,m){var n1=1,n2=1;for(var i=n,j=1;j<=m;n1*=i--,n2*=j++);return n1/n2}
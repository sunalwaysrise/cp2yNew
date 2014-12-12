
define(["extend","dialog"],function($,d){
    var WebAppUrl = {
		SSO_APP_URL : 'http://www.cp2y.com/sso',
		CUR_APP_URL : 'http://www.cp2y.com',
		HOME_APP_USER_URL : 'http://www.cp2y.com/user',
		RESOURCE_URL : "http://res.cp2y.com",
		HOME_APP_URL : 'http://www.cp2y.com' ,
		Zq_URL:"http://zq.cp2y.com"
	};
	
	//$("#login").on("click")
	var login = {
		  _dialogi:0,
		  init:function(){
		        $("#login").on("click",function(){
				    login.show(); 
					//this._dialogi=$(".cp2yDialogBox").size(); 
					//cookie 信息处理 ***
				});
				
				$("body").on("click","#logintabs li",function(){ 
					var i = $("#logintabs li").index($(this));
					$(this).addClass("cur").siblings("li").removeClass("cur");
					$(".tabcon").removeClass("curcon").eq(i).addClass("curcon");
				}).on("click","#goin",function(){
				      //login.enter();
					  login.show($(this)); 
					//  this._dialogi=$(".cp2yDialogBox").size();
					 // alert(this._dialogi);
				});
					
				/*$("body").on("blur",".group input",function(){
				        var id= $(this).attr("id");
						
						if(id=="username"){ 
						//$(this).val()
						    alert("username");
						}else if(id=="pwd"){
						     alert("pwd");
						}else if(id=="code"){
						
						} 
				});*/ 
		  },
	      show:function(){ 
			  var html =[];
			  html.push('<ul id="logintabs" class="tabs"><li class="cur">登录</li><li>注册</li></ul>');
			  html.push('<div class="tabcon curcon">');
			  html.push('<dl class="group username"><dt><label for="username">用户名:</label></dt><dd><i></i><input id="username" type="text" value="" placeholder="用户名/手机号码"/></dd></dl>');
			  html.push('<dl class="group pwd"><dt><label for="pwd">密码:</label></dt><dd><i></i><input id="pwd" type="password" value="" placeholder=""/><a class="a1" href="http://www.cp2y.com/sso/forget_password.htm" target="_blank">忘记密码？</a></dd></dl>');
			  html.push('<dl class="group code"><dt><label for="code">验证码:</label></dt><dd><input id="code" type="text" value="" placeholder=""/><img src="http://www.cp2y.com/sso/servlet/verifyImage?1418279607922a0.42012251215055585?1418279608436a0.8623648427892476?1418279613866a0.8471579269971699" alt="验证码" id="codeimg"></dd></dl>');
			  html.push('<div id="goin" class="btn">安全登录</div>');
			  html.push('<div id="warn" class="warn">× 验证码错误</div>');
			  html.push('</div>');
			  html.push('<div class="tabcon">');
			  html.push('<dl class="group username"><dt><label for="account">账号注册:</label></dt><dd><i></i><input id="account" type="text" value="" placeholder="用户名/手机号码"/>');
			  html.push('<div class="msg"><em class="error"></em><p>用户名不能为除手机号码以外的纯数字</p></div>');
			  html.push('</dd></dl> ');
			  html.push('<dl class="group pwd"><dt><label for="key">密码:</label></dt><dd><i></i><input id="key" type="password" value="" placeholder=""/></dd></dl> ');
			  html.push('<dl class="group pwdsure"><dt><label for="keysure">确认密码:</label></dt><dd><i></i><input id="keysure" type="password" value="" placeholder=""/></dd></dl> ');
			  html.push('<div id="signin" class="btn">提交注册</div>');
			  html.push('<div class="rule"><input type="checkbox" checked="checked" id="rule" name="rule">我已经年满18岁并同意<a target="_blank" href="/company/serviceRole.htm">《用户服务条款》</a></div>');
			  html.push('</div>');
			  html.push('<div class="others">');
			  html.push('合作网站登录 ');
			  html.push('<a class="wx" href="http://www.cp2y.com/sso/weChat.htm" target="_blank">微信</a>');
			  html.push('<a class="qq" href="http://www.cp2y.com/sso/qqLogin.htm" target="_blank" onclick="cp2y.user.qqLogin(\'QQ账号登录\');">QQ</a>');
			  html.push('<a class="alipay" href="http://www.cp2y.com/sso/alipayLogin.htm" target="_blank" onclick="cp2y.user.qqLogin(\'支付宝登录\');">支付宝</a>');
			  html.push('<a class="sina" href="http://www.cp2y.com/sso/sinaLogin.htm" target="_blank" onclick="cp2y.user.qqLogin(\'新浪微博登录\');">新浪微博</a>');
	
			   var o ={
				 t:"会员登录",
				 c:html.join("")
			  };
			   
			 // d._lock(d._i+1);
			  var css={width:'450px'};  
			  d.open(o,css,"loginDialog"); 
		       
		  },
		  errorTimes:0,
		  enter:function(obj){
		       var name = $("#username"),namev=name.val(),pwd = $("#pwd"),pwdv=pwd.val(),code=$("#code"),codev=code.val(); 
			   if(namev.empty() || namev.len()<3){
			         $('#warn').html('账号填写错误，账号长度为3～16个字符。').show();
					 name.focus();
					 return;
			   } 
			   if(pwdv.empty() || pwdv.len()<6){
			        $('#warn').html('密码填写错误，密码长度必须为6～20之间。').show();
					pwd.focus();
					return;
			   }
			   if(this.errorTimes>=3){ 
					$("dl.code").show();
					//code 的html append  
					if(code.empty()){
					     $('#warn').html('× 请输入验证码').show();
                         code.focus();
					     return;
					} 
			   }
			   
			   $('#warn').html('正在登录，请稍后...').show();
			  // $(obj).parents("")
			   $.ajax({
					url     : WebAppUrl.SSO_APP_URL+'/login?t='+new Date().getTime()+'&entrance=http://+WebAppUrl.CUR_APP_URL',
					data    : {userName:namev,password:pwdv,enterCode:codev},
					cache   : false,
					context : this,
					type    : "post",
					success : function(result){
						var res = login.response(result);
						if(res.state == "-1"){
							$('#warn').html("× "+res.error).show();
							errorTimes = res.errorTimes;
						}else if(res.state == "-2"){
							$('#warn').html("× "+res.error).show();
							errorTimes = res.errorTimes;
							code.val('');
							if(res.error=='用户名或密码错误'){
								pwd.focus();
							} else if (res.error == '请输入验证码') {
								$('#code').focus();
								$("dl.code").show();
							} else {
								code.focus();
							}
		
							var _random = '?' + new Date().getTime() + 'a' + Math.random();
							$('#codeimg').attr('src',$("#codeimg").attr('src') + _random);//刷新验证码
						}else{
							 
							cp2y.dialog.close('dialog-login');
							cp2y.user.dlCallback&&cp2y.user.dlCallback();
							cp2y.user.isLogin=true;
							if(this.config.refresh){
								if(this.loginConfig&&this.loginConfig.refreshURL)
									window.location=this.config.refreshURL;
								else
									window.location.reload();
							}
							cp2y.user.showWWWLoginHtml(true,res.loginname);
							errorTimes=0;
						}
					}.bind(this),
					error   : function(result){
						cp2y.dialog.alert('登录失败，请检查网络是否畅通。<br/>如果确认网络是通的，请联系客服人员帮助解决。');
					}
				});
			   
				
			   
		  },
		  response:function(){
		       
		  },
		  close:function(){
		      
		  } 
	
	};
	
	return login;
  
});   
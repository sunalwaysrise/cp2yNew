<?php
$username=trim($_POST["username"]);
$password=trim($_POST["password"]);
if( !$username || !$password ){
  $flag=0;
  $msg="用户名密码不能为空";
}else if( $username=="cp2y" && $password=="admin"){
  $flag=1;
  $msg="登录成功";
}else{
  $flag=0;
  $msg="用户名密码错误";
}
$arr_str = array(
  "flag" => $flag,
  "msg" => $msg
);
echo(json_encode($arr_str)); 
?>
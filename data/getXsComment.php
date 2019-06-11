<?php
	header('Content-type:application/json;charset=utf-8');
    require('init.php');
    @$pid=$_REQUEST['pid'];
    $sql="SELECT * FROM comments WHERE pid=$pid AND isrecommend=1 AND cpic1 is not NULL ORDER BY cid DESC LIMIT 1";
    $result=mysqli_query($conn,$sql);
    if($result==false){
      echo '[{"code":-1,"msg":"查询单个评论失败"}]';
    }else{
       $row=mysqli_fetch_all($result,MYSQLI_ASSOC);
       if($row==null){
          echo '[{"code":-2,"msg":"未查到相应的单个评论信息"}]';
       }else{
          $str=json_encode($row);
			echo ($str);
       }
    }
?>
<?php
	header('Content-type:application/json;charset=utf-8');
    require('init.php');
    @$term=$_REQUEST['term'];
    @$pid=$_REQUEST['pid'];
    $sql="SELECT * FROM comments WHERE pid=$pid $term";
    $result=mysqli_query($conn,$sql);
    if($result==false){
      echo '[{"code":-1,"msg":"查询评论失败"}]';
    }else{
       $row=mysqli_fetch_all($result,MYSQLI_ASSOC);
       if($row==null){
          echo '[{"code":-2,"msg":"未查到相应的评论信息"}]';
       }else{
          $str=json_encode($row);
			echo ($str);
       }
    }
?>
<?php
	header('Content-type:application/json;charset=utf-8');
    require('init.php');
    @$pid=$_REQUEST['pid'];
    $sql="SELECT count(*) as allComments FROM comments WHERE pid=$pid";
    $result=mysqli_query($conn,$sql);
    if($result==false){
      echo '[{"code":-1,"msg":"查询所有评论数失败"}]';
    }else{
       $row=mysqli_fetch_all($result,MYSQLI_ASSOC);
       $sql1="SELECT count(*) as picComments FROM comments WHERE cpic1 is not null and pid=$pid";
       $result1=mysqli_query($conn,$sql1);
       if($result1==false){
          echo '[{"code":-2,"msg":"查询晒图评论数失败"}]';
       }else{
          $row1=mysqli_fetch_all($result1,MYSQLI_ASSOC);
          $sql2="SELECT count(*) as addComments FROM comments WHERE comment_add is not null and pid=$pid";
           $result2=mysqli_query($conn,$sql2);
            if($result2==false){
                echo '[{"code":-3,"msg":"查询追评评论数失败"}]';
            }else{
                $row2=mysqli_fetch_all($result2,MYSQLI_ASSOC);
                $rows=array_merge($row[0],$row1[0],$row2[0]);
                $str=json_encode($rows);
                echo ($str);
            }
       }
    }
?>
<?php
    header('Content-type:application/json;charset=utf-8');
    require('init.php');
    @$uid=$_REQUEST['uid'];
    $sql="SELECT * FROM cart WHERE userid=$uid and isbuy=1 ORDER BY cid DESC";
    $result=mysqli_query($conn,$sql);
    if($result==false){
      echo '[{"code":-2,"msg":"查询购物车信息失败"}]';
    }else{
       $row=mysqli_fetch_all($result,MYSQLI_ASSOC);
       if($row==null){
           echo '[{"code":-1,"msg":"未查到相应的购物车信息"}]';
       }else{
           $str=json_encode($row);
           echo ($str);
       }
    }
?>
<?php
	header('Content-type:application/json;charset=utf-8');
    require('init.php');
    $sql="SELECT * FROM acc_cate";
    $result=mysqli_query($conn,$sql);
    if($result==false){
      echo '[{"code":-2,"msg":"查询配件分类失败"}]';
    }else{
       $row=mysqli_fetch_all($result,MYSQLI_ASSOC);
	   if($row==null){
          echo '[{"code":-1,"msg":"未查到相应的配件分类信息"}]';
       }else{
			$str=json_encode($row);  
       echo ($str);
	   }
       
    }
?>
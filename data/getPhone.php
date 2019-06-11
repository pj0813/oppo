<?php
	header('Content-type:application/json;charset=utf-8');
    require('init.php');
    $sql="SELECT * FROM phone_cate ORDER BY pcid DESC";
        $result=mysqli_query($conn,$sql);
        if($result==false){
          echo '[{"code":-2,"msg":"查询手机分类失败"}]';
        }else{
           $row=mysqli_fetch_all($result,MYSQLI_ASSOC);
    	     if($row==null){
              echo '[{"code":-1,"msg":"未查到相应的手机分类信息"}]';
           }else{
    			    for($i=0;$i<count($row);$i++){
    			        $pcid=$row[$i]["pcid"];
    			        $subsql="SELECT * FROM phone WHERE pcid=$pcid AND isShop=1";
                      $subresult=mysqli_query($conn,$subsql);
                      if($subresult==false){
                        echo '[{"code":-3,"msg":"查询手机信息失败"}]';
                      }else{
                         $subrow=mysqli_fetch_all($subresult,MYSQLI_ASSOC);
                         $row[$i]["pdetail"]=$subrow;
                      }
    			    }
    			    $str=json_encode($row);
              echo ($str);
    	     }
        }

?>
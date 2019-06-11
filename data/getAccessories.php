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
    			    for($i=0;$i<count($row);$i++){
    			        $cid=$row[$i]["cid"];
    			        $subsql="SELECT * FROM accessories WHERE cate=$cid";
                      $subresult=mysqli_query($conn,$subsql);
                      if($subresult==false){
                        echo '[{"code":-3,"msg":"查询配件信息失败"}]';
                      }else{
                         $subrow=mysqli_fetch_all($subresult,MYSQLI_ASSOC);
                         if($subrow==null){
                            echo '[{"code":-4,"msg":"未查到相应的配件信息"}]';
                         }else{
                            $row[$i]["adetail"]=$subrow;

                         }
                      }
    			    }
    			    $str=json_encode($row);
              echo ($str);
    	     }
        }

?>
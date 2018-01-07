<?php
    // 引入connect
    include 'connect.php';
    
    //拿数据库数据 
    $id = isset($_GET['id']) ? $_GET['id'] : 1;

    $sql = "select * from goodslist where id=$id";


    // 获取查询结果
    $result = $conn->query($sql);
    // var_dump($result);

    // 使用查询结果集
    $row = $result->fetch_all(MYSQLI_ASSOC);
    
    //释放查询结果集
    $result->close();

    //把结果输出到前台
    echo json_encode($row,JSON_UNESCAPED_UNICODE);


   /* // 购物车商品写入数据库购物车
    $id2 = isset($_GET['id2']) ? $_GET['id2'] : null;
    $qty = isset($_GET['qty']) ? $_GET['qty'] : null;

    $sql2 = "select * from cart where id='$id2' and qty='$qty'";
    $result2 = $conn->query($sql2);
    if($result2->num_rows>0){
        $sql3 = " update cart set qty= $qty";
        $result3 = $conn->query($sql3);
        if ($result3) {
            var_dump($result3);
            $result3->close();
        } else {
            var_dump("Error: " . $sql3 . "<br>" . $conn->error);
        }
      
    }else{
        $sql4 = "insert into cart (id,qty) values('$id2','$qty')";

        // 获取查询结果
        $result4 = $conn->query($sql4);

        if ($result4) {
            var_dump($result4);
            $result4->close();
        } else {
            var_dump("Error: " . $sql4 . "<br>" . $conn->error);
        }
        
    }

    // 释放查询内存
    $result2->close();

    //关闭连接
    $conn->close();*/
?>
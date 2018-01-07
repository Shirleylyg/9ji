<?php
    // 引入connect
    include 'connect.php';
        
    $pageNo = isset($_GET['pageNo']) ? $_GET['pageNo'] : 1;
    $qty = isset($_GET['qty']) ? $_GET['qty'] : 12;
    $cate = isset($_GET['cate']) ? $_GET['cate'] : '';

    $sql = 'select * from goodslist';
    // 获取数据库数据条数
    $result1 = $conn->query($sql);
    $total = $result1->num_rows;

    if($cate){
        $sql .= " where category=$cate";
    }

    $sql .= ' limit '. $qty*($pageNo-1) . ',' . $qty;

    // 获取查询结果
    $result = $conn->query($sql);
    // var_dump($result);

    // 使用查询结果集
    $row = $result->fetch_all(MYSQLI_ASSOC);
    
    //释放查询结果集
    $result->close();

    // 格式化数据
    $res = array(
        'pageNo'=>$pageNo,
        'qty'=>$qty,
        'total'=>$total,
        'data'=>$row,
    );

    //把结果输出到前台
    echo json_encode($res,JSON_UNESCAPED_UNICODE);

    //关闭连接
    $conn->close();
?>
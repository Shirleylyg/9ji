<?php
    include 'connect.php';
    
    $username = isset($_GET['username']) ? $_GET['username'] : null;
    $password = isset($_GET['password']) ? $_GET['password'] : null;


    //查看用户名是否已经存在
    $sql = "select username from user where username='$username'";
    $result = $conn->query($sql);
    if($username != null && $password == null){
        if($result->num_rows>0){
            echo "fail";
        }else{
            echo "ok1";
        }
    }else if($username != null && $password != null){
        if($result->num_rows>0){
            echo "fail";
        }else{
            // 密码md5加密
            $password = md5($password);

            $sql = "insert into user (username,password) values('$username','$password')";

            // 获取查询结果
            $result = $conn->query($sql);

            if ($result) {
                echo "ok2";
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }
        }
    }
    

    //关闭连接
    $conn->close();
?>
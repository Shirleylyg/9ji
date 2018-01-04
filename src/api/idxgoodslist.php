<?php
    // 模拟商品数据
    $list = array();
    // 商品名字
    $name = array("公牛GN-U303N迷你USB插线板新国标版","麦麦米苹果7P超薄保护壳","金稻KD88纳米喷雾补水仪","小米平板3","小米6 全网通版","洛克苹果 7P透明保护壳","OPPO R11 全网通版","苹果13.3寸MacBook Air","华为荣耀 耳塞式 线控耳机","iPhone 6 国行版");
    // 商品价格
    $price = array(5679,4545,1231,1290,4499,1599,2699,1799,2800,1999);
    // 图片路径
    $imgurl = array("img/20170928154538799.jpg","img/20170905170718468.jpg","img/20170927163436534.jpg","img/20170405150056298.jpg","img/20170607101010782.jpg","img/20170831151210847.jpg","img/20171113090033694.jpg","img/20171227132616233(1).jpg","img/201709081501453.jpg","img/20170522173122534.jpg","img/20171113090033694.jpg");

    // 遍历生成商品数据
    for($i=1;$i<10;$i++){
        $goods = array(
            "name"=>$name[array_rand($name)],
            "price"=>$price[array_rand($price)],
            "imgurl"=>$imgurl[array_rand($imgurl)]
        );
        $list[] = $goods;
    }
    echo json_encode($list,JSON_UNESCAPED_UNICODE)
?>
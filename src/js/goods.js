require(['config'],function(){
    require(['jquery','common','liliZoom'],function($,com){
        

        // 获得列表传过的参数
        var _id = location.search.slice(1);
        _id = _id.split('=')[1];
        
        // 发起ajax请求,获取数据库数据
        var $xhr = $.ajax({
            url:'../api/goods.php',
            data:{
                id:_id
            },
            success:function(res){
                res = JSON.parse(res);
                $('.d_h2').html(res[0].name);
                $('#spprice').html(res[0].price);
                $('.lowprice dd a:nth-child(1)').html('一手优品：￥'+(res[0].price-200));
                $('.lowprice dd a:nth-child(2)').html('二手良品：￥'+(res[0].price-700));
                $('.bigpic a img').attr('src',res[0].imgurl);
                $('.smallpic li:nth-child(1) img').attr('src',res[0].imgurl);
                $('.choose_color li img').attr('src',res[0].imgurl);
                $('.choose_color li span').html(res[0].color);

            }
        });

        
        // 飞入购物车，添加到cookie
        $('#toshop').on('click',function(){

            // 飞入购物车
            var $currentImg = $('.bigpic img');
            var $cart = $('.tool-cart');
            var $imgCopy = $currentImg.clone();
            // 设置克隆图片位置
            $imgCopy.css({
                position:'absolute',
                left:$currentImg.offset().left,
                top:$currentImg.offset().top
            });

            // 克隆图片加入页面
            $imgCopy.appendTo('body');
                $imgCopy.animate({
                left:$cart.offset().left,
                top: $cart.offset().top,
                width: 50,
                height:50
            },function(){
                // 动画结束后链式调用
                $imgCopy.remove();

                // cookie
                // 读取cookie生成购物车
                var carlist = [];
                var cookies = document.cookie;
                
                // cookies有长度说明之前是有cookie的
                if(cookies.length){
                    // 先拆分cookie
                    cookies = cookies.split('; ');
                    //获得一个数组，遍历数组，再以等号拆分，判断是否存在carlist
                    cookies.forEach(function(item){
                        var arr = item.split('=');
                        // 判断是否存在carlist,那么拿到的数组第二项就是商品信息
                        if(arr[0] === 'carlist'){
                            carlist = JSON.parse(arr[1]);
                        }
                    })  
                }

                // 判断商品是否存在
                for(var i=0;i<carlist.length;i++){
                    if(carlist[i].guid === _id){
                        break;
                    }
                }
                // 如果循环完毕，那么可以得到商品购物车列表的最后一项，即购物车列表的长度
                if(i===carlist.length){
                    // 那么购物车没有该商品，创建该商品信息，添加到数组
                    var goods = {
                       guid:_id,
                       imgurl:$('.bigpic a img').attr('src'),
                       name:$('.d_h2').html(),
                       price:$('#spprice').html(),
                       qty:1
                    };
                    // 利用unshift把最新点击的商品添加到数组最开始
                    carlist.unshift(goods);
                }else{
                    // 如果循环未完就停止了，那么就得到购物车中已有商品的对应i值，数量加1
                    carlist[i].qty++;
                    // 利用变量接收数量已经添加的商品，然后删除之前添加的位置，重新排到数组第一位
                    var tem = carlist[i];
                    carlist.splice(i,1);
                    carlist.unshift(tem);
                }
                // 转成json字符串加入cookie
                document.cookie = 'carlist=' + JSON.stringify(carlist);
                com.cartCookie();
            });
        })

        // 放大镜
        /*$(".jqzoom").imagezoom();
        $('.smallpic').on('click','li img',function(){
            $(this).closest('li').addClass('smpichover').siblings().removeClass('smpichover');
            $('.bigpic img').attr({
                'src':this.src,
                'data-big':$(this).attr('data-big') || this.src
            })
        })*/

        com.cartCookie();
        com.toolCart();

    })
})
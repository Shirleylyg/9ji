
define(['jquery'],function($){
    return {
        // 购物车显示隐藏
        toolCart:function(){
           // 点击出现购物车
            var qty = 0;
            $('.tool-cart').on('click',function(){
                qty++;
                $('.tool-bar').animate({right:300}).find('.tool-bar-frame').show();

                if(qty%2 == 0){
                    $('.tool-bar').animate({right:0},function(){
                        $('.tool-bar-frame').hide();
                 });
                } 
                
            })

        },
        cartCookie:function(){
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

            function carTotal(){
                var times = 0;
                // 计算总价
                var total1 = 0;
                var total2 = 0;
                // 遍历数组生成html结构
                var carListLi = carlist.map(function(item){
                    total1 = item.price*item.qty;
                    total2 += total1;
                    times += item.qty;
                    return `<li data-id="${item.guid}" style="height:80px;position:relative;">
                                <img src="${item.imgurl}" style="float: left;width: 62px;height: 62px;">
                                <div style="float:right;">
                                    <p style="width:130px;">${item.name}</p>
                                    <span class="btnclose" style="display:inline-block;position:absolute;top:0;right:0;">&times;</span>
                                    <p class="orange">￥${total1}</p>
                                    <p><span class="btncut">-</span><input type="text" value="${item.qty}" disabled><span class="btnadd">+</span></p>
                                </div>  
                            </li>
                            `
                }).join('');
                $('.cart-mini-total p').html(`共${times}件商品，总计：<b class="orange">￥${total2}</b>`);
                $('.cart-box .product ul').html(carListLi);
            }
            carTotal();

            $('.cart-box').on('click',function(e){

                var target = e.target;
                // 获取id名字，利用名字获取
                var $li = $(target).closest('li');
                var $guid = $li.attr('data-id');
                
                // 遍历找到当前id的商品
                for(var i =0;i<carlist.length;i++){
                    if(carlist[i].guid === $guid){
                        // 删除单项商品,从cookie中删除，从结构中删除
                        if(target.className.toLowerCase() === 'btnclose'){
                            carlist.splice(i,1);
                            // 从页面删除
                            $li.remove();
                            break;
                        }

                        if(target.className.toLowerCase() === 'btncut'){
                            if(carlist[i].qty<=1){
                                break;
                            }
                            carlist[i].qty--;
                            break;
                        }

                        if(target.className.toLowerCase() === 'btnadd'){
                            carlist[i].qty++;
                            break;
                        }
                    }
    
                }
                // 重新写入cookie
                document.cookie = 'carlist=' + JSON.stringify(carlist);
                carTotal();
            })   
        }
    }
})



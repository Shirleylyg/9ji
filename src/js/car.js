require(['config'],function(){
    require(['jquery'],function($){
        // 读取cookie
        // 读取cookie生成购物车
        var carlist = [];
        var cookies = document.cookie;
        console.log(cookies)
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
            if($('.cart-item')){
                $('.cart-item').remove();
            }
            // 遍历数组生成html结构
            var carListLi = carlist.map(function(item){
                total1 = item.price*item.qty;
                total2 += total1;
                times += item.qty;
                $('.cart-total .right .large-font').html(times);
                $('.cart-total .right .title-font').html(`￥${total2}`);
                return `<div class="cart-item" data-id="${item.guid}">
                            <div class="cart-product-box relative ">
                                <div class="invalid-mark none"></div>
                                <div class="product">
                                    <a href="" target="_blank" class="block relative left pro-img-box">
                                        <img src="${item.imgurl}">
                                        <div class="invalid-tag hide">商品已失效</div>
                                    </a>
                                    <div class="product-title">
                                        <h5><a href="" target="_blank">${item.name}</a></h5>
                                        <p class="remark grey-9"></p>
                                        <p class="sale grey-9"><span>特价</span>该商品特价促销，不与会员优惠叠加</p>
                                        <div class="margin-top"></div>
                                        <div class="jiuji-serviceCur">
                                        </div>
                                        <div class="jiuji-server margin-top overflow-hide">
                                            <a href="javascript:;" class="grey-9" ><i class="baoxiu"></i>选服务</a> 
                                        </div>  
                                    </div>
                                </div>
                                <div class="unit-price"><b>${item.price}</b></div>
                                <div class="discount">0.00</div>
                                <div class="count"><a class="btncut" >-</a><input type="text" value="${item.qty}" disabled=""><a class="btnadd" >+</a></div>
                                <div class="sum"><b class="orange">${total1}</b></div>
                                <div class="action">
                                    <a href="javascript:;" class="move-to-favorate" >移入收藏夹</a>
                                    <a class="btnclose" >删除</a>
                                </div>
                            </div>
                        </div>
                        `
            }).join('');
            $(carListLi).insertBefore('.cart-total');
        }
        carTotal();

        // 添加删除商品
        $('.cart-box').on('click',function(e){
            var target = e.target;

            // 获取id名字，利用名字获取
            var $li = $(target).closest('.cart-item');
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
    })
})
require(['config'],function(){
    require(['jquery','common'],function($,com){

        // 生成商品列表
        function htmlList(data){
            // 生成商品信息
            var $ul = $('.right_main .list ul');
            if($ul.html()){
                $ul.html('');
            }
            $ul.append(data.map(function(item){
                return `
                    <li data-id="${item.id}">
                       <a class="propic relative">
                            <img src="${item.imgurl}"> 
                        </a>
                        <h4 data-title="${item.name}">
                        <a href="#"  style="margin-right:5px;"><em class="shopTitle"><span>${item.name}</span>&nbsp;${item.color} &nbsp;</em></a></h4>
                        <p class="p_price"><b class="showallprice nowPrice" >￥${item.price}</b></p>
                        <p class="pj_count">已有<a rel="nofollow" style="font-weight:bold;color:#3caaff;" >${item.person}</a>人评价&nbsp;&nbsp;</p>
                        <div class="list_btn">
                            <p class="fenqiList" ><em class="orange">良心分期：</em><span><b>￥${item.money}</b>×24期</span></p>
                        </div>
                    </li> 
                    `
            }).join('')); 
        }
        // 发起ajax请求
        var $xhr = $.ajax({
            url:'../api/list.php',
            data:{
                pageNo:1
            },
            success:function(res){
                res = JSON.parse(res);
                // console.log(res);
                // 生成页码
                var len = res.total;
                var count = parseInt(len/12);
                var html = `<span>共${len}条记录</span><span>1/${count}页</span>`;
                for(var i =1;i<count;i++){
                    if(i == 1){
                        html += `<a id="curPage" class="cur" title="第${i}页">${i}</a>`;
                    }else {
                         html += `<a title="第${i}页">${i}</a>`;
                    }   
                }
                $('#pages').append(html);

                htmlList(res.data);
            }
        })

        // 点击页面再次请求数据
        $('#pages').on('click','a',function(){
            var _pageNo = $(this).html();
            $(this).attr('id','curPage').siblings().attr('id','');
            $xhr = $.ajax({
                url:'../api/list.php',
                data:{
                    pageNo:_pageNo
                },
                success:function(res){
                    res = JSON.parse(res);
                    console.log(res)
                    htmlList(res.data);
                }
            })
            // 返回页首
            window.scrollTo(0,150);
        })

        // 点击商品获得id跳到详情
        $('.list').on('click','li',function(){
            var $id = $(this).attr('data-id');
            location.href = '../html/goods.html?id=' + $id;
        })

        //购物车
        com.cartCookie();
        com.toolCart();
        
    })
})
// 设置别名

require(['config'],function(){
      require(['jquery','slide','common'],function($,sli,com){

        // 更新用户登录信息
        var _username = location.search.slice(1);
        _username = _username.split('=')[1];
        console.log(_username)
        $('#userInfo a').remove();
        $('</p>').html(`用户：${_username}`).appendTo('#userInfo');

        // 轮播图
        $('.ck-slide').ckSlide({
            autoPlay: true
        });

        // 购物车
        com.cartCookie();
        com.toolCart();


        // 底部“加载更多好货”点击加载更多
        // 人工限制加载次数只可以加载2次数
        var qty = 0;
        $('#loadmore').on('click',function(){
            qty++;
            if(qty>=2){
                $('#loadmore').css('display','none');
            }
            var $xhr = $.get('./api/idxgoodslist.php',function(){
                var res = JSON.parse($xhr.responseText);
                // 当请求数据已经没有的时候，删除加载按钮
                if(res === ''){
                    $('#loadmore').css('display','none');
                }
                var $ul = $('.goodCommodity ul');
                $ul.append(res.map(function(item){
                    return `
                    <li class="anim-top" title="${item.name}">
                      <a href="#">
                        <span class="goodimg">
                          <img src="${item.imgurl}"></span>
                        <div class="row2 margin-top font14" style="max-height:40px;">${item.name}</div>
                        <p class="red">￥${item.price}</p></a>
                    </li>
                    `
                }).join(''));

            })
        })


        // 楼梯
        var $floors = $('.diy-floor');
        var $floorsItem = $('.diy-elevator').find('a');
        $(document).scroll(function(){
            var scrollTop = $(window).scrollTop();

            if(scrollTop > 800){
                $('.diy-elevator').css('display','block');
            }else{
                $('.diy-elevator').css('display','none');
            }

            // 如何判断滚动到响应楼层
            // 当滚动到相应的楼层时，楼梯"相应位置"显示高亮
            $floors.each(function(idx,ele){

                if(scrollTop >= $(ele).offset().top - $(ele).outerHeight()/2){
                     $floorsItem.eq(idx).addClass('active').siblings('a').removeClass('active');
                }
            })
        })
        // 点击楼梯跳到对应楼层
        $('.diy-elevator').on('click','a',function(){   
            var targetScrollTop;
            if($(this).hasClass('last')){
                targetScrollTop = 0
            }else{
                var idx = $(this).index();

                // 获取对应楼层所在的偏移量
                targetScrollTop = $floors.eq(idx).offset().top;
            }
            $('html,body').stop().animate({'scrollTop':targetScrollTop},'slow');
        })

    })  
})


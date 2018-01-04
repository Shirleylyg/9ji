// 设置别名

require(['config'],function(){
      require(['jquery','slide'],function($,sli){

        // 轮播图
        $('.ck-slide').ckSlide({
            autoPlay: true
        });


        // 底部“加载更多好货”点击加载更多
        // 人工限制加载次数只可以加载2次数
        var qty = 0;
        $('#loadmore').on('click',function(){
            qty++;
            if(qty>=2){
                $('#loadmore').remove();
            }
            var $xhr = $.get('./api/idxgoodslist.php',function(){
                var res = JSON.parse($xhr.responseText);
                // 当请求数据已经没有的时候，删除加载按钮
                if(res === ''){
                    $('#loadmore').remove();
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
  
    })  
})


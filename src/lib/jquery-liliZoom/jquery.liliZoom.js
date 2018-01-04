/* 
* @Author: ShirleyLu
* @Date:   2017-12-28 16:57:00
* @Last Modified by:   Marte
* @Last Modified time: 2017-12-28 20:49:22
*/
;(function($){
    // 给jq原型添加方法
    $.fn.liliZoom = function(options){
        // 默认参数
        var defaults = {
            // 宽高
            width: 200,
            height: 100,
            // 定位
            position: 'right',
            // 大图小图之间的距离
            gap: 10
        }

        // 遍历作用与当前元素
        return this.each(function(){
            // 变量接收实例,this是节点，用jq对象操作比较方便
            $small = $(this);

            // 合并默认传入参数
            var opt = $.extend({},defaults,options);
            // 添加类名样式
            $small.addClass('lili-zoom');
            // 创建放大镜
            var zoom = {
                // 这里的this是zoom
                // 初始化
                init(){
                    // 获取小图图片
                    this.$smallImg = $small.children('img');
                    // 小图上的放大镜
                    this.$smallZoom = $('<div/>').addClass('small-zoom');
                    // 生成大图容器
                    this.$big = $('<div/>').addClass('big');
                    // 大图容器的定位
                    var left,top;
                    if(opt.position === 'right'){
                        left = $small.offset().left + $small.outerWidth() + opt.gap;
                        top = $small.offset().top;
                    }else if(opt.position === 'left'){
                        left = $small.offset().left - opt.gap - opt.width;
                        top = $small.offset().top;
                    }else if(opt.position === 'top'){
                        left = $small.offset().left;
                        top = $small.offset().top - opt.gap - opt.height;
                    }else if(opt.position === 'bottom'){
                        left = $small.offset().left;
                        top = $small.offset().top + opt.gap + $small.outerHeight();
                    }
                    // 设置大图容器样式
                    this.$big.css({
                        width: opt.width,
                        height: opt.height,
                        left : left,
                        top: top
                    });
                    // 生成大图
                    this.$bigImg = $('<img/>');
                    
                    // 绑定事件，鼠标移入小图容器，放大镜出现，大图容器出现，大图出现
                    $small.on('mouseenter',function(){
                        zoom.show();
                    }.bind(this)).on('mouseleaver',function(){
                        // zoom.hide();
                    }.bind(this)).on('mousemove',function(e){
                        // console.log(this)
                        // 鼠标移动放大镜移动,要获取鼠标位置,要除去一些偏差，浏览器边框和滚动条
                        this.move(e.pageX,e.pageY);
                    }.bind(this))
                },
                // 显示图片
                show(){
                    // 把放大镜放到小图
                    this.$smallZoom.appendTo($small);
                    // 把大图添加到大图容器，大图容器放到页面
                    this.$bigImg.attr('src',this.$smallImg.attr('data-big')).appendTo(this.$big);
                    this.$big.appendTo('body');
                    // 等图片加载完成后，获取大图宽高，计算大小图比例，设置放大镜大小
                    this.$bigImg[0].onload = function(){
                        this.ratio = this.$bigImg.outerWidth()/this.$smallImg.outerWidth();

                        // 根据比例设置放大镜大小
                        this.$smallZoom.css({
                            width: opt.width/this.ratio,
                            height: opt.height/this.ratio
                        })
                    }.bind(this);
                },
                // 隐藏图片
                hide(){
                    // 鼠标移开删除放大镜和大图
                    this.$smallZoom.remove();
                    this.$big.remove();
                },
                // 当鼠标移动的时候放大镜和大图移动
                move(x,y){
                    // 放大镜的定位是在小图容器中的，求的是放大镜到小图容器的定位，鼠标到浏览器的距离e.pageX - 小图容器的offsetleft,再减去自身宽度一半
                    var left = x - $small.offset().left - this.$smallZoom.outerWidth()/2;
                    var top = y - $small.offset().top - this.$smallZoom.outerHeight()/2;

                    // 限定left移动范围
                    if(left <0){
                        left = 0;
                    }else if(left >  $small.outerWidth() - this.$smallZoom.outerWidth()){
                        left =  $small.outerWidth() - this.$smallZoom.outerWidth();
                    }
                    // 限定top移动范围
                    if(top < 0){
                        top = 0;
                    }else if(top > $small.outerHeight() - this.$smallZoom.outerHeight()){
                        top = $small.outerHeight() - this.$smallZoom.outerHeight();
                    }
                    // 给放大镜定位
                    this.$smallZoom.css({
                        left: left,
                        top: top
                    })
                    
                    // 给大图定位
                    this.$bigImg.css({
                        left: -left*this.ratio,
                        top: -top*this.ratio
                    })
                }
            }
            zoom.init();
        }); 
    }    
})(jQuery);
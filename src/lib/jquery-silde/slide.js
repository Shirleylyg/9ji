;(function($){
    $.fn.ckSlide = function(opts){
        opts = $.extend({}, $.fn.ckSlide.opts, opts);
        this.each(function(){
            var slidewrap = $(this).find('.ck-slide-wrapper');
            var slide = slidewrap.find('li');
            var count = slide.length;
            var that = this;
            var index = 0;
            var time = null;
            $(this).data('opts', opts);
            // next
            $(this).find('.ck-next').on('click', function(){
                if(opts['isAnimate'] == true){
                    return;
                }
                
                var old = index;
                if(index >= count - 1){
                    index = 0;
                }else{
                    index++;
                }
                change.call(that, index, old);
            });
            // prev
            $(this).find('.ck-prev').on('click', function(){
                if(opts['isAnimate'] == true){
                    return;
                }
                
                var old = index;
                if(index <= 0){
                    index = count - 1;
                }else{                                      
                    index--;
                }
                change.call(that, index, old);
            });
            $(this).find('.ck-slidebox li').each(function(cindex){
                $(this).on('click.slidebox', function(){
                    change.call(that, cindex, index);
                    index = cindex;
                });
            });
    
            // focus clean auto play
            $(this).on('mouseover', '.ck-slide-wrapper li a',function(){
                if(opts.autoPlay){
                    clearInterval(time);
                }
                $(this).parents('.ck-slide').find('.ctrl-slide').css({opacity:0.6});
            });
            //  leave
            $(this).on('mouseleave','.ck-slide-wrapper li a' ,function(){
                if(opts.autoPlay){
                    startAtuoPlay();
                }
                $(this).parents('.ck-slide').find('.ctrl-slide').css({opacity:0});
            });
            startAtuoPlay();
            // auto play
            function startAtuoPlay(){
                if(opts.autoPlay){
                    time  = setInterval(function(){
                        var old = index;
                        if(index >= count - 1){
                            index = 0;
                        }else{
                            index++;
                        }
                        // console.log(index);
                        var $li = $('.ck-slide-wrapper li');
                        // 设置li背景颜色
                        switch(index){
                            case 0:
                                 $li[index].style.backgroundColor = '#EA4B50';
                                 break;
                            case 1:
                                $li[index].style.backgroundColor = '#9721EF';
                                break;
                            case 2:
                                $li[index].style.backgroundColor = '#E3393C';
                                break;
                            case 3:
                                $li[index].style.backgroundColor = '#5D13DC';
                                break;
                            case 4:
                                $li[index].style.backgroundColor = '#FCA11D';
                                break;
                            case 5:
                                $li[index].style.backgroundColor = '#052234';
                                break;
                        }
                        change.call(that, index, old);
                    }, 2000);
                }
            }
            // 修正box
            var box = $(this).find('.ck-slidebox');
            box.css({
                'margin-left':-(box.width() / 2)
            })
            // dir
            switch(opts.dir){
                case "x":
                    opts['width'] = $(this).width();
                    slidewrap.css({
                        'width':count * opts['width']
                    });
                    slide.css({
                        'float':'left',
                        'position':'relative'
                    });
                    slidewrap.wrap('<div class="ck-slide-dir"></div>');
                    slide.show();
                    break;
            }
        });
    };
    function change(show, hide){
        var opts = $(this).data('opts');
        if(opts.dir == 'x'){
            var x = show * opts['width'];
            $(this).find('.ck-slide-wrapper').stop().animate({'margin-left':-x}, function(){opts['isAnimate'] = false;});
            opts['isAnimate'] = true
        }else{
            $(this).find('.ck-slide-wrapper li').eq(hide).stop().animate({opacity:0});
            $(this).find('.ck-slide-wrapper li').eq(show).show().css({opacity:0}).stop().animate({opacity:1});
        }
       
        $(this).find('.ck-slidebox li').removeClass('current');
        $(this).find('.ck-slidebox li').eq(show).addClass('current');
    }
    $.fn.ckSlide.opts = {
        autoPlay: false,
        dir: null,
        isAnimate: false
    };
})(jQuery);
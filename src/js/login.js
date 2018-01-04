
require(['config'],function(){
      require(['jquery'],function($){
        // 点击切换
        $('#login').on('click','.login-tab li',function(){
            $(this).addClass('login-on').siblings().removeClass('login-on');
            if($(this).hasClass('log1')){
                $('.login-body .log1').show().next().hide();
            }else if($(this).hasClass('log2')){
                 $('.login-body .log2').show().prev().hide();
            }
        })
        // 生成验证码
        function vCode(){
            // 生成16进制随机数
            var code = function(){
                return parseInt(Math.random()*16).toString(16);
            }
            var res = '';
            for(var i =0;i<4;i++){
                res += code();
            }
            $('#vcode')[0].innerHTML = res;
        }
        vCode();
    })  
})


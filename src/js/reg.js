/* 
* @Author: Marte
* @Date:   2018-01-04 14:24:20
* @Last Modified by:   Marte
* @Last Modified time: 2018-01-04 14:49:54
*/
require(['config'],function(){
      require(['jquery'],function($){
        // 点击切换
        $('.login_wrap').on('click','.zhuce-tab li',function(){
            $(this).addClass('xz').siblings().removeClass('xz');
            if($(this).hasClass('reg1')){
                $('.xxknr .reg1').show().next().hide();
            }else if($(this).hasClass('reg2')){
                 $('.xxknr .reg2').show().prev().hide();
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
            return res;
        }
        $('#vcode')[0].innerHTML = vCode();
        $('#vcode2')[0].innerHTML = vCode();
        $('#change')[0].onclick = vCode;
         $('#change2')[0].onclick = vCode;
    })  
})
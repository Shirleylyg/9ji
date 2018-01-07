/* 
* @Author: Marte
* @Date:   2018-01-04 14:24:20
* @Last Modified by:   Marte
* @Last Modified time: 2018-01-07 16:06:00
*/
require(['config'],function(){
      require(['jquery'],function($){
        // 点击切换
        /*$('.login_wrap').on('click','.zhuce-tab li',function(){
            $(this).addClass('xz').siblings().removeClass('xz');
            $('.reg').eq($(this).index()).show().siblings().hide();

        })*/
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
        // $('#vcode2')[0].innerHTML = vCode();
        $('#change')[0].onclick = vCode;
        // $('#change2')[0].onclick = vCode;

        // 用户名是否占用
        $('#username').on('change',function(){
            var _username = this.value;
            $.ajax({
                url:'../api/reg.php',
                data:{
                    username:_username
                },
                success:function(res){
                    if($('#username').next('span').html()){
                        $('#username').next('span').remove();
                    }
                    if(res === 'ok1'){
                        $('#username').after(`<span class="ok" style="color:#58bc58;">√</span>`);
                    }else{
                        $('#username').after(`<span class="fail" style="color:red;">用户名不合法</span>`);
                    }
                }
            })
        })
        // 把用户名密码放进数据库
        $('#password').on('change',function(){
            var _password = this.value;
            if($('#password').next('span').html()){
                $('#password').next('span').remove();
            }
            if(_password.length <6){
                $('#password').after(`<span class="fail" style="color:red;">密码不合法</span>`);
                
            }else{
                 $('#password').after(`<span class="ok" style="color:#58bc58;">√</span>`);
            }
            
        })

        // 验证码
        $('#yzmcode').on('change',function(){
            var _yzmcode = this.value;
            if($('#yzmcode').next('span').html()){
                $('#yzmcode').next('span').remove();
            }
            if(_yzmcode === $('#vcode').html()){
                $('#yzmcode').after(`<span  class="ok" style="color:#58bc58;;">√</span>`);
            }else{
                 $('#yzmcode').after(`<span class="fail" style="color:red;">验证码不合法</span>`);
            }
        })

        $('#mmprovision').on('click',function(){
             if($('#mmprovision')[0].checked){
                var $dd = $('#mmprovision').closest('dd');
                if($dd.find('p')){
                    $dd.find('p').remove();
                }  
            }
        })
       

        // 点击注册用户
        $('#regbut').on('click',function(){
            var _username = $('#username')[0].value;
            var _password = $('#password')[0].value;
            var _yzmcode = $('#yzmcode')[0].value;

            if(_username == '' || $('#username').next('.ok').html() != '√'){
                console.log(11)
                $('#username').focus();
            }else if(_password == '' || $('#password').next('.ok').html() != '√'  || _password.length <6){
                $('#password').focus();
            }else if(_yzmcode == '' || $('#yzmcode').next('.ok').html() != '√'){
                $('#yzmcode').focus();
            }else if($('#mmprovision')[0].checked === false){
                var $dd = $('#mmprovision').closest('dd');
                $('</p>').html('请阅读并同意《九机网用户协议》').appendTo($dd);
            }else{
                $.ajax({
                    url:'../api/reg.php',
                    data:{
                        username:_username,
                        password:_password
                    },
                    success:function(res){
                        location.href = '../index.html?username=' + _username;
                    }
                })
            }
            
        })

    })  
})
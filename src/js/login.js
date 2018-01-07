
require(['config'],function(){
      require(['jquery'],function($){
        // 点击切换
        /*$('#login').on('click','.login-tab li',function(){
            $(this).addClass('login-on').siblings().removeClass('login-on');
            $('.login-style').eq($(this).index()).show().siblings().hide();
        })*/
        // 生成验证码
        /*function vCode(){
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
        vCode();*/
        $('#txtUser').on('change',function(){
            if($('#txtUser').closest('dd').find('p')){
                $('#txtUser').closest('dd').find('p').remove();
            }
        })
        $('#Userpwd').on('change',function(){
            if($('#Userpwd').closest('dd').find('p')){
                $('#Userpwd').closest('dd').find('p').remove();
            }
        })
        $('#logbtn').on('click',function(){
           var _username = $('#txtUser')[0].value;
           var _password = $('#Userpwd')[0].value;

           if(_username === ''){
                var $dd = $('#txtUser').closest('dd');
                $('</p>').html('用户名不能为空').appendTo($dd);
                $('#txtUser').focus();
           }else if(_password === ''){
                var $dd = $('#Userpwd').closest('dd');
                $('</p>').html('密码不能为空').appendTo($dd);
                $('#Userpwd').focus();
           }else{
                $.ajax({
                    url:'../api/login.php',
                    data:{
                        username:_username,
                        password:_password
                    },
                    success:function(res){
                        if(res === 'ok'){
                            location.href = '../index.html?username=' + _username;
                        }else if(res === 'fail'){
                            if($('#Userpwd').closest('dd').find('p')){
                                $('#Userpwd').closest('dd').find('p').html('用户名/密码不正确');
                            }

                            var $dd = $('#Userpwd').closest('dd');
                            $('</p>').html('用户名/密码不正确').appendTo($dd);
                        }
                    }
                })
           }
           
        })
    })  
})


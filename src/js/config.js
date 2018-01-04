require.config({
    // 别名/虚拟路径
    paths:{
        'jquery':'../lib/jquery-3.2.1',
        
        'slide':'../lib/jquery-silde/slide'
    },
    shim:{
        // 设置依赖
        slide:['jquery']
    }

});
require.config({
    // 别名/虚拟路径
    paths:{
        'jquery':'../lib/jquery-3.2.1',
        
        'slide':'../lib/jquery-silde/slide',
        
        'imgZoom':'../lib/jquery-imgZoom/jquery.imgZoom'
    },
    shim:{
        // 设置依赖
        slide:['jquery'],
        imgZoom:['jquery'],
        common:['jquery']
    }

});
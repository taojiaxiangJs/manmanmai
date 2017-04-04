/**
 * Created by Administrator on 2017/3/6.
 */
//requierjs的配置
requirejs.config({
    baseUrl:'/MICmmm/code/',
    paths:{
        //第三方库的路径配置
        jquery:'lib/jquery/jquery.min',
        bootstrap:'lib/bootstrap/js/bootstrap.min',
        jqueryCookie:'lib/jquery-cookie/jquery.cookie',
        template:'lib/template/template',
        templaten:'lib/template/template-native',
        util:'lib/common/util',
        jqueryLazyload:'lib/jQuery-plugins/jquery.lazyload.min',

        //自己写的路径配置
        common:'common/common',
        index:'js/index',
        brand:'js/brandTitle',
        brandContent:'js/brandContent',
        coprice:'js/coprice',
        swipe:'js/swipe',
        cpshopping:'js/cpshopping',
        dccoupon:'js/dccoupon',
        dmdiscount:'js/dmdiscount',
        gtitem:'js/gtitem',
        mallnav:'js/mallnav',
        savemoney:'js/savemoney',
        particulars:'js/particulars',
        productlist:'js/productlist',
        category:'js/category',
        yq_quan:'js/yq_quan',
    },
    shim:{
        bootstrap:{
            deps:['jquery']
        },
        jqueryLazyload:{
            deps:['jquery']
        }
    }
});

//所有页面都需要的js，现行加载
require(['jquery','bootstrap','common','util']);

//获取页面的pathname，然后对应的加载js
(function (window) {
    //获取路径
    var pathname=window.location.pathname;
    require(['jquery'], function ($) {
        switch (pathname){
            case '/MICmmm/code/':
                require(['index']);
                break;
            case '/MICmmm/code/index.html':
                require(['index']);
                break;
            case '/MICmmm/code/brandTitle.html':
                require(['brand']);
                break;
            case '/MICmmm/code/brandContent.html':
                require(['brandContent']);
                break;
            case '/MICmmm/code/category.html':
                require(['cpshopping']);
                break;
            case '/MICmmm/code/categorya.html':
                require(['category']);
                break;
            case '/MICmmm/code/productlist.html':
                require(['productlist']);
                break;
            case '/MICmmm/code/gsproduct.html':
                require(['gtitem']);
                break;
            case '/MICmmm/code/moneyctrl.html':
                require(['savemoney']);
                break;
            case '/MICmmm/code/particulars.html':
                require(['particulars']);
                break;
            case '/MICmmm/code/sitenav.html':
                require(['mallnav']);
                break;
            case '/MICmmm/code/baicaijia.html':
                require(['coprice','swipe']);
                break;
            case '/MICmmm/code/inlanddiscount.html':
                require(['dmdiscount']);
                break;
            case '/MICmmm/code/html/coupon.html':
                require(['dccoupon']);
                break;
            case '/MICmmm/code/html/couponproduct.html':
                require(['yq_quan']);
                break;
        }
    });
})(window);
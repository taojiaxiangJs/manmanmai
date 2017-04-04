//首页
define(['jquery','template'], function ($,template) {
    //获取菜单栏相应数据，进行模板渲染
    $.get('http://139.199.157.195:9090/api/getindexmenu', function (data) {
        var html=template('nav_tpl',data);
        $('.big-classify .row').html(html);
    });
    //更多的隐藏与显示操作
    $('.big-classify .row').on('click','>div:nth-child(8)', function () {
        $('.big-classify .row > div:nth-last-child(-n+4)').slideToggle();
    });
    //获取列表的数据，进行模板渲染
    $.get('http://139.199.157.195:9090/api/getmoneyctrl', function (data) {
        var html=template('list_tpl',data);
        $('#cxdiv').html(html);
    })
    //截取评论人数的数字
    template.helper('getNum',getNum);
    function getNum(str) {
        return str.slice(1,2);
    }
    //开启轮播图
    common.bannerLoop(document.querySelector('.index_slide'));

});
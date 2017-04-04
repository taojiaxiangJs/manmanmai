/**
 * Created by Administrator on 2017/3/9.
 */
//比价购买
define(['jquery','template'],function ($,template) {
    var productid = util.getQueryString('productid');
    console.log(productid);
    $.ajax({
        type:'get',
        url:'http://139.199.157.195:9090/api/getproduct',
        data:{'productid':productid},
        success: function (result) {
            var html=template('getproduct',result);
            $("#getproductkeng").html(html);
        }
    })

//评论
    $.ajax({
        type:'get',
        url:'http://139.199.157.195:9090/api/getproductcom',
        data:{'productid':productid},
        success: function (result) {
            var html=template('getproductcom',result);
            $("#getproductcomkeng").html(html);
        }
    })


    $.ajax({
        type:'get',
        url:'http://139.199.157.195:9090/api/getproduct',
        data:{'productid':productid},
        success: function (result) {
            var html=template('categoryshop',result);
            $(".shop").html(html);
        }
    })
    /*--------------------滚动回顶部事件-------------------*/
    function getWin(attr) {//获取window下的元素属性
        return document.documentElement[attr] || document.body[attr];
    };
    var scrTop = document.querySelector(".scrTop");
    var ch = getWin("clientHeight");
    window.onscroll = function () {//判断返回顶部的出现时候；
        var sT = getWin("scrollTop");
        if (sT >= ch) {
            scrTop.style.display = "block";
        }else{
            scrTop.style.display = "none";
        }
    };
    function move() {
        scrTop.style.display = 'none';
        window.clearTimeout(scrTop.timer);
        scrTop.timer = null;
        document.body.scrollTop -= 50;
        if ((document.body.scrollTop - 50) <= 0) {
            document.body.scrollTop = 0;
            return;
        }
        scrTop.timer = window.setTimeout(move, 10);
    }
    scrTop.addEventListener('click',move);
})
/**
 * Created by Administrator on 2017/3/6.
 */
//凑单品
define(['jquery','template','bootstrap','jqueryLazyload',],function ($,template,bootstrap,undefined) {
    var shopid = 0,areaid=0;
    $.get('http://139.199.157.195:9090/api/getgsshop',function (data) {
       var html = template('one_head_tml',data);
        $("#one_head").html(html);
        shopid = $('#one_head li a').data('shopid');
    });
    $.get('http://139.199.157.195:9090/api/getgsshoparea',function (data) {
        var html = template('two_head_tml',data);
        $("#two_head").html(html);
        areaid = $('#two_head li a').data('areaid');
    });
    /*---------------模板字符截取---------------*/
    template.helper('getNum',getNum);
    function getNum(str) {
        return str.slice(0,2);
    };
    template.helper('fadein',fadein);
    function fadein(obj) {
        return obj.fadein(1500);
    }
    $("#one_head").on('click','li',function () {
        var val = $(this).text();
        $('#one .btntab').html(val);
        $ind = $(this).index();
        console.log($ind)+1;
        getData($ind,areaid);
    });
    $("#two_head").on('click','li',function (e) {
        var val = $(this).text();
        $('#two .btntab').html(val);
        $ind = $(this).index();
        console.log($ind)+1;
        getData(shopid,$ind);
    });

    getData(shopid,areaid);
    function getData(shopid,areaid){
        $.ajax({
            url:"http://139.199.157.195:9090/api/getgsproduct",
            data:{shopid:shopid,areaid:areaid},
            success:function(result){
                var html = template("product_tml",result);
                $('.product_list').html(html);
            },
            complete:function () {
                $(".pic img.lazy").lazyload({
                    effect : "fadeIn",
                    placeholder:"../images/wsImg/loading.gif"
                });
            },
        });
    };
    /*滚动回顶部*/
    /**
     * 获取window下的任意属性
     * @param value
     * @returns {*}
     */
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

});
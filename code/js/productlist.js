/**
 * Created by pc on 2017/3/7.
 */
define(['jquery','template',],function ($, template) {
    var categoryid = util.getQueryString('categoryId');
    var pageid = util.getQueryString('pageid');
    /*-----------------------渲染商品列表名称------------------------*/
    $.get('http://139.199.157.195:9090/api/getcategorybyid',{categoryid:categoryid},function (data) {
        // console.log(data);
        var html = template('categoryProduct',data);
        $('#currentproduct').html(html);
    });
    /*-------------------------渲染商品列表-------------------------*/
    var getData = function (callback) {
        $.get('http://139.199.157.195:9090/api/getproductlist',{categoryid:categoryid,pageid:pageid},function (data) {
            callback && callback(data);
        });
    };
    var temppage;
    function renderData() {
        getData(function (data) {
            temppage = Math.ceil(data.totalCount / data.pagesize);
            var html = template('product_list_tml',{list:data.result});
            $("#totalItem").html(html);
            for(var i =0;i<temppage;i++){
                var lis = $('<li class="pageTable"><a href="javascript:;">第'+(i+1)+'页</a></li>');
                $('.single .selpage').append(lis);
            };
            $(".single .selpage").on('click','li',function () {
                var val = $(this).text();
                $('.tabbutton').html(val);
                $ind = $(this).index()+1;
                $('html,body').animate({scrollTop:0},600);
                $.get('http://139.199.157.195:9090/api/getproductlist',{categoryid:categoryid,pageid:$ind},function (data) {
                    var html = template('product_list_tml',{list:data.result});
                    $("#totalItem").html(html);
                })
                pageid++;
            });
        });
    };
    renderData();
    /*上下翻页*/
    $('.prevpage').click(function () {
       if(pageid == 1){
           alert("当前已经是第一页")
           return false;
       }else {
           pageid--;
           $('.tabbutton').html("第"+(pageid)+"页");
           $('html,body').animate({scrollTop:0},600);
           $.get('http://139.199.157.195:9090/api/getproductlist',{categoryid:categoryid,pageid:pageid},function (data) {
               var html = template('product_list_tml',{list:data.result});
               $("#totalItem").html(html);
           })
       }
    })
    $('.nextpage').click(function () {
        if (pageid == temppage){
            alert("已经是最后一页了");
            return false;
        }else {
            pageid++;
            $('.tabbutton').html("第"+(pageid)+"页");
            $('html,body').animate({scrollTop:0},600);
            $.get('http://139.199.157.195:9090/api/getproductlist',{categoryid:categoryid,pageid:pageid},function (data) {
                var html = template('product_list_tml',{list:data.result});
                $("#totalItem").html(html);
            })
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
});

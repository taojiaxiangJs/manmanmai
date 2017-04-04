

/*导航*/
define(['jquery','template','jqueryLazyload'],function ($,template,undefined) {
        $.ajax({
            url:'http://139.199.157.195:9090/api/getbaicaijiatitle',
            type:'get',
            success:function(data) {
                var html = template('coprice_nav', {list: data.result})
                $("#coprice_nav_ul").html(html);
                $.ajax({
                    url: "http://139.199.157.195:9090/api/getbaicaijiaproduct",
                    type: 'get',
                    data: {titleid :0 },
                    success: function (data) {
                        console.log(data.result);
                        var html = template('coprice_content', {list: data.result});
                        $("#coprice_content_wrap").html(html);
                    }
                });

                // template.helper('isreplace',isreplace);
                // function isreplace(str) {
                //     return str.replace(/\s(src)=/, function () {
                //         return ' class="lazy" data-original='
                //     });
                // }

                $(".coprice_nav").delegate('li', 'click', function (e) {
                    var li = e.target;
                    $(li).addClass('active').siblings().removeClass('active');

                    $.ajax({
                        url: "http://139.199.157.195:9090/api/getbaicaijiaproduct",
                        type: 'get',
                        data: {titleid :$(li).attr("data-id")},
                        success: function (data) {
                            var html = template('coprice_content', {list: data.result});
                            $("#coprice_content_wrap").html(html);
                        }
                    });
                });
            }
        });

        /*返回顶部*/
        $(".return_top").click(function(){
            $("html,body").animate({
                scrollTop:0
            },500);
        });
        /*返回顶部悬浮按钮*/
        $(window).scroll(function(){
            if($(window).scrollTop() >= 100){
                $(".gotop").fadeIn(600);
            }else{
                $(".gotop").fadeOut(600);
            }
            //注册事件
            $(".gotop").click(function(){
                $("html,body").animate({
                    scrollTop:0
                },500);
            });
        });
        huadong.iScroll({
            /*你想滑动的内容的父容器*/
            swipeDom:document.querySelector(".coprice_nav"),
            /*滑动的方向 */
            swipeType:'x',
            /*滑动的弹簧区间*/
            swipeDistance:50
        });
});

/*导航滑动*/
/*插件的细节：
 * 1.所谓的父容器和子容器有严格的限制：子容器必须是一个单一的盒子，不能有兄弟元素
 * 2.父容器的高度必须小于子元素的高度值,否则滑动没有意义*/
window.onload=function(){

}



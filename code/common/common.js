/**
 * Created by Administrator on 2017/3/6.
 */
//公共js加载
window.common = {
    //获取api的数据
    getApiData: function (obj) {
        var api = obj.api || '';
        var callback = obj.callback || function () {};
        var id = obj.id;
        $.ajax({
            url:api,
            data:{idTitle:id},
            success: function (result) {
                callback && callback(result);
            }
        })
    },
    //获取url里的传来的参数
    getUrlParam:function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    },
    //开启过渡
    openTransition:function(dom){
        dom.style.transition = "all,0.5s";
        dom.style.webkitTransition = "all,0.5s";
    },
    //停止过渡
    removeTransition:function(dom){
        dom.style.transition = "none";
        dom.style.webkitTransition = "none";
    },
    //设置过渡
    setTransform:function(dom,distance){
        dom.style.transform = "translateX("+distance+"px)";
        dom.style.webkitTransform = "translateX("+distance+"px)";
    },
    //轮播图
    bannerLoop:function (banner){
        var bannerWidth = banner.offsetWidth;//轮播图宽度
        var bannerUl = banner.querySelector("ul:first-child");//获取轮播图的ul
        var bannerLis = bannerUl.querySelectorAll("li");//获取轮播图的li
        var first = bannerLis[0].cloneNode(true);//clone第一张图片
        var last = bannerLis[bannerLis.length - 1].cloneNode(true);//clone最后一张图片
        bannerUl.appendChild(first);//把clone的第一张图片放在最后
        bannerUl.insertBefore(last, bannerLis[0]);//把clone的最后一张放在最前边
        bannerLis = bannerUl.querySelectorAll("li");//再次获取全部的li
        var lisLength = bannerLis.length;//获取li的个数
        bannerUl.style.width = lisLength * 100 + "%";//重新设置ul的总宽度
        bannerUl.style.transform = "translateX(" + (-100 / lisLength) + "%)";//设置初始显示实际的第一张图片
        //改变屏幕大小时的事件
        window.addEventListener("resize", function () {
            bannerUl.style.width = lisLength * 100 + "%";
            bannerUl.style.transform = "translateX(" + (-100 / lisLength) + "%)";
            bannerWidth = banner.offsetWidth;
        });
        for (var i = 0; i < bannerLis.length; i++) {
            bannerLis[i].style.width = 100 / bannerLis.length + "%";//设置每张图片占据的宽度百分比
        }

        var index = 1;//图片的索引
        var timerId = null;//定义一个定时器
        //轮播图下的点
        var dotsUl = banner.querySelector("ul:last-child");
        for (var i = 0; i < bannerLis.length - 2; i++) {
            var dotsli = document.createElement("li");
            dotsUl.appendChild(dotsli);
        }
        var dotsLis = dotsUl.children;
        dotsLis[0].classList.add("active");
        dotsUl.style.width = dotsLis.length * 20 + "px";
        //开启定时器
        openTimer();
        //添加触摸滑动的事件
        var startX = 0;
        var moveX = 0;
        var distance = 0;
        bannerUl.addEventListener("touchstart", function (e) {
            clearInterval(timerId);
            startX = e.touches[0].clientX;
        });
        bannerUl.addEventListener("touchmove", function (e) {
            moveX = e.touches[0].clientX;
            distance = moveX - startX;
            common.setTransform(bannerUl, -index * bannerWidth + distance);
        });
        bannerUl.addEventListener("touchend", function (e) {
            if (Math.abs(distance) >= bannerWidth / 3) {
                if (distance > 0) {
                    index--;
                    common.openTransition(bannerUl);
                    common.setTransform(bannerUl, -index * bannerWidth);
                } else {
                    index++;
                    common.openTransition(bannerUl);
                    common.setTransform(bannerUl, -index * bannerWidth);
                }
            } else {
                common.openTransition(bannerUl);
                common.setTransform(bannerUl, -index * bannerWidth);
            }
            openTimer();
        });
        //监听滑动结束后的事件
        bannerUl.addEventListener("transitionEnd", function () {
            if (index == 0) {
                index = lisLength - 2;
                common.removeTransition(bannerUl);
                common.setTransform(bannerUl, -index * bannerWidth);
            } else if (index == lisLength - 1) {
                index = 1;
                common.removeTransition(bannerUl);
                common.setTransform(bannerUl, -index * bannerWidth);
            }
            lisStyle()
        });
        bannerUl.addEventListener("webkitTransitionEnd", function () {
            if (index <= 0) {
                index = lisLength - 2;
                common.removeTransition(bannerUl);
                common.setTransform(bannerUl, -index * bannerWidth);
            } else if (index >= lisLength - 1) {
                index = 1;
                common.removeTransition(bannerUl);
                common.setTransform(bannerUl, -index * bannerWidth);
            }
            lisStyle()
        });
        //开启定时器方法
        function openTimer() {
            timerId = setInterval(function () {
                index++;
                common.openTransition(bannerUl);
                common.setTransform(bannerUl, -index * bannerWidth);
            }, 2000);
        }

        //轮播点的样式
        function lisStyle() {
            for (var i = 0; i < dotsLis.length; i++) {
                dotsLis[i].classList.remove("active");
            }
            dotsLis[index - 1].classList.add("active");
        }
    },

    //根据触摸的时间来做相应的事件
    tap:function(dom,callback){
        var isMove = false;
        var startTime = null;
        dom.addEventListener("touchstart", function(e){
            startTime = Date.now();
        });
        dom.addEventListener("touchmove", function(e){
            isMove = true;
        });
        dom.addEventListener("touchend", function(e){
            if(!isMove && Date.now()-startTime<=150){
                callback && callback(e);
            }
            isMove = false;
        });
    }
};
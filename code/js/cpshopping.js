/**
 * Created by Administrator on 2017/3/6.
 */
define(['jquery','template'],function ($,template) {
    /*分类的标题*/
    $(function() {
        var getCateGoryTitle = function(callback) {
            $.get('http://mmb.ittun.com/api/getcategorytitle', function(data) {
                callback && callback(data);
            });
        };
        function renderTitle() {
            getCateGoryTitle(function(data) {
                var html = template('category_tml', { list: data.result });
                $('.taggle_list').html(html);
                /*主要的each方法遍历a标签*/
                $.each( $(".taggle_list a"),function (i,v) {
                    var titleid=$(v).data("titleid"); //获取a标签的自定义属性
                    var aValue=v; //获取每一个a
                    $.get("http://mmb.ittun.com/api/getcategory?titleid="+titleid,function (res) {
                        var sonHtml=template("category_product_tml",res);
                        $(aValue).next().html(sonHtml); //让a标签的下一个兄弟姐妹元素内容等于渲染后回来的对应分类
                    })
                })
            });
        }
        renderTitle(); //调用子分类渲染函数
        $('.toggle').on('click', '.show', function() {
            $(this).siblings('ul').slideToggle().parent().siblings().children('ul').hide();
        });
    });
});

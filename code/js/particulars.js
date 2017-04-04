/**
 * Created by Administrator on 2017/3/8.
 */
define(['jquery','templaten'],function ($,template) {
    var pageid = util.getQueryString("productId");
    $.ajax({
        type:'get',
        url:'http://139.199.157.195:9090/api/getmoneyctrlproduct',
        data:{'productid':pageid},
        success:function(result){
            var html = template("moneyproduct",result);
            $("main").html(html);
        }
    });
});

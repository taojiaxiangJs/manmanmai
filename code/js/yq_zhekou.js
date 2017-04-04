/**
 * Created by Administrator on 2017/3/8.
 */
define(['jquery','template'],function ($, template) {
    var pageid = util.getQueryString("productid");
    console.log(pageid);
    $.ajax({
        type:'get',
        url:'http://139.199.157.195:9090/api/getdiscountproduct',
        data:{'productid':pageid},
        success:function(result){
            var html = template("moneyproduct",result);
            $("main").html(html);
        }
    });
});

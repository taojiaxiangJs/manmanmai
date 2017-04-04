/**
 * Created by Administrator on 2017/3/6.
 */
//国内折扣
define(['jquery','template'], function($, template) {
    $.ajax({
        url:'http://139.199.157.195:9090/api/getinlanddiscount',
        data:{},
        success:function (data) {
            var html=template('list_tpl',data);
            $('.main').html(html);
        }
    });
});
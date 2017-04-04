/**
 * Created by Administrator on 2017/3/6.
 */
//优惠券
//优惠券获取数据与渲染
define(['jquery','template'], function ($, template) {
    $.get('http://139.199.157.195:9090/api/getcoupon', function (data) {
        var html = template('list_tpl',data);
        $('.homes').html(html);
    });
});
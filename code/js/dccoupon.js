/**
 * Created by Administrator on 2017/3/6.
 */
//�Ż�ȯ
//�Ż�ȯ��ȡ��������Ⱦ
define(['jquery','template'], function ($, template) {
    $.get('http://139.199.157.195:9090/api/getcoupon', function (data) {
        var html = template('list_tpl',data);
        $('.homes').html(html);
    });
});
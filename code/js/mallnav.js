/**
 * Created by Administrator on 2017/3/6.
 */
//�̳ǵ���
//$.ajax({
//    url: "http://139.199.157.195:9090/api/getsitenav",
//    type: 'get',
//
//    success: function (result) {
//        var html = template('mallnav_link',result);
//        $("#mallnav_content").html(html);
//    }
//});


define(['jquery','template'],function ($, template) {
    $.get('http://139.199.157.195:9090/api/getsitenav', function (result) {
        var html = template('mallnav_link',result);
        $("#mallnav_content").html(html);
    });
});

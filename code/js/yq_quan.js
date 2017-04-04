/**
 * Created by Administrator on 2017/3/8 0008.
 */
var couponid = location.search;
//console.log(location.search);
couponid = couponid.slice(1);
couponid = couponid.split('=');
var couponId = couponid[1];
$.ajax({
    url: "http://139.199.157.195:9090/api/getcouponproduct",
    //http://139.199.157.195:9090/api/getcoupon
    type: "get",
    data: {couponid: couponId},
    success: function (data) {
        var temp = template('list_tpl', {list: data.result});
        $('#quan').html(temp);
    }

})

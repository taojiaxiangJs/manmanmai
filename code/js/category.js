/**
 * Created by Administrator on 2017/3/9.
 */
//�ȼ۹���
define(['jquery','template'],function ($,template) {
    var productid = util.getQueryString('productid');
    console.log(productid);
    $.ajax({
        type:'get',
        url:'http://139.199.157.195:9090/api/getproduct',
        data:{'productid':productid},
        success: function (result) {
            var html=template('getproduct',result);
            $("#getproductkeng").html(html);
        }
    })

//����
    $.ajax({
        type:'get',
        url:'http://139.199.157.195:9090/api/getproductcom',
        data:{'productid':productid},
        success: function (result) {
            var html=template('getproductcom',result);
            $("#getproductcomkeng").html(html);
        }
    })


    $.ajax({
        type:'get',
        url:'http://139.199.157.195:9090/api/getproduct',
        data:{'productid':productid},
        success: function (result) {
            var html=template('categoryshop',result);
            $(".shop").html(html);
        }
    })
    /*--------------------�����ض����¼�-------------------*/
    function getWin(attr) {//��ȡwindow�µ�Ԫ������
        return document.documentElement[attr] || document.body[attr];
    };
    var scrTop = document.querySelector(".scrTop");
    var ch = getWin("clientHeight");
    window.onscroll = function () {//�жϷ��ض����ĳ���ʱ��
        var sT = getWin("scrollTop");
        if (sT >= ch) {
            scrTop.style.display = "block";
        }else{
            scrTop.style.display = "none";
        }
    };
    function move() {
        scrTop.style.display = 'none';
        window.clearTimeout(scrTop.timer);
        scrTop.timer = null;
        document.body.scrollTop -= 50;
        if ((document.body.scrollTop - 50) <= 0) {
            document.body.scrollTop = 0;
            return;
        }
        scrTop.timer = window.setTimeout(move, 10);
    }
    scrTop.addEventListener('click',move);
})
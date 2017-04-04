/**
 * Created by Administrator on 2017/3/6.
 */
//省钱控
define(['jquery','templaten'],function ($, template) {
    $(function () {
        var pageid=util.getQueryString("pageid") || 1;
        var pagesize = 0;
        var totalcount=0;
        var pageNumber=0;
        getPage(pageid)
        function getPage(pageid){
            $.ajax({
                url:'http://139.199.157.195:9090/api/getmoneyctrl',
                data:{'pageid':pageid},
                success: function (result) {
                    var html=template('product',result);
                    pagesize = result.pagesize;
                    totalcount=result.totalCount;
                    pageNumber = parseInt(totalcount/pagesize);
                    $("#slippylist").html(html);
                },
                complete: function () {
                    var html=template('gotoPage',{"pageNumber":pageNumber,'pageid':parseInt(pageid)});
                    $('#selectPage').html(html);
                    $('#selectBox').on('change', function () {
                        pageid=$(this).val();
                        window.location="savemoney.html?pageid="+pageid;
                    })
                }
            })

        }

    })
});

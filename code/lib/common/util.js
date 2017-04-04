/*
 * @Author: ClausClaus
 * @Date:   2017-03-07 00:35:38
 * @Last Modified by:   pc
 * @Last Modified time: 2017-03-07 00:41:13
 */

window.util = {
    getQueryString: function(key) {
        var search = window.location.search.slice(1);
        var searchArr = search.split("&");
        var searchObj = {};
        var tempArr = [];
        for (var i = 0; i < searchArr.length; i++) {
            tempArr = searchArr[i].split("=");
            searchObj[tempArr[0]] = tempArr[1];
        }
        return arguments.length ? searchObj[key] : searchObj;
    }
};

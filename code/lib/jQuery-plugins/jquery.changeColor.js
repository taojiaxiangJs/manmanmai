/**
 * Created by Administrator on 2016/12/22.
 */
$.fn.changeColor= function (color){
    //只要是jQuery的插件，都要依赖于jQuery原有的方法来实现功能
    // 在插件中，this表示jQuery对象
    this.css({
        backgroundColor:color
    })
}
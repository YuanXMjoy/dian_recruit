/**
 * Created by JOYyuan on 16/10/6.
 */
$(document).ready(function(){

});
function codeGet(){

}
function timeOut(codeBtn, n) {
    var t = codeBtn.value;
    (function () {
        if (n > 0) {
            codeBtn.disabled = true;
            codeBtn.value = '倒计时' + (n--) + '秒';
            setTimeout(arguments.callee, 1000);
        } else {
            codeBtn.disabled = false;
            codeBtn.value = t;
        }
    })();
}
/**
 * Created by JOYyuan on 16/10/2.
 */
$(document).ready(function () {
    statusSelect();
    $("#select1").attr("class", "selected");
    $(".registerBox").hide();

});
function statusSelect() {
    $("#select1").click(function () {
        $("#select1").attr("class", "selected");
        $("#select2").removeAttr("class","selected");
        $(".loginBox").show();
        $(".registerBox").hide();
    });
    $("#select2").click(function () {
        $("#select2").attr("class", "selected");
        $("#select1").removeAttr("class","selected");
        $(".loginBox").hide();
        $(".registerBox").show();
    });
}
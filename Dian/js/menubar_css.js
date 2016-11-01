$(document).ready(function(){
    $(".menu li").mouseover(function(){
        $(this).css("border-bottom","1px solid #FA8823");
    });
    $(".menu li").mouseout(function(){
        $(this).css("borderStyle","none");
    });   
}); 
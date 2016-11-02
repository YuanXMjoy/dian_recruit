$(document).ready(function(){
    $(".menu li").mouseover(function(){
        $(this).css("border-bottom","1px solid #FA8823");
    });
    $(".menu li").mouseout(function(){
        $(this).css("borderStyle","none");
    });   
    $("#submit").mousedown(function(){
    	$(this).css("box-shadow","0 0 0")
    		   .css("left","586px")
    		   .css("top","2px")
    });
    $("#submit").mouseup(function(){
    	$(this).css("box-shadow","2px 2px 3px #B35914")
    		   .css("left","588px")
    		   .css("top","0")
    });
}); 
$(document).ready(function(){
	
	window_width = $(window).width();

	width = $("#box_line1").width();
	$("#interval").css("height",0.1*width);

	
	height = $(".process_box").width();
	if(window_width < 700)	
		$(".process_box").css("height",height);
	else
		$(".process_box").css("height",0.6*height);		

})
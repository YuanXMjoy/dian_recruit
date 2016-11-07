$(document).ready(function(){
	/* 登录／注册底部 */
	$("#login").click(function(){
		$("#login_bottom").css("border-bottom","1px solid #FB9100");
		$("#register_bottom").css("border-bottom","	none");

		$("#loginarea").css("display","block");
		$("#registerarea").css("display","none");
	})

	$("#register").click(function(){
		$("#register_bottom").css("border-bottom","1px solid #FB9100");
		$("#login_bottom").css("border-bottom","	none");
	
		$("#loginarea").css("display","none");
		$("#registerarea").css("display","block");
	})

	/* 按键颜色效果 */
	$("#confirm_btn").click(function(){
		$(this).css("background-color","#FB9100")
			   .css("transition-timing-function","linear");
		setTimeout(function(){
			$("#confirm_btn").css("background-color","#FFFCF9");
		},100);
	})

	$("#login_btn").click(function(){
		$(this).css("background-color","#FB9100")
			   .css("transition-timing-function","linear");
		setTimeout(function(){
			$("#login_btn").css("background-color","#FFFCF9");
		},100);
	})	
})
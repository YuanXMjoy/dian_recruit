/**
 * Created by JOYyuan on 16/10/6.
 */
$(function(){
    $('#dowebok').fullpage();
	$("#qgroup").attr("class","big");
	$("#qrcode").attr("class","big");
});

$(document).ready(function(){
	$("body").mouseover(function(){
		$("#stick").hide();
		$("#contactD").css("position","relative")
					  .css("top","-66px")
		$("#tm").css("font-size","14px")
				.css("margin-top","10px");
		$("#contact_tel")
						.css("position","relative")
						.css("top","-66px")
						.css("padding-bottom","12px")
						.css("padding-top","12px")
		$("#feedback_mail")
						.css("position","relative")
						.css("top","-66px")		
						.css("font-size","14px")
						.css("padding-bottom","12px");						
		$("#qgroup")
					.css("position","relative")
					.css("top","-66px")		
					.css("font-size","14px")
					.css("margin","0")
					.css("padding-bottom","12px");	
		$("#qrcode")
					.css("position","relative")
					.css("top","-66px")						
	})
});
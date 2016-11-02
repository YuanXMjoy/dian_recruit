/**
 * Created by JOYyuan on 16/11/1.
 */

//此页要用电话好嘛检查一下是否登录过。此外退出的功能还没做，还有浏览器前进和后退的处理；
$(document).ready(function(){
    $("#applyForm").validate({
        debug:false,
        rules: {
            input_name: {
                required: true,
                minlength:1,
                maxlength:15
            },
            input_uid: {
                required:true,
                minlength:10,
                maxlength:10
            },
            sex:{
                required:true
            },
            grade:{
                required:true
            },
            failure:{
                required:true
            },
            input_tel:{
                required:true,
                minlength:11,
                maxlength:11,
                digits:true
            },
            input_mail:{
                required:true,
                email:true,
                maxlength:30

            },
            input_major:{
                required:true
            },
            input_gpa:{
                required:true
            },
            input_prizes:{
                required:true

            },
            input_tech:{
                required:true
            },
            input_intro:{
                required:true
            },
            input_join:{
                required:true
            }

        },
        messages:{
            input_name:{
                required:"请输入用户名",
                minlength:"姓名长度太短",
                maxlength:"姓名长度太长"
            },
            input_uid:{
                required:"请输入密码",
                minlength:"学号位数不对",
                maxlength:"学号位数不对"
            },
            input_tel:{
                required:"请输入电话",
                digits:"格式不对",
                maxlength:"位数不对",
                minlength:"位数不对"
            },
            input_mail:{
                required:"请输入邮箱"

            },
            sex:{
                required:"请选择您的性别"
            },
            grade:{
                required:"请选择您的年级"
            },
            failure:{
                required:"请选择是否挂过科"
            },            
            input_major:{
                required:"请填写专业"
            },
            input_gpa:{
                required:"请填写GPA"
            },
            input_prizes:{
                required:"请填写奖项"
            },
            input_tech:{
                required:"请说明您的技术积累"
            },
            input_intro:{
                required:"请填写个人综合简介"
            },
            input_join:{
                required:"请说明您加入团队的打算"
            }
        },
        submitHandler:function(form){
            if($("#applyForm").valid()){
                getInformation();
            }
        }
    });

});
function getInformation(){
    $("#submit").click(function(){
        var sexes=document.getElementsByName("sex");
        var sex;
        for(var i=0;i<sexes.length;i++){
            if(sexes[i].checked){
                sex=sexes[i].value;
            }
        }
        var grades=document.getElementsByName("grade");
        var stuGrade;
        for(var k=0;k<grades.length;k++){
            if(grades[k].checked){
                stuGrade=grades[k].value;
            }
        }
        var phoneNum=$("#input_tel").val();
        var applyName=$("#input_name").val();
        var uid=$("#input_uid").val();
        var email=$("#input_mail").val();
        var major=$("#input_major").val();
        var gpa=$("#input_gpa").val();
        var prize=$("#input_prizes").val();
        var tech=$("#input_tech").val();
        var simpleInfo=$("#input_intro").val();
        var future=$("#input_join").val();
        var fail_course=0;
        sendInformation(applyName,uid,sex,phoneNum,email,major,stuGrade,fail_course,gpa,prize,tech,simpleInfo,future);
    });
}
function sendInformation(name,uid,sex,phone,email,major,level,fail_course,score,champion,skills,featueres,plan){
    $.post("http://120.76.117.125:90/user/getuserinfo",{
        "name":name,
        "uid":uid,
        "sex":sex,
        "phone":phone,
        "email":email,
        "major":major,
        "level":level,
        "fail_course":fail_course,
        "score":score,
        "champion":champion,
        "skills":skills,
        "features":featueres,
        "plan":plan

    },function(res){
        var result=JSON.parse(res);
        var status=result.status;
        var msg=result.msg;
        alert(status&&msg);
        window.location.href = 'arrange.html';

    });

}
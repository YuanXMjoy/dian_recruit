/**
 * Created by JOYyuan on 16/11/2.
 */
//这样应该以电话号码为判断看是否登录过，没有登录的话跳转到登录页登录了话就再说
var phone = sessionStorage.user;
var uid = sessionStorage.uid;

var stuId;
var applyName;
var applyPh;
var level;
var gpa;
var failC;
var tech;
var cv;
var plan;
var sex;
var apEmail;
var apMajor;
var prize;
$(document).ready(function () {
    $("#userP").html(phone);
    applyInfo();

});
function applyInfo() {
    $("#applyBtn").click(function () {
        window.location.href = "loggedIn.html";
    });
    if (uid == undefined) {

    }else{
        getInfo(phone);
    }
}
function getInfo(num) {
    $.post("http://120.76.117.125:90/user/getuserbyph", {
        "phone": num
    }, function (res) {
        var resObj = JSON.parse(res);
        stuId = resObj.uid;
        applyName = resObj.name;
        applyPh = resObj.phone;
        level = resObj.level;
        gpa = resObj.score;
        failC = resObj.fail_course;
        tech = resObj.skills;
        cv = resObj.features;
        plan = resObj.plan;
        sex = resObj.sex;
        apEmail = resObj.email;
        apMajor = resObj.major;
        prize = resObj.champion;
        putInfo(stuId,applyName,applyPh,level,gpa,failC,tech,cv,plan,sex,apEmail,apMajor,prize);

    });

}
function putInfo(stuId, apName, apPh, level, gpa, failC, tech, cv, plan, sex, apEmail, apMajor, prize) {
    $("#input_name").val(apName);
    $("#input_uid").val(stuId);
    $("#input_tel").val(apPh);
    $("#input_mail").val(apEmail);
    $("#input_major").val(apMajor);
    $("#input_gpa").val(gpa);
    $("#input_prizes").val(prize);
    $("#input_tech").val(tech);
    $("#input_intro").val(cv);
    $("#input_join").val(plan);
    var sexChecks = document.getElementsByName("sex");
    for (var i = 0; i < sexChecks.length; i++) {
        if (i == sex) {
            $(sexChecks[i]).attr('checked', 'checked');
        }
    }
    var grades = document.getElementsByName("grade");
    for (var k = 0; k < grades.length; k++) {
        if (grades[k].value == level) {
            $(grades[k]).attr('checked', 'checked');
        }
    }
    var fails = document.getElementsByName("failure");
    for (var j = 0; j < fails.length; j++) {
        if (j == failC) {
            $(fails[j]).attr('checked', 'checked');
        }
    }

}
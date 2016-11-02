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
    if (uid != "") {
        getInfo(phone);
    }
}
function getInfo(num) {
    $.post("http://120.76.117.125:90/user/getuserbyph", {
        "phone": num
    }, function (res) {
        var resObj = JSON.parse(num);
        stuId=resObj.uid;
        applyName=resObj.name;
        applyPh=resObj.phone;
        level=resObj.level;
        gpa=resObj.score;
        failC=resObj.fail_course;
        tech=resObj.skills;
        cv=resObj.features;
        plan=resObj.plan;
        sex=resObj.sex;
        apEmail=resObj.email;
        apMajor=resObj.major;
        prize=resObj.champion;
        //现在还要将那些信息插入到表格中；注意年纪和性别和是否挂科应该遍历，注意你拿来的东西可能是字符串不是数字记得转换。
    });
}
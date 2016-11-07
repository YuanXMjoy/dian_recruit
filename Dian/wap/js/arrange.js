/**
 * Created by JOYyuan on 16/11/7.
 */
var user = sessionStorage.user;
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

var jlStatus;
var msStatus;
var bsStatus;
var txStatus;
var lqStatus;


$(document).ready(function () {
    $("body").hide();
    $("#result_txt").hide();
    if (user == undefined) {
        $("#left-navibar_logout").hide();
        window.location.href="login.html";
    } else {
        $("#left-navibar_logout").show();
        $("#left-navibar_login").html(user);
        $("body").show();
        getInfo(user);
        checkStatus(uid);
    }
    $("#join_txt").click(function () {

        if (uid == undefined) {
            console.log("用户未提交报名表！")
        } else {
            getInfo(user);
        }
        window.location.href = "apply.html";
    });

    webClock();
    logOut();


});
function getSeverTime() {
    var xmlHttp = new XMLHttpRequest();
    if (!xmlHttp) {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlHttp.open("HEAD", location.href, false);
    xmlHttp.send();
    var severTime = new Date(xmlHttp.getResponseHeader("Date"));
    return severTime;
}
function webClock() {
    var nowTime = getSeverTime();
    var now1 = new Date(nowTime);
    var s1 = now1.getTime();
    var endjl = new Date("2016/11/12 00:00");
    var sjl = endjl.getTime();
    var t1 = sjl - s1;
    var endbs=new Date("2016/11/16 00:00");
    var sbs=endbs.getTime();
    var t2=sbs-s1;
    var endms=new Date("2016/11/17 00:00");
    var sms=endms.getTime();
    var t3=sms-s1;
    var endtxcs=new Date("2016/11/19 00:00");
    var stxcs=endtxcs.getTime();
    var t4=stxcs-s1;
    if (t1 < 0) {
        $("#box_apply").css("background-color","#fde7d2");

    }
    if(t2<0){
        $("#box_exam").css("background-color","#fde7d2");
        $("#join_hide").css("background-color","#fde7d2");

    }
    if(t3<0){
        $("#box_interview").css("background-color","#fde7d2");
    }
    if(t4<0){
        $("#box_all-night").css("background-color","#fde7d2");
    }
}

function logOut() {
    $("#left-navibar_logout").click(function () {
        sessionStorage.user = undefined;
        window.location.href = "login.html";
        $("#left-navibar_logout").hide();
    });
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
        putInfo(stuId, applyName, applyPh, level, gpa, failC, tech, cv, plan, sex, apEmail, apMajor, prize);

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
function checkStatus(stuid) {
    $.post("http://120.76.117.125:90/user/userinfo",
        {
            "uid": stuid
        },
        function (obj) {
            var status = JSON.parse(obj);
            jlStatus = Number(status.jl);
            bsStatus = Number(status.bs);
            msStatus = Number(status.ms);
            txStatus = Number(status.txcs);
            lqStatus = Number(status.lq);
            putStatus();
        });

}
function putStatus() {
    var jl;
    var bs;
    var ms;
    var txcs;
    var lq;
    switch (jlStatus) {
        case 0:
            jl = "未开始";
            $("#apply_txt").attr("class", "unstart");
            break;
        case 1:
            jl = "审核中";
            $("#apply_txt").attr("class", "check");
            break;
        case 2:
            jl = "已通过";
            $("#apply_txt").attr("class", "pass");
            break;
        case 3:
            jl = "未通过";
            $("#apply_txt").attr("class", "fail");
            break;
    }
    $("#apply_txt").html(jl);
    switch (bsStatus) {
        case 0:
            bs = "未开始";
            $("#exam_txt").attr("class", "unstart");
            break;
        case 1:
            bs = "审核中";
            $("#exam_txt").attr("class", "check");
            break;
        case 2:
            bs = "已通过";
            $("#exam_txt").attr("class", "pass");
            break;
        case 3:
            bs = "未通过";
            $("#exam_txt").attr("class", "fail");

            break;
    }
    $("#exam_txt").html(bs);
    switch (msStatus) {
        case 0:
            ms = "未开始";
            $("#interview_txt").attr("class", "unstart");
            break;
        case 1:
            ms = "审核中";
            $("#interview_txt").attr("class", "check");

            break;
        case 2:
            ms = "已通过";
            $("#interview_txt").attr("class", "pass");
            break;
        case 3:
            ms = "未通过";
            $("#interview_txt").attr("class", "fail");
            break;
    }
    $("#interview_txt").html(ms);
    switch (txStatus) {
        case 0:
            txcs = "未开始";
            $("#all-night_txt").attr("class", "unstart");

            break;
        case 1:
            txcs = "审核中";
            $("#all-night_txt").attr("class", "check");

            break;
        case 2:
            txcs = "已通过";
            $("#all-night_txt").attr("class", "pass");

            break;
        case 3:
            txcs = "未通过";
            $("#all-night_txt").attr("class", "fail");

            break;
    }
    $("#all-night_txt").html(txcs);
    switch (lqStatus) {
        case 0:
            lq = "未开始";

            break;
        case 1:
            lq = "恭喜同学，成功录取";
            $("#result_txt").html(lq);
            $("#result_txt").show();
            break;

    }
}
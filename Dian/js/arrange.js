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

var jlStatus;
var msStatus;
var bsStatus;
var txStatus;
var lqStatus;


$(document).ready(function () {
    if (phone == undefined) {
         $("body").hide();
        window.location.href="login.html";
    } else {
        $("body").show();
        $("#userP").html(phone);
    }
    $("#exitBtn").click(function () {
        window.location.href = "login.html"
    });
    webClock();
    applyInfo();

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
    var endbs = new Date("2016/11/16 00:00");
    var sbs = endbs.getTime();
    var t2 = sbs - s1;
    var endms = new Date("2016/11/17 00:00");
    var sms = endms.getTime();
    var t3 = sms - s1;
    var endtxcs = new Date("2016/11/19 00:00");
    var stxcs = endtxcs.getTime();
    var t4 = stxcs - s1;
    var endlq = new Date("2016/11/20 24:00");
    var slq = endlq.getTime();
    var t5 = slq - s1;
    if (t1 < 0) {
        $(".applyBox").css("background-color", "#fde7d2");
    }
    if (t2 < 0) {
        $(".noteTest").css("background-color", "#fde7d2");
    }
    if (t3 < 0) {
        $(".interview").css("background-color", "#fde7d2");
    }
    if (t4 < 0) {
        $(".nightTest").css("background-color", "#fde7d2");
    }
    if (t5 < 0) {
        $("applyStatus").css("background-color", "#fde7d2");
    }
}
function applyInfo() {
    $("#applyBtn").click(function () {
        window.location.href = "loggedIn.html";
    });
    if (uid == undefined) {

    } else {
        checkStatus(uid);
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
        putInfo(stuId, applyName, applyPh, level, gpa, failC, tech, cv, plan, sex, apEmail, apMajor, prize);

    });

}
function putInfo(stuId, apName, apPh, level, gpa, failC, tech, cv, plan, sex, apEmail, apMajor, prize) {
    var check_level=level;
    if(check_level==2016){
        $("#input_gpa").attr("disabled", "disabled");
        $("#current_gpa").css("color","#cccccc");
        $("#input_gpa").css("border","0.1rem solid #cccccc");
        $("#input_gpa").css("color","#cccccc");

    }
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
            $("#netStatus").attr("class", "unstart");
            break;
        case 1:
            jl = "审核中";
            $("#netStatus").attr("class", "check");
            console.log(jl);
            break;
        case 2:
            jl = "已通过";
            $("#netStatus").attr("class", "pass");
            break;
        case 3:
            jl = "未通过";
            $("#netStatus").attr("class", "fail");
            break;
    }
    $("#netStatus").html(jl);
    switch (bsStatus) {
        case 0:
            bs = "未开始";
            $("#noteStatus").attr("class", "unstart");
            break;
        case 1:
            bs = "审核中";
            $("#noteStatus").attr("class", "check");
            break;
        case 2:
            bs = "已通过";
            $("#noteStatus").attr("class", "pass");
            break;
        case 3:
            bs = "未通过";
            $("#noteStatus").attr("class", "fail");

            break;
    }
    $("#noteStatus").html(bs);
    switch (msStatus) {
        case 0:
            ms = "未开始";
            $("#viewStatus").attr("class", "unstart");
            break;
        case 1:
            ms = "审核中";
            $("#viewStatus").attr("class", "check");

            break;
        case 2:
            ms = "已通过";
            $("#viewStatus").attr("class", "pass");
            break;
        case 3:
            ms = "未通过";
            $("#viewStatus").attr("class", "fail");
            break;
    }
    $("#viewStatus").html(ms);
    switch (txStatus) {
        case 0:
            txcs = "未开始";
            $("#nightStatus").attr("class", "unstart");

            break;
        case 1:
            txcs = "审核中";
            $("#nightStatus").attr("class", "check");

            break;
        case 2:
            txcs = "已通过";
            $("#nightStatus").attr("class", "pass");

            break;
        case 3:
            txcs = "未通过";
            $("#nightStatus").attr("class", "fail");

            break;
    }
    $("#nightStatus").html(txcs);
    switch (lqStatus) {
        case 0:
            lq = "未开始";
            $("#passStatus").attr("class", "unstart");
            break;
        case 1:
            lq = "录取";
            $("#passStatus").attr("class", "lq");
            break;

    }
    $("#passStatus").html(lq);
}
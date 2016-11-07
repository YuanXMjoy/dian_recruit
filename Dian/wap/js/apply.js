var count = 0;
var ifValidate;
var user = sessionStorage.user;

$(document).ready(function () {

    $("body").hide();
    if(user==undefined){
        window.location.href="login.html";
    }else{
        $("body").show();
    }

    getInformation();
    getInfo(user);
});

function isPhone(obj) {
    var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
    var flag = reg.test(obj); //true
    return flag;
}
function isChinese(obj) {
    var reg = /[\u4e00-\u9fa5]/;
    var flag = reg.test(obj);
    return flag;
}
function isStuId(obj) {
    var reg = /[Uu]\d{9}/;
    var flag = reg.test(obj);
    return flag;
}
function isMail(obj) {
    var reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
    var flag = reg.test(obj);
    return flag;
}
function isGpa(obj) {
    var reg = /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$|^[1-9]\d*$/;
    var flag = reg.test(obj);
    return flag;
}

function nameValidate(chinese) {
    if (chinese == "") {
        console.log("该字段不能为空");
        $("#input_name").attr("class", "error")
    } else {
        var nameBool = isChinese(chinese);
        if (nameBool) {
            count++;
        } else {
            alert("非中文字符！");
            $("#input_name").attr("class", "error");

        }
    }
}
function majorValidate(chinese) {
    if (chinese == "") {
        console.log("该字段不能为空");
        $("#input_major").attr("class", "error")
    } else {
        var nameBool = isChinese(chinese);
        if (nameBool) {
            count++;
        } else {
            alert("非中文字符！");
            $("#input_major").attr("class", "error")
        }
    }
}
function phoneValidate(phoneNum) {
    if (phoneNum == "") {
        console.log("手机号不能为空");
        $("#input_tel").attr("class", "error")
    } else {
        var phBool = isPhone(phoneNum);
        if (phBool) {
            count++;
        } else {
            alert("手机号不对");
            $("#input_tel").attr("class", "error")
        }
    }
}
function stuIdValidate(stuid) {
    if (stuid == "") {
        console.log("学号不能为空");
        $("#input_uid").attr("class", "error")
    } else {
        var stuBool = isStuId(stuid);
        if (stuBool) {
            count++;
        } else {
            alert("学号格式不对");
            $("#input_uid").attr("class", "error")
        }
    }
}
function emailValidate(mail) {
    if (mail == "") {
        console.log("邮箱不能为空");
        $("#input_mail").attr("class", "error")

    } else {
        var mailBool = isMail(mail);
        if (mailBool) {
            count++;
        } else {
            alert("邮件不对");
            $("#input_mail").attr("class", "error")
        }
    }
}
function gpaValidate(gpa) {
    if (gpa == "") {
        console.log("gpa不能为空");
        $("#input_gpa").attr("class", "error")

    } else {
        var gpaBool = isGpa(gpa);
        if (gpaBool) {
            count++;
        } else {
            alert("gpa格式");
            $("#input_gpa").attr("class", "error")

        }
    }
}

function prizeEmptyValidate(res) {
    if (res == "") {
        console.log("该字段不能为空");
        $("#input_prizes").attr("class", "error")
    } else {
        count++;
    }
}
function techEmptyValidate(res) {
    if (res == "") {
        console.log("该字段不能为空");
        $("#input_tech").attr("class", "error")
    } else {
        count++;
    }
}
function cvEmptyValidate(res) {
    if (res == "") {
        console.log("该字段不能为空");
        $("#input_intro").attr("class", "error")
    } else {
        count++;
    }
}
function planEmptyValidate(res) {
    if (res == "") {
        console.log("该字段不能为空");
        $("#input_join").attr("class", "error")
    } else {
        count++;
    }
}
function getInformation() {
    $("#submit").click(function () {
        removeError();
        var sexes = document.getElementsByName("sex");
        var sex;
        for (var i = 0; i < sexes.length; i++) {
            if (sexes[i].checked) {
                sex = sexes[i].value;
            }
        }
        if (sex == undefined) {
            console.log("性别");
            $("#spSex").attr("class","error");
        } else {
            count++;
        }
        var grades = document.getElementsByName("grade");
        var stuGrade;
        for (var k = 0; k < grades.length; k++) {
            if (grades[k].checked) {
                stuGrade = grades[k].value;
            }
        }
        if (stuGrade == undefined) {
            console.log("年级");
            $("#spGrade").attr("class","error");

        } else {
            count++;
        }
        var failNum = document.getElementsByName("failure");
        var failCourse;
        for (var j = 0; j < failNum.length; j++) {
            if (failNum[j].checked) {
                failCourse = failNum[j].value;
            }
        }
        if (failCourse == undefined) {
            console.log("挂科");
            $("#fail_text").attr("class","error");
        } else {
            count++;
        }
        var phoneNum = $("#input_tel").val();
        phoneValidate(phoneNum);
        var applyName = $("#input_name").val();
        nameValidate(applyName);
        var uid = $("#input_uid").val();
        stuIdValidate(uid);
        var email = $("#input_mail").val();
        emailValidate(email);
        var major = $("#input_major").val();
        majorValidate(major);
        var gpa = $("#input_gpa").val();
        gpaValidate(gpa);
        var prize = $("#input_prizes").val();
        prizeEmptyValidate(prize);
        var tech = $("#input_tech").val();
        techEmptyValidate(tech);
        var simpleInfo = $("#input_intro").val();
        cvEmptyValidate(simpleInfo);
        var future = $("#input_join").val();
        planEmptyValidate(future);
        console.log(count);
        if (count == 13) {
            console.log(count);
            removeError();
            sendInformation(applyName, uid, sex, phoneNum, email, major, stuGrade, failCourse, gpa, prize, tech, simpleInfo, future);
        } else {
            count = 0;
            console.log(count);

        }
    });
}
function sendInformation(name, uid, sex, phone, email, major, level, fail_course, score, champion, skills, featueres, plan) {
    $.post("http://120.76.117.125:90/user/getuserinfo", {
        "name": name,
        "uid": uid,
        "sex": sex,
        "phone": phone,
        "email": email,
        "major": major,
        "level": level,
        "fail_course": fail_course,
        "score": score,
        "champion": champion,
        "skills": skills,
        "features": featueres,
        "plan": plan
    }, function (res) {
        sessionStorage.uid=uid;
        count = 0;
        var result = JSON.parse(res);
        var msg = result.msg;
        alert(msg);
        removeError();
        window.location.href = 'loggedIn.html';
    });

}
function removeError(){
    $("#input_name").removeAttr("class","error");
    $("#input_uid").removeAttr("class","error");
    $("#input_tel").removeAttr("class","error");
    $("#input_mail").removeAttr("class","error");
    $("#input_prizes").removeAttr("class","error");
    $("#input_tech").removeAttr("class","error");
    $("#input_join").removeAttr("class","error");
    $("#input_intro").removeAttr("class","error");
    $("#input_gpa").removeAttr("class","error");
    $("#input_major").removeAttr("class","error");
    $("#spSex").removeAttr("class","error");
    $("#spGrade").removeAttr("class","error");
    $("#fail_text").removeAttr("class","error");

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
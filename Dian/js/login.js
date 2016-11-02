/**
 * Created by JOYyuan on 16/10/7.
 */
var wait = 60;
var errorCode;
var loginCode;

$(document).ready(function () {
        codeGet();
        register();
        login();
    }
);
function isInteger(obj) {
    var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
    var flag = reg.test(obj); //true
    return flag;
}
function codeValidate(obj) {
    var reg = /^\d{4}$/;
    var flag = reg.test(obj);
    return flag;
}
function regValidateError(account, code, pwd) {
    var count = 0;
    if (account == "") {
        $("#account").addClass("error");
    } else {
        var accBool = isInteger(account);
        if (accBool) {
            count++;
        } else {
            $("#account").addClass("error");
        }
    }
    if (code == "") {
        $("#code").addClass("error");
    } else {

        var codeBool = codeValidate(code);
        if (codeBool) {
            count++;
        } else {
            $("#code").addClass("error");
        }

    }
    if (pwd == "") {
        $("#passwordRe").addClass("error");
    } else {
        count++;
    }

    if (count == 3) {
        errorCode = true;
        $("#account").removeClass("error");
        $("#code").removeClass("error");
        $("#passwordRe").removeClass("error");
    }
}
function loginValidateError(user, pwd) {
    var count = 0;
    if (user == "") {
        $("#userId").addClass("error");
    } else {
        var userBool = isInteger(user);
        if (userBool) {
            count++;
        } else {
            $("#userId").addClass("error");
        }
    }
    if (pwd == "") {
        $("#pwdLogin").addClass("error");
    } else {
        count++;
    }
    if (count == 2) {
        loginCode = true;
        $("#userId").removeClass("error");
        $("#pwdLogin").removeClass("error");
    }
}
function codeGet() {
    $("#codeBtn").click(function () {
        var codeBtn = document.getElementById("codeBtn");
        var phoneNum = $("#account").val();
        if (phoneNum == "") {
            $("#account").addClass("error");
        } else {
            $.post("http://120.76.117.125:90/sendmsg/sendregmsg", {
                "phone": phoneNum
            }, function (res) {
                var resultObj = JSON.parse(res);
                var status = resultObj.status;
                var msg = resultObj.msg;
                if (status) {
                    time(codeBtn);
                }
            });


        }
    });

}

function time(o) {
    if (wait == 0) {
        o.removeAttribute("disabled");
        o.innerHTML = "获取验证码";
        wait = 60;
    } else {
        o.setAttribute("disabled", true);
        o.innerHTML = "重发(" + wait + ")";
        wait--;
        setTimeout(function () {
                time(o);
            },
            1000)
    }
}
function register() {
    $("#registerBtn").click(function () {
        var account = $("#account").val();
        var code = $("#code").val();
        var pwd = $("#passwordRe").val();
        regValidateError(account, code, pwd);
        if (errorCode) {
            $.post("http://120.76.117.125:90/register/getreginfo", {
                "phone": account,
                "pwd": pwd,
                "token": code
            }, function (res) {
                var resultObj = JSON.parse(res);
                var status = resultObj.status;
                errorCode = false;
                switch (status) {
                    case 0:
                        alert("注册成功!");
                        checkInfo(account);
                        break;
                    case 1:
                        alert("验证码错误");
                        break;
                    case 2:
                        alert("该手机号码已注册，密码已覆盖");
                        break;
                    case 3:
                        alert("验证码已经过期");
                        break;
                }
            });
        }
    });
}
function login() {
    $("#loginBtn").click(function () {
        var user = $("#userId").val();
        var pwd = $("#pwdLogin").val();
        loginValidateError(user, pwd);
        if (loginCode) {
            $.post("http://120.76.117.125:90/login/getlogininfo", {
                "login": user,
                "pwd": pwd
            }, function (res) {
                loginCode = false;
                var resultObj = JSON.parse(res);
                var status = resultObj.status;
                if (status == 0) {
                    alert("登录成功！");
                    sessionStorage.user = user;
                    checkInfo(user);
                } else {
                    alert("登录失败！");
                }
            });
        }
    });
}

function checkInfo(num) {
    $.post("http://120.76.117.125:90/user/getuserbyph", {
        "phone":num
    }, function (resUid) {
        var resultObj=JSON.parse(resUid);
        var uid=resultObj.uid;
        if(uid==""){
            sessionStorage.user=num;
            window.location.href="loggedIn.html";
        }else{
            sessionStorage.user=num;
            window.location.href="arrange.html";
            sessionStorage.uid=uid;
        }
    })
}

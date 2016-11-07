/**
 * Created by JOYyuan on 16/11/6.
 */
var wait = 60;
var errorCode;
var loginCode;
$(document).ready(function(){
    javascript:window.history.forward(1);
    codeGet();
    register();
    login();
});
function codeGet() {
    $("#getCode").click(function () {
        var codeBtn = document.getElementById("getCode");
        var phoneNum = $("#input_userinfo").val();
        if (phoneNum == "") {
            $("#input_userinfo").addClass("error");
        } else {
            $.post("http://120.76.117.125:90/sendmsg/sendregmsg", {
                "phone": phoneNum
            }, function (res) {
                var resultObj = JSON.parse(res);
                var status = resultObj.status;
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
        $("#input_userinfo").addClass("error");
    } else {
        var accBool = isInteger(account);
        if (accBool) {
            count++;
        } else {
            $("#input_userinfo").addClass("error");
        }
    }
    if (code == "") {
        $("#input_vericode").addClass("error");
    } else {

        var codeBool = codeValidate(code);
        if (codeBool) {
            count++;
        } else {
            $("#input_vericode").addClass("error");
        }

    }
    if (pwd == "") {
        $("#input_setpwd").addClass("error");
    } else {
        count++;
    }

    if (count == 3) {
        errorCode = true;
        $("#input_userinfo").removeClass("error");
        $("#input_vericode").removeClass("error");
        $("#input_setpwd").removeClass("error");
    }
}
function checkInfo(num) {
    $.post("http://120.76.117.125:90/user/getuserbyph", {
        "phone":num
    }, function (resUid) {
        var resultObj=JSON.parse(resUid);
        var uid=resultObj.uid;
        if(uid==undefined){
            sessionStorage.user=num;
            window.location.href="apply.html";
        }else{
            sessionStorage.user=num;
            window.location.href="loggedIn.html";
            sessionStorage.uid=uid;
        }
    })
}
function register() {
    $("#confirm_btn").click(function () {
        var account = $("#input_userinfo").val();
        var code = $("#input_vericode").val();
        var pwd = $("#input_setpwd").val();
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
                        checkInfo(account);
                        break;
                    case 3:
                        alert("验证码已经过期");
                        break;
                }
            });
        }
    });
}

function loginValidateError(user, pwd) {
    var count = 0;
    if (user == "") {
        $("#input_user").addClass("error");
    } else {
        var userBool = isInteger(user);
        if (userBool) {
            count++;
        } else {
            $("#input_user").addClass("error");
        }
    }
    if (pwd == "") {
        $("#input_pwd").addClass("error");
    } else {
        count++;
    }
    if (count == 2) {
        loginCode = true;
        $("#input_user").removeClass("error");
        $("#input_pwd").removeClass("error");
    }
}
function login() {
    $("#login_btn").click(function () {
        var user = $("#input_user").val();
        var pwd = $("#input_pwd").val();
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
                    sessionStorage.user = user;
                    checkInfo(user);
                } else {
                    alert("请检查输入是否正确！")
                }
            });
        }
    });
}



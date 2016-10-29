/**
 * Created by JOYyuan on 16/10/7.
 */
var wait = 60;
$(document).ready(function () {
        codeGet();
        register();
        login();
    }
);
function codeGet() {
    $("#codeBtn").click(function () {
        var codeBtn = document.getElementById("codeBtn");
        var phoneNum = $("#account").val();
        $.post("http://120.76.117.125:90/sendmsg/sendregmsg", {
            "phone": phoneNum
        }, function (res) {
            var resultObj = JSON.parse(res);
            var resultData = resultObj.result;
            if (resultData != undefined) {
                var status = resultData.success;
                if (status) {
                    time(codeBtn);
                }
            }

        });
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
    var account = $("#account").val();
    var code = $("#code").val();
    var pwd = $("#passwordRe").val();
    $("#registerBtn").click(function () {
        $.post("http://120.76.117.125:90/register/getreginfo", {
            "phone": account,
            "pwd": pwd,
            "token": code
        }, function (res) {
            var resultObj = JSON.parse(res);
            var status = resultObj.status;
            alert("注册成功");
        });
    });
}
function login() {
    var user = $("#userId").val();
    var pwd = $("#pwdLogin").val();
    $("#loginBtn").click(function () {
        $.post("http://120.76.117.125:90/login/getlogininfo", {
            "login": user,
            "pwd": pwd
        }, function (res) {
            var resultObj = JSON.parse(res);
            var status = resultObj.status;
            if (status == 0) {
                alert("登录成功！");
            }
        });
    });

}

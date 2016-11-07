var user = sessionStorage.user,
    startY, removeY,
    startX, removeX;
$(document).ready(function() {
    if (user == undefined) {
        $("#left-navibar_logout").hide();
    } else {
        $("#left-navibar_logout").show();
        $("#left-navibar_login").html(user);
    }
    logOut();

});

function logOut() {
    $("#left-navibar_logout").click(function() {
        sessionStorage.user = undefined;
        window.location.href = "login.html";
        $("#left-navibar_logout").hide();
    });
}


function nextPage() {
    $('li.page-wrap').each(function(index) {
        if (!$(this).hasClass("page-hidden")) {
            if (index < 2) $(this).addClass('page-hidden');
            else {
                try{
                    window.location.replace('login.html');
                }
                catch(err){
                    window.location.assign('login.html');
                }
            }
            return false;
        }
    });
}

function prevPage() {
    $('li.page-wrap').each(function(index) {
        if (!$(this).hasClass("page-hidden")) {
            var prevPage = $(this).prev();
            if (index > 0) prevPage.removeClass('page-hidden');
            return false;
        }
    });
}

function nextGroup() {
    $('li.group-wrap').each(function(index) {
        if (!$(this).hasClass("group-hidden")) {
            if (index < 6) $(this).addClass('group-hidden');
            else nextPage();
            return false;
        }
    });
}

function prevCircle() {
    $('li.circle').each(function(index) {
        if ($(this).hasClass("circle-active")) {
            var prevCircle = $(this).prev();
            if (index > 0) {
                $(this).removeClass("circle-active");
                prevCircle.addClass('circle-active');
            }
            return false;
        }
    });
}

function nextCircle() {
    $('li.circle').each(function(index) {
        if ($(this).hasClass("circle-active")) {
            var prevCircle = $(this).next();
            if (index < 6) {
                prevCircle.addClass('circle-active');
                $(this).removeClass('circle-active');
            }
            return false;
        }
    });
}
function prevGroup() {
    $('li.group-wrap').each(function(index) {
        if (!$(this).hasClass("group-hidden")) {
            var prevGroup = $(this).prev();
            if (index > 0) prevGroup.removeClass('group-hidden');
            return false;
        }
    });
}

function touchStart(event) {
    event.preventDefault();
    if (!event.touches.length) return;
    var touch = event.touches[0];
    startY = touch.pageY;
    startX = touch.pageX;
}

function touchMove(event) {
    event.preventDefault();
    if (!event.touches.length) return;
    var touch = event.touches[0];
    removeY = touch.pageY - startY;
    removeX = touch.pageX - startX;
}

function groupTouchEnd(event) {
    event.preventDefault();
    if (Math.abs(removeX) > Math.abs(removeY)) {
        if (removeX > 0) {
            prevGroup();
            prevCircle();
            $('div.group-advice').addClass('group-advice-hidden');
        }
        else if (removeX < 0) {
            nextGroup();
            nextCircle();
            $('div.group-advice').addClass('group-advice-hidden');
        }
        else return;
    } 
}
function pageTouchEnd(event) {
    event.preventDefault();
    if(Math.abs(removeX) > Math.abs(removeY)) return;
    else if (removeY > 0) {
        prevPage();
    } else if (removeY < 0) {
        nextPage();
    } else return;
}
$('#container').bind('touchstart', touchStart);
$('#container').bind('touchmove', touchMove);
$('#container').bind('touchend', pageTouchEnd);
$('#group-container').bind('touchstart', touchStart);
$('#group-container').bind('touchmove', touchMove);
$('#group-container').bind('touchend', groupTouchEnd);
$('div.group-advice').bind('touchstart', touchStart);
$('div.group-advice').bind('touchmove', touchMove);
$('div.group-advice').bind('touchend', groupTouchEnd);
$('div.next-button').click(nextPage);
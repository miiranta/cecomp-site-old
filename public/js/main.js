//Variables
    var block = 0
    var winLocal = window.location.pathname.split("/");

//Get/set cookies
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function setCookie(cName, cValue, expDays) {
    let date = new Date();
    date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}

//Warning
function openWarning({title, content, buttons: {okayBnt, closeBnt}}){
    
    if(okayBnt){
        $('.okayWarning').show();
        $('.okayWarning').attr('onclick', okayBnt);
    }else{
        $('.okayWarning').hide();
    }

    if(closeBnt){
        $('.closeWarning').show();
        $('.closeWarning').attr('onclick', closeBnt);
    }else{
        $('.closeWarning').hide();
    }

    if(title){
        $('.warningTitleContent').text(title);
    }else{
        $('.warningTitleContent').text("");
    }

    if(content){
        $('.warningScroll').empty();
        $('.warningScroll').append(content);
    }else{
        $('.warningScroll').text("");
    }

    $('.warning').show();

}

function closeWarning(){
    $('.warning').hide();
}

function showWarning(){
    $.get('/msg/bccMember', function(content) {
        openWarning({title: "Ops...", content, buttons: {closeBnt: "closeWarning()"}})
    });
}

//Load cookie warning
const warningCookie = getCookie("warning");
if(showWarning){

    setCookie('warning', "0", 0);

    switch(warningCookie){
        case "notBccMember":
            $.get('/msg/notBccMember', function(content) {
                openWarning({title: "Ops...", content, buttons: {closeBnt: "closeWarning()"}})
            });
            break;

        default:
            break;
    }
}

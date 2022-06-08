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

function getWarning(warning){
    $.get('/msg/' + warning, function(content) {
        openWarning({title: "", content, buttons: {closeBnt: "closeWarning()"}})
    });
}

//Load cookie warning
const warningCookie = getCookie("warning");

if(warningCookie){
    getWarning(warningCookie);       
    deleteCookie('warning');
}



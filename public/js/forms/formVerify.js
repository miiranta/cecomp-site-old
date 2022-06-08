//Global vars
var dataToSend = {};


//Startup
$("#formVer_submit").prop("disabled", true);

$("#formVer_course").on("change", function(){
    if($("#formVer_course").val() == 1){
        $("#formVer_otherCourse").show();
    }else{
        $("#formVer_otherCourse").hide();
    }
})


//SOCKET
$("#formVer").on("change keyup paste", function(){
    $("#formVer_submit").prop("disabled",true);
    dataToSend = {
        uspNumber:      $("#formVer_uspNumber").val(),
        course:         $("#formVer_course").val(),
        course_other:   $("#formVer_otherCourse").val(),
        classNumber:    $("#formVer_class").val(),
    }

    if(block==0){
    block = 1

    conSocket("formVerify", dataToSend, (data)=>{

        if(data){
        $("#formVer_submit").prop("disabled", true);
        block = 0
        return $("#formVer_label").text(data);
        }

        $("#formVer_submit").prop("disabled",false);
        $("#formVer_label").text("Pronto para enviar.");
        block = 0
    })   
    }

})


//AJAX
function sendFormVerify(){ 
    $("#formVer_submit").prop("disabled", true);

    conRest('/form/verify', 'PATCH', dataToSend, ()=>{
        $("#formVer_label").text("Successo!");
        getWarning("formVerifyConf");
    })
}







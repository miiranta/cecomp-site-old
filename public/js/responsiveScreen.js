//Evaluate Screen Proportion and set classes
var block = 0
var state = 3

function defineProportion(){

    var maxProportion = 1;

    block = 1

    var height = window.innerHeight;
    var width = window.innerWidth;
    var proportion = height/width;

    if(proportion<maxProportion){
        if(state == 0 || state == 3){
            $(".mobile").hide()
            $(".desktop").show() 
            console.log("Changed to Desktop")
        }
        state = 1;
    }else{
        if(state == 1 || state == 3){
            $(".mobile").show()
            $(".desktop").hide()
            console.log("Changed to Mobile")
        }
        state = 0;
    }

    block = 0
}
    
$(window).resize( function (){
    if(block == 0){defineProportion()};
    
    setTimeout(function() {/*Boo*/}, 300)
});
    
$(document).ready(
    function (){
        setTimeout(function() {defineProportion();}, 300)
    }
);











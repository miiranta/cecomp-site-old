const FormVerify        = require("../../db/models/formVerify")
const {sanitizeInput}   = require("../../utils/other/sanitizeInput")
const jwt               = require("jsonwebtoken")

const verifyFormVerifySocket = async (data, socket)=>{

    try{
        var userJWT = await sanitizeInput(socket.handshake.session.passport.user)
        var user = await jwt.verify(userJWT, process.env.JWT_SECRET)
        if(!user){throw new Error()}
    }catch(e){
        user = null;
    }

    //Auth okay?
    if(!user){return "Erro de autenticação!"}

    //Valid uspNumber?
    const nusp = parseInt(data.uspNumber)
    const nuspLen = nusp.toString().length
    if(nuspLen < 5 || nuspLen > 10){return "Número USP inválido!"}
    
    //Valid Course?
    const course       = parseInt(data.course)
    const otherCourseLen  = data.course_other.length
    if(course == 0){return "Selecione um curso!"}
    if(course == 1){
        if(otherCourseLen < 1 || otherCourseLen > 500){return "Especifique seu curso!"}
    }
    if(course < 0 || course > 4){return "Curso inválido!"}

    //Valid class
    const uspClass = parseInt(data.classNumber)
    if(uspClass <= 0 || uspClass > 1000 || uspClass.toString() == 'NaN'){return "Especifique sua sala!"}

    //Already sent a request?
    const formCreated = await FormVerify.findOne({owner: user._id})
    if(formCreated){return "Você já enviou um pedido! Aguarde a resposta da CECOMP."}

    //Everything is fine
    return false;

}

const verifyFormVerify = async (req)=>{
    const user = req.user;
    const data = req.body;

    //Auth okay?
    if(!user){return "Erro de autenticação!"}

    //Valid uspNumber?
    const nusp = parseInt(data.uspNumber)
    const nuspLen = nusp.toString().length
    if(nuspLen < 5 || nuspLen > 10){return "Número USP inválido!"}
    
    //Valid Course?
    const course       = parseInt(data.course)
    const otherCourseLen  = data.course_other.length
    if(course == 0){return "Selecione um curso!"}
    if(course == 1){
        if(otherCourseLen < 1 || otherCourseLen > 500){return "Especifique seu curso!"}
    }
    if(course < 0 || course > 4){return "Curso inválido!"}

    //Valid class
    const uspClass = parseInt(data.classNumber)
    if(uspClass <= 0 || uspClass > 1000 || uspClass.toString() == 'NaN'){return "Especifique sua sala!"}

    //Already sent a request?
    const formCreated = await FormVerify.findOne({owner: user._id})
    if(formCreated){return "Você já enviou um pedido! Aguarde a resposta da CECOMP."}

    //Everything is fine
    return false;

}

module.exports = {verifyFormVerifySocket, verifyFormVerify}
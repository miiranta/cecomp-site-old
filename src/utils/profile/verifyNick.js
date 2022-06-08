const User = require("../../db/models/users")

const verifyNick = async (nick)=>{

    //Contain special character?
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if(format.test(nick)){return "Nicks não podem ter caracteres especiais!"}

    //Contain spaces?
    if(/\s/g.test(nick)){return "Nicks não podem ter espaço!"}

    //Too big / too small
    if(nick.length>15||nick.length<5){return "Nicks precisam ter entre 5 e 15 caracteres!"}

    //Search Db for nick taken
    const user = await User.findOne({nick})
    if(user){return "Este nick não está mais disponível!"}

    //Everything is fine
    return false;

}

module.exports = verifyNick
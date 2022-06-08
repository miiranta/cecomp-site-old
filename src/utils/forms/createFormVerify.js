const {verifyFormVerify}    = require("./verifyFormVerify")
const FormVerify            = require("../../db/models/formVerify")

const createFormVerify = async (req) => {
    const data = req.body;
    const verify = await verifyFormVerify(req);

    if(verify){
        return {status: 400}
    }

    const dataDb = {
        owner:          req.user._id,
        uspNumber:      data.uspNumber,
        course:         data.course,
        otherCourse:    data.otherCourse,
        class:          data.classNumber
    }

    FormVerify.create(dataDb)
    return {status: 200}
}

module.exports = createFormVerify
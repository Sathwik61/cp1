const File = require("../models/file");

const Links=async(req,res)=>{
    const uid=req.body.data
try{
    // console.log(req.body)
    const files = await File.find({user:uid});
    console.log(files)
           
    return res.status(200).json({'links':files})
}
catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error', err, state: false });
}
}

module.exports={
    Links
}
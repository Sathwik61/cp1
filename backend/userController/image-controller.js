const File = require('../models/file');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();


const uploadImage = async (request, response) => {
    const fileObj = {
        path: request.file.path,
        name: request.file.originalname,
        user:request.body.uid
    };
    // console.log(request.body.uid)
    try {
        // console.log(fileObj)
        const file = await File.create(fileObj);
        // console.log(file);

        response.status(200).json({ path: `http://localhost:${process.env.PORT}/api/v1/file/${file._id}` });
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ error: error.message });
    }
};

const getImage = async (request, response) => {
    try {
        const file = await File.findById(request.params.fileId);
        if (!file) {
            return response.status(404).json({ msg: 'File not found' });
        }

        console.log("File Downloaded");
        file.downloadCount++;
        await file.save();

        response.status(200).download(file.path, file.name);
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ msg: error.message });
    }
};

module.exports = {
    uploadImage,
    getImage,
};

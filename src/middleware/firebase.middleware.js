const storage = require('../utils/firebase');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

const firebaseFile = async(req, res, next) => {
    try {
        const imgRef = ref(storage, `products/${Date.now()}-${req.file.originalname}`);
        const imgUploaded = await uploadBytes(imgRef, req.file.buffer);
        req.body.image =  imgUploaded.metadata.fullPath
        next()
    } catch (error) {
        next(error)
    }
}

const getImgUrl = async(img) => {
    try {
        const newRef = ref(storage, img)
        const url = await getDownloadURL(newRef)
        return url
    } catch (error) {
        return error
    }
}

module.exports = {firebaseFile, getImgUrl}
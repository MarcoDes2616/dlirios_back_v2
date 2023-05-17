const { create, update } = require('../controllers/user.controllers');
const express = require('express');
const verifyJWT = require('../middleware/auth.middleware');
const { createPet, getPetsByUser, updatePet, removePet, getOne } = require('../controllers/pet.controllers');
const {firebaseFile} = require('../middleware/firebase.middleware');
const { upload } = require('../utils/multer');

const userRouter = express.Router();

userRouter.route('/')
    .post(create)

userRouter.route('/pets')
    .post(verifyJWT, createPet)
    .get(verifyJWT, getPetsByUser)

userRouter.route("/pets/:id")
    .put(verifyJWT, updatePet)
    .delete(verifyJWT, removePet)
    .get(verifyJWT, getOne)

userRouter.route('/:id')
    .put(verifyJWT, upload.single("file"), firebaseFile, update)

module.exports = userRouter;
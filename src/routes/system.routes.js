const { getAll, login, getMe, resetPaswwordMail, updatePassword, 
    requestEmailVerification, verifyEmail, getOne, enableOrDisableUser } = require('../controllers/system.controllers');
const express = require('express');
const verifyJWT = require('../middleware/auth.middleware');
const isAdmin = require('../middleware/isAdmin.middleware');

const systemRouter = express.Router();


systemRouter.route("/login")
    .post(login)

systemRouter.route("/me")
    .get(verifyJWT, getMe)

systemRouter.route("/reset_password")
    .post(resetPaswwordMail)

systemRouter.route("/reset_password/:token")
    .post(updatePassword)

systemRouter.route("/verify_email")
    .post(requestEmailVerification)

systemRouter.route("/verify_email/:token")
    .get(verifyEmail)

systemRouter.route("/users")
    .get(isAdmin, getAll) //system, requiere middleware de roles

systemRouter.route("/users/:id")
    .get(isAdmin, getOne) //system, requiere middleware de roles
    .delete(isAdmin, enableOrDisableUser) //system, requiere middleware de roles


module.exports = systemRouter;
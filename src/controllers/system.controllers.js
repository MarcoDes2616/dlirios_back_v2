const catchError = require("../utils/catchError");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendMail");
const Pet = require("../models/Pet");
require("dotenv").config();
const bcrypt = require("bcrypt");
const Vet = require("../models/Vet");
const Specialty = require("../models/Specialty");
const TimeAssignment = require("../models/TimeAssignment");
const Appointment = require("../models/Appointment");
const { Op } = require('sequelize');
const { getImgUrl } = require("../middleware/firebase.middleware");

//ENDPOINT SYSTEM 1 --- LOGIN
const login = catchError(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } }, { include: [Pet] });
  if (!user) return res.status(404).json({ message: "user not found" });
  if (!user.isVerified || !user.status) return res.status(401).json({ message: "User no verified or disabled" });
  // const isValid = await bcrypt.compare(password, user.password);
  const isValid = password == user.password
  if (!isValid) return res.status(401).json({ message: "Invalid credentials" });
  const token = jwt.sign({ user }, process.env.TOKEN_SECRET, {
    expiresIn: "1000h",
  });
  res.json({ user, token });
});

//ENDPOINT SYSTEM 2 --- RESET PASSWORD
const resetPaswwordMail = catchError(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(404).json({ message: "User no found" })
  const tokenToVerify = jwt.sign({ user }, process.env.TOKEN_SECRET, {
    expiresIn: "1h"});
  await User.update({ resetCode: tokenToVerify }, { where: { id: user.id } });
  await sendEmail({
    to: user.email,
    subject: "Reset password",
    html: ` <h3>Estas intentanto recuperar tu contraseña</h3>
            <a href="${req.body.frontBaseUrl}/reset_password/${tokenToVerify}">Click en el enlace para reset E-mail</a>`
  });
  res.json({success: true});
});

//ENDPOINT SYSTEM 3 --- UPDATE PASSWORD
const updatePassword = catchError(async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({ where: { resetCode: token } });
  if (!user) return res.status(401).json({ message: "Unauthorized" })
  const data = jwt.verify(token, process.env.TOKEN_SECRET);
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  await User.update(
    { password: hashedPassword, resetCode: null },
    { where: { id: data.user.id } }
  );
  res.status(201).json({ success: true });
});

// ENDPOINT DEL SISTEMA 4 --- VERIFICAR EMAIL
const verifyEmail = catchError(async (req, res) => {
  const { token } = req.params;
  const data = jwt.verify(token, process.env.TOKEN_SECRET);
  await User.update({ isVerified: true }, { where: { id: data.result.id } });
  res.json({ success: true });
});

// ENDPOINT DEL SISTEMA 5 --- OBTENER TODOS LOS USUARIOS
const getAll = catchError(async (req, res) => {
  const results = await User.findAll({ include: [Pet], where: { roleId: 3 } });
  return res.json(results)
});

// ENDPOINT DEL SISTEMA 6 --- OBTENER UN USUARIO
const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await User.findByPk(id, { include: [Pet] });
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

// ENDPOINT DEL SISTEMA 7 --- ACTIVAR O DESACTIVAR USUARIOS
const enableOrDisableUser = catchError(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  await User.update({ status: !user.status }, { where: { id } });
  return res.status(204).json({ success: true });
});

// ENDPOINT DEL SISTEMA 8 --- OBTENER USUARIO LOGUEADO
const getMe = catchError(async (req, res) => {
  const { id } = req.user;
  const user = User.findByPk(id, { include: [Pet] });
  if (!user.status) return res.status(401).json({ message: "Unauthorized" });
  res.json(user);
});

// ENDPOINT DEL SISTEMA 18 --- SOLICITUD PARA VERIFICAR EMAIL
const requestEmailVerification = catchError(async (req, res) => {
  const { email, frontBaseUrl } = req.body;
  const user = await User.findOne({where: {email}})
  if(!user || !user.status) return res.status(404).json({message: "user no found or inactive state"})
  const tokenToVerify = jwt.sign({ user }, process.env.TOKEN_SECRET, {
    expiresIn: "24h",
  });
  await sendEmail({
    to: result.email,
    subject: "Verificación de Email",
    html: `
    <a href="${frontBaseUrl}/verify_email/${tokenToVerify}">Click en el enlace para verificar E-mail</a>
    `,
  });
  return res.status(201).json({success: true})
});

module.exports = {
  login,
  resetPaswwordMail,
  updatePassword,
  verifyEmail,
  getAll,
  getOne,
  enableOrDisableUser,
  getMe,
  requestEmailVerification
};

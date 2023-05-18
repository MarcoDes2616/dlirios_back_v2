const catchError = require("../utils/catchError");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendMail");
const Pet = require("../models/Pet");
require("dotenv").config();


// ENDPOINT DE USUARIO 1 --- CREAR USUARIO CLIENTE
const create = catchError(async (req, res) => {
  const result = await User.create(req.body);
  const tokenToVerify = jwt.sign({ result }, process.env.TOKEN_SECRET, {
    expiresIn: "24h",
  });
  await sendEmail({
    to: result.email,
    subject: "Verificación de Email",
    html: `
    <a href="${req.body.frontBaseUrl}/verify_email/${tokenToVerify}">Click en el enlace para verificar E-mail</a>
    `,
  });
  return res.status(201).json(result);
});


// ENDPOINT DE USUARIO 2 --- ACTUALIZAR USUARIO CLIENTE
const update = catchError(async (req, res) => {
  const { id } = req.params;
  const { password, status, isVerified, ...rest } = req.body;

  const result = await User.update(
    rest, { where: { id }, returning: true });
    if (result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
  });
  


module.exports = {
  create,
  update,
};

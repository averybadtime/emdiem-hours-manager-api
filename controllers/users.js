const admin  = require("../firebase")
const moment = require("moment")

const AUTH     = admin.auth()
const DATABASE = admin.database()

const post = async (req, res) => {
  try {
    const { name, email, password, role } = req.body
    const { uid } = await AUTH.createUser({
      email,
      displayName: name,
      password
    })
    const createdAt = moment().unix()
    const updates = {}
    updates[`/users/${ uid }`] = true
    updates[`/profiles/${ uid }`] = {
      createdAt,
      email,
      name,
      role
    }
    await DATABASE.ref().update(updates)
    res.send({ uid, createdAt })
  } catch (ex) {
    let ErrorMessage
    switch (ex.code) {
      case "auth/email-already-exists":
        ErrorMessage = "E-mail ya tomado por otro usuario."
        break
      case "auth/invalid-email":
        ErrorMessage = "E-mail inválido."
        break
      case "auth/invalid-password":
        ErrorMessage = "Contraseña inválida. Debe contener al menos 7 caracteres."
        break
      default:
        ErrorMessage = "Ocurrió un error al registrar al usuario."
    }
    res.status(500).send(ErrorMessage)
  }
}

module.exports = {
  post
}
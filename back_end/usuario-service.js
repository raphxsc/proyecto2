const {admin} = require( './firebase-service');

const createUser = async (req, res) => {
const {
      email,
      password,
      firstName,
      lastName
    } = req.body;

    

    const user = await admin.auth().createUser({
      email,
      password,
      displayName: `${firstName} ${lastName}`
    });

    return res.send(user);
}

module.exports = {
  createUser:createUser
}

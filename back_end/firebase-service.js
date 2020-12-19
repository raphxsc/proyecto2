var admin = require("firebase-admin");
var serviceAccount = require("./../../proyecto2-a4d0a-d4cba3687fa4.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});



module.exports = {
  admin:admin
};

const {admin} = require( './firebase-service');

const  agregarUsuario = (data)=>{
  let db = admin.firestore();
  db.collection('usuarios').doc(data.id).set({
    nombre:data.nombre,
    apellido:data.apellido,
    correo:data.correo
  });


}

const eliminarUsuario = (id)=>{
  let deleteDoc = db.collection('usuarios').doc(id).delete();
}

module.exports = {
  agregarUsuario:agregarUsuario
}

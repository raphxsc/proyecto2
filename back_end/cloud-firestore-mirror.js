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
  let db = admin.firestore();
  db.collection('usuarios').doc(id).delete();
}



const  actualizarUsuario = (data)=>{
  let db = admin.firestore();
  db.collection('usuarios').doc(data.id).set({
    nombre:data.nombre,
    apellido:data.apellido,
    correo:data.correo
  });


}
module.exports = {
  agregarUsuario:agregarUsuario,
  eliminarUsuario:eliminarUsuario,
  actualizarUsuario:actualizarUsuario
}

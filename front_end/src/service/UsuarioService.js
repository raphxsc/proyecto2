import axios from 'axios';
import { authHeader } from '../jwt/_helpers';




const url= "http://localhost:3100/";

export class UsuarioService {

    async getUsuarios() {
        return axios.get(url+"user/list",{headers:
        authHeader()}).then(res =>{
          console.log(res.data.data);
          return res.data.data;
        } );
    }

    async agregarUsuario(data) {
        return axios.post(url+"user/add",data,{headers:
        authHeader()}).then(res =>{

          return res.data.result;
        } );
    }

    async actualizarUsuario(data) {
        return axios.post(url+"user/update",data,{headers:
        authHeader()}).then(res =>{

          return res.data.result;
        } );
    }

    async eliminarUsuario(data) {
        return axios.post(url+"user/delete",data,{headers:
        authHeader()}).then(res =>{

          return res.data.result;
        } );
    }
}

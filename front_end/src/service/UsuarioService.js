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
}

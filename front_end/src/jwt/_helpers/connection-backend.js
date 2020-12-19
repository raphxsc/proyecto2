import axios from 'axios';
import {auth,getToken,getNombre} from '../../service/firebase-service';


export const createUserAccount = (data) => {
  console.log(data);
  return axios.post('http://localhost:3100/auth/signup', data)
    .then(res => res.data)
}


export const loginUser = async (email, password) => {

  return  await auth().signInWithEmailAndPassword(email, password).then(user =>{

    return user
  }).catch(error=> {
    return undefined;
  });
}



export   function configureMiddleware() { // entrando directo por fireauth

    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        const isLoggedIn = opts.headers['Authorization'] === 'Bearer fake-jwt-token'; // prueba previo al firebase auth en vista

        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(async () => {
                  // authenticate - public
                  if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                      const params = JSON.parse(opts.body);
                      const user = await loginUser(params.username,params.password);
                      //const user = users.find(x => x.username === params.username && x.password === params.password);
                      if (!user) return error('Username or password is incorrect');
                      let _token = await getToken();
                      let _nombre = await getNombre();
                      return ok({
                          nombre: _nombre,
                          token: _token
                      });
                  }

                  realFetch(url, opts).then(response => resolve(response));

                  // private helper functions

                  function ok(body) {
                      resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) })
                  }

                  function unauthorised() {
                      resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorised' })) })
                  }

                  function error(message) {
                      resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) })
                  }
              }, 500);
        });
    }
}

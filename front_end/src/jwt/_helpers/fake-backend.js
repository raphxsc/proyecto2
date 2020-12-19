import axios from 'axios';
import {auth} from '../../service/firebase-service';


export const createUserAccount = (data) => {
  return axios.post('http://localhost:3100/auth/signup', data)
    .then(res => res.data)
}


export const loginUser = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
}



export   function configureFakeBackend() { // entrando directo por fireauth
    let users = [
        { id: 1, username: 'hola', password: 'hola', firstName: 'David', lastName: 'Torres' },

    ];
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        const isLoggedIn = opts.headers['Authorization'] === 'Bearer fake-jwt-token'; // prueba previo al firebase auth en vista

        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {
                // authenticate - public
                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                    const params = JSON.parse(opts.body);
                    const user = auth().signInWithEmailAndPassword(params.username, params.password);
                    console.log(user);
                    if (!user) return error('Username or password is incorrect');
                    return ok({
                        id: user.id,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        token: 'fake-jwt-token' // user.token
                    });
                }

                // get users - secure
                if (url.endsWith('/users') && opts.method === 'GET') {
                    if (!isLoggedIn) return unauthorised();
                    return ok(users);
                }

                // pass through any requests not handled above
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

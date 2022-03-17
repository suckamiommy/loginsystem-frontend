import axios from "../../axios/index";

export default {
    registerUser(ctx, payload){
        return new Promise((resolve, reject) => {
            return axios.post('register', payload).then((res) => {
                if(res.data){
                    resolve(res);
                }else{
                    reject(res);
                }
              })
              .catch((err) => {
                  reject(err);
              });
        });
    },
    loginUser(ctx, payload){
        return new Promise((resolve, reject) => {
            return axios.post('login', payload).then((res) => {
                if(res.data.access_token){
                    localStorage.setItem('token', res.data.access_token);
                    ctx.commit('setLoggedIn', true);
                    resolve("Login Successfuly.");
                }else{
                    reject(res);
                }
              })
              .catch((err) => {
                  reject(err);
              });
        });
    },
    loginGithub(){
        return new Promise((resolve, reject) => {
            return axios.get('authorize/github/redirect').then((res) => {
                  resolve(res);
                }).catch((err) => {
                  reject(err);
                });
        });
    },
    loginGithubCallback(ctx, payload){
        return new Promise((resolve, reject) => {
            return axios.get('authorize/github/callback', {
                    params: payload 
                }).then((res) => {
                    if(res.data.access_token){
                        localStorage.setItem('token', res.data.access_token);
                        ctx.commit('setLoggedIn', true);
                        resolve(res);
                    }else{
                        reject(res);
                    }
                }).catch((err) => {
                  reject(err);
                });
        });
    },
    logoutUser(ctx) {
        return new Promise((resolve) => {
            localStorage.removeItem('token');
            ctx.commit('setLoggedIn', false);
            resolve("Logged Out.")
        });
    },
    setLoggedInState(ctx) {
        return new Promise((resolve) => {
            if(localStorage.getItem('token')){
                ctx.commit('setLoggedIn', true);
                resolve(true);
            }else{
                ctx.commit('setLoggedIn', false);
                resolve(false);
            }
        });
    },
    forgotPassword(ctx, payload){
        return new Promise((resolve, reject) => {
            axios.post('forgot-password', payload).then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
        });
    },
    resetPassword(ctx, payload){
        return new Promise((resolve, reject) => {
            axios.post('reset-password', payload).then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
        });
    },
    me(ctx){
        return new Promise((resolve, reject) => {
            axios.get('me').then((res) => {
                ctx.commit('setUserDetails', res.data.data);
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
        });
    },
    changePassword(ctx, payload){
        return new Promise((resolve, reject) => {
            axios.post('change-password', payload).then((res) => {
                if(res.data.success){
                    resolve(res);
                }else{
                    reject(res);
                }
            })
            .catch((err) => {
                reject(err);
            });
        });
    },
    changeDetails(ctx, payload){
        return new Promise((resolve, reject) => {
            axios.post('update-user-details', payload).then((res) => {
                if(res.data.success){
                    resolve(res);
                }else{
                    reject(res);
                }
            })
            .catch((err) => {
                reject(err);
            });
        });
    },
    VerifyEmail(ctx, payload){
        return new Promise((resolve, reject) => {
            axios.get('email-verification', {
                params: payload
            }).then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
        });
    },
};
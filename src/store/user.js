// ไฟล์นี้ไม่ได้ใช้ แล้ว เราสามารถแยก module ต่างๆ ในไฟล์นี้ได้ แล้วทำ folder vuex structure ใหม่ เพิ่อให้ง่ายต่อการอ่าน code หาก code มีความยาวมากๆ

import axios from "axios";

const state = {
    isLoggedIn: false,
    userDetails: {}
};

const getters = {
    loggedIn(state) {
        return state.isLoggedIn;
    }
}

const mutations = {
    setLoggedIn(state, payload){
        state.isLoggedIn = payload;
    }
};

const actions = {
    loginUser(ctx, payload){
        return new Promise((resolve, reject) => {
            return axios.post('http://localhost:8000/api/login', payload).then((res) => {
                if(res.data.access_token){
                    localStorage.setItem('token', res.data);
                    ctx.commit('setLoggedIn', true);
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
    logoutUser(ctx) {
        return new Promise((resolve) => {
            localStorage.removeItem('token');
            ctx.commit('setLoggedIn', false);
            resolve(true)
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
            axios.post('http://localhost:8000/api/forgot-password', payload).then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
        });
    },
    resetPassword(ctx, payload){
        return new Promise((resolve, reject) => {
            axios.post('http://localhost:8000/api/reset-password', payload).then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-lg-4 col-md-6 col-sm-6">
        <div class="card shadow">
          <div class="card-title text-center border-bottom">
            <h2 class="p-3">Login</h2>
          </div>
          <div class="card-body">
            <form @submit.prevent="loginFunc()">
              <div class="mb-4">
                <label for="email" class="form-label">Email</label>
                <input type="text" v-model="user.email" class="form-control" id="email" @keydown="resetErrors()" />
                <span
                  class="text-danger"
                  v-if="errors['email']"
                  v-text="errors.email.reduce((x, y) => x + ',' + y)"
                ></span>
              </div>
              <div class="mb-4">
                <label for="password" class="form-label">Password</label>
                <input type="password" v-model="user.password" class="form-control" id="password" @keydown="resetErrors()" />
                <span
                  class="text-danger"
                  v-if="errors['password']"
                  v-text="errors.password.reduce((x, y) => x + ',' + y)"
                ></span>
              </div>
              <div class="d-grid mb-4">
                <button type="submit" class="btn text-light main-bg">
                  Login
                </button>
              </div>
              <div class="d-grid mb-4">
                <button type="button" @click="loginWithGibhub()" class="btn text-light btn-success">
                  Login with Github
                </button>
              </div>
              <p class="light"><a href="/forgot-password">Forgot password?</a></p>
              <p>Don't have an account? <a href="/register">Sign Up</a></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import fixSwal from "../../swal/index.js";
// import testMixins from "../../mixins/index.js";

export default {
  name: "LoginView",
  // mixins: [testMixins],
  data(){
    return {
      user: {
        email: '',
        password: ''
      },
      errors: {}
    }
  },
  methods: {
    ...mapActions({
      login: 'user/loginUser',
      loginGithub: 'user/loginGithub',
      addNotification: 'application/addNotification'
    }),
    loginFunc(){
      this.login(this.user).then((res) => {
        this.addNotification(res).then(() => {
          fixSwal.toastSuccess(this.notifications);
          this.$router.push({ name: 'dashboard' });
        });
      }).catch((error) => {
        if (error.response.status === 422) {
          this.errors = error.response.data;
          // testMixins.methods.testMixins(this.errors);
        } else {
          fixSwal.error(error.response.data.message);
        }
      });
    },
    loginWithGibhub(){
      this.loginGithub().then((res) => {
        if(res.data.url) {
          window.location.href = res.data.url;
        }
      });
    },
    resetErrors() {
      this.errors = {};
    },
  },
  computed: {
    ...mapGetters({
      notifications: 'application/notifications'
    })
  }
};
</script>

<style scoped>
* {
  --main-bg: #e91e63;
}

.main-bg {
  background: var(--main-bg) !important;
}

input:focus,
button:focus {
  border: 1px solid var(--main-bg) !important;
  box-shadow: none !important;
}

.form-check-input:checked {
  background-color: var(--main-bg) !important;
  border-color: var(--main-bg) !important;
}

.card,
.btn,
input {
  border-radius: 0 !important;
}
</style>
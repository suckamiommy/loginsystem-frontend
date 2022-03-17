<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-lg-4 col-md-6 col-sm-6">
        <div class="card shadow">
          <div class="card-title text-center border-bottom">
            <h2 class="p-3">Reset Password</h2>
          </div>
          <div class="card-body">
            <form @submit.prevent="sendResetPassword()">
              <div class="mb-4">
                <label for="email" class="form-label">Email</label>
                <input type="text" v-model="user.email" class="form-control" id="email" disabled />
              </div>
              <div class="mb-4">
                <label for="password" class="form-label">Password</label>
                <input type="password" v-model="user.password" class="form-control" id="password" />
              </div>
              <div class="mb-4">
                <label for="password_confirmation" class="form-label">Password Confirmation</label>
                <input type="password" v-model="user.password_confirmation" class="form-control" id="password_confirmation" />
                <span
                  class="text-danger"
                  v-if="errors['password']"
                  v-text="errors.password.reduce((x, y) => x + ',' + y)"
                ></span>
              </div>
              <div class="d-grid mb-4">
                <button type="submit" class="btn text-light main-bg">
                  Reset Password
                </button>
              </div>
            </form>
            <div class="d-grid">
              <button class="btn text-light back" @click="backTo('login')">Back to login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import fixSwal from "../../swal/index.js";

export default {
  name: "ResetPasswordView",
  data(){
    return {
      user: {
        email: this.$route.query.email,
        password: '',
        password_confirmation: ''
      },
      errors: {}
    }
  },
  methods: {
    ...mapActions({
        resetPassword: 'user/resetPassword'
    }),
    sendResetPassword(){
        fixSwal.loading("Sending Data...","Please wait...");
        const token = this.$route.query.token;
        this.resetPassword({...this.user, token}).then((res) => {
            fixSwal.close();
            fixSwal.success(res.data.message).then(() => {
              this.$router.push({ name: 'login' });
            });
        })
        .catch((error) => {
          if (error.response.status === 422) {
            fixSwal.close();
            this.errors = error.response.data.errors;
          } else {
            fixSwal.close();
            fixSwal.error(error.response.data.message);
          }
        });
    },
    resetErrors() {
      this.errors = {};
    },
    backTo(route){
      this.$router.push({ name: route });
    }
  },
};
</script>

<style scoped>
* {
  --main-bg: #e91e63;
}

.main-bg {
  background: var(--main-bg) !important;
}

.back {
  background: #00CCFF	!important;
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
<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-lg-4 col-md-6 col-sm-6">
        <div class="card shadow">
          <div class="card-title text-center border-bottom">
            <h2 class="p-3">Forgot Password</h2>
          </div>
          <div class="card-body">
            <form @submit.prevent="sendForgotPassword()">
              <div class="mb-4">
                <label for="email" class="form-label">Email</label>
                <input
                  type="text"
                  v-model="email"
                  class="form-control"
                  id="email"
                  @keydown="resetErrors()"
                />
                <span
                  class="text-danger"
                  v-if="errors['email']"
                  v-text="errors.email.reduce((x, y) => x + ',' + y)"
                ></span>
              </div>
              <div class="d-grid mb-4">
                <button type="submit" class="btn text-light main-bg">
                  Send Email
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
import { mapActions } from "vuex";
import fixSwal from "../../swal/index.js";

export default {
  name: "ForgotPasswordView",
  data() {
    return {
      email: "",
      errors: {}
    };
  },
  methods: {
    ...mapActions({
      forgotPassword: "user/forgotPassword",
    }),
    sendForgotPassword() {
      fixSwal.loading("Sending Data...","Please wait...");
      this.forgotPassword({ email: this.email })
        .then((res) => {
          fixSwal.close();
          fixSwal.success(res.data.message);
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

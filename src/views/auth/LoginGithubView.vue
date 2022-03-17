<template>
  <div>
    <h1>Login With Github, please wait!</h1>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import fixSwal from "../../swal/index.js";

export default {
  name: "LoginGithubView",
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      login: "user/loginGithubCallback",
      addNotification: 'application/addNotification'
    }),
    loginUser() {
      this.login({
        code: this.$route.query.code,
      }).then((res) => {
        if (res.data.access_token) {
          this.addNotification("Login Successfuly.").then(() => {
            fixSwal.toastSuccess(this.notifications);
            this.$router.push({ name: "dashboard" });
          });
        } else {
          this.$router.push({ name: "login" });
        }
      });
    },
  },
  created() {
    this.loginUser();
  },
  computed: {
    ...mapGetters({
      notifications: 'application/notifications'
    })
  }
};
</script>

<style>
</style>
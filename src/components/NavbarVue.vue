<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarTogglerDemo03"
        aria-controls="navbarTogglerDemo03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <span class="navbar-brand">FEMII</span>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/dashboard" active-class="active">Dashboard</router-link>&nbsp;
          </li>
          <li class="nav-item">
            <router-link to="/profile" active-class="active">Profile</router-link>
          </li>
        </ul>
        <div class="d-flex">
          <button
            class="btn btn-outline-primary"
            @click="logOut()"
            v-if="loggedIn"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import fixSwal from "../swal/index.js";
// import $ from "jquery";
// import "bootstrap-icons/font/bootstrap-icons.css";

export default {
  name: "NavbarVue",
  computed: {
    ...mapGetters({
      loggedIn: "user/loggedIn",
      notifications: "application/notifications",
    }),
  },
  methods: {
    ...mapActions({
      logoutUser: "user/logoutUser",
      addNotification: "application/addNotification",
    }),
    logOut() {
      this.logoutUser().then((res) => {
        this.addNotification(res).then(() => {
          fixSwal.toastSuccess(this.notifications);
          this.$router.push({ name: "login" });
        });
      });
    },
  },
};
</script>

<style scoped>

</style>

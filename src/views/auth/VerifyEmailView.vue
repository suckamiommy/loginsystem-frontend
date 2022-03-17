<template>
  <div class="container">
    <h1>Verify Email</h1>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import fixSwal from "../../swal/index.js";

export default {
  name: "VerifyEmailView",
  methods: {
    ...mapActions({
      verifyEmail: "user/VerifyEmail",
      addNotification: "application/addNotification",
    }),
  },
  created() {
    this.verifyEmail(this.$route.query).then((res) => {
      this.addNotification(res.data.message).then(() => {
        fixSwal.toastSuccess(this.notifications);
        this.$router.push({ name: "login" });
      });
    });
  },
  computed: {
    ...mapGetters({
      notifications: "application/notifications",
    }),
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
  background: #00ccff !important;
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
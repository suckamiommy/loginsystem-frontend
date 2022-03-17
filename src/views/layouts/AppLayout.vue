<template>
  <div>
    <NavbarVue />
  </div>
  <router-view />
</template>

<script>
import NavbarVue from "../../components/NavbarVue.vue";

export default {
  name: "AppLayout",
  components: {
    NavbarVue,
  },
};
</script>

<style></style>

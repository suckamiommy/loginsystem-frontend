<template>
  <div>
      <h1>Dash Board</h1>
      <h1 v-if="$can($constants.permissions.viewDeveloperDashboard)">Yes</h1>
  </div>
</template>

<script>
export default {
  mounted(){
    this.$store.dispatch('user/me');
  }
}
</script>

<style>

</style>
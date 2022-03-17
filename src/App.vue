<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
// import fixSwal from "../../swal/index.js"

export default {
  name: "App",
  created() {
    console.log(this.$constants);
    this.checkUserState().then(() => {
      if(this.loggedIn){
        this.me();
      }
    });
  },
  methods: {
    ...mapActions({
      checkUserState: 'user/setLoggedInState',
      me: 'user/me'
    }),
    test(){
      // fixSwal
    }
  },
  computed: {
    ...mapGetters({
      loggedIn: "user/loggedIn",
      allNotifications: 'application/notifications'
    })
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

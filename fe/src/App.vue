<template>
  <v-nav></v-nav>
  <left-bar></left-bar>
  <div class="main">
    <router-view></router-view>
  </div>

</template>
<script>
import vNav from './components/nav'
import leftBar from './components/leftBar'

export default {
  components: {
    vNav,
    leftBar,
  }
}
</script>
<style lang="scss" scoped>
.main {
  background-color: #FFF;
  margin: 20px 0 0 225px;
  padding: 10px 10px 50px;
  min-height: 100px;
}
</style>

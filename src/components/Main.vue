<template>
  <div>
    <div class="header py-5 main-buttons text-center">
      <router-link class="mx-2" to="/create">Create Survey</router-link>
      <router-link class="mx-2" to="/created">Created Surveys</router-link>
      <router-link class="mx-2" to="/results">Results</router-link>
    </div>
    <div class="container my-5">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
}
</script>

<style lang="scss">
.header {
  box-shadow: 0 0 0 3px #e4e4ec;

  a {
    color: #3C4043;

    &.active {
      text-decoration: underline;
      font-weight: bold;
    }

    &:hover {
      color: #3C4043;
    }
  }
}
</style>

<template>
  <div class="container main-buttons text-center">

    <b-button>
      <router-link to="/create">Create Survey</router-link>
    </b-button>

    <b-button>
      <router-link to="/created">Created Survey</router-link>
    </b-button>

    <b-button>
      <router-link to="/results">See Results</router-link>
    </b-button>

    <router-view></router-view>

  </div>
</template>
<script>

export default {
  name: 'Main',

  data() {
    return {}
  },
}
</script>

<style lang="css">
.main-buttons button {
  margin: 0 8px;
}

.main-buttons a {
  color: #fff;
}

.main-buttons a:hover {
  color: #fff;
  text-decoration: none;
}
</style>

<template>
  <div class="created-surveys ">
    <h2 class="text-center my-4" v-if="allSurveys">Choose survey to fill</h2>
    <router-link
        class="mx-2 "
        v-for="(survey) in allSurveys"
        :to="'/created/' + survey.id"
        :key="survey.id">
      <b-button class="mb-2">
        {{ survey.title }}
      </b-button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'CreatedSurveys',
  data() {
    return {
      allSurveys: JSON.parse(localStorage.getItem("allSurveys")),
    }
  },
}
</script>

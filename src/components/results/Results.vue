<template>
  <div class="">
    <h2 class="text-center my-4" v-if="allSurveys">Choose survey to see results</h2>
    <router-link
        class="mx-2"
        v-for="(survey) in allSurveys"
        :to="'/results/' + survey.id"
        :key="survey.id">
      <b-button class="mb-2">
        {{ survey.title }}
      </b-button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Results',
  data() {
    return {
      allAnswers: JSON.parse(localStorage.getItem("allAnswers")),
      allSurveys: JSON.parse(localStorage.getItem("allSurveys")),
    }
  },
}
</script>

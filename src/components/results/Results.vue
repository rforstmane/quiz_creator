<template>
  <div>
    <h4 class="my-3" v-if="allSurveysId">Choose survey to see results</h4>
    <router-link
        v-for="(survey) in allSurveys"
        :to="'/results/' + survey.id"
        :key="survey.id">
      <b-button>
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
      allSurveysId: [],
      allAnswers: JSON.parse(localStorage.getItem("allAnswers")),
      allSurveys: JSON.parse(localStorage.getItem("allSurveys")),
    }
  },
}
</script>

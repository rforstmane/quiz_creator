<template>
  <div class="created-surveys">
    <h4 class="my-3" v-if="allSurveys">Choose survey to fill</h4>
    <router-link
        v-for="(survey) in allSurveys"
        :to="'/created/' + survey.id"
        :key="survey.id">
      <b-button>
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

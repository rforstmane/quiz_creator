<template>
  <div>

    {{ survey.title }}


    <ol v-for="question in survey.questions" :key="question.id">
      <li>{{ question.questionText }}</li>

    </ol>
  </div>
</template>

<script>
export default {
  name: 'SurveyResults',
  data() {
    return {
      allAnswers: JSON.parse(localStorage.getItem("allAnswers")),
      survey: JSON.parse(localStorage.getItem("allSurveys")).find(survey => survey.id === this.$route.params.id),
    }
  },

}
</script>

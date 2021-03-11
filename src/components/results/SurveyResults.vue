<template>
  <div class="survey-results">
    <h2 class="text-center">{{ survey.title }}</h2>
    <ol class="survey-answer m-auto">
      <li v-for="question in survey.questions" :key="question.id">
        <QuestionAnswer
            :allAnswers="allAnswers"
            :question="question"
        />
      </li>
    </ol>
  </div>
</template>

<script>
import QuestionAnswer from "@/components/results/QuestionAnswer";

export default {
  name: 'SurveyResults',
  components: {QuestionAnswer},
  data() {
    return {
      allAnswers: JSON.parse(localStorage.getItem("allAnswers")),
      survey: JSON.parse(localStorage.getItem("allSurveys")).find(survey => survey.id === this.$route.params.id),
    }
  },
}
</script>

<style lang="scss">
.survey-answer {
  font-size: 24px;
  font-weight: 500;
  @media(min-width: 1024px) {
    width: 75%;
  }

  ul {
    margin-bottom: 16px;

    li {
      font-size: 20px;
    }
  }
}
</style>

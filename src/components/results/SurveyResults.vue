<template>
  <div>

    {{ survey.title }}


    <ol v-for="question in survey.questions" :key="question.id">
      <li>

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

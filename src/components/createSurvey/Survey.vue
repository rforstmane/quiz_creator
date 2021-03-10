<template>
  <div class="survey">
    <Question
          v-on:delete-question="deleteQuestion"
          v-for="(question, index) in survey"
          :key="index"
          :itemId="index"
          :question.sync="question">
      </Question>
    </div>
</template>

<script>
import Question from "@/components/createSurvey/Question";

export default {
  props: ['survey'],
  components: {
    Question,
  },
  methods: {
    deleteQuestion(question) {
      const questionIndex = this.survey.indexOf(question);
      this.survey.splice(questionIndex, 1);
    },
  },
}
</script>

<template>
  <div>
    <p class="tasks">Total Questions: {{
        questions.length
      }}</p>
    <Question
        v-on:delete-question="deleteQuestion"
        v-for="(question, index) in questions"
        :key="index"
        :itemId="index"
        :question.sync="question">
    </Question>

    <b-button @click="addSurvey">Pievienot aptauju</b-button>
  </div>

</template>

<script>
import Question from "@/components/questionTypes/done/Question";

export default {
  props: ['questions'],
  data() {
    return {

    }

  },
  components: {
    Question,
  },
  methods: {
    addSurvey() {

    },
    deleteQuestion(question) {
      const questionIndex = this.questions.indexOf(question);
      this.questions.splice(questionIndex, 1);
    },
  },

}
</script>

<template>
  <div>
    <b-button v-on:click="startQuiz" v-show="questionIndex === null">
      {{ survey.id }} </b-button>

    <Question
        v-for="(question, index) in survey.questions"
        :key="index"
        :itemId="index"
        :question="question"
        :questionIndex="questionIndex"
        v-on:input-change="handleChange"
        ref="handleChanges"
    />

    <b-button v-if="questionIndex > 0" @click="prevQuestion">prev question</b-button>

    <b-button v-if="questionIndex !== null && questionIndex < survey.questions.length -1" @click="nextQuestion">next
      question
    </b-button>

    <b-button v-if="questionIndex === survey.questions.length -1" @click="saveAnswers">Iesniegt atbildes
    </b-button>


  </div>
</template>
<script>
import Question from "@/components/createdSurveys/Question";

export default {
  components: {
    Question
  },
  props: ['survey', 'itemId'],
  data() {
    return {
      questionIndex: null,
      questionLength: '',
      answerData: {
        id: this.survey.id,
        answers: []
      },
    }
  },
  methods: {
    startQuiz() {
     this.questionIndex = 0
    },
    nextQuestion() {
      this.$refs.handleChanges[this.questionIndex].sendData()
      this.questionIndex++
    },

    prevQuestion() {
      this.questionIndex--
    },

    handleChange(data) {
      let exists = this.answerData.answers.some(function (item) {
        return item.id === data.id
      })
      if(!exists) {
        this.answerData.answers.push(data)
      } else {
       this.answerData.answers[data.id] = data
      }
    },

    saveAnswers() {
      this.$refs.handleChanges[this.questionIndex].sendData()

      let existingAnswers = JSON.parse(localStorage.getItem("allAnswers"))
      if(existingAnswers === null) existingAnswers = []

      localStorage.setItem("answer", JSON.stringify(this.questions))
      existingAnswers.push(this.answerData)
      localStorage.setItem("allAnswers", JSON.stringify(existingAnswers));

      this.$router.push('results')
    },
  }
}
</script>

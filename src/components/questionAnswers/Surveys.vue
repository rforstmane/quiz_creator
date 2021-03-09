<template>
  <div>

    <p>Aptaujas nosaukums:</p>

    <b-button v-on:click="questionIndex = 0" v-show="questionIndex === null">Aizpildīt aptauju</b-button>

    <Question
        v-for="(question, index) in survey"
        :key="index"
        :itemId="index"
        :question="question"
        :questionIndex="questionIndex"
        v-on:input-change="handleChange"
        ref="handleChanges"
    />

    <b-button v-if="questionIndex > 0" @click="prevQuestion">prev question</b-button>

    <b-button v-if="questionIndex !== null && questionIndex < survey.length -1" @click="nextQuestion">next
      question
    </b-button>

    <b-button v-if="questionIndex === survey.length -1" @click="saveAnswers">Iesniegt atbildes
    </b-button>


  </div>
</template>
<script>
import Question from "@/components/questionAnswers/Question";

export default {
  components: {
    Question
  },
  props: ['survey'],
  data() {
    return {
      questionIndex: null,
      questionLength: '',
      answerData: [],
    }
  },
  methods: {
    nextQuestion() {
      this.$refs.handleChanges[this.questionIndex].sendData()
      this.questionIndex++
    },

    prevQuestion() {
      this.questionIndex--
    },

    handleChange(data) {
      let exists = this.answerData.some(function (item) {
        return item.id === data.id
      })
      if(!exists) {
        this.answerData.push(data)
      } else {
       this.answerData[data.id] = data
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

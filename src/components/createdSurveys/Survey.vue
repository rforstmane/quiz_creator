<template>
  <div class="m-auto created-survey">
    <h2 class="text-center mb-4">{{ survey.title }}</h2>
    <Question
        v-for="(question, index) in survey.questions"
        :key="index"
        :itemId="index"
        :question="question"
        :questionIndex="questionIndex"
        v-on:input-change="handleChange"
        ref="handleChanges"
    />

    <div class="d-flex justify-content-between">
      <b-button
          variant="outline-warning"
          :class="questionIndex > 0 ? '' : 'not-visible'"
          @click="prevQuestion">PREV
      </b-button>

      <b-button
          variant="outline-success"
          v-if="questionIndex !== null && questionIndex < survey.questions.length -1"
          @click="nextQuestion">NEXT
      </b-button>

      <b-button
          variant="success"
          v-if="questionIndex === survey.questions.length -1"
          @click="saveAnswers">SAVE
      </b-button>
    </div>
  </div>
</template>

<script>
import Question from "@/components/createdSurveys/Question";
import {v4 as uuidv4} from "uuid";

export default {
  name: 'Survey',
  components: {
    Question
  },
  data() {
    return {
      survey: JSON.parse(localStorage.getItem("allSurveys")).find(survey => survey.id === this.$route.params.id),
      questionIndex: 0,
      questionLength: '',
      answerData: {
        answers: []
      }
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
      let exists = this.answerData.answers.some(function (item) {
        return item.questionId === data.questionId
      })

      if (!exists) {
        this.answerData.answers.push({...data, id: uuidv4()})
      } else {
        this.answerData.answers[this.questionIndex] = {...data, id: uuidv4()}
      }
    },

    saveAnswers() {
      this.$refs.handleChanges[this.questionIndex].sendData()

      let existingAnswers = JSON.parse(localStorage.getItem("allAnswers"))
      if (existingAnswers === null) existingAnswers = []
      localStorage.setItem("answer", JSON.stringify(this.questions))
      for (const answer of this.answerData.answers) {
        existingAnswers.push(answer)
      }
      localStorage.setItem("allAnswers", JSON.stringify(existingAnswers));

      this.$router.push('/results/' + this.survey.id)
    },
  }
}
</script>

<style lang="scss">
.created-survey {
  @media(min-width: 1024px) {
    width: 50%;
  }

  .radio-input__question {
    .radio-input__options {
      display: flex;
      align-items: center;
      cursor: pointer;

      &:hover {
        background: #e4e4ec;
      }

      label {
        width: 100%;
      }
    }
  }

  .btn {
    &.not-visible {
      opacity: 0;
      visibility: hidden;
    }
  }
}
</style>

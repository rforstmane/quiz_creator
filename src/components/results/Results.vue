<template>
  <div>
    <router-link
        v-for="(survey) in allSurveys"
        :to="'/results/' + survey.id"
        :key="survey.id">
      <b-button>
        {{ survey.title }}

      </b-button>
    </router-link>

    <br>


<!--    {{ allSurveys }}-->


    <h4 class="my-3" v-if="allSurveysId">Choose survey to see results</h4>


    <b-button
        variant="outline-success"
        v-on:click="getAnswers(id)"
        v-for="(id, index) in allSurveysId"
        :key="index + 'i'">
      {{ id }}
    </b-button>

    <!--    {{allAnswers}}-->


    <div class="mb-4" v-for="(question, index) in surveyQuestions"
         :key="index + 'j'">
      <h4><b>{{ index + 1 + '.' + question }}</b></h4>

      {{ foundAnswers.length }}
      <div v-for="(allSurveyAnswers, index) in foundAnswers"
           :key="index+'de'">

        <div v-for="(surveyAnswer, index) in allSurveyAnswers.answers"
             :key="index+'d'">


          <div v-if="question === surveyAnswer.question">

            <div v-if="surveyAnswer.answer.length">

              {{ surveyAnswer.answer }}

            </div>
            <div v-else> nav datu</div>

          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Results',
  data() {
    return {
      allSurveysId: [],
      surveyQuestions: [],
      questionTypes: [],
      questionRadioTypes: [],
      allAnswers: JSON.parse(localStorage.getItem("allAnswers")),
      allSurveys: JSON.parse(localStorage.getItem("allSurveys")),
      foundAnswers: [],

    }
  },
  methods: {
    getAnswers(id) {


      this.foundAnswers = this.allAnswers.filter(answer => answer.id === id)

      this.surveyQuestions = []
      this.questionRadioTypes = []
      for (let i = 0; i < this.foundAnswers.length; i++) {
        let allQuestions = this.foundAnswers[i].answers
        for (let i = 0; i < allQuestions.length; i++) {


          let question = allQuestions[i].question
          if (!this.surveyQuestions.includes(question)) {
            this.surveyQuestions.push(question)
          }


          let questionType = allQuestions[i].type
          if (!this.questionTypes.includes(questionType)) {
            this.questionTypes.push(questionType)
          }


          let radioType = allQuestions[i].answer
          if (questionType === 'radioQuestion') {
            console.log(radioType)
            if (radioType.length !== 0) {
              if (!this.questionRadioTypes.includes(radioType)) {
                this.questionRadioTypes.push(radioType)
              }
            } else if (!this.questionRadioTypes.includes('nav datu')) {
              this.questionRadioTypes.push('nav datu')
            }
          }

        }
      }

    }
  },
  mounted() {
    for (let i = 0; i < this.allAnswers.length; i++) {
      let uniqueIds = this.allAnswers[i].id

      if (!this.allSurveysId.includes(uniqueIds)) {
        this.allSurveysId.push(uniqueIds)
      }
    }
  }
}
</script>

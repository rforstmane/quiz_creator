<template>
  <div class="created-surveys">
    <div class="container">

      <b-button v-on:click="questionIndex = 0">Aizpildīt aptauju</b-button>

      <div v-for="(survey, index) in this.allSurveys"
           :key="index" >

        {{ index + 1 + '.Aptauja' }}

        <div v-for="(question, index) in survey" :key="index">

          {{ questionLength = question.length}}


          <!--          jautajumu daļa -->
          <div v-if="index === questionIndex" v-bind:key="index">
            {{ index + 1 + '.' + question.questionText }}


            <!--          atbilžu daļa-->
            <div v-if="question.type === 'simpleQuestion' ">
              <input type="text" placeholder="Ievadi atbildi" v-model="questionAnswers.typeText">

            </div>

            <div v-if="question.type === 'radioQuestion' ">
              <div v-for="(option, index) in question.optionsText" :key="index">
                <input
                    :value="option.optionsText"
                    :id="index"
                    type='radio'
                    v-model="questionAnswers.optionsText">
                <label :for="index">{{ option.optionsText }}</label>
                <p>{{questionIndex.optionsText}}</p>
              </div>
            </div>

            <div v-if="question.type === 'selectQuestion' ">
              <div>{{ question.selectType }}
              </div>
              <select v-bind:multiple="question.selectType === 'multiple' ">

                <option
                    v-for="(select, index) in question.selectText"
                    :key="index"
                    :id="index">
                  {{ select.selectText }}
                </option>
              </select>
            </div>
          </div>
        </div>




        <b-button v-if="questionIndex > 0" @click="prevQuestion">prev question</b-button>

<!--        <b-button v-if="questionIndex !== null" @click="nextQuestion">next question</b-button>-->
        <b-button v-if="questionIndex < survey.length -1" @click="nextQuestion">next question</b-button>
        <b-button v-else @click="nextQuestion">Sagalabāt atbildes</b-button>

        <br>
        <b-button v-if="questionIndex !== null">Iesniegt atbildes
        </b-button>

        <br>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  name: 'Created',
  data () {
    return {
      questionIndex: null,
      allSurveys: Array,
      questionAnswers: [],
      questionLength: ''
    }
  },
  mounted() {
    this.allSurveys = JSON.parse(localStorage.getItem("allSurveys"))
  },
  methods: {
    nextQuestion() {
      this.questionIndex++
    },
    prevQuestion() {
      this.questionIndex--

    }
  }
}
</script>

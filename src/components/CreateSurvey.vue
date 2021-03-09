<template>
  <div class="row d-flex mt-5">
    <div class="button-block col-4">
      <b-form-select
          @change="addQuestion"
          v-model="selected"
          :options="options">
      </b-form-select>
      <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
    </div>

    <div class="col-8">
      <div>

        <div>
          <label for="surveyID">Title of Survey: </label>
          <input
              id="surveyID"
              type="text"
              v-model="survey.id">
        </div>
        <Survey
            v-bind:survey="survey.questions"/>
        <TypeText
            v-if="isVisibleTextForm"
            v-on:create-question="createQuestion"/>
        <TypeRadio
            v-if="isVisibleRadioForm"
            v-on:create-radio="createQuestion"/>
        <TypeSelect
            v-if="isVisibleSelectForm"
            v-on:create-select="createQuestion"/>
      </div>

      <b-button v-show="survey.questions.length > 0" @click="addSurvey">Saglabāt aptauju</b-button>

    </div>
  </div>
</template>

<script>

import TypeText from "@/components/questionTypes/TypeText";
import TypeRadio from "@/components/questionTypes/TypeRadio";
import TypeSelect from "@/components/questionTypes/TypeSelect";
import Survey from "@/components/questionTypes/done/Survey";

export default {
  name: 'Create',
  components: {
    Survey,
    TypeSelect,
    TypeRadio,
    TypeText
  },
  data() {
    return {
      selected: null,
      text: 'text',
      radio: 'radio',
      select: 'select',

      options: [
        {value: null, text: 'Please select an option'},
        {value: 'text', text: 'Type Text'},
        {value: 'radio', text: 'Type Radio'},
        {value: 'select', text: 'Type Selection'},
      ],

      isVisibleTextForm: false,
      isVisibleRadioForm: false,
      isVisibleSelectForm: false,

      allSurveys: {},
      survey: {
        id: '',
        questions: []
      },

    }
  },
  methods: {
    addSurvey() {

      let existingSurveys = JSON.parse(localStorage.getItem("allSurveys"))
      if(existingSurveys === null) existingSurveys = []

      localStorage.setItem("survey", JSON.stringify(this.survey))
      existingSurveys.push(this.survey)
      localStorage.setItem("allSurveys", JSON.stringify(existingSurveys));

      this.$router.push('created')

    },
    addQuestion(event) {
      if (event === this.text) {
        this.isVisibleTextForm = true
        this.isVisibleRadioForm = false
        this.isVisibleSelectForm = false
      } else if (event === this.radio) {
        this.isVisibleRadioForm = true
        this.isVisibleTextForm = false
        this.isVisibleSelectForm = false
      } else if (event === this.select) {
        this.isVisibleSelectForm = true
        this.isVisibleRadioForm = false
        this.isVisibleTextForm = false
      }
    },

    closeAllComponents() {
      this.isVisibleSelectForm = false
      this.isVisibleRadioForm = false
      this.isVisibleTextForm = false
    },
    createQuestion(newQuestion) {
      this.survey.questions.push(newQuestion);
    }
  }
}
</script>

<style>
.button-block .btn {
  width: 200px;
  display: block;
  margin: 0 auto 12px auto;
}
</style>

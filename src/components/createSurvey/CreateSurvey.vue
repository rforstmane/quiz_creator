<template>
  <div class="row d-flex mt-5">
    <div class="button-block col-12 col-md-4">
      <b-form-select
          @change="addQuestion"
          v-model="selected"
          :options="options">
      </b-form-select>
      <div class="mt-3">Selected: <b>{{ selected }}</b></div>
    </div>

    <div class="col-12 col-md-8">
      <div>
        <div class="survey-title mb-4">
          <label for="surveyID">Title of Survey: </label>
          <input
              id="surveyID"
              type="text"
              v-model="survey.title">
        </div>

        <b-alert class="mb-0" :show="showErrorAlert" variant="danger">Empty Survey Title</b-alert>

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
      <b-button
          v-show="survey.questions.length > 0"
          @click="addSurvey">Saglabāt aptauju
      </b-button>
    </div>
  </div>
</template>

<script>

import TypeText from "@/components/createSurvey/questionTypes/TypeText";
import TypeRadio from "@/components/createSurvey/questionTypes/TypeRadio";
import TypeSelect from "@/components/createSurvey/questionTypes/TypeSelect";
import Survey from "@/components/createSurvey/Survey";
import {v4 as uuidv4} from 'uuid';

export default {
  name: 'CreateSurvey',
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
      showErrorAlert: false,

      options: [
        {value: null, text: 'Please select an option'},
        {value: 'text', text: 'Type Text'},
        {value: 'radio', text: 'Type Radio'},
        {value: 'select', text: 'Type Select'},
      ],

      isVisibleTextForm: false,
      isVisibleRadioForm: false,
      isVisibleSelectForm: false,

      allSurveys: {},

      survey: {
        id: uuidv4(),
        title: '',
        questions: []
      },
    }
  },
  methods: {
    addSurvey() {
      if (this.survey.id === '') {
        this.showErrorAlert = true
      } else {
        this.showErrorAlert = false

        let existingSurveys = JSON.parse(localStorage.getItem("allSurveys"))
        if (existingSurveys === null) existingSurveys = []

        localStorage.setItem("survey", JSON.stringify(this.survey))
        existingSurveys.push(this.survey)
        localStorage.setItem("allSurveys", JSON.stringify(existingSurveys));

        this.$router.push('created')
      }
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

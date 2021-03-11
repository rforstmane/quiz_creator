<template>
  <div class="row">
    <div class="button-block col-12 col-md-4 mb-4">
      <b-form-select
          @change="addQuestion"
          v-model="selected"
          :options="options">
      </b-form-select>
      <div class="mt-3">Selected: <b>{{ selected }}</b></div>
    </div>
    <div class="col-12 col-md-7">
      <div>
        <div class="survey-title mb-4">
          <input
              placeholder="Survey title"
              id="surveyID"
              type="text"
              v-model="survey.title">
        </div>
        <b-alert :show="showErrorAlert" variant="danger">Empty Survey Title</b-alert>
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
      <div class="text-center">
        <b-button
            v-show="survey.questions.length > 0"
            @click="addSurvey">SAVE
        </b-button>
      </div>
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
      if (this.survey.title === '') {
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

<style lang="scss">
.survey-title {
  input {
    background: transparent;
    width: 100%;
    border: none;
    border-bottom: 2px solid #e4e4ec;
    border-radius: 0;
    outline: none;
    color: #000000;
    font-size: 20px;

    &:focus, &:active {
      outline: none;
      border-bottom: 2px solid #84848e;
    }
  }
}

.card {
  padding: 36px 20px;
  border-radius: 8px;
  border: 1px solid #dadce0;
  box-shadow: 0 3px 6px #00000029;

  &.active {
    border: 1px solid #00000060;
    box-shadow: 0 3px 6px #00000060;
  }

  input {
    background: #f8f9fa;
    width: 100%;
    border: none;
    border-bottom: 2px solid #e4e4ec;
    padding: 10px 20px;
    outline: none;
    color: #000;

    &.radio-button {
      max-width: 10%;
    }

    &:focus, &:active {
      outline: none;
      border-bottom: 2px solid #84848e;
    }

    &::placeholder {
      font-weight: 500;
    }
  }

  .radio-input__options {
    input {
      font-size: 18px;
      background: transparent;
      padding: 0;
      margin-left: 12px;
      border-bottom: 2px solid transparent;

      &:hover {
        border-bottom: 2px solid #e4e4ec;
      }
    }

    label {
      cursor: pointer;
      font-size: 18px;
    }
  }

  .select-input__options-type {
    label {
      cursor: pointer;
      font-size: 18px;
    }
  }
  .alert {
    border-radius: 8px;
    border: none;
  }
}
</style>

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
        <QuestionList
            v-bind:questions="questions"/>
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

      <b-button v-show="questions.length > 0" @click="addSurvey">Saglabāt aptauju</b-button>

    </div>
  </div>
</template>

<script>

import TypeText from "@/components/questionTypes/TypeText";
import QuestionList from "@/components/questionTypes/done/QuestionList";
import TypeRadio from "@/components/questionTypes/TypeRadio";
import TypeSelect from "@/components/questionTypes/TypeSelect";

export default {
  name: 'Create',
  components: {
    TypeSelect,
    TypeRadio,
    QuestionList,
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
        {value: 'text', text: 'Teksta jautājums'},
        {value: 'radio', text: 'Radio type jautajums'},
        {value: 'select', text: 'Select type'},
      ],

      isVisibleTextForm: false,
      isVisibleRadioForm: false,
      isVisibleSelectForm: false,
      questions: [],
    }
  },
  methods: {
    addSurvey() {

      // localStorage.setItem("surveys", JSON.stringify(this.questions))

      this.$router.push({
        name: 'Created',
        params: {surveys: this.questions}
      })

      console.log(this.questions)
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
      this.questions.push(newQuestion);
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

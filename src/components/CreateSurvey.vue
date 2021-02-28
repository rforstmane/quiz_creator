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
            v-bind:questions="questions"
            />
        <TypeText v-if="isVisibleTextForm"
                   v-on:hide-form="addTextComponent1"
                   v-on:create-question="createQuestion"/>
        <TypeRadio v-if="isVisibleRadioForm"
                   v-on:hide-form="addRadioComponent1"
                   v-on:create-radio="createRadio"/>
        <TypeSelect v-if="isVisibleSelectForm"
                   v-on:hide-form="addSelectComponent1"
                   v-on:create-select="createSelect"/>
      </div>
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
        { value: null, text: 'Please select an option' },
        { value: 'text', text: 'Teksta jautājums' },
        { value: 'radio', text: 'Radio type jautajums' },
        { value: 'select', text: 'Select type' },
      ],

      isVisibleTextForm: false,
      isVisibleRadioForm: false,
      isVisibleSelectForm: false,
      questions: [],
    }
  },
  methods: {
    addQuestion(event) {
      console.log(event)
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

    createQuestion(newQuestion) {
      this.questions.push(newQuestion);
    },
    createRadio(newRadio) {
      this.questions.push(newRadio);
    },
    createSelect(newSelect) {
      this.questions.push(newSelect);
    },

    addTextComponent1() {
      this.isVisibleSelectForm = false
      this.isVisibleRadioForm = false
      this.isVisibleTextForm = false
    },

    addRadioComponent1() {
      this.isVisibleSelectForm = false
      this.isVisibleRadioForm = false
      this.isVisibleTextForm = false
    },
    addSelectComponent1() {
      this.isVisibleSelectForm = false
      this.isVisibleRadioForm = false
      this.isVisibleTextForm = false
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

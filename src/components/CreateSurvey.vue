<template>
  <div class="row d-flex mt-5">

    <div class="button-block col-4">
      <b-form-select
          v-model="selected"
          :options="options">
      </b-form-select>
      <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
      <b-button
          v-on:click="addTextComponent"
          variant="outline-primary">
        text
      </b-button>
      <b-button
          v-on:click="addRadioComponent"
          variant="outline-primary">
        radio
      </b-button>
      <b-button
          variant="outline-primary">
        selects
      </b-button>
    </div>

    <div class="col-8">

      <div>
        <QuestionList
            v-bind:questions="questions"
            />
        <TypeText v-if="isVisibleTextForm"
                   v-on:hide-form="addTextComponent1"
                   v-on:create-question="createQuestion"/>
<!--        <type-radio v-if="isVisibleTextForm"-->
<!--                   v-on:hide-form="addTextComponent1"-->
<!--                   v-on:create-todo="createTodo"/>-->
      </div>
    </div>
  </div>
</template>

<script>

import TypeText from "@/components/questionTypes/TypeText";
import QuestionList from "@/components/questionTypes/done/QuestionList";
// import TypeRadio from "@/components/questionTypes/TypeRadio";

export default {
  name: 'Create',
  components: {
    QuestionList,
    TypeText
  },
  data() {
    return {
      selected: null,
      options: [
        { value: null, text: 'Please select an option' },
        { value: 'a', text: 'Teksta jautājums' },
        { value: 'b', text: 'Radio type jautajums' },
        { value: 'c', text: 'Checkobos type' },
      ],

      isVisibleTextForm: false,
      isVisibleRadioForm: false,
      questions: [],
    }
  },
  methods: {
    createQuestion(newQuestion) {
      console.log(this.questions)
      this.questions.push(newQuestion);
    },
    addTextComponent() {
      this.isVisibleTextForm = true
    },
    addTextComponent1() {
      this.isVisibleTextForm = false
    },
    addRadioComponent() {
      this.isVisibleRadioForm = false
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

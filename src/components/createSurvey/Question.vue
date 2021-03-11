<template>
  <div class="card question py-3 mb-4" :class="isEditing ? 'active' : ''">
    <div class="content" v-show="!isEditing">

      <h5 class="text-center"> {{ itemId + 1 + '.' + question.questionText }}</h5>

      <SimpleQuestion
          class="text-input__question"
          v-if="question.type === 'simpleQuestion'"
          :question="question"/>

      <RadioQuestion
          class="radio-input__question "
          v-if="question.type === 'radioQuestion'"
          :question="question"/>

      <SelectQuestion
          class="select-input__question text-center"
          v-if="question.type === 'selectQuestion' "
          :question="question"/>
    </div>

    <div class="content" v-show="isEditing">
      <div
          class="text-input__question"
          v-if="question.type === 'simpleQuestion'">
        <input
            class="mb-4"
            type='text'
            v-model="question.questionText">
      </div>
      <div
          class="radio-input__question"
          v-if="question.type === 'radioQuestion'">
        <input
            class="mb-4"
            type='text'
            v-model="question.questionText">
        <div
            class="radio-input__options"
            v-for="(option, index) in question.options"
            :key="option.id">
          <div class="mb-2 d-flex align-items-center">

            <input
                class="w-auto"
                disabled
                :id="index"
                type='radio'
                v-model="option.value">
            <input
                class="mr-4"
                v-model="option.valueText"
                :placeholder=placeholder>
            <b-button
                v-if="question.options.length > 1"
                variant="outline-secondary"
                @click="removeRadioOption(index)">x
            </b-button>
          </div>
        </div>

        <div class="text-left">
          <b-button
              class="mb-4"
              variant="outline-secondary"
              @click="addRadioOption()">+
          </b-button>
        </div>
      </div>

      <div
          class="select-input__question"
          v-if="question.type === 'selectQuestion'">
        <input
            class="mb-4"
            type='text'
            v-model="question.questionText">
        <div
            class="radio-input__options"
            v-for="(select, index) in question.selects"
            :key="select.id">
          <div class="mb-2 d-flex align-items-center">

            <input
                class="w-auto"
                disabled
                :id="index"
                type='radio'
                v-model="select.value">
            <input
                class="mr-4"
                v-model="select.valueText "
                :placeholder=placeholder>
            <b-button
                v-if="question.selects.length > 1"
                variant="outline-secondary"
                @click="removeSelectOption(index)">x
            </b-button>
          </div>
        </div>

        <div class="text-left">
          <b-button
              class="mb-4"
              variant="outline-secondary"
              @click="addSelectOption()">+
          </b-button>
        </div>

        <div class="select-input__options-type mb-4">
          <div>
            <input
                class="w-auto"
                type="radio"
                :id="'single' + itemId"
                value="single"
                v-model="selectType"
                :checked="question.selectType">
            <label :for="'single' + itemId">Single Select</label>
          </div>
          <div>
            <input
                class="w-auto"
                type="radio"
                :id="'multiple' + itemId"
                value="multiple"
                v-model="selectType"
                :checked="question.selectType">
            <label :for="'multiple' + itemId">Multiple Select</label>
          </div>
        </div>
      </div>

      <b-alert
          class="mb-4"
          :show="showErrorAlert"
          variant="danger">Empty question/option field
      </b-alert>
    </div>

    <div class="text-center">
      <b-button
          v-if="isEditing"
          class="d-inline"
          variant="outline-success"
          v-on:click="saveChanges">Save changes
      </b-button>
      <b-button
          v-show="!isEditing"
          class="mx-3"
          v-on:click="editQuestion"
          variant="outline-warning">Edit
      </b-button>
      <b-button
          class="mx-3"
          v-on:click="deleteQuestion(question)"
          variant="outline-danger">Delete
      </b-button>
    </div>

  </div>
</template>

<script>
import {v4 as uuidv4} from 'uuid';
import SimpleQuestion from "@/components/createSurvey/questions/SimpleQuestion";
import RadioQuestion from "@/components/createSurvey/questions/RadioQuestion";
import SelectQuestion from "@/components/createSurvey/questions/SelectQuestion";

export default {
  components: {SelectQuestion, RadioQuestion, SimpleQuestion},
  props: ['question', 'itemId'],
  data() {
    return {
      showErrorAlert: false,
      isEditing: false,
      selectType: this.question.selectType,
      placeholder: 'Write your option',
      options: [
        {
          id: uuidv4(),
          valueText: '',
          value: ''
        }
      ]
    };
  },
  methods: {
    addSelectOption() {
      this.question.selects.push({
        id: uuidv4(),
        valueText: ''
      })
    },

    removeSelectOption(index) {
      if (confirm("Are you sure?")) {
        this.question.selects.splice(index, 1)
      }
    },

    addRadioOption() {
      this.question.options.push({
        id: uuidv4(),
        valueText: '',
      })
    },

    removeRadioOption(index) {
      if (confirm("Are you sure?")) {
        this.question.options.splice(index, 1)
      }
    },

    deleteQuestion(question) {
      if (confirm("Are you sure?")) {
        this.$emit('delete-question', question)
      }
    },

    editQuestion() {
      this.isEditing = true;
    },

    saveChanges() {
      let hasBlank = false
      console.log(hasBlank)
      if (this.question.questionText === '') {
        hasBlank = true
        this.showErrorAlert = true
      } else {
        hasBlank = false
        this.showErrorAlert = false
        this.isEditing = false
      }

      if (this.question.type === 'radioQuestion') {
        for (let i = 0; i < this.question.options.length; i++) {
          let isValueText = this.question.options[i].valueText
          if (isValueText === '') {
            hasBlank = true
            this.showErrorAlert = true
            this.isEditing = true
          }
        }
      }

      if (this.question.type === 'selectQuestion') {
        for (let i = 0; i < this.question.selects.length; i++) {
          let isValueText = this.question.selects[i].valueText
          if (isValueText === '') {
            hasBlank = true
            this.showErrorAlert = true
            this.isEditing = true
          }
        }
      }
    },
  },
};
</script>

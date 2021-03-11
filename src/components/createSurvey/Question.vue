<template>
  <div class="card question py-4">
    <div class="content" v-show="!isEditing">
      <div class='header'>
        {{ itemId + 1 + '.' + question.questionText }}
        <div
            class="text-input__question"
            v-if="question.type === 'simpleQuestion'">
          <input
              class="w-50 mb-4"
              type='text'
              disabled
              v-model="question.questionText">
        </div>

        <div
            class="radio-input__question"
            v-if="question.type === 'radioQuestion'">
          <div
              class="radio-input__options"
              v-for="(option, index) in question.options"
              :key="option.id">

            <input
                :id="index"
                type='radio'
                disabled>
            <label
                :for="index">
              {{ option.valueText }}
            </label>
          </div>
        </div>

        <div
            class="select-input__question"
            v-if="question.type === 'selectQuestion' ">
          <select class="w-50 mb-2">
            <option selected disabled>Select your option</option>
            <option
                disabled
                v-for="(select, index) in question.selects"
                :value="index"
                :key="select.id"
                :id="index">
              {{ select.valueText }}
            </option>
          </select>
          <div class="mb-4">
            <span><b>{{ question.selectType }}</b> select</span>
          </div>
        </div>
      </div>

      <div>
        <b-button
            v-on:click="editQuestion"
            variant="warning">Edit
        </b-button>
        <b-button
            v-on:click="deleteQuestion(question)"
            variant="danger">Delete
        </b-button>
      </div>
    </div>

    <div class="content" v-show="isEditing">
      <div
          class="text-input__question"
          v-if="question.type === 'simpleQuestion'">
        <label>Your Question</label>
        <input type='text' v-model="question.questionText">
      </div>

      <div
          class="radio-input__question"
          v-if="question.type === 'radioQuestion'">
        <label>Your Question</label>
        <input type='text' v-model="question.questionText">

        <div
            class="radio-input__options"
            v-for="(option, index) in question.options"
            :key="option.id">
          <input
              disabled
              :id="index"
              type='radio'
              v-model="option.value">
          <input v-model="option.valueText "/>
          <b-button
              v-if="question.options.length > 1"
              variant="outline-danger"
              @click="removeRadioOption(index)">-
          </b-button>
        </div>
        <b-button variant="outline-warning" @click="addRadioOption()">+</b-button>
      </div>

      <div
          class="select-input__question"
          v-if="question.type === 'selectQuestion'">
        <label>Your Question</label>
        <input
            type='text'
            v-model="question.questionText">
        <div
            class="select-input__options"
            v-for="(select, index) in question.selects"
            :key="select.id">
          <input
              disabled
              :id="index"
              type='radio'
              v-model="select.value">
          <input v-model="select.valueText "/>
          <b-button
              v-if="question.selects.length > 1"
              variant="outline-danger"
              @click="removeSelectOption(index)">-
          </b-button>
        </div>

        <b-button
            variant="outline-warning"
            @click="addSelectOption()">+
        </b-button>

        <div class="select-input__options-type">
          <input
              type="radio"
              :id="'single' + itemId"
              value="single"
              v-model="selectType"
              :checked="question.selectType">
          <label :for="'single' + itemId">Single Select</label>
          <br>
          <input
              type="radio"
              :id="'multiple' + itemId"
              value="multiple"
              v-model="selectType"
              :checked="question.selectType">
          <label :for="'multiple' + itemId">Multiple Select</label>
        </div>

        <p>Selected Type: {{ question.selectType = selectType }}</p>

      </div>
      <b-alert
          class="mb-0"
          :show="showErrorAlert"
          variant="danger">Empty question/option field
      </b-alert>

      <b-button
          variant="success"
          v-on:click="saveChanges">Save changes
      </b-button>
    </div>
  </div>
</template>

<script>
import {v4 as uuidv4} from 'uuid';

export default {
  props: ['question', 'itemId'],
  data() {
    return {
      showErrorAlert: false,
      isEditing: false,
      selectType: this.question.selectType,
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
        value: ''
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

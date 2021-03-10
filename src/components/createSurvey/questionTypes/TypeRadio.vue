<template>
  <div class="card radio-input py-4">
    <div class="container">
      <div class="radio-input__question">
        <input
            class="w-50 mb-4"
            v-model="questionText"
            placeholder="Write question..."
            type='text'>
      </div>

      <div
          class="radio-input__options"
          v-for="(option, index) in options"
          :key="index">
        <div class="mb-2">
          <input
              disabled
              type="radio"
              :id="index">
          <input
              v-model="option.valueText"
              :placeholder=placeholder>
          <b-button
              v-if="options.length > 1"
              variant="outline-danger"
              @click="removeRadioOption(index)">-
          </b-button>
        </div>
      </div>

      <b-button
          variant="outline-warning"
          @click="addRadioOption()">+
      </b-button>

      <b-alert
          class="mb-0"
          :show="showErrorAlert"
          variant="danger">Empty question/option field
      </b-alert>

      <div>
        <b-button
            variant="success"
            v-on:click="addQuestion()">Add
        </b-button>
        <b-button
            variant="danger"
            v-on:click="cancelQuestion">Cancel
        </b-button>
      </div>

    </div>
  </div>
</template>

<script>

import {v4 as uuidv4} from 'uuid';

export default {
  props: [
    'option'
  ],
  data() {
    return {
      id: uuidv4(),
      questionText: '',
      type: 'radioQuestion',
      placeholder: 'Write your option',
      valueText: '',
      showErrorAlert: false,
      options: [
        {
          id: uuidv4(),
          valueText: '',
        }
      ]
    };
  },
  methods: {
    cancelQuestion() {
      if (confirm("Are you sure?")) {
        this.$parent.closeAllComponents()
      }
    },

    removeRadioOption(index) {
      if (confirm("Are you sure?")) {
        this.options.splice(index, 1)
      }
    },

    addRadioOption() {
      this.options.push({
        id: uuidv4(),
        valueText: ''
      })
    },

    addQuestion() {
      let hasBlank = false
      if (this.questionText === '') {
        hasBlank = true
        this.showErrorAlert = true
      }

      for (let i = 0; i < this.options.length; i++) {
        let isOptionText = this.options[i].valueText
        if (isOptionText === '') {
          hasBlank = true
          this.showErrorAlert = true
        }
      }

      if (!hasBlank) {
        this.showErrorAlert = false
        const questionText = this.questionText;
        const options = this.options;
        const type = this.type
        const id = this.id
        this.$emit('create-radio', {
          options,
          questionText,
          type,
          id
        });
        this.questionText = '';
        this.options = [{
          id: uuidv4(),
          valueText: '',
        }];
        this.isVisibleRadioForm = false;
      }
    },
  },
}
</script>

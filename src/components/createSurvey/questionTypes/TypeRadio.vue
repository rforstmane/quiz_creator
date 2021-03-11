<template>
  <div class="card radio-input py-4 mb-4">
    <div class="radio-input__question">
      <input
          class="mb-4"
          v-model="questionText"
          placeholder="Write question..."
          type='text'>
    </div>

    <div
        class="radio-input__options"
        v-for="(option, index) in options"
        :key="option.id">
      <div class="mb-2 d-flex align-items-center">
        <input
            class="w-auto"
            disabled
            type="radio">
        <input
            class="mr-4"
            v-model="option.valueText"
            :placeholder=placeholder>
        <b-button
            v-if="options.length > 1"
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

    <b-alert
        class="mb-4"
        :show="showErrorAlert"
        variant="danger">Empty question/option field
    </b-alert>

    <div class="text-center">
      <b-button
          class="mx-3"
          variant="outline-success"
          v-on:click="addQuestion()">Add
      </b-button>
      <b-button
          class="mx-3"
          variant="outline-danger"
          v-on:click="cancelQuestion">Cancel
      </b-button>
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
      id: '',
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
        const questionText = this.questionText
        const options = this.options
        const type = this.type
        const id = uuidv4()
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

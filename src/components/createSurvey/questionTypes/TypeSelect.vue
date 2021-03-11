<template>
  <div class="card select-input py-4 mb-4">
      <div class="select-input__question">
        <input
            class="mb-4"
            v-model="questionText"
            placeholder="Write question..."
            type='text'>
      </div>

      <div
          class="radio-input__options"
          v-for="(option, index) in selects"
          :key="option.id">
        <div class="mb-2 d-flex align-items-center">
          <input
              class="w-auto"
              disabled
              type="radio"
              v-model="option.value">
          <input
              class="mr-4"
              v-model="option.valueText"
              :placeholder=placeholder>
          <b-button
              v-if="selects.length > 1"
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
              id="single"
              value="single"
              v-model="selectType">
          <label class="ml-3" for="single">Single select</label>
        </div>
        <div>
          <input
              class="w-auto"
              type="radio"
              id="multiple"
              value="multiple"
              v-model="selectType">
          <label class="ml-3" for="multiple">Multiple select</label>
        </div>
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
            v-on:click="cancelQuestion">
          Cancel
        </b-button>
      </div>
  </div>
</template>

<script>

import {v4 as uuidv4} from "uuid";

export default {
  props: [
    'option'
  ],
  data() {
    return {
      id: '',
      questionText: '',
      type: 'selectQuestion',
      placeholder: 'Write your option',
      valueText: '',
      showErrorAlert: false,
      selectType: 'single',
      selects: [
        {
          id: uuidv4(),
          valueText: '',
          value: ''
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

    removeSelectOption(index) {
      if (confirm("Are you sure?")) {
        this.selects.splice(index, 1)
      }
    },

    addSelectOption() {
      this.selects.push({
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

      for (let i = 0; i < this.selects.length; i++) {
        let isOptionText = this.selects[i].valueText
        if (isOptionText === '') {
          hasBlank = true
          this.showErrorAlert = true
        }
      }

      if (!hasBlank) {
        this.showErrorAlert = false
        const questionText = this.questionText;
        const selects = this.selects;
        const type = this.type
        const selectType = this.selectType
        const id = uuidv4()
        this.$emit('create-select', {
          selects,
          questionText,
          type,
          selectType,
          id
        });
        this.questionText = '';
        this.selectType = 'single';
        this.selects = [{
          id: uuidv4(),
          valueText: '',
          value: ''
        }];
        this.isVisibleRadioForm = false;
      }
    },
  },
}
</script>

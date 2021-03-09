<template>
  <div class="card radio-input">
    <div class="container">
      <div class="radio-input__question">
        <input
            v-model="questionText"
            placeholder="Write question..."
            type='text'>
      </div>

      <div class="radio-input__options"
           v-for="(option, index) in options"
           :key="index">
        <div>
          <input disabled type="radio" :id="index" v-model="option.value">
          <input v-model="option.optionsText" :placeholder=placeholder>
          <b-button v-if="options.length > 1" variant="outline-danger" @click="removeRadioOption(index)">-</b-button>
        </div>
      </div>

      <b-button variant="outline-warning" @click="addRadioOption()">+</b-button>
      <br>

      <b-alert class="mb-0" :show="showErrorAlert" variant="danger">Empty question/option field</b-alert>

      <b-button variant="success" v-on:click="addQuestion()">
        Add
      </b-button>
      <b-button variant="danger" v-on:click="cancelQuestion">
        Cancel
      </b-button>
    </div>
  </div>
</template>

<script>

export default {
  props: [
    'option'
  ],
  data() {
    return {
      type: 'radioQuestion',
      placeholder: 'Write your option',
      optionsText: '',
      questionText: '',
      showErrorAlert: false,
      options: [
        {
          id: '',
          optionsText: '',
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
    removeRadioOption(index) {
      if (confirm("Are you sure?")) {
        this.options.splice(index, 1)
      }
    },
    addRadioOption() {
      this.options.push({
        id: '',
        optionsText: ''
      })
    },

    addQuestion() {
      let hasBlank = false
      if (this.questionText === '') {
        hasBlank = true
        this.showErrorAlert = true
      }
      for (let i = 0; i < this.options.length; i++) {
        let isOptionText = this.options[i].optionsText

        if (isOptionText === '') {
          hasBlank = true
          this.showErrorAlert = true
        }
      }

      if (!hasBlank) {
        this.showErrorAlert = false
        const questionText = this.questionText;
        const optionsText = this.options;
        const type = this.type
        this.$emit('create-radio', {
          optionsText,
          questionText,
          type
        });
        this.questionText = '';
        this.options = [{
          id: '',
          optionsText: '',
          value: ''
        }];
        this.isVisibleRadioForm = false;
      }
    },
  },
}
</script>

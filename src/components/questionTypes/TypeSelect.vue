<template>
  <div class="card select-input">
    <div class='container'>
      <div class="select-input__question">
        <input
            v-model="questionText"
            placeholder="Write question..."
            type='text'>
      </div>

      <div class="select-input__options"
           v-for="(option, index) in selects"
           :key="index">

        <div>
          <input disabled type="radio" :id="index" v-model="option.value">
          <input v-model="option.selectText" :placeholder=placeholder>
          <b-button v-if="selects.length > 1" variant="outline-danger" @click="removeSelectOption(index)">-</b-button>
        </div>
      </div>

      <b-button variant="outline-warning" @click="addSelectOption()">+</b-button>

      <div class="select-input__options-type">
        <input type="radio" id="single" value="single" v-model="selectType">
        <label for="single">Single select</label>
        <br>
        <input type="radio" id="multiple" value="multiple" v-model="selectType">
        <label for="multiple">Multiple select</label>
      </div>

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
      type: 'selectQuestion',
      placeholder: 'Write your option',
      selectText: '',
      questionText: '',
      selectType: 'single',
      showErrorAlert: false,
      selects: [
        {
          id: '',
          selectText: '',
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
        this.options.splice(index, 1)
      }
    },
    addSelectOption() {
      this.selects.push({
        id: '',
        selectText: ''
      })
    },
    addQuestion() {
      let hasBlank = false
      if (this.questionText === '') {
        hasBlank = true
        this.showErrorAlert = true
      }
      for (let i = 0; i < this.selects.length; i++) {
        let isOptionText = this.selects[i].selectText

        if (isOptionText === '') {
          hasBlank = true
          this.showErrorAlert = true
        }
      }

      if (!hasBlank) {
        this.showErrorAlert = false
        const questionText = this.questionText;
        const selectText = this.selects;
        const type = this.type
        const selectType = this.selectType
        this.$emit('create-select', {
          selectText,
          questionText,
          type,
          selectType
        });
        this.questionText = '';
        this.selectType = 'single';
        this.selects = [{
          id: '',
          selectText: '',
          value: ''
        }];
        this.isVisibleRadioForm = false;
      }
    },
  },
}
</script>

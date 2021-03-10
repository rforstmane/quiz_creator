<template>
  <div class='card question'>
    <div class="content" v-show="!isEditing">
      <div class='header'>
        {{ itemId + 1 + '.' + question.questionText }}
        <div class="text-input__question"
             v-if="question.type === 'simpleQuestion'">
          <input
              type='text'
              disabled
              v-model="question.questionText">
        </div>

        <div class="radio-input__question"
             v-if="question.type === 'radioQuestion' ">
          <div class="radio-input__options"
               v-for="(option, index) in question.optionsText"
               :key="index">

            <input :id="index" type='radio' disabled>
            <label :for="index">{{ option.optionsText }}</label>

          </div>
        </div>

        <div class="select-input__question"
             v-if="question.type === 'selectQuestion' ">
          <select>
            <option selected disabled>Select your option</option>
            <option
                disabled
                v-for="(select, index) in question.selectText"
                :value="index"
                :key="index"
                :id="index">
              {{ select.selectText }}
            </option>
          </select>

          <div>
            <span><b>{{ question.selectType }}</b> select</span>
          </div>

        </div>
      </div>

      <div>
        <b-button v-on:click="editQuestion" variant="warning">Edit</b-button>
        <b-button v-on:click="deleteQuestion(question)" variant="danger">Delete</b-button>

      </div>
    </div>
    <div class="content" v-show="isEditing">

      <div class="text-input__question"
           v-if="question.type === 'simpleQuestion'">
        <label>Your Question</label>
        <input type='text' v-model="question.questionText">
      </div>

      <div class="radio-input__question"
           v-if="question.type === 'radioQuestion'">
        <label>Your Question</label>
        <input type='text' v-model="question.questionText">

        <div class="radio-input__options"
             v-for="(option, index) in question.optionsText"
             :key="index">
          <input
              disabled
              :id="index"
              type='radio'
              v-model="option.value">
          <input v-model="option.optionsText "/>
          <b-button v-if="question.optionsText.length > 1" variant="outline-danger" @click="removeRadioOption(index)">
            -
          </b-button>
        </div>

        <b-button variant="outline-warning" @click="addRadioOption()">+</b-button>

      </div>

      <div class="select-input__question"
           v-if="question.type === 'selectQuestion'">
        <label>Your Question</label>
        <input type='text' v-model="question.questionText">
        <div class="select-input__options"
             v-for="(select, index) in question.selectText"
             :key="index">
          <input
              disabled
              :id="index"
              type='radio'
              v-model="select.value">
          <input v-model="select.selectText "/>
          <b-button v-if="question.selectText.length > 1" variant="outline-danger" @click="removeSelectOption(index)">
            -
          </b-button>
        </div>

        <b-button variant="outline-warning" @click="addSelectOption()">+</b-button>

        <div class="select-input__options-type">
          <input type="radio" :id="'single' + itemId" value="single" v-model="selectType"
                 :checked="question.selectType">
          <label :for="'single' + itemId">Single Select</label>
          <br>
          <input type="radio" :id="'multiple' + itemId" value="multiple" v-model="selectType"
                 :checked="question.selectType">
          <label :for="'multiple' + itemId">Multiple Select</label>
        </div>

        <p>Selected Type: {{ question.selectType = selectType }}</p>

      </div>
      <b-alert class="mb-0" :show="showErrorAlert" variant="danger">Empty question/option field</b-alert>

      <b-button variant="success" v-on:click="saveChanges">
        Save changes
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['question', 'itemId'],
  data() {
    return {
      showErrorAlert: false,
      isEditing: false,
      selectType: this.question.selectType,
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
    addSelectOption() {
      this.question.selectText.push({
        id: '',
        selectText: ''
      })
    },

    removeSelectOption(index) {
      if (confirm("Are you sure?")) {
        this.question.selectText.splice(index, 1)
      }
    },

    addRadioOption() {
      this.question.optionsText.push({
        id: '',
        optionsText: '',
        value: ''
      })
    },

    removeRadioOption(index) {
      if (confirm("Are you sure?")) {
        this.question.optionsText.splice(index, 1)
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
      if(this.question.type === 'radioQuestion') {
        for (let i = 0; i < this.question.optionsText.length; i++) {
          let isOptionText = this.question.optionsText[i].optionsText

          if (isOptionText === '') {
            hasBlank = true
            this.showErrorAlert = true
            this.isEditing = true
          }
        }
      }

      if(this.question.type === 'selectQuestion') {
        for (let i = 0; i < this.question.selectText.length; i++) {
          let isSelectText = this.question.selectText[i].selectText
          if (isSelectText === '') {
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

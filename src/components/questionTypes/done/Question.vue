<template>
  <div class='ui centered card'>
    <div class="content" v-show="!isEditing">
      <div class='header'>
        {{ itemId + 1 + '.' + question.questionText + '?' }}
        <div v-if="question.type === 'simpleQuestion' ">
          <input
              type='text'
              disabled
              placeholder="Atbildes lauks"
              v-model="question.questionAnswer">
        </div>
        <div v-if="question.type === 'radioQuestion' ">

          <div
              v-for="(option, index) in question.optionsText"
              :key="index">
            <input
                :id="index"
                type='radio'
                disabled
                v-model="option.value">
            <label :for="index">{{ option.optionsText }}</label>

          </div>
        </div>

        <div v-if="question.type === 'selectQuestion' ">
          <select>
            <option>default</option>
            <option
                disabled
                v-for="(select, index) in question.selectText"
                :key="index"
                :id="index">
              {{ select.selectText }}
            </option>
          </select>
        </div>
      </div>

      <div class='extra content'>
        <b-button v-on:click="showForm" variant="warning">Edit</b-button>
        <b-button v-on:click="deleteQuestion(question)" variant="danger">Delete</b-button>

      </div>
    </div>
    <div class="content" v-show="isEditing">

      <div class='ui form'>
        <div
            v-if="question.type === 'simpleQuestion' "
            class='field'>
          <label>Question</label>
          <input type='text' v-model="question.questionText">
        </div>
        <div v-if="question.type === 'radioQuestion'"
             class='field'>
          <label>Question</label>
          <input type='text' v-model="question.questionText">
          <div v-for="(option, index) in question.optionsText"
               :key="index">
            <input
                disabled
                :id="index"
                type='radio'
                v-model="option.value">
            <input v-model="option.optionsText "/>
            <span @click="removeRadioOption(index)">remove</span>
          </div>
          <p @click="addRadioOption()">addd</p>
        </div>

        <div
            v-if="question.type === 'selectQuestion'"
            class='field'>
          <label>Question</label>
          <input type='text' v-model="question.questionText">
          <div
              v-for="(select, index) in question.selectText"
              :key="index">
            <input
                disabled
                :id="index"
                type='radio'
                v-model="select.value">
            <input v-model="select.selectText "/>
            <span @click="removeSelectOption(index)">remove</span>
          </div>
          <p @click="addSelectOption()">addd</p>
        </div>
        <div class='ui two button attached buttons'>
          <b-button variant="success" class='ui basic blue button' v-on:click="hideForm">
            Save
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['question', 'itemId'],
  data() {
    return {
      isEditing: false,
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
      this.question.selectText.splice(index, 1)
    },
    addRadioOption() {
      this.question.optionsText.push({
        id: '',
        optionsText: '',
        value: ''

      })
    },
    removeRadioOption(index) {
      this.question.optionsText.splice(index, 1)
    },
    deleteQuestion(question) {
      this.$emit('delete-question', question);
    },
    showForm() {
      this.isEditing = true;
    },
    hideForm() {
      this.isEditing = false;
    },
  },
};
</script>

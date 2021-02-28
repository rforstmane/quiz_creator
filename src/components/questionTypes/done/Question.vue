<template>
  <div class='ui centered card'>
    <div class="content" v-show="!isEditing">
      <span>{{ itemId + 1 }}</span>
      <div class='header'>
        {{ question.questionText + '?' }}
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
                :key="index"
          >
          <input
              :id="index"
              type='radio'
              disabled
              v-model="option.value">
            <label :for="index">{{ option.optionsText }}</label>

          </div>
        </div>
      </div>
      <div class='extra content'>
          <span class='right floated edit icon' v-on:click="showForm">
          <i class='edit icon'>edit</i>
        </span>
        <p></p>
        <span class='right floated trash icon' v-on:click="deleteQuestion(question)">
          <i class='trash icon'>delet</i>
        </span>
      </div>
    </div>
    <div class="content" v-show="isEditing">
      <div class='ui form'>
        <div class='field' v-if="question.type === 'simpleQuestion' ">
          <label>Question</label>
          <input type='text' v-model="question.questionText">
        </div>
        <div class='field' v-if="question.type === 'radioQuestion' ">
          <label>Question</label>
          <input type='text' v-model="question.questionText">
          <div
              v-for="(option, index) in question.optionsText"
              :key="index"
          >
            <input
                disabled
                :id="index"
                type='radio'
                v-model="option.value">
            <input v-model="option.optionsText "/>

          </div>
        </div>
        <div class='ui two button attached buttons'>
          <button class='ui basic blue button' v-on:click="hideForm">
            Close X
          </button>
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
    };
  },
  methods: {
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

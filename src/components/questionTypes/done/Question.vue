<template>
  <div class='ui centered card'>
    <div class="content" v-show="!isEditing">
      <span>{{ itemId + 1  }}</span>
      <div class='header'>
        {{ question.questionText + '?' }}
        <div>
          <input type='text'
                 disabled
                 placeholder="Atbildes lauks"
                 v-model="question.questionAnswer">
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
        <div class='field'>
          <label>Title</label>
          <input type='text' v-model="question.questionText">
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

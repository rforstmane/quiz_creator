<template>
    <div class="card text-input">
      <div class="container">
        <div class="text-input__question">
          <input
              v-model="questionText"
              placeholder="Write question..."
              type='text'>
        </div>
        <b-alert class="mb-0" :show="showErrorAlert" variant="danger">Empty question field</b-alert>
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
  data() {
    return {
      questionText: '',
      type: 'simpleQuestion',
      showErrorAlert: false
    };
  },
  methods: {
    cancelQuestion() {
      if (confirm("Are you sure?")) {
        this.$parent.closeAllComponents()
      }
    },
    addQuestion() {
      if (this.questionText.length > 0) {
        this.showErrorAlert = false

        const questionText = this.questionText;
        const type = this.type

        this.$emit('create-question', {
          questionText,
          type
        });
        this.questionText = '';
        this.isVisibleTextForm = false;
      } else {
        this.showErrorAlert = true
      }
    },
  },
}
</script>

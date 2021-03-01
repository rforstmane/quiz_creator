<template>
  <div class='ui basic content center aligned segment'>
    <div class='ui centered card'>
      <div class='content'>
        <div>
          <input
              v-model="questionText"
              placeholder="Ievadi savu jautājumu"
              type='text'>
        </div>
        <b-alert :show="showErrorAlert" variant="danger">Nav ievadīts jautajums</b-alert>
        <b-button variant="success" v-on:click="sendForm()">
          Create
        </b-button>
        <b-button variant="danger" v-on:click="closeForm">
          Cancel
        </b-button>
      </div>
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
    closeForm() {
      this.$parent.closeAllComponents()
    },
    sendForm() {
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

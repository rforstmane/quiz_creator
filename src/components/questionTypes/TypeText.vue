<template>
  <div class='ui basic content center aligned segment'>
    <div class='ui centered card'>
      <div class='content'>
        <div class='ui form'>
          <div class='field'>
            <input v-model="questionText"
                   placeholder="Ievadi savu jautājumu"
                   type='text'>
          </div>

          <div class='ui two button attached buttons'>
            <b-button variant="success" class='ui basic blue button' v-on:click="sendForm()">
              Create
            </b-button>
            <b-button variant="danger" class='ui basic red button' v-on:click="closeForm">
              Cancel
            </b-button>
          </div>
        </div>
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
    };
  },
  methods: {
    closeForm() {
      this.isVisibleTextForm = false;
      const isVisibleTextForm = this.isVisibleTextForm
      this.$emit('hide-form', {
        isVisibleTextForm
      })
    },
    sendForm() {
      if (this.questionText.length > 0) {
        const questionText = this.questionText;
        const type = this.type

        this.$emit('create-question', {
          questionText,
          type
        });
        this.questionText = '';
        this.isVisibleTextForm = false;
      }
    },
  },
}
</script>

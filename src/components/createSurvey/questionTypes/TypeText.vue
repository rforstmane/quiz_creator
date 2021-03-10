<template>
  <div class="card text-input py-4">
    <div class="text-input__question">
      <input
          class="w-50 mb-4"
          v-model="questionText"
          placeholder="Write question..."
          type="text"/>
    </div>

    <b-alert
        class="mb-0"
        :show="showErrorAlert"
        variant="danger">Empty question field
    </b-alert>

    <div>
      <b-button
          variant="success"
          v-on:click="addQuestion()">Add
      </b-button>
      <b-button
          variant="danger"
          v-on:click="cancelQuestion">Cancel
      </b-button>
    </div>
  </div>
</template>

<script>
import {v4 as uuidv4} from 'uuid';

export default {
  data() {
    return {
      id: uuidv4(),
      questionText: '',
      type: "simpleQuestion",
      showErrorAlert: false
    };
  },
  methods: {
    cancelQuestion() {
      if (confirm("Are you sure?")) {
        this.$parent.closeAllComponents();
      }
    },

    addQuestion() {
      if (this.questionText.length > 0) {
        this.showErrorAlert = false;
        const questionText = this.questionText;
        const type = this.type;
        const id = this.id;
        this.$emit("create-question", {
          questionText,
          type,
          id
        });
        this.questionText = '';
        this.id = uuidv4();
        this.isVisibleTextForm = false;
      } else {
        this.showErrorAlert = true;
      }
    }
  }
}
</script>

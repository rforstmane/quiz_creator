<template>
  <div>
    <!--          Questions -->
    <div class="card"
         v-if="itemId === questionIndex" v-bind:key="itemId">

      <h2>{{ itemId + 1 + '.' + question.questionText }}</h2>

      <!--          Answers -->
      <div class="text-input__question"
           v-if="question.type === 'simpleQuestion' ">
        <input type="text"
               placeholder="Write answer"
               v-model="answer">
      </div>

      <div class="radio-input__question"
           v-if="question.type === 'radioQuestion' ">
        <div class="radio-input__options"
             v-for="(option, index) in question.optionsText"
             :key="index">
          <input
              :value="option.optionsText"
              :id="index"
              type='radio'
              v-model="answer">
          <label :for="index">{{ option.optionsText }}</label>
        </div>
      </div>

      <div class="select-input__question"
           v-if="question.type === 'selectQuestion' ">
        <div>Type: <b>{{ question.selectType }}</b></div>

        <select v-bind:multiple="question.selectType === 'multiple' " v-model="answer">
          <option v-show="question.selectType === 'single'" value="" selected disabled>Select your option</option>
          <option
              v-for="(select, index) in question.selectText"
              :key="index"
              :id="index">
            {{ select.selectText }}
          </option>
        </select>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: [
    'question',
    'itemId',
    'questionIndex',
  ],
  data() {
    return {
      answer: []
    }
  },
  methods: {
    sendData() {
      const id = this.itemId
      const type = this.question.type
      const question = this.question.questionText
      const answer = this.answer
      this.$emit('input-change', {
        id,
        type,
        question,
        answer
      })
    }
  },
}
</script>

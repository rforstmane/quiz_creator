<template>
  <div>
    <!--          Questions -->
    <div class="card py-3 mb-4 "
         v-if="itemId === questionIndex"
         v-bind:key="itemId">
      <h4 class="mb-4 text-center">{{ itemId + 1 + '.' + question.questionText }}</h4>

      <!--          Answers -->
      <div class="text-input__question"
           v-if="question.type === 'simpleQuestion' ">
        <input
            type="text"
            placeholder="Write answer"
            v-model="answer">
      </div>

      <div class="radio-input__question"
           v-if="question.type === 'radioQuestion'">
        <div class="radio-input__options"
             v-for="(option, index) in question.options"
             :key="index">
          <input
              class="mr-3 w-auto"
              :value="option.id"
              :id="index"
              type='radio'
              v-model="answer">
          <label class="mb-0" :for="index">{{ option.valueText }}</label>
        </div>
      </div>

      <div class="select-input__question text-center"
           v-if="question.type === 'selectQuestion'">
        <select
            v-bind:multiple="question.selectType === 'multiple' "
            v-model="answer">
          <option
              v-show="question.selectType === 'single'"
              :value="null"
              selected
              disabled>Select your option
          </option>
          <option
              v-for="(select, index) in question.selects"
              :key="index"
              :value="select.id"
              :id="index">
            {{ select.valueText }}
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
      const questionId = this.question.id
      const answer = this.answer

      this.$emit('input-change', {
        questionId,
        answer
      })
    }
  },
}
</script>

<style lang="scss">
.select-input__question {
  select {
    width: 100%;
    @media(min-width: 768px) {
      width: 50%;
    }
  }
}
</style>

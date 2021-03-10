<template>
  <div>
    <!--          Questions -->
    <div class="card py-4 mb-4"
         v-if="itemId === questionIndex"
         v-bind:key="itemId">

      <h4>{{ itemId + 1 + '.' + question.questionText }}</h4>

      <!--          Answers -->
      <div
          class="text-input__question"
          v-if="question.type === 'simpleQuestion' ">
        <input
            class="w-50"
            type="text"
            placeholder="Write answer"
            v-model="answer">
      </div>

      <div
          class="radio-input__question"
          v-if="question.type === 'radioQuestion'">
        <div
            class="radio-input__options"
            v-for="(option, index) in question.options"
            :key="index">
          <input
              :value="option.id"
              :id="index"
              type='radio'
              v-model="answer">
          <label :for="index">{{ option.valueText }}</label>
        </div>
      </div>

      <div
          class="select-input__question"
          v-if="question.type === 'selectQuestion'">
        <div>Type: <b>{{ question.selectType }}</b></div>

        <select
            class="w-25"
            v-bind:multiple="question.selectType === 'multiple' "
            v-model="answer">
          <option
              v-show="question.selectType === 'single'"
              value=""
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

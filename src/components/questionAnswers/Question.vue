<template>
  <div>
    <!--          jautajumu daļa -->
    <div v-if="itemId === questionIndex" v-bind:key="itemId">
      {{ itemId + 1 + '.' + question.questionText }}

      <!--          atbilžu daļa-->
      <div v-if="question.type === 'simpleQuestion' ">
        <input type="text" placeholder="Ievadi atbildi" v-model="answer">

      </div>

      <div v-if="question.type === 'radioQuestion' ">
        <div v-for="(option, index) in question.optionsText" :key="index">
          <input

              :value="option.optionsText"
              :id="index"
              type='radio'
              v-model="answer">
          <label :for="index">{{ option.optionsText }}</label>
          <p>{{ questionIndex.optionsText }}</p>
        </div>
      </div>

      <div v-if="question.type === 'selectQuestion' ">
        <div>{{ question.selectType }}
        </div>
        <select v-bind:multiple="question.selectType === 'multiple' " v-model="answer">

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

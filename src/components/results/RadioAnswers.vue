<template>
  <div>
    <div v-for="option in question.options" :key="option.id">
      {{option.valueText + ' atbilde'}}

      <div >{{countResults(option.id, answers)}}/{{answers.length}} </div>
    </div>

    {{answers}}

  </div>

</template>

<script>
export default {
  props: [
      'answers',
      'question'
  ],
  data() {
    return {

    }
  },
  methods: {
    countResults(optionId, answers) {
      const optionAnswers = answers.filter(answer => answer.answer === optionId)

      return optionAnswers.length

    }
  }
}
</script>

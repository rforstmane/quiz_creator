<template>
  <div>
    <div v-for="select in question.selects" :key="select.id">
      {{select.valueText + ' atbilde'}}

      <div >{{countResults(select.id, answers, question.selectType)}}/{{answers.length}} </div>
    </div>


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
    countResults(selectId, answers, type) {
      if (type === "single") {
        const optionAnswers = answers.filter(answer => answer.answer === selectId)

        return optionAnswers.length
      } else {

        const optionAnswers = answers.filter(answer => answer.answer.indexOf(selectId) > -1)

        return optionAnswers.length

      }


    }
  }
}
</script>

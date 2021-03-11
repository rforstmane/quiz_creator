<template>
  <ul>
    <li v-for="select in question.selects" :key="select.id">
      {{select.valueText}}
      <span class="ml-3">({{countResults(select.id, answers, question.selectType)}}/{{answers.length}})</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: [
    'answers',
    'question'
  ],
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

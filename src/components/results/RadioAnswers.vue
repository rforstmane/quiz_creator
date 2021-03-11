<template>
  <ul>
    <li v-for="option in question.options" :key="option.id">
      {{ option.valueText }}
      <span class="ml-3">({{ countResults(option.id, answers) }}/{{ answers.length }})</span>
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
    countResults(optionId, answers) {
      const optionAnswers = answers.filter(answer => answer.answer === optionId)
      return optionAnswers.length
    }
  }
}
</script>

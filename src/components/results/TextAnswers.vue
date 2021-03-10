<template>
  <div>
    <div v-for="answer in answers" :key="answer.answer">
      {{answer.answer}}
    </div>
  </div>

</template>

<script>
export default {
  props: [
      'answers'
  ]
}
</script>

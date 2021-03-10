<template>
  <div>
    <div v-for="answer in answers" :key="answer.id">
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

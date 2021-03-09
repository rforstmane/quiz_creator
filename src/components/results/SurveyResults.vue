<template>
  <div>
    <p>{{ answersID + 1 + '.izpildīšanas reize' }}</p>
    <div v-for="(answer, index ) in answers" :key="index">
      <div>{{ answer.id + 1 + '.' }} {{ answer.question }}</div>
      <div v-if="!answer.answer.length">
        nav datu
      </div>
      <div v-else> {{ answer.answer }}</div>
    </div>
    <br>
  </div>
</template>

<script>
export default {
  props: [
    'answers',
    'answersID'
  ]
}
</script>

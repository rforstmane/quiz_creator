<template>
  <ul>
    <li
        v-for="answer in answers"
        :key="answer.id"
        v-show="answer.answer.length">
      {{ answer.answer }}
    </li>
  </ul>
</template>

<script>
export default {
  props: [
    'answers'
  ]
}
</script>

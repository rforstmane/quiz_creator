<template>
  <div>
    <input
        class="mb-4"
        type='text'
        v-model="question.questionText">
  </div>
</template>

<script>
export default {
  props: ['question']
}
</script>

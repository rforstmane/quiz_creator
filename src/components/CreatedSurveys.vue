<template>
  <div>
    visas izveidotās
    <div
        v-for="(survey, index) in this.$route.params.surveys"
          :key="index">
      {{ index + 1 }}
      {{ survey.questionText }}
      {{ survey.type }}
    </div>


  </div>

</template>

<script>

export default {
  name: 'Created',
  data () {
    return {

    }
  }
}
</script>

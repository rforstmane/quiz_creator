<template>
  <div>Aizpildītas
    <SurveyResults
        v-for="(answers, index) in allAnswers"
        :key="index"
        :answers="answers"
    />
  </div>
</template>

<script>

import SurveyResults from "@/results/SurveyResults";
export default {
  name: 'Results',
  components: {SurveyResults},
  data() {
    return {
      allAnswers: JSON.parse(localStorage.getItem("allAnswers")),
    }
  },
}
</script>

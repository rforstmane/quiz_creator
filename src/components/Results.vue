<template>
  <div>Aizpildītas
    <SurveyResults
        v-for="(answers, index) in allAnswers"
        :key="index"
        :answers="answers"
        :answersID="index"
    />
  </div>
</template>

<script>

import SurveyResults from "@/components/results/SurveyResults";
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

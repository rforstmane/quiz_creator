<template>
  <div class="created-surveys">
    <div class="container">

      <h1 v-if="allSurveys">Choose survey</h1>

      <Surveys
          v-for="(survey, index) in allSurveys"
          :key="index"
          :itemId="index"
          :survey="survey"
      />
    </div>
  </div>

</template>

<script>

import Surveys from "@/components/questionAnswers/Surveys";
export default {
  components: {Surveys},
  name: 'Created',
  data() {
    return {
      questionIndex: null,
      allSurveys: JSON.parse(localStorage.getItem("allSurveys")),
    }
  },
}
</script>

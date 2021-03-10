<template>
  <div class="created-surveys">

    <h4 class="my-3" v-if="allSurveys">Choose survey to fill</h4>
    <Survey
        v-for="(survey, index) in allSurveys"
        :key="index"
        :survey="survey"
        :surveyID="survey.id"
    />
  </div>

</template>

<script>

import Survey from "@/components/createdSurveys/Survey";

export default {
  components: {Survey},
  name: 'CreatedSurveys',
  data() {
    return {
      allSurveys: JSON.parse(localStorage.getItem("allSurveys")),
    }
  },
}
</script>

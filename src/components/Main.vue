<template>
  <div>
    <b-button>
<!--      <router-link to="/create-quiz">-->

        <!--          @click="visible = !visible" >-->
        Create Survey

<!--      </router-link>-->
    </b-button>


    <b-button
        @click="visible = !visible">
      Created Survey
    </b-button>

    <b-button
        @click="visible2 = !visible2">
      Completed Survey
    </b-button>
<!--    <CreateSurvey/>-->
    <CreatedSurveys v-if="!visible"/>
    <CompletedSurveys v-if="!visible2"/>
  </div>
</template>
<script>


import CreatedSurveys from "@/components/CreatedSurveys";
import CompletedSurveys from "@/components/CompletedSurveys";



export default {
  name: 'Main',
  components: {
    CompletedSurveys,
    CreatedSurveys,
    // CreateSurvey,
  },
  data() {
    return {

      visible: true,
      visible2: false,

    }

  },
}
</script>

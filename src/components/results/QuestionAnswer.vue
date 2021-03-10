<template>
  <div>
    <div >
      {{ question.questionText }}

      <div v-if="question.type === 'simpleQuestion'">
        <TextAnswers
        :answers="answers"/>
<!--        {{answers}}-->
      </div>





    </div>
  </div>
</template>

<script>
import TextAnswers from "@/components/results/TextAnswers";
export default {
  components: {TextAnswers},
  props: ['question', 'allAnswers'],
  data() {
    return {
      answers: this.allAnswers.filter(answer => answer.questionId === this.question.id)
    }
  }
}
</script>

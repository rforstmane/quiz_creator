<template>
  <div>
    <div >
      {{ question.questionText + '  jautājums'}}

      <div v-if="question.type === 'simpleQuestion'">
        <TextAnswers
        :answers="answers"/>
      </div>

      <div v-if="question.type === 'radioQuestion'">
        <RadioAnswers
            :answers="answers"
            :question="question"/>
      </div>

      <div v-if="question.type === 'selectQuestion'">
        <SelectAnswers
            :answers="answers"
            :question="question"/>
      </div>



    </div>
  </div>
</template>

<script>
import TextAnswers from "@/components/results/TextAnswers";
import RadioAnswers from "@/components/results/RadioAnswers";
import SelectAnswers from "@/components/results/SelectAnswers";
export default {
  components: {SelectAnswers, RadioAnswers, TextAnswers},
  props: ['question', 'allAnswers'],
  data() {
    return {
      answers: this.allAnswers.filter(answer => answer.questionId === this.question.id)
    }
  }
}
</script>

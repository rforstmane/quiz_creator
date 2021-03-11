<template>
  <div>
    <div class="radio-input__options"
         v-for="(option, index) in question.options"
         :key="option.id">
      <input
          class="w-auto"
          :id="index"
          type='radio'
          disabled>
      <label
          class="ml-3"
          :for="index">
        {{ option.valueText }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: ['question']
}
</script>

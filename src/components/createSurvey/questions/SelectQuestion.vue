<template>
  <div>
    <select class="w-50 mb-2">
      <option selected disabled>Select your option</option>
      <option
          disabled
          v-for="(select, index) in question.selects"
          :value="index"
          :key="select.id"
          :id="index">
        {{ select.valueText }}
      </option>
    </select>
    <div class="mb-4">
      <span><b>{{ question.selectType }}</b> select</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['question']
}
</script>

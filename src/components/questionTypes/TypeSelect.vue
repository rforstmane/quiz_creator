<template>
  <div class='ui basic content center aligned segment'>
    <div class='ui centered card'>
      <div class='content'>
        <div>
          <input
              v-model="questionText"
              placeholder="Ievadi savu jautājumu"
              type='text'>

          <div
              class="field"
              v-for="(option, index) in selects"
              :key="index">

            <div>
              <input disabled type="radio" :id="index" v-model="option.value">
              <input v-model="option.selectText" :placeholder=placeholder>
              <span @click="removeSelectOption(index)">remove</span>
            </div>
          </div>

          <p @click="addSelectOption()">addd</p>
          <div>
            <input type="radio" id="single" value="single" v-model="selectType">
            <label for="single">Single Select</label>
            <br>
            <input type="radio" id="multiple" value="multiple" v-model="selectType">
            <label for="multiple">Multiple Select</label>
          </div>
          <p>Izvēlētais select veids: {{ selectType }}</p>
        </div>

        <b-button variant="success" v-on:click="sendForm()">
          Create
        </b-button>
        <b-button variant="danger" v-on:click="closeForm">
          Cancel
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: [
    'option'
  ],
  data() {
    return {
      type: 'selectQuestion',
      placeholder: 'Raksti savu opciju',
      selectText: '',
      questionText: '',
      selectType: 'single',
      selects: [
        {
          id: '',
          selectText: '',
          value: ''
        }
      ]
    };
  },
  methods: {
    removeSelectOption(index) {
      this.selects.splice(index, 1)
    },
    addSelectOption() {
      this.selects.push({
        id: '',
        selectText: ''
      })
    },
    closeForm() {
      this.$parent.closeAllComponents()
    },
    sendForm() {

      let hasBlank = false
      if (this.questionText === '') {
        hasBlank = true
      }
      for (let i = 0; i < this.selects.length; i++) {
        let isOptionText = this.selects[i].selectText

        if (isOptionText === '') {
          hasBlank = true
        }
      }

      if (!hasBlank) {
        const questionText = this.questionText;
        const selectText = this.selects;
        const type = this.type
        const selectType = this.selectType
        this.$emit('create-select', {
          selectText,
          questionText,
          type,
          selectType
        });
        this.questionText = '';
        this.selectType= 'single';
        this.selects = [{
          id: '',
          selectText: '',
          value: ''
        }];
        this.isVisibleRadioForm = false;
      }
    },
  },
}
</script>

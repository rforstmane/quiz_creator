<template>
  <div class='ui basic content center aligned segment'>
    <div class='ui centered card'>
      <div class='content'>
        <div class='ui form'>
          <div class='field'>
            <input v-model="questionText"
                   placeholder="Ievadi savu jautājumu"
                   type='text'>
          </div>

          <div class="field"
               v-for="(option, index) in options"
               :key="index">

            <div>
              <input disabled type="radio" :id="index" v-model="option.value">

              <!--            <label :for="index">{{ // option.optionsText }}</label>-->
              <input  v-model="option.optionsText" :placeholder=placeholder>
              <span @click="removeRadioOption(index)">remove</span>
            </div>
          </div>

          <p @click="addRadioOption()">addd</p>


          <div class='ui two button attached buttons'>
            <b-button variant="success" class='ui basic blue button' v-on:click="sendForm()">
              Create
            </b-button>
            <b-button variant="danger" class='ui basic red button' v-on:click="closeForm">
              Cancel
            </b-button>
          </div>
        </div>
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
      type: 'radioQuestion',
      placeholder: 'Raksti savu opciju',
      optionsText: '',
      questionText: '',

      picked: '',
      options: [
        {
          id: '',
          optionsText: '',
          value: ''
        }
      ]
    };
  },
  methods: {
    removeRadioOption(index) {
      this.options.splice(index, 1)
    },
    addRadioOption() {
      this.options.push({
        id: '',
        optionsText: ''
      })
    },
    closeForm() {
      this.isVisibleRadioForm = false;
      const isVisibleRadioForm = this.isVisibleRadioForm
      this.$emit('hide-form', {
        isVisibleRadioForm
      })
    },
    sendForm() {

      let hasBlank = false
      if(this.questionText === '') {
        hasBlank = true
      }
      for (let i = 0; i < this.options.length; i++) {
        let isOptionText = this.options[i].optionsText

        if (isOptionText === '') {
          hasBlank = true
        }
      }

      if (!hasBlank) {
        const questionText = this.questionText;
        const optionsText = this.options;
        const type = this.type
        this.$emit('create-radio', {
          optionsText,
          questionText,
          type
        });
        this.questionText = '';
        this.options = [{
          id: '',
          optionsText: '',
          value: ''
        }];
        this.isVisibleRadioForm = false;
      }
    },
  },
}
</script>

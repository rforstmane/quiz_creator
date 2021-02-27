<template>
  <div class="d-flex">
    <div class="button-block col-4">
      <b-button
          variant="outline-primary">
        text
      </b-button>
      <b-button
          variant="outline-primary">
        radio
      </b-button>
      <b-button
          variant="outline-primary">
        selects
      </b-button>
    </div>

    <div class="col-8">

    </div>

  </div>

</template>

<script>

export default {
  name: 'Create'
}
</script>

<style>
.button-block .btn {
  width: 200px;
  display: block;
  margin: 0 auto 12px auto;
}
</style>

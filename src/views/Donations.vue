<template>
  <div class="cagnotte-donations">
    <h2>Donations</h2>
    <form class="donation-form" @submit.prevent>
      <div style="margin: 10px 0;">
        <label style="display: block;">Donateur :</label>
        <input type="text" v-focus />
      </div>

      <div style="margin: 10px 0;">
        <label style="display: block;">Commentaire :</label>
        <textarea></textarea>
      </div>

      <div style="margin: 10px 0;">
        <label style="display: block;">Montant :</label>
        <input type="number" step="0.01" />
      </div>

      <button type="submit">Ajouter</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Donations',
  props: {
    cagnotte: {
      type: Object,
      required: true
    }
  }
}
</script>

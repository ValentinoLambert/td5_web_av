<template>
  <div class="donation-item" style="border: 1px solid #ccc; padding: 10px; margin: 10px 0;">
    <div class="donation-header" style="display: flex; justify-content: space-between;">
      <strong>{{ donatorName }}</strong>
      <span>{{ donationDateTime }}</span>
    </div>
    <div class="donation-body" style="margin: 8px 0;">
      <div>{{ formatAmount(donation.amount) }}</div>
      <div v-if="donation.comment">{{ cutText(donation.comment, 40) }}</div>
    </div>
    <div class="donation-actions">
      <button type="button" @click="$emit('edit', donation)">Editer</button>
      <button type="button" @click="confirmDelete" style="margin-left: 6px;">Supprimer</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Donation',
  props: {
    donation: {
      type: Object,
      required: true
    }
  },
  computed: {
    donationDateTime() {
      const value = this.donation.created_at || this.donation.date || this.donation.datetime
      return value ? this.dbDateHourToFr(value) : ''
    },
    donatorName() {
      return this.donation.donator && this.donation.donator.trim()
        ? this.donation.donator
        : 'Anonyme'
    }
  },
  methods: {
    confirmDelete() {
      this.$emit('delete', this.donation)
    }
  }
}
</script>

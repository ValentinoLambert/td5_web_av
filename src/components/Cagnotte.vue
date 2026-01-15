<template>
  <div @click="goToCagnotte" style="border: 1px solid black; padding: 10px; margin: 10px 0;">
    <h3>{{ cagnotte.name }}</h3>
    <p>{{ progressPercent }}% atteint</p>
    <p>Date limite : {{ dbDateToFr(cagnotte.end_date) }}</p>
    <p>{{ cutText(cagnotte.description, 40) }}</p>
  </div>
</template>

<script>
export default {
  name: 'Cagnotte',
  props: {
    cagnotte: {
      type: Object,
      required: true
    },
    expired: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    progressPercent() {
      if (!this.cagnotte.goal || this.cagnotte.goal === 0) return 0
      const percent = (this.cagnotte.collected / this.cagnotte.goal) * 100
      return Math.min(Math.round(percent), 100)
    },
    daysRemaining() {
      const endDate = new Date(this.cagnotte.end_date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const diffTime = endDate - today
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays
    }
  },
  methods: {
    goToCagnotte() {
      this.$router.push(`/cagnottes/${this.cagnotte.id}`)
    }
  }
}
</script>

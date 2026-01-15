<template>
  <div class="cagnotte-infos">
    <div class="info-section">
      <h2>Description</h2>
      <p>{{ cagnotte.description }}</p>
    </div>

    <div class="info-grid">
      <div class="info-card">
        <h3>Date limite</h3>
        <p class="info-value">{{ dbDateToFr(cagnotte.end_date) }}</p>
        <p class="info-detail">{{ daysRemainingText }}</p>
      </div>

      <div class="info-card">
        <h3>Objectif</h3>
        <p class="info-value">{{ formatAmount(cagnotte.goal) }}</p>
      </div>

      <div class="info-card">
        <h3>Montant collecte</h3>
        <p class="info-value">{{ formatAmount(collectedAmount) }}</p>
      </div>

      <div class="info-card">
        <h3>Montant restant</h3>
        <p class="info-value">{{ formatAmount(remaining) }}</p>
      </div>

      <div class="info-card">
        <h3>Progression</h3>
        <p class="info-value">{{ progressPercent }}%</p>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
        </div>
      </div>

      <div class="info-card">
        <h3>Donations</h3>
        <p class="info-value">{{ donationCount }}</p>
        <p class="info-detail">Montant moyen : {{ formatAmount(averageDonation) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CagnotteInfos',
  props: {
    cagnotte: {
      type: Object,
      required: true
    }
  },
  computed: {
    collectedAmount() {
      const value = Number(this.cagnotte._achieved ?? this.cagnotte.collected)
      return Number.isNaN(value) ? 0 : value
    },
    donationCount() {
      const value = Number(this.cagnotte._nb_donations ?? this.cagnotte.nb_donations)
      return Number.isNaN(value) ? 0 : value
    },
    progressPercent() {
      const goal = Number(this.cagnotte.goal)
      if (!goal || Number.isNaN(goal)) return 0
      const percent = (this.collectedAmount / goal) * 100
      return Math.min(Math.round(percent), 100)
    },
    remaining() {
      const goal = Number(this.cagnotte.goal)
      const safeGoal = Number.isNaN(goal) ? 0 : goal
      return Math.max(0, safeGoal - this.collectedAmount)
    },
    daysRemaining() {
      const endDate = new Date(this.cagnotte.end_date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const diffTime = endDate - today
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays
    },
    daysRemainingText() {
      const days = this.daysRemaining
      if (days < 0) {
        return `Terminee depuis ${Math.abs(days)} jour${Math.abs(days) > 1 ? 's' : ''}`
      } else if (days === 0) {
        return 'Dernier jour !'
      } else if (days === 1) {
        return '1 jour restant'
      } else {
        return `${days} jours restants`
      }
    },
    averageDonation() {
      if (!this.donationCount) return 0
      return this.collectedAmount / this.donationCount
    }
  }
}
</script>

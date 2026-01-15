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
        <h3>Montant collecté</h3>
        <p class="info-value">{{ formatAmount(cagnotte.collected) }}</p>
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
        <p class="info-value">{{ cagnotte.nb_donations }}</p>
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
    progressPercent() {
      if (!this.cagnotte.goal || this.cagnotte.goal === 0) return 0
      const percent = (this.cagnotte.collected / this.cagnotte.goal) * 100
      return Math.min(Math.round(percent), 100)
    },
    remaining() {
      return Math.max(0, this.cagnotte.goal - this.cagnotte.collected)
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
        return `Terminée depuis ${Math.abs(days)} jour${Math.abs(days) > 1 ? 's' : ''}`
      } else if (days === 0) {
        return 'Dernier jour !'
      } else if (days === 1) {
        return '1 jour restant'
      } else {
        return `${days} jours restants`
      }
    },
    averageDonation() {
      if (!this.cagnotte.nb_donations || this.cagnotte.nb_donations === 0) return 0
      return this.cagnotte.collected / this.cagnotte.nb_donations
    }
  }
}
</script>



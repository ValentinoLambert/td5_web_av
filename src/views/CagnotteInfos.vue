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
        <p class="info-value">{{ formatAmount(cagnotte._achieved) }}</p>
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
        <p class="info-value">{{ cagnotte._nb_donations }}</p>
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
<<<<<<< HEAD
      const goal = Number(this.cagnotte.goal)
      const collected = Number(this.cagnotte.collected)
      if (!goal || Number.isNaN(goal)) return 0
      const safeCollected = Number.isNaN(collected) ? 0 : collected
      const percent = (safeCollected / goal) * 100
      return Math.min(Math.round(percent), 100)
    },
    remaining() {
      const goal = Number(this.cagnotte.goal)
      const collected = Number(this.cagnotte.collected)
      const safeGoal = Number.isNaN(goal) ? 0 : goal
      const safeCollected = Number.isNaN(collected) ? 0 : collected
      return Math.max(0, safeGoal - safeCollected)
=======
      if (!this.cagnotte.goal || this.cagnotte.goal === 0) return 0
      const percent = (this.cagnotte._achieved / this.cagnotte.goal) * 100
      return Math.min(Math.round(percent), 100)
    },
    remaining() {
      return Math.max(0, this.cagnotte.goal - this.cagnotte._achieved)
>>>>>>> 12e6659a1acb11977323afa48a514c8d806fb8f3
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
<<<<<<< HEAD
      const donations = Number(this.cagnotte.nb_donations)
      const collected = Number(this.cagnotte.collected)
      if (!donations || Number.isNaN(donations)) return 0
      const safeCollected = Number.isNaN(collected) ? 0 : collected
      return safeCollected / donations
=======
      if (!this.cagnotte._nb_donations || this.cagnotte._nb_donations === 0) return 0
      return this.cagnotte._achieved / this.cagnotte._nb_donations
>>>>>>> 12e6659a1acb11977323afa48a514c8d806fb8f3
    }
  }
}
</script>



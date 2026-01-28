<template>
  <div 
    @click="goToCagnotte" 
    :style="cagnotteStyle"
    style="border: 1px solid black; padding: 10px; margin: 10px 0; cursor: pointer;"
  >
    <h3>{{ cagnotte.name }}</h3>
    <div style="margin: 8px 0;">
      <div>{{ progressPercent }}% atteint</div>
      <div class="progress-bar" style="width: 100%; height: 10px; background: #e0e0e0; border-radius: 5px; overflow: hidden; margin-top: 4px;">
        <div 
          class="progress-fill" 
          :style="{ width: progressPercent + '%', height: '100%', background: '#4caf50', transition: 'width 0.3s ease' }"
        ></div>
      </div>
    </div>
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
      const percent = (this.cagnotte._achieved / this.cagnotte.goal) * 100
      return Math.min(Math.round(percent), 100)
    },
    daysRemaining() {
      const endDate = new Date(this.cagnotte.end_date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const diffTime = endDate - today
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays
    },
    cagnotteStyle() {
      let backgroundColor = '#ffffff'
      let opacity = 1
      
      if (this.expired) {
        // Cagnottes terminées : grisées
        backgroundColor = '#f0f0f0'
        opacity = 0.6
      } else {
        const days = this.daysRemaining
        // Couleur selon les jours restants
        if (days < 5) {
          backgroundColor = '#ffebee' // Rouge clair
        } else if (days <= 30) {
          backgroundColor = '#fff3e0' // Orange clair
        } else {
          backgroundColor = '#e3f2fd' // Bleu clair
        }
      }
      
      return {
        backgroundColor,
        opacity
      }
    }
  },
  methods: {
    goToCagnotte() {
      this.$router.push(`/cagnottes/${this.cagnotte.id}`)
    }
  }
}
</script>

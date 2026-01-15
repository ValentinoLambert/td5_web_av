<template>
  <div class="cagnotte-card" :class="cardClass" @click="goToCagnotte">
    <h3>{{ cagnotte.name }}</h3>
    <div class="progress">
      <div class="progress-bar" :style="{ width: progressPercent + '%' }"></div>
    </div>
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
      const goal = Number(this.cagnotte.goal)
      const collected = Number(this.cagnotte._achieved ?? this.cagnotte.collected)
      if (!goal || Number.isNaN(goal)) return 0
      const safeCollected = Number.isNaN(collected) ? 0 : collected
      const percent = (safeCollected / goal) * 100
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
    urgencyClass() {
      if (this.daysRemaining < 5) return 'urgent'
      if (this.daysRemaining <= 30) return 'soon'
      return 'ok'
    },
    cardClass() {
      return {
        [this.urgencyClass]: true,
        expired: this.expired
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

<style scoped>
.cagnotte-card {
  border: 1px solid #000;
  padding: 10px;
  margin: 10px 0;
  cursor: pointer;
}

.progress {
  height: 6px;
  background: #eee;
  border-radius: 4px;
  overflow: hidden;
  margin: 6px 0;
}

.progress-bar {
  height: 100%;
  background: #333;
}

.ok {
  background: #e6f2ff;
}

.soon {
  background: #fff3e6;
}

.urgent {
  background: #ffe6e6;
}

.expired {
  opacity: 0.6;
  filter: grayscale(1);
}
</style>

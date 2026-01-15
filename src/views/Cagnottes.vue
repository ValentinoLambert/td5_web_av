<template>
  <div>
    <h1>Liste des cagnottes</h1>
    <router-link to="/cagnottes/new">Créer une nouvelle cagnotte</router-link>

    <div v-if="loading">Chargement...</div>
    <div v-else-if="error">ERREUR : {{ error }}</div>
    
    <div v-else>
      <div v-if="activeCagnottes.length > 0">
        <h2>Cagnottes en cours</h2>
        <Cagnotte 
          v-for="cagnotte in activeCagnottes" 
          :key="cagnotte.id"
          :cagnotte="cagnotte"
        />
      </div>

      <div v-else>
        <p>Aucune cagnotte active.</p>
      </div>

      <div v-if="expiredCagnottes.length > 0">
        <a href="#" @click.prevent="toggleExpired">
          {{ showExpired ? 'Masquer' : 'Voir' }} les cagnottes terminées
        </a>

        <div v-if="showExpired">
          <h2>Cagnottes terminées</h2>
          <Cagnotte 
            v-for="cagnotte in expiredCagnottes" 
            :key="cagnotte.id"
            :cagnotte="cagnotte"
            :expired="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cagnotte from '../components/Cagnotte.vue'

export default {
  name: 'Cagnottes',
  components: {
    Cagnotte
  },
  data() {
    return {
      cagnottes: [],
      loading: true,
      error: null,
      showExpired: false
    }
  },
  computed: {
    activeCagnottes() {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      return this.cagnottes
        .filter(c => {
          const endDate = new Date(c.end_date)
          return endDate >= today
        })
        .sort((a, b) => {
          const dateA = new Date(a.end_date)
          const dateB = new Date(b.end_date)
          return dateA - dateB
        })
    },
    expiredCagnottes() {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      return this.cagnottes
        .filter(c => {
          const endDate = new Date(c.end_date)
          return endDate < today
        })
        .sort((a, b) => {
          const dateA = new Date(a.end_date)
          const dateB = new Date(b.end_date)
          return dateB - dateA
        })
    }
  },
  methods: {
    async loadCagnottes() {
      this.loading = true
      this.error = null
      
      try {
        const response = await this.$api.get('/api/cagnottes')
        this.cagnottes = response.data
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          this.error = err.response.data.message
        } else {
          this.error = 'Impossible de charger les cagnottes'
        }
      } finally {
        this.loading = false
      }
    },
    toggleExpired() {
      this.showExpired = !this.showExpired
    }
  },
  mounted() {
    this.loadCagnottes()
  }
}
</script>

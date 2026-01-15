<template>
  <div class="cagnotte-detail">
    <div v-if="loading">Chargement...</div>
    <div v-else-if="error">ERREUR : {{ error }}</div>
    
    <div v-else>
      <!-- Header -->
      <header class="cagnotte-header">
        <h1>{{ cagnotte.name }}</h1>
        <div class="header-actions">
          <router-link 
            :to="`/cagnottes/${cagnotte.id}/edit`" 
            class="btn btn-edit"
          >
            Éditer
          </router-link>
          <button @click="confirmDelete" class="btn btn-delete">
            Supprimer
          </button>
        </div>
      </header>

      <!-- Tabs -->
      <nav class="tabs">
        <router-link 
          :to="`/cagnottes/${cagnotte.id}/infos`" 
          class="tab"
          active-class="active"
        >
          Infos
        </router-link>
        <router-link 
          :to="`/cagnottes/${cagnotte.id}/donations`" 
          class="tab"
          active-class="active"
        >
          Donations
        </router-link>
      </nav>

      <!-- Nested route content -->
      <div class="tab-content">
        <router-view :cagnotte="cagnotte" @reload="loadCagnotte" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CagnotteDetail',
  data() {
    return {
      cagnotte: null,
      loading: true,
      error: null
    }
  },
  methods: {
    async loadCagnotte() {
      this.loading = true
      this.error = null
      
      try {
        const response = await this.$api.get(`/api/cagnottes/${this.$route.params.id}`)
        this.cagnotte = response.data
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          this.error = err.response.data.message
        } else {
          this.error = 'Impossible de charger la cagnotte'
        }
      } finally {
        this.loading = false
      }
    },
    confirmDelete() {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette cagnotte ?')) {
        this.deleteCagnotte()
      }
    },
    async deleteCagnotte() {
      try {
        await this.$api.delete(`/api/cagnottes/${this.cagnotte.id}`)
        this.$router.push('/')
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          alert('ERREUR : ' + err.response.data.message)
        } else {
          alert('Impossible de supprimer la cagnotte')
        }
      }
    }
  },
  mounted() {
    this.loadCagnotte()
  },
  watch: {
    '$route.params.id'() {
      this.loadCagnotte()
    }
  }
}
</script>



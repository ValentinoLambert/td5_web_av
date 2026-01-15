<template>
  <div class="cagnotte-edit">
    <h1>Éditer la cagnotte</h1>
    
    <div v-if="loading">Chargement...</div>
    <div v-else-if="loadError">ERREUR : {{ loadError }}</div>
    
    <form v-else @submit.prevent="updateCagnotte">
      <div style="margin: 10px 0;">
        <label style="display: block;">Nom :</label>
        <input type="text" v-model="form.name" v-focus required />
      </div>

      <div style="margin: 10px 0;">
        <label style="display: block;">Description :</label>
        <textarea v-model="form.description" required></textarea>
      </div>

      <div style="margin: 10px 0;">
        <label style="display: block;">Date limite (JJ/MM/AAAA) :</label>
        <input type="text" v-model="form.end_date" required />
      </div>

      <div style="margin: 10px 0;">
        <label style="display: block;">Objectif (€) :</label>
        <input type="number" v-model.number="form.goal" step="0.01" required />
      </div>

      <div v-if="error" style="color: red; margin: 10px 0;">ERREUR : {{ error }}</div>

      <div style="margin: 20px 0;">
        <button type="submit">Enregistrer</button>
        <button type="button" @click="cancel" style="margin-left: 10px;">Annuler</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CagnotteEdit',
  data() {
    return {
      form: {
        name: '',
        description: '',
        end_date: '',
        goal: 0
      },
      loading: true,
      loadError: null,
      error: null
    }
  },
  methods: {
    async loadCagnotte() {
      this.loading = true
      this.loadError = null
      
      try {
        const response = await this.$api.get(`/api/cagnottes/${this.$route.params.id}`)
        const cagnotte = response.data
        
        this.form.name = cagnotte.name
        this.form.description = cagnotte.description
        this.form.end_date = this.dbDateToFr(cagnotte.end_date)
        this.form.goal = cagnotte.goal
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          this.loadError = err.response.data.message
        } else {
          this.loadError = 'Impossible de charger la cagnotte'
        }
      } finally {
        this.loading = false
      }
    },
    async updateCagnotte() {
      this.error = null
      
      try {
        const data = {
          name: this.form.name,
          description: this.form.description,
          end_date: this.dateToDB(this.form.end_date),
          goal: this.form.goal
        }

        await this.$api.put(`/api/cagnottes/${this.$route.params.id}`, data)
        this.$router.push(`/cagnottes/${this.$route.params.id}`)
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          this.error = err.response.data.message
        } else {
          this.error = 'Une erreur est survenue lors de la modification de la cagnotte'
        }
      }
    },
    cancel() {
      this.$router.push(`/cagnottes/${this.$route.params.id}`)
    }
  },
  mounted() {
    this.loadCagnotte()
  }
}
</script>



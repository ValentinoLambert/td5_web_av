<template>
  <div>
    <h1>Créer une nouvelle cagnotte</h1>
    
    <form @submit.prevent="createCagnotte">
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

      <div v-if="error">ERREUR : {{ error }}</div>

      <button type="submit">Créer</button>
      <router-link to="/">Annuler</router-link>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CagnottesNew',
  data() {
    return {
      form: {
        name: '',
        description: '',
        end_date: '',
        goal: 0
      },
      error: null
    }
  },
  methods: {
    async createCagnotte() {
      this.error = null
      
      try {
        const data = {
          name: this.form.name,
          description: this.form.description,
          end_date: this.dateToDB(this.form.end_date),
          goal: this.form.goal
        }

        await this.$api.post('/api/cagnottes', data)
        this.$router.push('/')
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          this.error = err.response.data.message
        } else {
          this.error = 'Une erreur est survenue lors de la création de la cagnotte'
        }
      }
    }
  }
}
</script>

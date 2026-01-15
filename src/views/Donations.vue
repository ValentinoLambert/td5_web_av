<template>
  <div class="cagnotte-donations">
    <h2>Donations</h2>
    <form class="donation-form" @submit.prevent="submitDonation">
      <div style="margin: 10px 0;">
        <label style="display: block;">Donateur :</label>
        <input ref="donatorInput" type="text" v-model="form.donator" v-focus />
      </div>

      <div style="margin: 10px 0;">
        <label style="display: block;">Commentaire :</label>
        <textarea v-model="form.comment"></textarea>
      </div>

      <div style="margin: 10px 0;">
        <label style="display: block;">Montant :</label>
        <input type="number" v-model.number="form.amount" step="0.01" required />
      </div>

      <div v-if="error" style="color: red; margin: 10px 0;">ERREUR : {{ error }}</div>

      <button type="submit">{{ editingId ? 'Mettre a jour' : 'Ajouter' }}</button>
      <button v-if="editingId" type="button" @click="cancelEdit" style="margin-left: 10px;">
        Annuler
      </button>
    </form>

    <div v-if="loading">Chargement...</div>
    <div v-else-if="loadError">ERREUR : {{ loadError }}</div>
    <div v-else>
      <TransitionGroup name="donation" tag="div" class="donation-list">
        <Donation
          v-for="donation in donations"
          :key="donation.id"
          :donation="donation"
          @edit="startEdit"
          @delete="deleteDonation"
        />
      </TransitionGroup>
      <p v-if="donations.length === 0">Aucune donation pour le moment.</p>
    </div>
  </div>
</template>

<script>
import { nextTick } from 'vue'
import Donation from '../components/Donation.vue'

export default {
  name: 'Donations',
  components: {
    Donation
  },
  emits: ['reload'],
  props: {
    cagnotte: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      donations: [],
      loading: true,
      loadError: null,
      error: null,
      editingId: null,
      form: {
        donator: '',
        comment: '',
        amount: null
      }
    }
  },
  methods: {
    async loadDonations() {
      this.loading = true
      this.loadError = null

      try {
        const response = await this.$api.get(`/api/cagnottes/${this.$route.params.id}/donations`)
        this.donations = response.data
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          this.loadError = err.response.data.message
        } else {
          this.loadError = 'Impossible de charger les donations'
        }
      } finally {
        this.loading = false
      }
    },
    async submitDonation() {
      this.error = null

      try {
        const payload = {
          donator: this.form.donator || null,
          comment: this.form.comment || null,
          amount: this.form.amount
        }

        if (this.editingId) {
          const response = await this.$api.put(
            `/api/cagnottes/${this.$route.params.id}/donations/${this.editingId}`,
            payload
          )
          const updated = response.data
          const index = this.donations.findIndex(d => d.id === this.editingId)
          if (index !== -1) this.donations.splice(index, 1, updated)
          this.$emit('reload')
        } else {
          const response = await this.$api.post(
            `/api/cagnottes/${this.$route.params.id}/donations`,
            payload
          )
          this.donations.unshift(response.data)
          this.$emit('reload')
        }

        this.resetForm()
        await nextTick()
        this.focusDonator()
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          this.error = err.response.data.message
        } else {
          this.error = "Une erreur est survenue lors de l'envoi de la donation"
        }
      }
    },
    startEdit(donation) {
      this.editingId = donation.id
      this.form.donator = donation.donator || ''
      this.form.comment = donation.comment || ''
      this.form.amount = donation.amount
      nextTick(() => this.focusDonator())
    },
    cancelEdit() {
      this.resetForm()
      nextTick(() => this.focusDonator())
    },
    async deleteDonation(donation) {
      if (!confirm('Etes-vous sur de vouloir supprimer cette donation ?')) return

      try {
        await this.$api.delete(`/api/cagnottes/${this.$route.params.id}/donations/${donation.id}`)
        this.donations = this.donations.filter(d => d.id !== donation.id)
        this.$emit('reload')
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          alert('ERREUR : ' + err.response.data.message)
        } else {
          alert('Impossible de supprimer la donation')
        }
      }
    },
    resetForm() {
      this.editingId = null
      this.form = {
        donator: '',
        comment: '',
        amount: null
      }
    },
    focusDonator() {
      if (this.$refs.donatorInput) this.$refs.donatorInput.focus()
    }
  },
  mounted() {
    this.loadDonations()
  },
  watch: {
    '$route.params.id'() {
      this.loadDonations()
    }
  }
}
</script>

<style scoped>
.donation-list {
  margin-top: 20px;
}

.donation-enter-active,
.donation-leave-active {
  transition: all 0.2s ease;
}

.donation-enter-from,
.donation-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>

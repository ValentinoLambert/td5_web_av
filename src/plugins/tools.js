export default {
  install(app, options) {
    app.mixin({
      methods: {
        dateToDB(date) {
          return date.split('/').reverse().join('-')
        },
        dbDateToFr(date) {
          return date.split('-').reverse().join('/')
        },
        dbDateHourToFr(datetime) {
          const [date, time] = datetime.split(' ')
          return this.dbDateToFr(date) + ' ' + time
        },
        formatAmount(amount) {
          return amount.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €'
        },
        cutText(text, maxLength = options.textMaxLength) {
          if (text.length <= maxLength) return text
          return text.substring(0, maxLength) + '…'
        }
      }
    })

    app.directive('focus', {
      mounted(el) {
        el.focus()
      }
    })
  }
}

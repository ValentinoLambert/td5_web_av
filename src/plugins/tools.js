export default {
  install(app) {
    app.mixin({
      methods: {
        dateToDB(date) {
          return date.split('/').reverse().join('-')
        }
      }
    })
  }
}

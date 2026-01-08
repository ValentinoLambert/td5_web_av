export default {
  install(app) {
    app.mixin({
      methods: {
        dateToDB(date) {
          return date.split("/").reverse().join("-");
        },
        dbDateToFr(dbDate) {
          return dbDate.split("-").reverse().join("/");
        },
        dbDateHourToFr(dbDa) {
          [date, hour] = dbDa.split(" ");
          return this.dbDateToFr(date) + " اے " + hour;
        },
        
      },
    });
  },
};

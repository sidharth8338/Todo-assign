const mongoose = require("mongoose");
require("dotenv").config();

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.mongoose
  .connect(`${process.env.MONGO_URI}/assign?${process.env.URL_CONNECTOR}`)
  .then(() => {
    console.log("connected to mongoDB");
    // initial();
  });

// function initial() {
//   db.contentJourney.estimatedDocumentCount((err, count) => {
//     if (!err && count === 0) {
//       [
//         {
//           stage: "Awareness",
//           initials: "Aw",
//         },
//         {
//           stage: "Interest",
//           initials: "In",
//         },
//         {
//           stage: "Desire",
//           initials: "Ds",
//         },
//         {
//           stage: "Action",
//           initials: "At",
//         },
//         {
//           stage: "Sales Enablement",
//           initials: "SE",
//         },
//       ].forEach((ob) => {
//         new db.contentJourney({
//           customer_journey_stage: ob.stage,
//           customer_journey_initials: ob.initials,
//         }).save((err) => {
//           if (err) {
//             console.log("error", err);
//           }

//           console.log("added to Customer Journey collection");
//         });
//       });
//     }
//   });
// }

module.exports = db;

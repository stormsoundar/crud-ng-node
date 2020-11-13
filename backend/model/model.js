var Sequelize = require("sequelize");
const dbConfig = new Sequelize(
  "postgres://postgres:postgres@localhost:5432/register"
);
const Register = dbConfig.define("registrations", {
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  mobile: {
    type: Sequelize.BIGINT,
  },
  dob: {
    type: Sequelize.DATEONLY,
  },
  gender: {
    type: Sequelize.STRING,
  },
  address: {
    type: Sequelize.STRING,
  },
  address2: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
  },
  state: {
    type: Sequelize.STRING,
  },
  zip: {
    type: Sequelize.BIGINT,
  },
},
{
    timestamps: false,
});

dbConfig
  .sync({ force: true })
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
module.exports = Register;

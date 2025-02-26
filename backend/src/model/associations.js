const trek = require("./trekSchema");
const trekRequest = require("./requestSchema");

trekRequest.belongsTo(trek, { foreignKey: "trekId" });
trek.hasOne(trekRequest, { foreignKey: "trekId" });

module.exports = {
  trek,
  trekRequest
};

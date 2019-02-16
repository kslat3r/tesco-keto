require('dotenv').config();

const { TESCO_API_KEY } = process.env;

module.exports = (request, response) => {
  response
    .status(200)
    .send(TESCO_API_KEY);
};

const axios = require('axios')

const getRecentWeek = res => {
  const rate =
    res.data['daily-trends'].slice(0, 14).reduce((res, v) => res + v, 0) / 14
  const total = res.data.github.stargazers_count
  const remainingDays = (100000 - total) / rate
  return {
    rate: parseInt(rate, 10),
    total,
    remainingDays: remainingDays.toFixed(1)
  }
}

module.exports = () =>
  Promise.all([
    axios
      .get(`https://bestofjs-api-v2.now.sh/projects/electron/electron`)
      .then(getRecentWeek),
    axios
      .get(`https://bestofjs-api-v2.now.sh/projects/nwjs/nw.js`)
      .then(getRecentWeek)
  ]).then(([electron, nwjs]) => ({ electron, nwjs }))

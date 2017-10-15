import request from 'superagent'

export function getBusLocation(busNumber, callback) {
  request
    .get("/api/bus/" + busNumber)
    .end((err, res) => {
      if (err) {
        callback(err)
        console.log(err)
      } else {
        callback(null, res.body)
      }
    })
}

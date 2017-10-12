import request from 'superagent'

// https://www.metlink.org.nz/api/v1/ServiceLocation/14

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

// export function getBusLocation (busNumber, callback) {
//   request 
//     .post("https://www.metlink.org.nz/api/v1/ServiceLocation/")
//     .send('14')
// }
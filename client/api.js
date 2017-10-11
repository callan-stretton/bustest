import request from 'superagent'

// https://www.metlink.org.nz/api/v1/ServiceLocation/14

export function getBusLocation(busNumber, callback) {
  request
    .get("https://www.metlink.org.nz/api/v1/ServiceLocation/14")
    .end((err, res) => {
      if (err) {
        callabck(err)
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
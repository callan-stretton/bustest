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


// if ((service.HasStarted === true)) {
// 	'./images/bus-icon-inbound.png'
// } else {
// 	'./images/bus-icon-not-in-service.png'
// }

// icon: (area == 1) ? icon1: icon0,
// icon: (area == 1) ? icon1 : (area == 2) ? icon2 : icon0,
//
// (service.HasStarted === false) ? './images/bus-icon-not-in-service.png' : './images/bus-icon-inbound.png'

// (service.HasStarted === false) ? './images/bus-icon-not-in-service.png' : (service.Direction === "Inbound") ? './images/bus-icon-inbound.png' : './images/bus-icon-outbound.png'


// if (service.HasStarted === false){
//   './images/bus-icon-not-in-service.png'
// } else if (service.Direction === "Inbound") {
//   './images/bus-icon-inbound.png'
// } else {
//   './images/bus-icon-outbound.png'
// }

import React from 'react'

import { getBusLocation } from '../api'

export default class Map extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      center: {
        lat: -41.2865,
        lng: 174.7762
      }
      // busLocation: {
      //   lat: -41.286924,
      //   lng: 174.776102
      // }
    }
    // this.currentBusLocation = this.currentBusLocation.bind(this)
  }
  // currentBusLocation(busLocation) {
  //   this.getBusLocation (busLocation, (err, res) => {
  //     console.log(err, res, this.state)
  //     this.setState(busLocation: res.services[0].lat .long)
  //   })
  // }

  componentDidMount () {
    this.loadMap(this.state.center, this.state.busLocation)
  }
  loadMap (center, busLocation) {
    this.map = new google.maps.Map(this.refs.map, {
      center: center,
      zoom: 14
    })
    this.marker = new google.maps.Marker({
      // position: busLocation,
      position: {
        lat: -41.296924,
        lng: 174.774102
        },
      map: this.map,
      icon: {
        url: './images/bus-icon.png',
        scaledSize: new google.maps.Size(50, 50)
      },
      title: 'Bus'
    })
  }
  render () {
    return (
      <div>
        {/* <h3>The Map Component</h3> */}
        <div className="map" style={{width: '60vh', height: '60vh'}} ref="map" > I should show a Map</div>
      </div>
    )
  }
}
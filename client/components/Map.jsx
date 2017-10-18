import React from 'react'

import { getBusLocation } from '../api'
import moment from 'moment'

import bus1 from '../../server/bus-routes/bus1'
import bus2 from '../../server/bus-routes/bus2'
import bus3 from '../../server/bus-routes/bus3'
import bus4 from '../../server/bus-routes/bus4'
import bus6 from '../../server/bus-routes/bus6'
import bus7 from '../../server/bus-routes/bus7'
import bus14 from '../../server/bus-routes/bus14'
import bus17 from '../../server/bus-routes/bus17' // not correct route ?
import bus24 from '../../server/bus-routes/bus24'
import bus43 from '../../server/bus-routes/bus43'

import busService from '../../server/busService'

export default class Map extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      center: {
        lat: -41.2975,
        lng: 174.7762
      },
      services: []
    }
  }

  startTicking () {
    setInterval(() => {
      console.log('tick')
      if (this.props.busNumber) this.updateBus()
    }, 10000)
  }
  updateBus () {
    console.log(this.props.busNumber)
    if (this.props.busNumber) {
      getBusLocation(this.props.busNumber, (err, data) => {
        this.setState({ services: data.Services })
      })
    } else this.setState({services: []})
  }
  componentDidMount () {
    this.loadMap(this.state.center)
    this.updateBus()
    this.startTicking()
  }
  componentWillReceiveProps (props) {
    this.updateBus()
  }
  componentDidUpdate () {
    this.loadMap(this.state.center)
  }
  loadMap (center) {
    console.log(this.state)
    this.map = new google.maps.Map(this.refs.map, {
      center: center,
      zoom: 13,
      styles: [
        { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d59563' }]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{ visibility: 'off' }] // not working
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{ color: '#263c3f' }]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#6b9a76' }]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{ color: '#38414e' }]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#212a37' }]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#9ca5b3' }]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{ color: '#746855' }]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#1f2835' }]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#f3d19c' }]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{ color: '#2f3948' }]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d59563' }]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#17263c' }]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#515c6d' }]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{ color: '#17263c' }]
        }
      ]
    })
    // let coords = busService[this.props.busNumber]

    let servicePathCoordinates = busService[this.props.busNumber]
    let servicePath = new google.maps.Polyline({
      path: servicePathCoordinates,
      geodesic: true,
      strokeColor: 'yellow',
      strokeOpacity: 1.0,
      strokeWeight: 3
    })

    servicePath.setMap(this.map)

    this.state.services.map((service) => {
      const moment1 = moment()
      const moment2 = moment(service.RecordedAtTime)
      console.log(moment2.format())

      new google.maps.Marker({
        position: {
          lat: Number(service.Lat),
          lng: Number(service.Long)
        },
        map: this.map,
        icon: {
          url: (service.HasStarted === false) ? './images/bus-icon-not-in-service.png' : (service.Direction === 'Inbound') ? './images/bus-icon-inbound.png' : './images/bus-icon-outbound.png',
          scaledSize: new google.maps.Size(30, 30)
        },
        title: 'Bus ' + service.ServiceID + '\n' + service.Direction
      })
    })
  }
  render () {
    return (
      <div>
        <div className="map" style={{width: '80vh', height: '80vh'}} ref="map" > I should show a Map</div>
      </div>
    )
  }
}

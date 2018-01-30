import React from 'react'

import { getBusLocation } from '../api'
import moment from 'moment'

import busService from '../../server/busService'

export default class Map extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      center: {
        lat: -41.2975,
        lng: 174.7762
      },
      inBoundStops: [],
      outBoundStops: [],
      isInbound: props.isInbound,
      services: []
    }
  }

  startTicking () {
    setInterval(() => {
      console.log('tick')
      if (this.props.busNumber) this.updateBus()
    }, 10000)
  }
  updateBus (busNumber) {
    if (busNumber || this.props.busNumber) {
      getBusLocation(busNumber || this.props.busNumber, (err, data) => {
        // this.state.services.forEach(service => service.setMap(null))
        this.setState({ services: data.Services, inBoundStops: data.inboundStops.coords, outBoundStops: data.outboundStops.coords })
      })
    } else this.setState({ services: [] })
  }
  componentDidMount () {
    this.loadMap(this.state.center)
    this.startTicking()
    this.updateBus()
  }
  componentWillReceiveProps (props) {
    this.updateBus(props.busNumber)
    if (props.isInbound != this.state.isInbound) this.setState({ isInbound: props.isInbound })
  }
  componentDidUpdate () {
    this.renderServices()
  }
  loadMap (center) {
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
    this.renderServices()
  }
  renderServices () {
    let servicePathCoordinates = busService[this.props.busNumber]
    if (this.servicePath) this.servicePath.setMap(null)
    this.servicePath = new google.maps.Polyline({
      path: servicePathCoordinates,
      geodesic: true,
      strokeColor: 'yellow',
      strokeOpacity: 1.0,
      strokeWeight: 3
    })
    this.servicePath.setMap(this.map)
    if (this.markers) {
      this.markers.forEach(marker => {
        if (marker.hasOwnProperty('setMap')) marker.setMap(null); marker.setVisible(false)
      })
    }
    console.log(this.state.services)
    this.markers = this.state.services.filter(service => service.Direction == (this.state.isInbound ? 'Inbound' : 'Outbound')).map((service) => {
      return new google.maps.Marker({
        position: {
          lat: Number(service.Lat),
          lng: Number(service.Long)
        },
        map: this.map,
        icon: {
          url: (service.Service.Mode === 'Bus') ? (service.HasStarted === false) ? './images/bus-icon-not-in-service.png' : (service.Direction === 'Inbound') ? './images/bus-icon-inbound.png' : './images/bus-icon-outbound.png' : (service.Service.Mode === 'Train') ? (service.HasStarted === false) ? './images/train-icon-not-in-service.png' : (service.Direction === 'Inbound') ? './images/train-icon-inbound.png' : './images/train-icon-outbound.png' : (service.HasStarted === false) ? './images/ferry-icon-not-in-service.png' : (service.Direction === 'Inbound') ? './images/ferry-icon-inbound.png' : './images/ferry-icon-outbound.png',
          scaledSize: new google.maps.Size(30, 30)
        },
        title: (service.BehindSchedule === true) ? (service.BehindSchedule < 60) ? 'Running ' + moment('1900-01-01 00:00:00').add(service.DelaySeconds, 'seconds').format('ss') + ' seconds late' : (service.BehindSchedule === 60) ? 'Running 1 minute late' : (service.BehindSchedule < 3600) ? 'Running ' + moment('1900-01-01 00:00:00').add(service.DelaySeconds, 'seconds').format('mm:ss') + ' minutes late' : 'Running over an hour late' : (service.DelaySeconds === 0) ? 'On Time' : 'Ahead of schedule by ' + moment('1900-01-01 00:00:00').add(Math.abs(service.DelaySeconds), 'seconds').format('mm:ss') + ' minutes'
      })
    })
    if (this.stops) {
      this.stops.forEach(stop => {
        if (stop.hasOwnProperty('setMap')) stop.setMap(null); stop.setVisible(false)
      })
    }
    // Render Bus Stops (Some are slightly wrong)
    // let stops = this.state[this.state.isInbound ? 'inBoundStops' : 'outBoundStops']
    // this.stops = stops.map((service) => {
    //   return new google.maps.Marker({
    //     position: {
    //       lat: Number(service.lat),
    //       lng: Number(service.lng)
    //     },
    //     map: this.map,
    //     icon: {
    //       url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Bus_Sign.svg/2000px-Bus_Sign.svg.png',
    //       scaledSize: new google.maps.Size(10, 10)
    //     },
    //     title: 'stop ' + service.stopNumber + '\n'
    //   })
    // })
  }
  render () {
    return (
      <div>
        <div className="map" style={{ width: '80vh', height: '80vh' }} ref="map" > I should show a Map</div>
      </div>
    )
  }
}

// moment.duration(service.DelaySeconds).format("mm:ss") + ' minutes late' : 'On Time'

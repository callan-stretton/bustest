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
      busDirection: props.busDirection,
      services: []
    }
    this.determiner = this.determiner.bind(this)
    this.zoomIn = this.zoomIn.bind(this)
    this.zoomOut = this.zoomOut.bind(this)
    this.moveUp = this.moveUp.bind(this)
    this.moveDown = this.moveDown.bind(this)
    this.moveLeft = this.moveLeft.bind(this)
    this.moveRight = this.moveRight.bind(this)
    this.getPanCoordRatio = this.getPanCoordRatio.bind(this)
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
    if (props.busDirection != this.state.busDirection) this.setState({ busDirection: props.busDirection })
  }
  componentDidUpdate () {
    this.renderServices()
  }
  loadMap (center) {
    this.map = new google.maps.Map(this.refs.map, {
      center: center,
      zoom: 13,
      disableDefaultUI: true,
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
  zoomIn () {
    let currentZoomLevel = this.map.getZoom()
    this.map.setZoom(currentZoomLevel + 1)
  }
  zoomOut () {
    let currentZoomLevel = this.map.getZoom()
    this.map.setZoom(currentZoomLevel - 1)
  }
  getPanCoordRatio () {
    const currentZoomLevel = this.map.getZoom()
    const currentLat = this.map.getCenter().lat()
    const currentLng = this.map.getCenter().lng()
    const panSize = (currentZoomLevel <= 4) ? 50 : (currentZoomLevel <= 7) ? 5 : (currentZoomLevel <= 10) ? 0.5 : (currentZoomLevel <= 13) ? 0.05 : (currentZoomLevel <= 16) ? 0.005 : (currentZoomLevel <= 19) ? 0.0005 : 0.00005
    return [panSize, currentLat, currentLng]
  }
  moveUp () {
    const panCoords = this.getPanCoordRatio()
    const newCoords = new google.maps.LatLng(panCoords[1] + panCoords[0], panCoords[2])
    this.map.panTo(newCoords)
  }
  moveDown () {
    const panCoords = this.getPanCoordRatio()
    const newCoords = new google.maps.LatLng(panCoords[1] - panCoords[0], panCoords[2])
    this.map.panTo(newCoords)
  }
  moveLeft () {
    const panCoords = this.getPanCoordRatio()
    const newCoords = new google.maps.LatLng(panCoords[1], panCoords[2] - panCoords[0])
    this.map.panTo(newCoords)
  }
  moveRight () {
    const panCoords = this.getPanCoordRatio()
    const newCoords = new google.maps.LatLng(panCoords[1], panCoords[2] + panCoords[0])
    this.map.panTo(newCoords)
  }
  determiner () {
    if (this.state.busDirection === 'Both') {
      return this.state.services
    } else {
      return this.state.services.filter(service => service.Direction === (this.state.busDirection === 'Inbound' ? 'Inbound' : 'Outbound'))
    }
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
    this.markers = this.determiner().map((service) => {
      return new google.maps.Marker({
        position: {
          lat: Number(service.Lat),
          lng: Number(service.Long)
        },
        map: this.map,
        icon: {
          url: (service.Service.Mode === 'Bus') ? (service.HasStarted === false) ? './images/bus-icon-not-in-service.png' : (((Number(service.Lat) <= -41.320813)) && ((Number(service.Lat) >= -41.322793)) && ((Number(service.Long) >= 174.795588)) && ((Number(service.Long) <= 174.797468))) ? './images/bus-icon-not-in-service.png' : (service.Direction === 'Inbound') ? './images/bus-icon-inbound.png' : './images/bus-icon-outbound.png' : (service.Service.Mode === 'Train') ? (service.HasStarted === false) ? './images/train-icon-not-in-service.png' : (service.Direction === 'Inbound') ? './images/train-icon-inbound.png' : './images/train-icon-outbound.png' : (service.HasStarted === false) ? './images/ferry-icon-not-in-service.png' : (service.Direction === 'Inbound') ? './images/ferry-icon-inbound.png' : './images/ferry-icon-outbound.png',
          scaledSize: new google.maps.Size(30, 30)
        },
        title: (((Number(service.Lat) <= -41.320813)) && ((Number(service.Lat) >= -41.322793)) && ((Number(service.Long) >= 174.795588)) && ((Number(service.Long) <= 174.797468))) ? 'In Depot' : (service.HasStarted === true) ? (service.BehindSchedule === true) ? (service.DelaySeconds < 10) ? 'Late by ' + moment('1900-01-01 00:00:00').add(service.DelaySeconds, 'seconds').format('s') + ' seconds' : (service.DelaySeconds < 60) ? 'Late by ' + moment('1900-01-01 00:00:00').add(service.DelaySeconds, 'seconds').format('ss') + ' seconds' : (service.DelaySeconds === 60) ? 'Late by 1 minute' : (service.DelaySeconds < 600) ? 'Late by ' + moment('1900-01-01 00:00:00').add(service.DelaySeconds, 'seconds').format('m:ss') + ' minutes' : (service.DelaySeconds < 3600) ? 'Late by ' + moment('1900-01-01 00:00:00').add(service.DelaySeconds, 'seconds').format('mm:ss') + ' minutes' : 'Late by over an hour' : (service.DelaySeconds === 0) ? 'On Time' : (Math.abs(service.DelaySeconds) < 10) ? 'Early by ' + moment('1900-01-01 00:00:00').add(Math.abs(service.DelaySeconds), 'seconds').format('s') + ' seconds' : (Math.abs(service.DelaySeconds) < 60) ? 'Early by ' + moment('1900-01-01 00:00:00').add(Math.abs(service.DelaySeconds), 'seconds').format('ss') + ' seconds' : (Math.abs(service.DelaySeconds) === 60) ? 'Early by 1 minute' : (Math.abs(service.DelaySeconds) < 600) ? 'Early by ' + moment('1900-01-01 00:00:00').add(Math.abs(service.DelaySeconds), 'seconds').format('m:ss') + ' minutes' : (Math.abs(service.DelaySeconds) < 3600) ? 'Early by ' + moment('1900-01-01 00:00:00').add(Math.abs(service.DelaySeconds), 'seconds').format('mm:ss') + ' minutes' : 'Early by over an hour!' : 'Not in service'
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
      <div className='map-and-controls'>
        <button className='width-control' onClick={this.moveLeft}>&#9669; Left</button>
        <button className='zoom-controls' onClick={this.zoomOut}>-</button>
        <button className='zoom-controls' onClick={this.zoomIn}>+</button>
        <button className='width-control' onClick={this.moveRight}>Right &#9659;</button>
        <br />
        <button className='height-control' onClick={this.moveUp}>Up</button>
        <div className='map-container'>
          <div className="map" style={{ width: '750px', height: '750px' }} ref="map">I should show a Map</div>
        </div>
        <button className='height-control' onClick={this.moveDown}>Down</button>
      </div>
    )
  }
}

// moment.duration(service.DelaySeconds).format("mm:ss") + ' minutes late' : 'On Time'

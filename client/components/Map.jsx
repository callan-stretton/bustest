import React from 'react'

export default class Map extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      center: {
        lat: -41.2865,
        lng: 174.7762
      }
    }
  }
  componentDidMount () {
    this.loadMap(this.state.center)
  }
  loadMap (center) {
    this.map = new google.maps.Map(this.refs.map, {
      center: center,
      zoom: 17
    })
    this.marker = new google.maps.Marker({
      position: center,
      map: this.map,
      title: 'Bus'
    })
  }
  render () {
    return (
      <div>
        <h3>The Map Component</h3>
        <div className="map" style={{width: '60vh', height: '60vh'}} ref="map" > I should show a Map</div>
      </div>
    )
  }
}
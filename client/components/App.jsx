import React from 'react'

import Map from './Map'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      busNumber: null
    }
  }
  updateBusNumber(e) {
    this.setState({busNumber: e.target.value})
  }
  render() {
    return (
      <div className='appContainer'>
        <h1 className='appTitle'>Where is my bus?</h1>
        <form>
          <select onChange={this.updateBusNumber.bind(this)}name="BusService" className="selector">
            <option selected disabled >Bus Service</option>
            <option value="1">1 Island Bay - Wellington</option>
            <option value="2">2 Miramar - Wellington</option>
            <option value="3">3 Karori - Wellington - Lyall Bay</option>
            <option value="4">4 Happy Valley - Wellington</option>
            <option value="5">5 Wellington - Hataitai (Loop Service)</option>
            <option value="6">6 Lyall Bay - Wellington</option>
            <option value="7">7 Kingston - Wellington</option>
            <option value="8">8 Kowhai Park - Wellington</option>
            <option value="14">14 Rongotai - Wellington - Wilton</option>
            <option value="17">17 Victoria University - Wellington</option>
            <option value="24">24 Miramar Heights - Wellington</option>
            <option value="43">43 Strathmore Park - Wellington - Khandallah (Loop Service)</option>
            <option value="44">44 Strathmore Park - Wellington - Khandallah (Loop Service)</option>
          </select>
        </form>
        <Map busNumber={this.state.busNumber}/>
      </div>
    )

  }
}

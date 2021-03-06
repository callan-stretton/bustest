import React from 'react'

import Map from './Map'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      busNumber: null,
      isInbound: false,
      busDirection: 'Both'
    }
  }
  toggleInbound () {
    this.setState({ isInbound: !this.state.isInbound })
  }
  changeDirection (e) {
    this.setState({ busDirection: e.target.value })
  }
  updateBusNumber (e) {
    this.setState({ busNumber: e.target.value })
  }
  render () {
    return (
      <div className='appContainer'>
        <h1 className='appTitle'>Where is my bus?</h1>
        <form>
          <select onChange={this.updateBusNumber.bind(this)} name="BusService" className="selector">
            <option selected disabled >Bus Service</option>
            <option value="1">1 Island Bay - Wellington</option>
            <option value="2">2 Miramar - Wellington</option>
            <option value="3">3 Karori - Wellington - Lyall Bay</option>
            <option value="4">4 Happy Valley - Wellington</option>
            <option value="6">6 Lyall Bay - Wellington</option>
            <option value="7">7 Kingston - Wellington</option>
            <option value="8">8 Kowhai Park - Wellington</option>
            <option value="10">10 Newtown - Wellington</option>
            <option value="11">11 Seatoun - Wellington</option>
            <option value="14">14 Rongotai - Wellington - Wilton</option>
            <option value="17">17 Victoria University - Wellington</option>
            <option value="18">18 Miramar - Karori</option>
            <option value="23">23 Houghton Bay - Wellington - Mairangi</option>
            <option value="24">24 Miramar Heights - Wellington</option>
            <option value="25">25 Strathmore - Wellington</option>
            <option value="32">32 (Express) Island Bay - Wellington</option>
            <option value="43">43 Strathmore Park - Wellington - Khandallah (Loop Service)</option>
            <option value="44">44 Strathmore Park - Wellington - Khandallah (Loop Service)</option>
            <option value="45">45 Ngaio - Wellington</option>
            <option value="46">46 Broadmeadows - Wellington</option>
            <option value="91">91 Airport Flyer</option>
            <option value="KPL">KPL Waikanae - Wellington</option>
            <option value="HVL">HVL Upper Hutt - Wellington</option>
            <option value="JVL">JVL Johnsonville - Wellington</option>
            <option value="MEL">MEL Melling - Wellington</option>
            <option value="WRL">WRL Masterton - Wellington</option>
            <option value="WHF">WHF Wellington Harbour Ferry</option>
          </select>
          <br />
          <select onChange={this.changeDirection.bind(this)} name="BusDirection" className="selector">
            <option selected value="Both" >Both</option>
            <option value="Inbound">Inbound</option>
            <option value="Outbound">Outbound</option>
          </select>
        </form>
        <Map busNumber={this.state.busNumber} busDirection={this.state.busDirection}/>
        <br />
        <div className="legend">
          <img src="images/bus-icon-inbound.png" alt="Inbound" height="30" width="30" />
          <h4>Inbound</h4>
          <br />
          <img src="images/bus-icon-outbound.png" alt="Inbound" height="30" width="30" />
          <h4>Outbound</h4>
          <br />
          <img src="images/bus-icon-not-in-service.png" alt="Inbound" height="30" width="30" />
          <h4>Not in Service</h4>
        </div>
      </div>
    )
  }
}

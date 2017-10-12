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
          Bus Service: <select onChange={this.updateBusNumber.bind(this)}name="BusService">
            <option selected disabled >Select your Service :)</option>
            <option value="3">3</option>
            <option value="8">8</option>
            <option value="14">14</option>
            <option value="24">24</option>
          </select>
        </form>
        <Map busNumber={this.state.busNumber}/>
      </div>
    )

  }
}




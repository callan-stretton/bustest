import bus1 from './bus-routes/bus1'
import bus2 from './bus-routes/bus2'
import bus3 from './bus-routes/bus3'
import bus4 from './bus-routes/bus4'
import bus6 from './bus-routes/bus6'
import bus7 from './bus-routes/bus7'
import bus8 from './bus-routes/bus8'
import bus14 from './bus-routes/bus14'
import bus17 from './bus-routes/bus17' // not correct route ?
import bus18 from './bus-routes/bus18'
import bus24 from './bus-routes/bus24'
import bus43 from './bus-routes/bus43' // also bus 44
import busKPL from './bus-routes/busKPL'
import busHVL from './bus-routes/busHVL'
import busJVL from './bus-routes/busJVL'
import busMEL from './bus-routes/busMEL'
import busWRL from './bus-routes/busWRL'

module.exports = {
  1: bus1,
  2: bus2,
  3: bus3,
  4: bus4,
  6: bus6,
  7: bus7,
  8: bus8,
  14: bus14,
  17: bus17,
  18: bus18,
  24: bus24,
  43: bus43,
  44: bus43,
  KPL: busKPL,
  HVL: busHVL,
  JVL: busJVL,
  MEL: busMEL,
  WRL: busWRL
}

// http://www.gpsvisualizer.com/convert_input
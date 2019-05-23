import {Dimensions, Platform} from 'react-native'

const DEVICE = {
  WIDTH: Dimensions.get('window').width,
  HEIGHT: Dimensions.get('window').height,
  PLATFORM: Platform.OS // ios || android
}

module.exports = {DEVICE}

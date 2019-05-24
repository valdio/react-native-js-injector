import React, {Component} from 'react'
import {Dimensions, Linking} from 'react-native'
import {WebView} from 'react-native-webview'

const injectedScript = function () {
  function waitForBridge(retryCount) {
    //retry 5 times -  if loop keeps going the app will crass
    if (retryCount <= 5)
      setTimeout(waitForBridge(retryCount + 1), 200)

    var height = 0
    if (document.documentElement.clientHeight > document.body.clientHeight) {
      height = document.documentElement.clientHeight
    } else {
      height = document.body.clientHeight
    }
    //added a last check with jquery if there is no height specified above
    if (height === 0)
      height = $(document).height()

    window.ReactNativeWebView.postMessage(height)
  }

  waitForBridge(1)
}


export default class AutoHeightWV extends Component {
  state = {
    webViewHeight: Number
  }

  constructor(props) {
    super(props)
    this.state = {
      webViewHeight: 0
    }

    this._onMessage = this._onMessage.bind(this)
  }

  _onMessage(e) {
    /**
     * Code used to set the height of the WebView
     * This WebView is used inside a ScrollView so we need to set its height
     */
    this.setState({
      webViewHeight: parseInt(e.nativeEvent.data || this.props.defaultHeight || 0)
    })
  }

  stopLoading() {
    this.webview.stopLoading()
  }

  render() {
    const _w = this.props.width || Dimensions.get('window').width
    let _h = this.state.webViewHeight

    if (this.props.maxHeight && _h > this.props.maxHeight)
      _h = this.props.maxHeight

    if (this.props.minHeight && _h < this.props.minHeight)
      _h = this.props.minHeight

    return (
      <WebView
        scrollEnabled={false}
        {...this.props}
        thirdPartyCookiesEnabled={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        mixedContentMode='always'
        onLoadEnd={this.props.onLoadEnd}
        ref={(ref) => {
          this.webview = ref
        }}
        injectedJavaScript={
          '(' + String(injectedScript) + ')();' +
          'window.postMessage = String(Object.hasOwnProperty).replace(\'hasOwnProperty\', \'postMessage\');'
        }
        onMessage={this._onMessage}
        automaticallyAdjustContentInsets={true}
        {...this.props}
        style={[{width: _w}, this.props.style, {height: _h}]}
      />
    )
  }
}

import React, {Component} from 'react'
import {Dimensions, Linking} from 'react-native'
import {openLinksOnBrowser} from '../utils/actions'
import {WebView} from 'react-native-webview'


const injectedScript = function () {

  function waitForBridge(retryCount) {

    //retry 5 times -  if loop keeps going the app will crass
    if (retryCount <= 5)
      setTimeout(waitForBridge(retryCount + 1), 200)

    let height = 0
    if (document.documentElement.clientHeight > document.body.clientHeight) {
      height = document.documentElement.clientHeight
    } else {
      height = document.body.clientHeight
    }
    window.ReactNativeWebView.postMessage(height)
  }

  waitForBridge(1)
}


export default class AutoHeightWV extends Component {
  state = {
    webViewHeight: Number
  }

  static defaultProps = {
    autoHeight: true
  }

  constructor(props) {
    super(props)
    this.state = {
      webViewHeight: this.props.defaultHeight
    }

    this._onMessage = this._onMessage.bind(this)
  }

  _onMessage(e) {
    /**
     * Code used to open external links
     * */
      // retrieve event data
    let data = e.nativeEvent.data
    // maybe parse stringified JSON
    try {
      data = JSON.parse(data)
    } catch (e) {
    }

    // check if this message concerns us
    if ('object' === typeof data && data.external_url_open) {
      // proceed with URL open request
      Linking.openURL(data.external_url_open)
    }

    /**
     * Code used to set the height of the WebView
     * This WebView is used inside a ScrollView so we need to set its height
     */
    this.setState({
      webViewHeight: parseInt(e.nativeEvent.data)
    })
  }

  stopLoading() {
    this.webview.stopLoading()
  }

  render() {
    const _w = this.props.width || Dimensions.get('window').width
    const _h = this.props.autoHeight ? this.state.webViewHeight : this.props.defaultHeight


    return (
      <WebView
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
          'window.postMessage = String(Object.hasOwnProperty).replace(\'hasOwnProperty\', \'postMessage\');' +
          '(' + String(openLinksOnBrowser) + ')();'}
        scrollEnabled={this.props.scrollEnabled || false}
        onMessage={this._onMessage}
        automaticallyAdjustContentInsets={true}
        {...this.props}
        style={[{width: _w}, this.props.style, {height: _h}]}
      />
    )
  }
}

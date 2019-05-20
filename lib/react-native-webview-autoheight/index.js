import React, {Component} from 'react'
import {Dimensions, WebView, Linking} from 'react-native'

const injectedScript = function () {
  function waitForBridge() {
    console.log(document.body)
    console.log('\n\n\n-------------------------------')
    if (window.postMessage.length !== 1) {
      setTimeout(waitForBridge, 200)
    } else {
      let height = 0
      if (document.documentElement.clientHeight > document.body.clientHeight) {
        height = document.documentElement.clientHeight
      } else {
        height = document.body.clientHeight
      }
      postMessage(height)
    }
  }

  waitForBridge()
}

//injected javascript to open links on browser. Not on the rendered WebView
/**
 * {@link https://medium.com/@elhardoum/opening-external-links-in-browser-in-react-native-webview-18fe6a66312a}
 */
const openLinksOnBrowser = function () {
  var attachEvent = function (elem, event, callback) {
    event = event.replace(/^on/g, '')
    if ('addEventListener' in window) {
      elem.addEventListener(event, callback, false)
    } else if ('attachEvent' in window) {
      elem.attachEvent('on' + event, callback)
    } else {
      var registered = elem['on' + event]
      elem['on' + event] = registered ? function (e) {
        registered(e)
        callback(e)
      } : callback
    }
    return elem
  }
  var all_links = document.querySelectorAll('a[href]')


  if (all_links) {
    for (var i in all_links) {
      if (all_links.hasOwnProperty(i)) {
        attachEvent(all_links[i], 'onclick', function (e) {
          if (!new RegExp('^https?:\/\/' + location.host, 'gi').test(this.href)) {
            // handle external URL
            e.preventDefault()
            window.postMessage(JSON.stringify({
              external_url_open: this.href
            }))
          }
        })
      }
    }
  }
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
        thirdPartyCookiesEnabled={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        mixedContentMode='always'

        onLoadEnd={this.props.onLoadEnd}
        ref={(ref) => {
          this.webview = ref
        }}
        injectedJavaScript={'(' + String(injectedScript) + ')();' +
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

import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import {WebView} from 'react-native-webview'
import {buildHtmlTemplate} from './utils/htmlTemplate'
import {INJECTOR_TYPE} from './type'
import AutoHeightWV from './react-native-webview-autoheight'
import {DEVICE} from './utils/device'

export default class WebViewInjector extends Component {
  render() {
    const {source, injectScript, type = INJECTOR_TYPE.DEFAULT, onLoadEnd} = this.props

    if (source && source.html)
      return type === INJECTOR_TYPE.DEFAULT ?
        <WebView
          scrollEnabled={false}
          {...this.props}
          thirdPartyCookiesEnabled={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          mixedContentMode='always'
          source={{html: buildHtmlTemplate(source.html, injectScript)}}
          automaticallyAdjustContentInsets={true}
        /> :
        <AutoHeightWV
          {...this.props}
          source={{html: buildHtmlTemplate(source.html, injectScript)}}
          onLoadEnd={onLoadEnd}
        />
    else
      return <View/>

  }
}


import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import {WebView} from 'react-native-webview'
import {buildHtmlTemplate} from './utils/htmlTemplate'
import {INJECTOR_TYPE} from './type'
import AutoHeightWV from './react-native-webview-autoheight'

export const WebViewInjector = ({source, injectScript, type = INJECTOR_TYPE.DEFAULT} = props) => {

  if (source && source.html)
    return type === INJECTOR_TYPE.AUTO_HEIGHT ?
      <WebView style={styles.container}
               thirdPartyCookiesEnabled={true}
               javaScriptEnabled={true}
               domStorageEnabled={true}
               mixedContentMode='always'
               ref={(ref) => {
                 this.webview = ref
               }}
               source={{html: buildHtmlTemplate(source.html, injectScript)}}
               automaticallyAdjustContentInsets={true}
      />
      : <AutoHeightWV
      />
  else
    return <View style={{height: 40, width: 40, backgroundColor: 'red'}}/>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red'
  }
})

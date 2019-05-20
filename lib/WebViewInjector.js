import React, {Component} from 'react'
import {WebView, View, StyleSheet} from 'react-native'
import {buildHtmlTemplate} from './utils/htmlTemplate'

export const WebViewInjector = ({source, injectScript} = props) => {

  if (source && source.html)
    return (<WebView style={styles.container}
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
    )
  else
    return <View style={{height: 40, width: 40, backgroundColor: 'red'}}/>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red'
  }
})

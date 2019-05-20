import React, {Component} from 'react'
import {StyleSheet, Text, ScrollView, View} from 'react-native'
import {WebViewInjector, INJECTOR_TYPE} from 'react-native-js-injector'

const htmlTemplate = `
<div class="fr-embedly " data-original-embed="<a href='https://youtu.be/t-645fMmuD0' data-card-branding='0' class='embedly-card'></a>" style="height: 370px;">
\t<a href="https://youtu.be/t-645fMmuD0" data-card-branding="0" class="embedly-card"></a>
</div>
`

const script = `<script>
  (function(w, d){
   var id='embedly-platform', n = 'script';
   if (!d.getElementById(id)){
     w.embedly = w.embedly || function() {(w.embedly.q = w.embedly.q || []).push(arguments);};
     var e = d.createElement(n); e.id = id; e.async=1;
     e.src = ('https:' === document.location.protocol ? 'https' : 'http') + '://cdn.embedly.com/widgets/platform.js';
     var s = d.getElementsByTagName(n)[0];
     s.parentNode.insertBefore(e, s);
   }
  })(window, document);
</script>`


export default class App extends Component {
  render() {
    return (<View style={styles.container}>
        <ScrollView>
          <WebViewInjector
            injectScript={script}
            scrollEnabled={false}
            // style={{backgroundColor: 'red'}}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            type={INJECTOR_TYPE.AUTO_HEIGHT}
            source={{html: htmlTemplate}}
          />

          <Text>kjsdhkkjsdjk kjsdh hjsdhkajdshf hlasdkjf hasdhfkh sdhkf</Text>
          <Text>kjsdhkkjsdjk kjsdh hjsdhkajdshf hlasdkjf hasdhfkh sdhkf</Text>
          <Text>kjsdhkkjsdjk kjsdh hjsdhkajdshf hlasdkjf hasdhfkh sdhkf</Text>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  }

})

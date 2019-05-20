import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {WebViewInjector, INJECTOR_TYPE} from 'react-native-js-injector'

const htmlTemplate = `<p>&ldquo;<em>Dueli i unifikimit t&euml; titujve kampion&euml; bote n&euml; pesh&euml;n e r&euml;nd&euml; duhet organizuar me &ccedil;do kusht. Madje ajo duhet t&euml; jet&euml; sfida e radh&euml;s mes tyre</em>&rdquo;, u shpreh Eddie Hearn, menaxheri i boksierit britanik Anthony Joshua. Ky i fundit &euml;sht&euml; kampion bote n&euml; kategorit&euml; IBF, WBA dhe WBO.</p><p>Kjo deklarat&euml; erdhi sot, pas fitores q&euml; kampioni tjet&euml;r i bot&euml;s n&euml; pesh&euml;n e r&euml;nd&euml;, Deontay Wilder (kategoria WBC), arriti ndaj Dominic Breazeale nj&euml; dit&euml; m&euml; par&euml;. &ldquo;<em>Nuk ka m&euml; justifikime p&euml;r t&euml; shmangur k&euml;t&euml; sfid&euml;, nga t&euml; dy boksier&euml;t</em>&rdquo;, tha Eddie Hearn.</p><p>&ldquo;<em>Fitorja e Wilder ishte mahnit&euml;se. Ai e b&euml;ri detyr&euml;n e tij, tani i takon Joshua t&euml; b&euml;j&euml; detyr&euml;n e tij, p&euml;r t&euml; fituar duelin ndaj Ruiz Jr. Gjithsesi, mendoj se edhe ai do t&euml; triumfoj&euml; dhe do t&euml; kemi nj&euml; p&euml;rballje t&euml; madhe mes tyre</em>&rdquo;, tha Eddie Hearn.</p><p>&ldquo;<em>Dueli mes Joshua dhe Wilder do t&euml; ishte p&euml;rballja m&euml; e madhe e peshave t&euml; r&euml;nda n&euml; dekad&euml;n e fundit. N&euml;se k&euml;t&euml; her&euml; i nisim bisedimet me k&euml;mb&euml;n e mbar&euml;, mund ta realizojm&euml; shum&euml; shpejt. Shpresoj q&euml; dy boksier&euml;t ta kuptojn&euml; k&euml;t&euml; gj&euml;, pasi ka r&euml;nd&euml;si p&euml;r ta, sportin, fansat. &Euml;sht&euml; &ldquo;qershia mbi tort&euml;&rdquo; n&euml; pesh&euml;n e r&euml;nd&euml;</em>&rdquo;, tha Hearn.</p>`
export default class App extends Component {
  render() {
    return (<View style={styles.container}>
        <WebViewInjector
          type={INJECTOR_TYPE.DEFAULT}
          source={{html: htmlTemplate}}
        />

        <Text>kjsdhkkjsdjk kjsdh hjsdhkajdshf hlasdkjf hasdhfkh sdhkf</Text>
        <Text>kjsdhkkjsdjk kjsdh hjsdhkajdshf hlasdkjf hasdhfkh sdhkf</Text>
        <Text>kjsdhkkjsdjk kjsdh hjsdhkajdshf hlasdkjf hasdhfkh sdhkf</Text>
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

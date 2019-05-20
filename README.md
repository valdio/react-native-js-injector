# react-native-js-injector
React Native WebView with "super powers". This package is basically a WebView with some extra perks included.

1. Possibility to inject JS scripts easily.
2. Browser cookies enabled by default. 
3. Auto Height `WebView` options, in order to use `WebView`s inside components like `ScrollView`

**Caution!** This package can only be used with row HTML content. If a `uri` is passed as the `source` prop this component will return an empty `<View/>`.

### Install

```
npm install react-native-js-injector --save
```
    
```
yarn add react-native-js-injector
```

This library is depended of the latest updates of the `WebView` component. 
At the current time of this release, the react team suggests using the [RN community backed WebView](https://github.com/react-native-community/react-native-webview) as they are removing `WebView` from the react core.

Install the following WebView
```
yarn add react-native-webview

react-native link react-native-webview
```

If there are any issues check out the [Getting-Started guide](https://github.com/react-native-community/react-native-webview/blob/master/docs/Getting-Started.md).



### Usage

```typescript jsx
import {WebViewInjector, INJECTOR_TYPE} from 'react-native-js-injector'
const htmlTemplate = `<p>Hello!</p`
//example script
const script = `<script>document.body.appendChild(document.createElement("hr"));</script>`
export default class App extends Component {
  render() {
    return (<View style={styles.container}>
          <WebViewInjector
            injectScript={script}
            scrollEnabled={false}
            // style={{backgroundColor: 'red'}}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            type={INJECTOR_TYPE.AUTO_HEIGHT}
            source={{html: htmlTemplate}}
          />
      </View>
    )
  }
}
```


## Props
The props are build to follow the same guidelines as the standard props that `WebView` accepts.

- **`source`** _(Object)_ - JS object containing the raw HTML code. Example: `{html: <div></div>}`
- **`type`** _(String)_ - A flag specifying if the component should use the auto-height perks or not. INJECTOR_TYPE.DEFAULT || INJECTOR_TYPE.AUTO_HEIGHT. **Not required!**
- **`injectScript`** _(String)_ - String containing the script that will be executed on the `WebView`. Read the guideline scripts bellow.
- **`*****`** _(PROPS)_ - The component is build to accept any of the default props that are supported by the standard `WebView`.

### scripts guidelines
In order to execute scripts make sure they are [`**IIFE** (Immediately Invoked Function Expression)`](https://developer.mozilla.org/en-US/docs/Glossary/IIFE).
Make sure the `injectScript` props is passed as `String`. You can use one of the following examples to pass as the value of `injectScript` prop. 

```typescript jsx
const script1 = (function () {
                    //statements...
                })();
// usage
injectScript={script1.toString()}



const script2 = `<script>console.log('worthless script');</script>`
// usage
injectScript={script2}
``` 


### Debugging
In order to remotely debug WebView issues read the following steps.
[Debugging Info](https://github.com/valdio/react-native-js-injector/blob/master/Debugging.md)
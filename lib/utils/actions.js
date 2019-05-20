//injected javascript to open links on browser. Not on the rendered WebView

/**
 * {@link https://medium.com/@elhardoum/opening-external-links-in-browser-in-react-native-webview-18fe6a66312a}
 */
export const openLinksOnBrowser = function () {
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


/**
 * Build a HTML template that accepts injected scripts
 * @param content HTML content
 * @param injectScript JavaScript script of function. Passed as string
 * @returns {string}
 */
export const buildHtmlTemplate = (content, injectScript) => {
  return `<!DOCTYPE html>
    <html>
      <head>
        <script>
            if(!document.__defineGetter__) {
                Object.defineProperty(document, 'cookie', {
                    get: function(){return ''},
                    set: function(){return true},
                });
            } else {
                document.__defineGetter__("cookie", function() { return '';} );
                document.__defineSetter__("cookie", function() {} );
            }
        </script>  
      </head>
       <body>
        ${content || `<div></div>`}
       
        ${injectScript && (injectScript.startsWith('<script') ? injectScript : `<script>${injectScript}</script>`) || `<div></div>`}
       </body>
    </html>`
}
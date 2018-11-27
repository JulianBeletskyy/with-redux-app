import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <script dangerouslySetInnerHTML={{__html: `(function (d, w, c) {
                (w[c] = w[c] || []).push(function() {
                    try {
                        w.yaCounter51319102 = new Ya.Metrika2({
                            id:51319102,
                            clickmap:true,
                            trackLinks:true,
                            accurateTrackBounce:true,
                            webvisor:true
                        });
                    } catch(e) { }
                });
                var n = d.getElementsByTagName("script")[0],
                    s = d.createElement("script"),
                    f = function () { n.parentNode.insertBefore(s, n); };
                s.type = "text/javascript";
                s.async = true;
                s.src = "https://mc.yandex.ru/metrika/tag.js";
                if (w.opera == "[object Opera]") {
                    d.addEventListener("DOMContentLoaded", f, false);
                } else { f(); }
            })(document, window, "yandex_metrika_callbacks2");`}} />
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-124514115-1"></script>
          <script dangerouslySetInnerHTML={{__html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-124514115-1');`}} />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="theme-color" content="#000000" />
          <title>Lifein.Love</title>
          <link rel="shortcut icon" href="/static/assets/favicon.png" />
          <link rel="stylesheet" media="all" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous" />
          <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.7/css/all.css" />
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
          <link rel="stylesheet" href="https://d2etktq4v0899q.cloudfront.net/static/assets/css/react-confirm-alert.min.css"/>
          <link rel="stylesheet" href="https://d2etktq4v0899q.cloudfront.net/static/assets/css/accordion.min.css"/>
          <link rel="stylesheet" href="https://d2etktq4v0899q.cloudfront.net/static/assets/css/animate.min.css"/>
          <link rel="stylesheet" href="https://d2etktq4v0899q.cloudfront.net/static/assets/css/toastr.css"/>
          <link rel="stylesheet" href="https://d2etktq4v0899q.cloudfront.net/static/assets/css/cropper.css"/>
          <link rel="stylesheet" href="https://d2etktq4v0899q.cloudfront.net/static/assets/css/style.css"/>
          <link rel="stylesheet" href="/static/assets/css/font.css"/>
        </Head>
        <body>
          <noscript>
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PTR7TDZ" height="0" width="0" style={{display: 'none',visibility:'hidden'}}>
            </iframe>
          </noscript>
          <noscript>
            <div><img src="https://mc.yandex.ru/watch/51319102" style={{position:'absolute', left:'-9999px'}} alt="" /></div>
          </noscript>
          <script dangerouslySetInnerHTML={{__html: `(function(d, s, id){
                   var js, fjs = d.getElementsByTagName(s)[0];
                   if (d.getElementById(id)) {return;}
                   js = d.createElement(s); js.id = id;
                   js.src = "https://connect.facebook.net/en_US/sdk.js";
                   fjs.parentNode.insertBefore(js, fjs);
              }(document, 'script', 'facebook-jssdk'));
            window.fbAsyncInit = function() {
                  FB.init({
                      appId: '266703500400965',
                      autoLogAppEvents: true,
                      xfbml: true,
                      version: 'v2.12'
                  });
              };`}} />
          <script src="https://apis.google.com/js/platform.js"></script>
          {/*<script type='text/javascript' src='https://api.lifein.love/javascriptspellcheck/include.js'></script>*/}
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <script async defer dangerouslySetInnerHTML={{__html: `(function (d, w, c) {
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
          <script async defer src="https://www.googletagmanager.com/gtag/js?id=UA-124514115-1"></script>
          <script async defer dangerouslySetInnerHTML={{__html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-124514115-1');`}} />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="theme-color" content="#000000" />
          <title>Lifein.Love</title>
          <link rel="shortcut icon" href="/static/assets/favicon.png" />
          <script async defer dangerouslySetInnerHTML={{__html: 
            `!function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '947607382102096');
            fbq('track', 'PageView');` }} />
        <noscript>
          <img height="1" width="1" style={{display:'none'}} src="https://www.facebook.com/tr?id=947607382102096&ev=PageView&noscript=1" /></noscript>
        </Head>
        <body>
          <noscript>
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PTR7TDZ" height="0" width="0" style={{display: 'none',visibility:'hidden'}}>
            </iframe>
          </noscript>
          <noscript>
            <div><img src="https://mc.yandex.ru/watch/51319102" style={{position:'absolute', left:'-9999px'}} alt="" /></div>
          </noscript>
          <script async defer dangerouslySetInnerHTML={{__html: `(function(d, s, id){
                   var js, fjs = d.getElementsByTagName(s)[0];
                   if (d.getElementById(id)) {return;}
                   js = d.createElement(s); js.id = id;
                   js.src = "https://connect.facebook.net/en_US/sdk.js";
                   fjs.parentNode.insertBefore(js, fjs);
              }(document, 'script', 'facebook-jssdk'));
            window.fbAsyncInit = function() {
                  FB.init({
                      appId: '310176322926692'
                      autoLogAppEvents: true,
                      xfbml: true,
                      version: 'v2.12'
                  });
              };`}} />
          <script src="https://apis.google.com/js/platform.js"></script>
          <script async defer dangerouslySetInnerHTML={{__html: `
            var list = [
              'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
              'https://d2etktq4v0899q.cloudfront.net/static/assets/css/animate.min.css',
              'https://d2etktq4v0899q.cloudfront.net/static/assets/css/toastr.css',
              'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css',
              'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css',
              'https://use.fontawesome.com/releases/v5.0.4/css/all.css',
              'https://d2etktq4v0899q.cloudfront.net/static/assets/css/main.min.css',
              '/static/assets/css/font.css'
            ];
            for (var i=0; i<list.length;i++) {
              var myCSS = document.createElement( "link" );
              myCSS.rel = "stylesheet";
              myCSS.href = list[i];
              document.head.insertBefore( myCSS, document.head.childNodes[ document.head.childNodes.length - 1 ].nextSibling );
            }
            `}}>
          </script>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
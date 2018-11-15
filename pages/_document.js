import Document, { Head, Main, NextScript } from 'next/document'
import ReactGA from 'react-ga'

ReactGA.initialize('GTM-PTR7TDZ');

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <script dangerouslySetInnerHTML={{__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': 
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], 
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); 
            })(window,document,'script','dataLayer','GTM-PTR7TDZ');`}} />
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
          <link rel="stylesheet" href="/static/assets/css/font.css"/>
          <link rel="stylesheet" href="https://d2etktq4v0899q.cloudfront.net/static/assets/css/style.css"/>
        </Head>
        <body>
          <noscript>
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PTR7TDZ" height="0" width="0" style={{display: 'none',visibility:'hidden'}}>
            </iframe>
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
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="theme-color" content="#000000" />
          <title>Lifein.Love</title>

          <link rel="shortcut icon" href="/static/assets/favicon.png" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous" />
          <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.7/css/all.css" />
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
          <link rel="stylesheet" href="/static/assets/css/react-confirm-alert.min.css"/>
          <link rel="stylesheet" href="/static/assets/css/accordion.min.css"/>
          <link rel="stylesheet" href="/static/assets/css/animate.min.css"/>
          <link rel="stylesheet" href="/static/assets/css/toastr.css"/>
          <link rel="stylesheet" href="/static/assets/css/cropper.css"/>
          <link rel="stylesheet" href="/static/assets/css/main.min.css"/>
        </Head>
        <body>
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
          <script src="https://apis.google.com/js/platform.js" async defer></script>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
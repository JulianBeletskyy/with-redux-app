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
          <link rel="stylesheet" href="/static/assets/css/accordion.css" />
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
          <link rel="stylesheet" href="/static/assets/css/react-confirm-alert.css" />
          <link rel="stylesheet" href="/static/assets/css/main.min.css" />
          <link rel="stylesheet" href="/static/assets/css/header.css" />
          <link rel="stylesheet" href="/static/assets/css/animate.min.css" />
          <link rel="stylesheet" href="/static/assets/css/toastr.css" />
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.7/css/all.css" />
          <link rel="stylesheet" href="/static/assets/css/cropper.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
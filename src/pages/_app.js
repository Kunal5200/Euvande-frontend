import Layout from "@/components/layout";
import "@/styles/globals.css";
import "aos/dist/aos.css";
import "swiper/css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-circular-progressbar/dist/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-multi-carousel/lib/styles.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-multi-carousel/lib/styles.css";
import "animate.css";
import "video-react/dist/video-react.css"; // import css

import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "@/redux/store";
import Modal from "@/components/modal";
import Head from "next/head";
export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>EuVande</title>
        <meta name="description" content="Best PWA app in the world!" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="mask-icon" href="/icons/mask-icon.svg" color="#FFFFFF" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/touch-icon-ipad.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/touch-icon-iphone-retina.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/icons/touch-icon-ipad-retina.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://yourdomain.com" />
        <meta name="twitter:title" content="My awesome PWA app" />
        <meta name="twitter:description" content="Best PWA app in the world!" />
        <meta name="twitter:image" content="/icons/twitter.png" />
        <meta name="twitter:creator" content="@DavidWShadow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="My awesome PWA app" />
        <meta property="og:description" content="Best PWA app in the world!" />
        <meta property="og:site_name" content="My awesome PWA app" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta property="og:image" content="/icons/og.png" />
       
      </Head>
      <Layout>
        <Modal />
        <ToastContainer autoClose={1000} />
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

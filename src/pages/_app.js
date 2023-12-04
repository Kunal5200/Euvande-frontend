import Layout from "@/components/layout";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-multi-carousel/lib/styles.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ToastContainer } from "react-toastify";
export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <ToastContainer autoClose={1000} />
      <Component {...pageProps} />
    </Layout>
  );
}

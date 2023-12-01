import data from "@/assests/data";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import {
  FaAngleLeft,
  FaAngleRight,
  FaCaretLeft,
  FaCaretRight,
} from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";

export default function Home() {
  const arrowStyles = {
    position: "absolute",
    zIndex: 2,
    top: "calc(50% - 15px)",
    width: 40,
    height: 40,
    cursor: "pointer",
    border: "1px solid #ffffff",
    borderRadius: "50% ",
    backgroundColor: "rgb(34 34 34 / 34%)",
    color: "#ffffff",
  };
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Carousel
        infiniteLoop={true}
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              style={{ ...arrowStyles, left: 15 }}
            >
              <FaAngleLeft />
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              style={{ ...arrowStyles, right: 15 }}
            >
              <FaAngleRight />
            </button>
          )
        }
      >
        {data.sliderData.map((val, i) => (
          <div
            style={{
              backgroundImage: `url(${val.image.src})`,
              height: "100vh",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            key={i}
          ></div>
        ))}
      </Carousel>
    </>
  );
}

import sliderImage1 from "@/banner_image/sliderImage1.jpeg";
import image1 from "@/icons/quote.jpg";
import image2 from "@/icons/doorstep.webp";
import image3 from "@/icons/payment.jpg";
import profile1 from "@/reviewer/profile1.jpg";
import profile2 from "@/reviewer/profile2.jpg";
import profile3 from "@/reviewer/profile3.jpg";
import profile4 from "@/reviewer/profile4.jpg";
import profile5 from "@/reviewer/profile5.jpg";
let data = {
  sliderData: [
    {
      image: sliderImage1,
    },
    {
      image: sliderImage1,
    },
    {
      image: sliderImage1,
    },
  ],
  selling: [
    {
      img: image1.src,
      heading: "Quick online estimate",
      para: "For an immediate quotation, provide a few data about your vehicle.",
      btn: "Obtain a Quote",
    },
    {
      img: image2.src,
      heading: "Free Doorstep Assessment",
      para: "Arrange the assessment whenever it suits you, from the comfort of your home or place of business.",
      btn: "Plan Assessment",
    },
    {
      img: image3.src,
      heading: "Payment on the same day",
      para: "Pay in full and complete the papers immediately.",
      btn: "Sell Your Car",
    },
  ],
  reviews: [
    {
      name: "Joe",
      review:
        " Very good experience dealing with them and it's hassle free experience as well. Reached my home on time for my car inspection and was given good price compared to other dealers. Best part is there is hidden charges and also they will take care of documentation for RC transfer. Well done, keep it up! Edit: Would have given 5 🌟 had if the payment was processed on the same day!. I understand your server was down for the whole day!. Also I waited for more than half an hour when your agent come to pick my car just to get the payment processed!!. Overall it was good experience and 4 🌟 is what I felt is fair! Thank you.",
      img: profile1,
    },
    {
      name: "John",
      img: profile2,
      review:
        "I would like to share an exceptional and seamless experience I had with Car dekho white field branch while I sold my 2018 model Car. I not only received the best value of my car but also an excellent customer experience by Mr Vishal, who explained me step by step process and closed the deal successfully. Also a shout out to the car inspector Mr Raghu who made a home visit to inspect the car and explained the inspection details. I highly recommend to visit this branch and experience the difference. Thanks car dekho team",
    },
    {
      name: "Robert",
      img: profile3,
      review:
        "Best place to sell your car. Visited and sold the car in a time span of 2-3 hours. We got very good price for our car, Transaction was also very smooth and seamless. staff are very friendly with us and very helpful and good knowledgeable persons. Thanks to Mr.Vishal and Mr.Nagaraj. Great service guys. I strongly recommend to go visit CarDekho Gaadi store- Whitefield, if anyone want to sell their car.",
    },
    {
      name: "Jessica",
      img: profile4,
      review:
        "I have sold my car at CarDekho. I didn't even have to visit the place. Everything was done at the comfort of home. The TRA at Whitefield center, Mr Nagaraj visited my apartment, done the inspection and got the instant payment without any hassle. I had earlier visited cars24 and was not happy with the price. But, I got the expected price from CarDekho gaadi store. I would really recommend it to anyone who is planning to sell the car. Not just the car price, entire process was really seamless and very responsive. Kudos to the team, and special thanks to Mr Nagaraj.",
    },
    {
      name: "Sia",
      img: profile5,
      review:
        "Sold my car to CarDekho at there Whitefield branch. It all happened so quickly. Nagaraj came for an inspection to my home at 3 PM and I sold the car to him by 7 PM.. The service is very good, quick and got the price almost what I asked for. I would like to thank Nagaraj for his professionalism and CarDekho for providing me the right price and hassle free selling of my car.",
    },
  ],
};

export default data;

import sliderImage1 from "@/banner_image/sliderImage1.jpeg";
import image1 from "@/icons/quote.jpg";
import image2 from "@/icons/doorstep.webp";
import image3 from "@/icons/payment.jpg";
import profile1 from "@/reviewer/profile1.jpg";
import profile2 from "@/reviewer/profile2.jpg";
import profile3 from "@/reviewer/profile3.jpg";
import profile4 from "@/reviewer/profile4.jpg";
import profile5 from "@/reviewer/profile5.jpg";
import maruti from "@/brandImage/maruti.webp";
import hyundai from "@/brandImage/hyundai.webp";
import ford from "@/brandImage/Ford.webp";
import honda from "@/brandImage/Honda.webp";
import mahindra from "@/brandImage/mahindra.webp";
import tata from "@/brandImage/tata.webp";
import nissan from "@/brandImage/Nissan.webp";
import toyota from "@/brandImage/toyota.webp";
import ashokleyland from "@/brandImage/ashokleyland.webp";
import astonMartin from "@/brandImage/Aston-Martin.webp";
import audi from "@/brandImage/Audi.webp";
import bentley from "@/brandImage/bentley.webp";
import bwm from "@/brandImage/BMW.webp";
import bugatti from "@/brandImage/bugatti.webp";
import cadillac from "@/brandImage/cadillac.webp";
import caterham from "@/brandImage/caterham.webp";
import chevrolet from "@/brandImage/chevrolet.webp";
import chrysler from "@/brandImage/Chrysler.webp";
import citroen from "@/brandImage/Citroen.webp";
import conquest from "@/brandImage/conquest.webp";
import daewoo from "@/brandImage/Daewoo.webp";
import datsun from "@/brandImage/Datsun.webp";
import dc from "@/brandImage/dc.webp";
import dodge from "@/brandImage/dodge.webp";
import ferrari from "@/brandImage/ferrari.webp";
import fiat from "@/brandImage/fiat.webp";
import force from "@/brandImage/force.webp";
import hindustanmotors from "@/brandImage/hindustanmotors.webp";
import hummer from "@/brandImage/Hummer.webp";
import lamborghini from "@/brandImage/lamborghini.webp";
import rollyroyce from "@/brandImage/rollsroyce.webp";
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
        "I have sold my car at Euvande. I didn't even have to visit the place. Everything was done at the comfort of home. The TRA at Whitefield center, Mr Nagaraj visited my apartment, done the inspection and got the instant payment without any hassle. I had earlier visited cars24 and was not happy with the price. But, I got the expected price from CarDekho gaadi store. I would really recommend it to anyone who is planning to sell the car. Not just the car price, entire process was really seamless and very responsive. Kudos to the team, and special thanks to Mr Nagaraj.",
    },
    {
      name: "Sia",
      img: profile5,
      review:
        "Sold my car to Euvande at there Whitefield branch. It all happened so quickly. Nagaraj came for an inspection to my home at 3 PM and I sold the car to him by 7 PM.. The service is very good, quick and got the price almost what I asked for. I would like to thank Nagaraj for his professionalism and CarDekho for providing me the right price and hassle free selling of my car.",
    },
  ],
  brandsSelector: [
    {
      name: "Rolls Royce",
      logo: rollyroyce.src,
    },
    {
      name: "hyundai",
      logo: hyundai.src,
    },
    {
      name: "Honda",
      logo: honda.src,
    },
    {
      name: "Tata",
      logo: tata.src,
    },
    {
      name: "toyota",
      logo: toyota.src,
    },
    {
      name: "mahindra",
      logo: mahindra.src,
    },
    {
      name: "ford",
      logo: ford.src,
    },
    {
      name: "Nissan",
      logo: nissan.src,
    },
    {
      name: "Ashko Leyland",
      logo: ashokleyland.src,
    },
    {
      name: "Aston Martin",
      logo: astonMartin.src,
    },
    {
      name: "Audi",
      logo: audi.src,
    },
    {
      name: "Bentley",
      logo: bentley.src,
    },
    {
      name: "BMW",
      logo: bwm.src,
    },
    {
      name: "Bugatti",
      logo: bugatti.src,
    },
    {
      name: "Cadillac",
      logo: cadillac.src,
    },
    {
      name: "Caterham",
      logo: caterham.src,
    },
    {
      name: "Chevrolet",
      logo: chevrolet.src,
    },
    {
      name: "Chrysler",
      logo: chrysler.src,
    },
    {
      name: "Citreon",
      logo: citroen.src,
    },
    {
      name: "Conquest",
      logo: conquest.src,
    },
    {
      name: "Daewoo",
      logo: daewoo.src,
    },
    {
      name: "Datsun",
      logo: datsun.src,
    },
    {
      name: "DC",
      logo: dc.src,
    },
    {
      name: "Dodge",
      logo: dodge.src,
    },
    {
      name: "Ferrari",
      logo: ferrari.src,
    },
    {
      name: "Fiat",
      logo: fiat.src,
    },
    {
      name: "Force",
      logo: force.src,
    },
    {
      name: "Hindustan Motors",
      logo: hindustanmotors.src,
    },
    {
      name: "Hummer",
      logo: hummer.src,
    },
    {
      name: "Lamborghini",
      logo: lamborghini.src,
    },
  ],
  Year: [
    {
      year: "2023",
    },
    {
      year: "2022",
    },
    {
      year: "2021",
    },
    {
      year: "2020",
    },
    {
      year: "2019",
    },
    {
      year: "2018",
    },
    {
      year: "2017",
    },
    {
      year: "2016",
    },
    {
      year: "2015",
    },
    {
      year: "2014",
    },
    {
      year: "2013",
    },
    {
      year: "2012",
    },
    {
      year: "2011",
    },
    {
      year: "2010",
    },
    {
      year: "2009",
    },
    {
      year: "2008",
    },
    {
      year: "2007",
    },
    {
      year: "2006",
    },
    {
      year: "2005",
    },
    {
      year: "2004",
    },
    {
      year: "2003",
    },
    {
      year: "2002",
    },
    {
      year: "2001",
    },
    {
      year: "2000",
    },
    {
      year: "1999",
    },
    {
      year: "1998",
    },
    {
      year: "1997",
    },
    {
      year: "1996",
    },
    {
      year: "1995",
    },
    {
      year: "1994",
    },
    {
      year: "1993",
    },
    {
      year: "1992",
    },
    {
      year: "1991",
    },
    {
      year: "1990",
    },
    {
      year: "1989",
    },
    {
      year: "1988",
    },
    {
      year: "1987",
    },
    {
      year: "1986",
    },
    {
      year: "1985",
    },
    {
      year: "1984",
    },
  ],
  carModel: [
    {
      car_image:
        "https://img.gaadicdn.com/images/car-images/large/Rolls-Royce/Rolls-Royce-Cullinan/6405/front-left-side-47.jpg",
      centralModelId: 3001,
      id: "648",
      modelId: "648",
      name: "Cullinan",
    },
    {
      car_image:
        "https://img.gaadicdn.com/images/car-images/large/Rolls-Royce/Rolls-Royce-Dawn/047.jpg",
      centralModelId: 478,
      id: "651",
      modelId: "651",
      name: "Dawn",
    },
    {
      car_image:
        "https://img.gaadicdn.com/images/car-images/large/Rolls-Royce/Rolls-Royce-Ghost/6397/1594192258201/front-left-side-47.jpg",
      centralModelId: 3214,
      id: "652",
      modelId: "652",
      name: "Ghost",
    },
    {
      car_image:
        "https://img.gaadicdn.com/images/car-images/large/Rolls-Royce/Rolls-Royce-Phantom/7784/1587205583793/seats-(aerial-view)-53.jpg",
      centralModelId: 481,
      id: "429",
      modelId: "429",
      name: "Phantom",
    },
    {
      car_image:
        "https://img.gaadicdn.com/images/car-images/large/Rolls-Royce/Rolls-Royce-Wraith/6404/Rolls-Royce-Wraith-Black-Badge/front-left-side-47.jpg",
      centralModelId: 483,
      id: "649",
      modelId: "649",
      name: "Wraith",
    },
  ],
  carVariant: [
    {
      variant: "V11",
    },
    {
      variant: "V12",
    },
    {
      variant: "V13",
    },
    {
      variant: "V14",
    },
    {
      variant: "V15",
    },
    {
      variant: "V16",
    },
    {
      variant: "V17",
    },
    {
      variant: "V18",
    },
  ],
  carOwnerShip: [
    {
      ownership: "1st Owner",
    },
    {
      ownership: "2nd Owner",
    },
    {
      ownership: "3rd Owner",
    },
    {
      ownership: "4th Owner",
    },
    {
      ownership: "5th Owner",
    },
  ],
  odometer: [
    {
      driven: "0-10000 Km",
    },
    {
      driven: "10000-20000 Km",
    },
    {
      driven: "20000-30000 Km",
    },
    {
      driven: "30000-40000 Km",
    },
    {
      driven: "40000-50000 Km",
    },
    {
      driven: "50000-60000 Km",
    },
    {
      driven: "60000-70000 Km",
    },
    {
      driven: "70000-80000 Km",
    },
    {
      driven: "80000-90000 Km",
    },
    {
      driven: "90000-100000 Km",
    },
    {
      driven: "More than 100000 Km",
    },
  ],
  carModifySteps: [
    {
      name: "Specifications",
    },
    {
      name: "Equipment",
    },
    {
      name: "Car Condition",
    },
    {
      name: "Contact Information",
    },
    {
      name: "Photos",
    },
    {
      name: "Car Valutation",
    },
  ],
  list1: [
    {
      label: "Buy",
    },
    {
      label: "Sell",
    },
    {
      label: "How it Works?",
    },
  ],
  list2: [
    {
      label: "Delievery",
    },
    {
      label: "Warranty",
    },
  ],
  list3: [
    {
      label: "Online Auction",
    },
  ],
  list4: [
    {
      label: "About us",
    },
    {
      label: "Contact",
    },
  ],
  transmissionType: [
    {
      name: "Automatic",
    },
    {
      name: "Manual",
    },
  ],
  vehicleType: [
    {
      label: "Cabriolet",
    },
    {
      label: "Compact",
    },
    {
      label: "Coupe",
    },
    {
      label: "Estate car",
    },
    {
      label: "Hatchback",
    },
    {
      label: "Liftback",
    },

    {
      label: "MPV",
    },
    {
      label: "Other",
    },
    {
      label: "Pick-up",
    },
    {
      label: "Sedan",
    },
    {
      label: "SUV / Off-road",
    },
    {
      label: "Van",
    },
  ],
  doors: [
    {
      label: "2/3",
    },
    {
      label: "4/5",
    },
  ],
  interior: [
    {
      label: "Alcantara",
    },
    {
      label: "Cloth",
    },
    {
      label: "Full leather",
    },
    {
      label: "Other",
    },
    {
      label: "Part leather",
    },
    {
      label: "Velour",
    },
  ],
};

export default data;

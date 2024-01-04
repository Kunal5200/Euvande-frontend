import sliderImage1 from "@/banner_image/sliderImage1.webp";
import sliderImage2 from "@/banner_image/sliderImage2.webp";
import sliderImage3 from "@/banner_image/sliderImage3.webp";
import sliderImage4 from "@/banner_image/sliderImage4.webp";
import car1 from "@/carProduct/car1.jpg";
import rearLeft from "@/carProduct/exterior/backleft.webp";
import rearRight from "@/carProduct/exterior/backright.webp";
import rearView from "@/carProduct/exterior/backview.webp";
import engine from "@/carProduct/exterior/engine.webp";
import frontLeft from "@/carProduct/exterior/frontleft.webp";
import headlamp from "@/carProduct/exterior/frontlight.webp";
import frontRight from "@/carProduct/exterior/frontright.webp";
import frontView from "@/carProduct/exterior/frontview.webp";
import rearPanel from "@/carProduct/interior/backcenterpanel.webp";
import rearseats from "@/carProduct/interior/backseats.webp";
import headlining from "@/carProduct/interior/ceiling.webp";
import codriversSeat from "@/carProduct/interior/codriverseat.webp";
import dashboard from "@/carProduct/interior/dashboard.webp";
import driversdoor from "@/carProduct/interior/driversdoor.webp";
import driverSeat from "@/carProduct/interior/driverseat.webp";
import instrumentPanel from "@/carProduct/interior/instrumentpanel.webp";
import frontleftTyre from "@/carProduct/wheel/pneu.webp";
import tyres from "@/carProduct/wheel/wheel.webp";
import citroenSuv from "@/dummyCars/citroen.jpeg";
import dacia from "@/dummyCars/dacia.jpeg";
import jimmy from "@/dummyCars/jimmy.jpeg";
import seat from "@/dummyCars/seat.jpeg";
import image2 from "@/icons/doorstep.webp";
import choose from "@/icons/how-it-works.webp";
import image3 from "@/icons/payment.jpg";
import image1 from "@/icons/quote.jpg";
import profile1 from "@/reviewer/profile1.jpg";
import profile2 from "@/reviewer/profile2.jpg";
import profile3 from "@/reviewer/profile3.jpg";
import profile4 from "@/reviewer/profile4.jpg";
import profile5 from "@/reviewer/profile5.jpg";
import testimonial1 from "@/testimonials/testimonial1.jpeg";
import testimonial2 from "@/testimonials/testimonial2.jpeg";
import testimonial3 from "@/testimonials/testimonial3.jpg";
import testimonial4 from "@/testimonials/testimonial4.jpeg";
import testimonial5 from "@/testimonials/testimonial5.jpg";
import testimonial6 from "@/testimonials/testimonial6.jpg";
let data = {
  photoUpload: [
    {
      image: frontLeft.src,
      label: "Front Left",
      id: "frontLeft",
    },
    {
      image: frontView.src,
      label: "Front View",
      id: "frontView",
    },
    {
      image: frontRight.src,
      label: "Front Right",
      id: "frontRight",
    },
    {
      image: rearRight.src,
      label: "Rear Right",
      id: "rearRight",
    },
    {
      image: rearView.src,
      label: "Rear View",
      id: "rearView",
    },
    {
      image: rearLeft.src,
      label: "Rear Left",
      id: "rearLeft",
    },
    {
      image: headlamp.src,
      label: "Headlamp",
      id: "headlamp",
    },
    {
      image: engine.src,
      label: "Engine",
      id: "engine",
    },
  ],
  interiorPhotoUpload: [
    {
      image: driversdoor.src,
      label: "Driver Door",
      id: "driversDoor",
    },
    {
      image: driverSeat.src,
      label: "Driver Seat",
      id: "driverSeat",
    },
    {
      image: codriversSeat.src,
      label: "Passenger Seat",
      id: "passengerSeat",
    },
    {
      image: instrumentPanel.src,
      label: "Instrument Panel",
      id: "instrumentpanel",
    },
    {
      image: dashboard.src,
      label: "Dashboard",
      id: "dashboard",
    },
    {
      image: rearPanel.src,
      label: "Rear Panel of Center Console",
      id: "rearPanel",
    },
    {
      image: rearseats.src,
      label: "Rear Seats",
      id: "rearSeats",
    },
    {
      image: headlining.src,
      label: "Headlining",
      id: "headlining",
    },
  ],
  tyres: [
    {
      label: "Front Left Wheel",
      image: tyres.src,
      id: "frontLeftWheel",
    },
    {
      label: "Back Left Wheel",
      image: tyres.src,
      id: "backLeftWheel",
    },
    {
      label: "Back Right Wheel",
      image: tyres.src,
      id: "backgRightWheel",
    },
    {
      label: "Front Right Wheel",
      image: tyres.src,
      id: "frontRightWheel",
    },
    {
      label: "Front Left Tyre",
      image: frontleftTyre.src,
      id: "frontLeftTyre",
    },
    {
      label: "Back Left Tyre",
      image: frontleftTyre.src,
      id: "backLeftTyre",
    },
    {
      label: "Back Right Tyre",
      image: frontleftTyre.src,
      id: "backRightTyre",
    },
    {
      label: "Front Left Tyre",
      image: frontleftTyre.src,
      id: "frontRightTyre",
    },
  ],
  sliderData: [
    {
      image: sliderImage1,
      bannerText: "Revolutionize Your Ride: Explore Our Car Marketplace Today!",
      bannerDescription:
        "Experience a groundbreaking approach to car buying and selling as you navigate our innovative car marketplace. Discover a new era of convenience and choice for your automotive journey.",
      button: "Buy Cars",
    },
    {
      image: sliderImage2,
      bannerText: "Drive Your Dreams: Find the Perfect Car with Us!",
      bannerDescription:
        "Turn your automotive dreams into reality with our platform. Browse through an extensive selection to find the perfect car that matches your desires. Your dream ride is just a click away!",
      button: "View Cars",
    },
    {
      image: sliderImage3,
      bannerText: "Your Dream Car, Your Way: Shop and Sell with Confidence!",
      bannerDescription:
        "Tailor your automotive experience to fit your dreams. Shop for your dream car and sell with confidence, knowing that our platform is designed to cater to your individual preferences.",
      button: "Sell Your Car Now",
    },
    {
      image: sliderImage4,
      bannerText: "Where Cars Meet Enthusiasts: Buy and Sell with Ease!",
      bannerDescription:
        "Join a community where cars and enthusiasts converge. Experience the joy of buying and selling with ease, knowing you're part of a passionate community that shares your love for automobiles.",
      button: "View More",
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
  // brandsSelector: [
  //   {
  //     name: "Rolls Royce",
  //     logo: rollyroyce.src,
  //     carNumber: 450,
  //   },
  //   {
  //     name: "hyundai",
  //     logo: hyundai.src,
  //     carNumber: 450,
  //   },
  //   {
  //     name: "Honda",
  //     logo: honda.src,
  //     carNumber: 450,
  //   },
  //   {
  //     name: "Tata",
  //     logo: tata.src,
  //     carNumber: 450,
  //   },
  //   {
  //     name: "toyota",
  //     logo: toyota.src,
  //     carNumber: 450,
  //   },
  //   {
  //     name: "mahindra",
  //     logo: mahindra.src,
  //     carNumber: 450,
  //   },
  //   {
  //     name: "ford",
  //     logo: ford.src,
  //     carNumber: 450,
  //   },
  //   {
  //     name: "Nissan",
  //     logo: nissan.src,
  //     carNumber: 450,
  //   },
  //   {
  //     name: "Ashko Leyland",
  //     logo: ashokleyland.src,
  //     carNumber: 450,
  //   },
  //   {
  //     name: "Aston Martin",
  //     logo: astonMartin.src,
  //     carNumber: 450,
  //   },
  //   {
  //     name: "Audi",
  //     logo: audi.src,
  //     carNumber: 450,
  //   },
  //   {
  //     name: "Bentley",
  //     logo: bentley.src,
  //     carNumber: 450,
  //   },
  //   {
  //     name: "BMW",
  //     logo: bwm.src,
  //     carNumber: 450,
  //   },
  //   {
  //     name: "Bugatti",
  //     logo: bugatti.src,
  //     carNumber: 450,
  //   },
  //   {
  //     name: "Cadillac",
  //     logo: cadillac.src,
  //     carNumber: 450,
  //   },
  //   {
  //     name: "Caterham",
  //     logo: caterham.src,
  //     carNumber: 450,
  //   },
  //   {
  //     name: "Chevrolet",
  //     logo: chevrolet.src,
  //     carNumber: 450,
  //   },
  //   {
  //     name: "Chrysler",
  //     logo: chrysler.src,
  //     carNumber: 450,
  //   },
  //   {
  //     name: "Citreon",
  //     logo: citroen.src,
  //     carNumber: 450,
  //   },
  //   {
  //     name: "Conquest",
  //     logo: conquest.src,
  //   },
  //   {
  //     name: "Daewoo",
  //     logo: daewoo.src,
  //   },
  //   {
  //     name: "Datsun",
  //     logo: datsun.src,
  //   },
  //   {
  //     name: "DC",
  //     logo: dc.src,
  //   },
  //   {
  //     name: "Dodge",
  //     logo: dodge.src,
  //   },
  //   {
  //     name: "Ferrari",
  //     logo: ferrari.src,
  //   },
  //   {
  //     name: "Fiat",
  //     logo: fiat.src,
  //   },
  //   {
  //     name: "Force",
  //     logo: force.src,
  //   },
  //   {
  //     name: "Hindustan Motors",
  //     logo: hindustanmotors.src,
  //   },
  //   {
  //     name: "Hummer",
  //     logo: hummer.src,
  //   },
  //   {
  //     name: "Lamborghini",
  //     logo: lamborghini.src,
  //   },
  // ],
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
      label: "Delivery",
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
  passwordRequirement: [
    {
      title: "The password must be at least 8 characters long.",
    },
    {
      title:
        "It must include at least one alphabet character (either uppercase or lowercase).",
    },
    {
      title: "It must include at least one numeric digit (0-9).",
    },
    {
      title:
        "It must include at least one special character from the set: !@#$%^&*",
    },
    {
      title: "Spaces are not allowed within the password.",
    },
  ],
  address: [
    {
      addressType: "Home",
      address: "Inge Beisheim Platz 53,Tangstedt,Schleswig-Holstein,Germany",
    },
    {
      addressType: "Office",
      address: "Kieler Strasse 58,Oberneukirchen, Freistaat Bayern,Germany",
    },
  ],

  mileage: [
    {
      number: 2500,
    },
    {
      number: 5000,
    },
    {
      number: 10000,
    },
    {
      number: 15000,
    },
    {
      number: 20000,
    },
    {
      number: 30000,
    },
    {
      number: 40000,
    },
    {
      number: 50000,
    },
    {
      number: 60000,
    },
    {
      number: 70000,
    },
    {
      number: 80000,
    },
    {
      number: 90000,
    },
    {
      number: 100000,
    },
  ],
  price: [
    {
      price: "1000 €",
    },
    {
      price: "2000 €",
    },
    {
      price: "3000 €",
    },
    {
      price: "4000 €",
    },
    {
      price: "5000 €",
    },
    {
      price: "6000 €",
    },
    {
      price: "7000 €",
    },
    {
      price: "8000 €",
    },
    {
      price: "9000 €",
    },
    {
      price: "10000 €",
    },
  ],
  carDataList: [
    {
      carName:
        "Volkswagen Beetle Cabriolet 2.0 TSI BlueMotion Technology 162 kW",
      driven: "50,671",
      amount: "30949",
      emi: "505",
      img: car1,
      variant: "Petrol",
      transmission: "Manual",
    },
    {
      carName:
        "Volkswagen Beetle Cabriolet 2.0 TSI BlueMotion Technology 162 kW",
      driven: "50,671",
      amount: "30949",
      emi: "505",
      img: car1,
      variant: "Petrol",
      transmission: "Manual",
    },
    {
      carName:
        "Volkswagen Beetle Cabriolet 2.0 TSI BlueMotion Technology 162 kW",
      driven: "50,671",
      amount: "30949",
      emi: "505",
      img: car1,
      variant: "Petrol",
      transmission: "Manual",
    },
    {
      carName:
        "Volkswagen Beetle Cabriolet 2.0 TSI BlueMotion Technology 162 kW",
      driven: "50,671",
      amount: "30949",
      emi: "505",
      img: car1,
      variant: "Petrol",
      transmission: "Manual",
    },
    {
      carName:
        "Volkswagen Beetle Cabriolet 2.0 TSI BlueMotion Technology 162 kW",
      driven: "50,671",
      amount: "30949",
      emi: "505",
      img: car1,
      variant: "Petrol",
      transmission: "Manual",
    },
    {
      carName:
        "Volkswagen Beetle Cabriolet 2.0 TSI BlueMotion Technology 162 kW",
      driven: "50,671",
      amount: "30949",
      emi: "505",
      img: car1,
      variant: "Petrol",
      transmission: "Manual",
    },
    {
      carName:
        "Volkswagen Beetle Cabriolet 2.0 TSI BlueMotion Technology 162 kW",
      driven: "50,671",
      amount: "30949",
      emi: "505",
      img: car1,
      variant: "Petrol",
      transmission: "Manual",
    },
    {
      carName:
        "Volkswagen Beetle Cabriolet 2.0 TSI BlueMotion Technology 162 kW",
      driven: "50,671",
      amount: "30949",
      emi: "505",
      img: car1,
      variant: "Petrol",
      transmission: "Manual",
    },
  ],
  howWorks: [
    {
      img: choose.src,
      heading: "European Dreams, Driven Reality.",
      description:
        "Turn your European dreams into reality with the perfect car. Explore iconic destinations, scenic routes, and cityscapes on your terms. Your dream ride awaits.",
    },
    {
      img: choose.src,
      heading: "Expert Eyes, Thorough Inspection.",
      description:
        "Our expert eyes ensure a meticulous inspection, guaranteeing your peace of mind.",
    },
    {
      img: choose.src,
      heading: "Delivered to Your Doorstep.",
      description:
        "Experience seamless convenience with our direct-to-your-door delivery service – your dream car, delivered effortlessly to your home.",
    },
  ],
  suv: [
    {
      name: "Dacia Spring 33 kW",
      img: dacia.src,
      driven: 28000,
      variant: "Diesel",
      transmission: "Automatic",
      price: "33469",
    },
    {
      name: "Citroen C5 Aircross 130 S&S LIVE 96 kW",
      driven: 28000,
      img: citroenSuv.src,
      transmission: "Automatic",
      variant: "CNG",
      price: "44500",
    },
    {
      name: "Seat Arona 1.0 TGI 66 kW",
      driven: 28000,
      img: seat.src,
      transmission: "Manual",
      variant: "Petrol",
      price: "46200",
    },
    {
      name: "Suzuki Jimny 75 kW",
      driven: 28000,
      img: jimmy.src,
      transmission: "Manual",
      variant: "Petrol",
      price: "52000",
    },
  ],
  testimonials: [
    {
      name: " Lucian v.",
      testimonial:
        "Embarking on the journey to find the perfect car became a delightful experience with EUVande. From the moment I navigated theiruser-friendly website, I was captivated by the extensive and diverse inventory that catered to every preference and budget.",
      img: testimonial1.src,
    },
    {
      name: "Sophie M.",
      testimonial:
        "  As a discerning buyer, EUVande exceeded my expectations. From the extensive choices to the seamless process, I found my ideal car effortlessly. Kudos to EUVande for making car buying in Europe an absolute pleasure!",
      img: testimonial2.src,
    },
    {
      name: " Luca P",
      testimonial:
        "EUVande's website made my car search a breeze. The transparent transactions and helpful customer service made the whole process smooth. Proud owner of a fantastic car, thanks to EUVande!",
      img: testimonial3.src,
    },
    {
      name: "Henrik K.",
      testimonial:
        "EUVande stands out in the crowded online car market. Their user-friendly interface, honest pricing, and dedicated support made my car purchase easy and enjoyable. Highly recommended!",
      img: testimonial4.src,
    },
    {
      name: "Emma S.",
      testimonial:
        "Thumbs up to EUVande for redefining car buying! The comprehensive listings and responsive team made me confident in my choice. I'm now cruising in my dream car, thanks to EUVande's top-notch service.",
      img: testimonial5.src,
    },
    {
      name: "Andrei B.",
      testimonial:
        " EUVande made my car buying journey a delight. The extensive inventory, clear details, and smooth transactions set them apart. I'm a satisfied customer who found the perfect car hassle-free!",
      img: testimonial6.src,
    },
  ],
  faqs: [
    {
      question: "Q. What makes EUVande unique in the online car buying market?",
      answer:
        "EUVande stands out for its extensive and diverse inventory, user-friendly interface, and commitment to transparency. We provide a seamless and enjoyable car-buying experience, setting a new standard in the industry.",
    },
    {
      question:
        "Q. How can I be sure of the transparency in pricing and fees on EUVande?",
      answer:
        "At EUVande, we prioritize transparency. The listed prices on our website are clear and inclusive of all fees, ensuring that you know the total cost upfront. No hidden charges, no surprises – just straightforward pricing.",
    },
    {
      question: "Q. What types of vehicles are available on EUVande?",
      answer:
        "Our inventory caters to a wide range of preferences and budgets. From compact cars to SUVs and luxury vehicles, EUVande offers a diverse selection. Our goal is to provide options that suit every customer's unique needs and preferences.",
    },
    {
      question: "Q. How does the online transaction process work on EUVande?",
      answer:
        "Our online transaction process is designed for simplicity and efficiency. Once you've found your ideal car, follow the user-friendly steps to complete the purchase. Our secure platform ensures a safe and smooth transaction, making your car-buying journey hassle-free.",
    },
    {
      question:
        "Q. What support is available if I have questions or need assistance during the car-buying process?",
      answer:
        "We value excellent customer service. Our dedicated support team is ready to assist you at every step. Feel free to reach out through our contact channels for prompt and helpful responses to any queries or concerns you may have. Your satisfaction is our priority.",
    },
  ],
  features: [
    {
      label: "Digital cockpit",
    },
    {
      label: "Head-up display",
    },
    {
      label: "Apple CarPlay",
    },
    {
      label: "Navigation system",
    },
    {
      label: "Traffic sign recognition",
    },

    {
      label: "Bluetooth",
    },
    {
      label: "Rain sensor",
    },
    {
      label: "Light sensor",
    },
    {
      label: "Lane assist",
    },
    {
      label: "Blind spot assist",
    },
  ],
};

export default data;

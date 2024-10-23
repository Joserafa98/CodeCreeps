// src/front/js/pages/retos.js
import React, { useEffect } from 'react';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import '../../styles/retos.css';

gsap.registerPlugin(ScrollTrigger);

const Retos = () => { // Cambia 'retos' a 'Retos'
  useEffect(() => {
    // Configuración de GSAP
    gsap.from("#leftside", {
      scrollTrigger: {
        scrub: true,
      },
      x: -100,
    });

    gsap.from("#rightside", {
      scrollTrigger: {
        scrub: true,
      },
      x: 100,
    });

    gsap.from("#leftpumpkin", {
      scrollTrigger: {
        scrub: true,
      },
      x: -150,
    });

    gsap.from("#rightpumpkin", {
      scrollTrigger: {
        scrub: true,
      },
      x: 150,
    });

    // Inicializa Swiper
    const swiper = new Swiper('.swiper', {
      speed: 700,
      parallax: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });

    // Cleanup: destruir el Swiper al desmontar el componente
    return () => {
      if (swiper) {
        swiper.destroy(true, true);
      }
    };
  }, []);

  return (
    <div>
      <section className="parallax">
        <h2 id="title">Retos de programación</h2>
        <img
          src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/9648a7a2-03fe-4b48-b7ab-195ec34ac6a6"
          id="leftside"
          alt="halloween"
        />
        <img
          src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/5c125b01-3bda-46ed-87bf-f64a9cc39d9b"
          id="rightside"
          alt="halloween"
        />
        <img
          src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/8102d1ed-0b60-40b6-a38a-75600c1c9c75"
          id="moon"
          alt="halloween"
        />
        <img
          src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/5c7a5d00-501e-4f2b-b31a-0d0e2dac47e5"
          id="bottom"
          alt="halloween"
        />
        <img
          src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/b8c09600-d3c2-4eab-a3e1-4f9a75d14331"
          id="leftpumpkin"
          alt="halloween"
        />
        <img
          src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/dc895daa-7d0c-4b65-946c-36faecc1d78e"
          id="rightpumpkin"
          alt="halloween"
        />
      </section>

      <section className="blog">
        <h3>Activities</h3>

        {/* Swiper */}
        <div style={{ '--swiper-pagination-color': '#fff' }} className="swiper">
          <div className="parallax-bg" data-swiper-parallax="-23%"></div>
          <div className="swiper-wrapper">
            {activities.map((activity, index) => (
              <div className="swiper-slide" key={index}>
                <div className="content">
                  <div className="title" data-content={activity.title} data-swiper-parallax="-500">
                    {activity.title}
                  </div>
                  <div className="text" data-swiper-parallax="-300" data-swiper-parallax-opacity="0">
                    <p>{activity.description}</p>
                  </div>
                </div>
                <div className="image" data-swiper-parallax="-200">
                  <img src={activity.image} alt={activity.title} />
                </div>
              </div>
            ))}
          </div>
          <div className="swiper-pagination"></div>
        </div>

        <p>
          Join us for a scary night of Halloween! Ravenwood Manor, a historic and scary mansion, will open its doors for an unforgettable night of thrills and chills.
        </p>
        <button className="btn">
          <span>buy ticket</span>
        </button>
      </section>
    </div>
  );
};

// Datos de las actividades
const activities = [
  {
    title: "Ghastly Ghost Tours",
    description: "Explore the dark history of Ravenwood Manor with guided tours through its haunted halls. Who knows what you might encounter in the shadowy corners?",
    image: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/943f5f64-3718-4d72-b4d0-d9f5a2b8af8e"
  },
  {
    title: "Wicked Costume Contest",
    description: "Dress to impress in your most scary, creative, or weird Halloween costume. Prizes will be awarded to the best-dressed attendees.",
    image: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/78ccffdf-c873-486b-ada5-55e4cc0d4fb9"
  },
  {
    title: "Spooky Dance Floor",
    description: "Dance the night away to hauntingly good tunes from our live DJ, under the dim glow of scary candlelight.",
    image: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/3b936c77-625f-4587-bf1c-368a2074eb06"
  },
  {
    title: "Sinister Snacks",
    description: "Satisfy your taste buds with a variety of spooky-themed snacks and refreshments at our chillingly delightful food stalls.",
    image: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/e0adf8a6-c25e-4f15-bab9-5f4a41a5063f"
  },
  {
    title: "Scary Movie Screening",
    description: "Sit back and relax in our indoor cinema as we showcase classic horror films for your enjoyment.",
    image: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/158d56ce-8720-495f-9b44-68551e374eed"
  },
  {
    title: "Pumpkin Carving",
    description: "Get your hands dirty and create your own Jack-O'-Lantern masterpiece. We provide the pumpkins and carving tools.",
    image: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/feea059e-0dca-45cc-9c5c-7c78fa4d8a29"
  }
];

export default Retos;

import React from 'react';
import Slider from 'react-slick';
import '../styles/Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      role: "CEO of Company",
      text: "This product has been a game changer for our business. The team behind it is incredibly responsive and dedicated!",
      image: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Marketing Manager",
      text: "A truly amazing service! The interface is user-friendly, and the customer support is top-notch.",
      image: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      id: 3,
      name: "Alice Brown",
      role: "Product Designer",
      text: "Highly recommend this service! It's helped me streamline my workflow and improve my productivity.",
      image: "https://randomuser.me/api/portraits/women/3.jpg"
    },
    {
      id: 4,
      name: "Bob Johnson",
      role: "Entrepreneur",
      text: "A must-have tool for anyone in business. It's easy to use and saves a lot of time.",
      image: "https://randomuser.me/api/portraits/men/2.jpg"
    }
  ];

  const settings = {
    dots: true,  // Show navigation dots below the carousel
    infinite: true,  // Infinite loop (wrap around when reaching the last item)
    speed: 500,  // Transition speed for slide movement
    slidesToShow: 3,  // Number of slides to show at once (visible)
    slidesToScroll: 1,  // Number of slides to scroll per action
    centerMode: false,  // No center mode to keep regular horizontal scroll
    focusOnSelect: true,  // Allow clicking on individual slides to navigate
    responsive: [
      {
        breakpoint: 1024,  // For screens larger than 1024px (desktop view)
        settings: {
          slidesToShow: 3,  // Show 3 slides on desktop
          slidesToScroll: 1,  // Scroll one slide at a time
        }
      },
      {
        breakpoint: 768,  // For screens smaller than 1024px (tablet view)
        settings: {
          slidesToShow: 2,  // Show 2 slides on tablets
          slidesToScroll: 1,  // Scroll one slide at a time
        }
      },
      {
        breakpoint: 480,  // For screens smaller than 768px (mobile view)
        settings: {
          slidesToShow: 1,  // Show 1 slide on mobile
          slidesToScroll: 1,  // Scroll one slide at a time
        }
      }
    ]
  };

  return (
    <section className="testimonials">
      <h2>What Our Clients Say</h2>
      {/* <Slider {...settings}> */}
      <div className="testimonial-container">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
            <p className="testimonial-text">"{testimonial.text}"</p>
            <h3 className="testimonial-name">{testimonial.name}</h3>
            <p className="testimonial-role">{testimonial.role}</p>
          </div>
        ))}
      </div>
      {/* </Slider> */}
    </section>
  );
};

export default Testimonials;

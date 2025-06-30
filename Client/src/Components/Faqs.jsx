import React, { useState } from 'react';
import { FaMinus } from 'react-icons/fa';
import { AiOutlinePlus } from "react-icons/ai";
import './Faqs.css'
const faqs = [
  {
    question: 'What is Netflix?',
    answer: 'Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more – on thousands of internet-connected devices. You can watch as much as you want, whenever you want, without a single ad – all for one low monthly price. There is always something new to discover, and new TV shows and movies are added every week.'
  },
  {
    question: 'How much does Netflix cost?',
    answer: 'Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹149 to ₹649 a month. No extra costs, no contracts.'
  },
  {
    question: 'Where can I watch?',
    answer: 'Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app. You can also download your favourite shows with the iOS or Android app to watch offline.'
  },
  {
    question: 'How do I cancel?',
    answer: 'Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.'
  },
  {
    question: 'What can I watch on Netflix?',
    answer: 'Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.'
  },
  {
    question: 'Is Netflix good for kids?',
    answer: 'The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and films in their own space. Kids profiles come with PIN-protected parental controls to manage what content they can access.'
  }
];

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-[65vh] py-6 px-6 md:px-24 bg-black text-white">
      <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className=" acdetion overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full h-20 flex justify-between items-center p-4 text-left text-lg cursor-pointer transition-all duration-500  font-medium focus:outline-none"
              >
                {faq.question}
                <span className=''>{isOpen ? <FaMinus size={25} /> : <AiOutlinePlus size={25} />}</span>
              </button>

              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden px-4 text-gray-300 ${
                  isOpen ? 'max-h-[500px] py-4' : 'max-h-0'
                }`}
              >
                <p className="transition-opacity duration-300">{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Faqs;

import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './Faq.scss';

type FaqItem = {
  question: string;
  answer: string;
};

const faqData: FaqItem[] = [
  {
    question: 'How do I track my inventory?',
    answer: 'Navigate to the Products page from the sidebar. You can view all products, filter by category, price range, and availability status. Each product shows current stock levels.',
  },
  {
    question: 'How can I add a new product?',
    answer: 'On the Products page, click the "Create Product" button in the toolbar. Fill in the required fields like title, price, and category, then submit the form.',
  },
  {
    question: 'What does "Low Stock" mean?',
    answer: 'Products with "Low Stock" status have limited quantity remaining. You can see all low-stock products highlighted on the Dashboard chart for quick overview.',
  },
  {
    question: 'How do I contact support?',
    answer: 'You can reach us through the Contact page for our office address, phone, fax, and email. Alternatively, use the Contact Form to send us a message directly.',
  },
  {
    question: 'Can I export product data?',
    answer: 'Yes, you can export product data from the Products page. Use the export button in the table toolbar to download data in your preferred format.',
  },
  {
    question: 'How are sales statistics calculated?',
    answer: 'Sales statistics on the Dashboard are calculated from historical sales data including total quantity sold, total revenue, and average revenue per unit.',
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className='container'>
      <div className='faqWrapper'>
        {faqData.map((item, index) => (
          <div
            key={index}
            className={`faqItem ${openIndex === index ? 'open' : ''}`}
          >
            <button
              className='faqQuestion'
              onClick={() => toggleItem(index)}
              type='button'
            >
              <span>{item.question}</span>
              {openIndex === index ? (
                <FaChevronUp size={14} />
              ) : (
                <FaChevronDown size={14} />
              )}
            </button>
            {openIndex === index && (
              <div className='faqAnswer'>
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;

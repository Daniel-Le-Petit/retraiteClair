import React from 'react';
import { testimonials } from '../data/data';
import styles from './TestimonialsSection.module.css';

const TestimonialsSection = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>
          📊 Nos utilisateurs adorent RetraiteClair
        </h2>
        
        <div className={styles.grid}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className={styles.card}>
              <blockquote className={styles.text}>
                "{testimonial.text}"
              </blockquote>
              <cite className={styles.author}>
                — {testimonial.author}
              </cite>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;



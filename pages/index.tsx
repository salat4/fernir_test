import React from 'react';
import Quiz from '@/components/Quiz/Quiz';
import questions from '@/public/JSON/questions.json';
import styles from '@/styles/Home.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.main__container}>
      <Quiz questions={questions} />
    </div>
  );
};

export default Home;

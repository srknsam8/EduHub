import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import doctor from '../../assets/doctor.jpeg';
import math from '../../assets/math.jpg';
import more from '../../assets/more.png';
import quiz from '../../assets/quiz.jpeg';
import Navbar from '../Navbar/Navbar';
import styles from './AllQuiz.module.css';

const imagesMapping = [math, quiz, doctor];

function AllQuiz() {
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/v1/quiz')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(data);
  const filteredData = data?.filter((item) =>
    item.quizTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = sortBy
    ? filteredData?.sort((a, b) => {
        if (sortBy === 'title') {
          return a.quizTitle.localeCompare(b.quizTitle);
        } else if (sortBy === 'questions') {
          return a.questions.length - b.questions.length;
        }
      })
    : filteredData;

  return (
    <>
      <Navbar />
      <div className={styles.allQuizMainContainer}>
        <div className={styles.headerMainContainer}>
          Select test according to your interest
        </div>
        <div className={styles.middleContainer}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Sort by...</option>
            <option value="title">Title</option>
            <option value="questions">Number of Questions</option>
          </select>
        </div>
        <div className={styles.quizListingContainer}>
          {sortedData?.map((item, index) => {
            return (
              <div key={index} className={styles.quizCardContainer}>
                <img
                  className={styles.imagesContainer}
                  src={imagesMapping[index]}
                  alt={`Quiz ${index}`}
                />
                <div className={styles.middleWrapper}>
                  <div style={{ fontSize: '1.5rem' }}>{item.quizTitle}</div>
                  <div className={styles.quizCardMiddleContainer}>
                    <div>By: {item.created_by}</div>
                    <div>{item.questions.length} questions</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    navigate(`/quiz/${item._id}`);
                  }}
                  className={styles.takeQuizButton}
                >
                  Take quiz
                </button>
              </div>
            );
          })}
        </div>
        <div className={styles.loadMoreWrapper}>
          <div className={styles.loadingContainer}>Load more</div>
          <img className={styles.loadMoreButton} src={more} />
        </div>
      </div>
    </>
  );
}

export default AllQuiz;

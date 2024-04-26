import { useParams } from 'react-router-dom';
import styles from './Quiz.module.css';
import axios from 'axios'
import { useEffect, useState } from 'react';

function Quiz() {
  const { id } = useParams();
  console.log(id);

  const [data, setData] = useState(null);
  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/quiz/${id}`)
    .then(res => {
        setData(res.data)
    })
    .catch(err => {
        console.log(err)
    })
  }, [id])
  console.log(data)
  return (
    <div className={styles.quizMainContainer}>
      <div className={styles.upperContainer}>
        <div>Srikant Sharma</div>
        <div className={styles.upperInnerContainer}>
          <div>
            <div>EXAM</div>
            <div>18BIO9011- Biology</div>
          </div>
          <div>
            <div>STATUS</div>
            <div>Ongoing</div>
          </div>
          <div>
            <div>DATE</div>
            <div>09/11/2024</div>
          </div>
        </div>
      </div>

      {/* main quiz rendering  */}

      <div className={styles.mainContainer}>
        <div className={styles.questionContainer}>
          Q1. Identify the frontal lobe of the brain by using the 3-D image
          provided below.
        </div>
        <div className={styles.threeDContainer}>3D image here</div>
        <div className={styles.optionsContiner}>Options</div>
      </div>
    </div>
  );
}

export default Quiz;

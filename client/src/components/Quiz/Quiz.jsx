import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Quiz.module.css';

function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(null);
  const [userResponses, setUserResponses] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/quiz/${id}`)
      .then((res) => {
        setQuizData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleResponseChange = (questionIndex, optionIndex) => {
    setUserResponses((prevState) => ({
      ...prevState,
      [questionIndex]: optionIndex,
    }));
  };

  const handleSubmit = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/analyse/sendresponse`,
        {
          userId: '662b5275a6579e65c53381f6',
          quizId: id,
          responses: Object.entries(userResponses).map(
            ([questionIndex, optionIndex]) => ({
              questionId: parseInt(questionIndex) + 1, // Adding 1 because question numbers start from 1
              answerId: parseInt(optionIndex) + 1, // Adding 1 because options are zero-based index
            })
          ),
        },
        {
          headers: {
            Authorization:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjJiNTI3NWE2NTc5ZTY1YzUzMzgxZjYiLCJpYXQiOjE3MTQxMjE3ODN9.GKsGs7H89SiVIe2l2uS3edvOnQn6F7Yy0aFaE7Y4FIs',
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        // Handle success response
        navigate('/success');
      })
      .catch((err) => {
        console.log(err);
        // Handle error
      });
  };

  return (
    <div className={styles.quizMainContainer}>
      {/* Render quiz details */}
      {quizData && (
        <div className={styles.upperContainer}>
          <div>{quizData.created_by}</div>
          <div className={styles.upperInnerContainer}>
            <div>
              <div>EXAM</div>
              <div>{quizData.quizTitle}</div>
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
      )}

      {/* Render quiz questions and options */}
      {quizData && (
        <div className={styles.mainContainer}>
          {quizData.questions.map((question, questionIndex) => (
            <div key={question._id} className={styles.questionContainer}>
              <div className={styles.questionText}>{question.questionText}</div>
              <div className={styles.optionsContainer}>
                {question.options.map((option, optionIndex) => (
                  <div key={option._id} className={styles.option}>
                    <input
                      type="radio"
                      id={option._id}
                      name={`question-${question.questionNumber}`}
                      value={optionIndex}
                      onChange={() =>
                        handleResponseChange(questionIndex, optionIndex)
                      }
                      checked={userResponses[questionIndex] === optionIndex}
                    />
                    <label htmlFor={option._id}>{option.optionText}</label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Render submit button */}
      <div className={styles.submitButton} onClick={handleSubmit}>
        Submit
      </div>
    </div>
  );
}

export default Quiz;

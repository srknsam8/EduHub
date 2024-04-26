import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Model from '../Model/Model';
import styles from './Quiz.module.css';
import NavBar from '../Navbar/Navbar'

function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(null);
  const [userResponses, setUserResponses] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      Math.min(prevIndex + 1, quizData.questions.length - 1)
    );
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
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
    <>
    <NavBar />
    <div className={styles.quizMainContainer}>
      {/* Render quiz details */}
      {quizData && (
        <div className={styles.upperContainer}>
          <div>Shrikant Sharma</div>
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

      {/* Conditional rendering of current question */}
      {quizData && quizData.questions && quizData.questions.length > 0 && (
        <div className={styles.mainContainer}>
          <div className={styles.questionContainer}>
            <div className={styles.questionText}>
              {quizData.questions[currentQuestionIndex].questionText}
            </div>
            <div className={styles.optionsContainerWrapper}>
              <div className={styles.optionsContainer}>
                {quizData.questions[currentQuestionIndex].options.map(
                  (option, optionIndex) => (
                    <div key={option._id} className={styles.option}>
                      <input
                        type="radio"
                        id={option._id}
                        name={`question-${quizData.questions[currentQuestionIndex].questionNumber}`}
                        value={optionIndex}
                        onChange={() =>
                          handleResponseChange(
                            currentQuestionIndex,
                            optionIndex
                          )
                        }
                        checked={
                          userResponses[currentQuestionIndex] === optionIndex
                        }
                      />
                      <label htmlFor={option._id}>{option.optionText}</label>
                    </div>
                  )
                )}
              </div>
              {quizData.questions[currentQuestionIndex].questionNumber ===
                1 && (
                <div className={styles.threeDmodelContainer}>
                  <Model />
                </div>
              )}
            </div>
          </div>
          {/* Navigation buttons */}
          <div className={styles.navigationButtons}>
            <button
              className={styles.buttonContainer}
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>
            <button
              className={styles.buttonContainer}
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === quizData.questions.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      )}
      <br />
      {/* Render submit button */}
      <div className={styles.buttonWrapperContainer}>
        <button className={styles.submitButton} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
    </>
  );
}

export default Quiz;

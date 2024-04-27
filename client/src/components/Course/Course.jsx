import axios from 'axios';
import { useState } from 'react';
import Kidney from '../Model/Kidney';
import Navbar from '../Navbar/Navbar';
import styles from './Course.module.css';

function Course() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleApiResponse = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/solution?prompt=${encodeURIComponent(
          prompt
        )}`
      );
      // Handle response data here
      console.log(response.data);
      setResponse(response.data);
    } catch (error) {
      // Handle error
      console.error('Error fetching solution:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.courseMainContainer}>
        <div className={styles.coursenameContainer}>
          <div className={styles.courseNameText}>Course name</div>
          <div className={styles.courseChapterText}>Chapter 1</div>
        </div>
        <div className={styles.courseMiddleContainer}>
          <div className={styles.courseMiddleLeftContainer}>
            {/* <div className={styles.infoWrapper}>
              <div>Kidney</div>
            </div> */}
            <b>The kidneys</b> are two bean-shaped organs, each about the size
            of a fist. They are located just below the rib cage, one on each
            side of your spine. Healthy kidneys filter about a half cup of blood
            every minute, removing wastes and extra water to make urine.
          </div>
          <div className={styles.threeDModelContainer}>
            <Kidney />
          </div>
        </div>
        <div className={styles.kaimainContainer}>
        <div className={styles.kaiHeaderText} >KAI</div>
          <div className={styles.responseContainer}>
            {loading ? (
              <div className={styles.loader}></div>
            ) : (
              <div className={styles.response}>{response.text}</div>
            )}
          </div>
          <form className={styles.askKaiForm} onSubmit={handleApiResponse}>
            <input
              className={styles.inputContainer}
              type="text"
              value={prompt}
              onChange={handleChange}
              placeholder="Ask your doubts here..."
            />
            <button className={styles.submitResponseButton} type="submit">
              Ask KAI
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Course;

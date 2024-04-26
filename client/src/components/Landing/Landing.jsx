// import styles from './Landing.module.css'

import assesment from '../../assets/assesment.png';
import assesment2 from '../../assets/assesment2.png';
import careermapper from '../../assets/careermapper.png';
import careermapper2 from '../../assets/careermapper2.png';
import course from '../../assets/course.png';
import Navbar from '../Navbar/Navbar';
import styles from './Landing.module.css';


function Landing() {
  return (
    <div>
      <Navbar />
      <div className={styles.firstCardContainer}>
        <img className={styles.firstImageContainer} src={assesment} />
        <div className={styles.firstTextContainer}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img className={styles.assesment2Image} src={assesment2} />
            <div style={{ fontSize: '1.4rem' }}>Assesment</div>
          </div>
          <div className={styles.firstMiddleText}>
            A fast evaluation to test your understanding across subjects.
            Schedule according to your covinience & complete in minutes. Good
            luck!
          </div>
          <button className={styles.btnContainer}>View more</button>
        </div>
      </div>
      <div className={styles.secondCardContainer}>
        <div className={styles.secondCardInnerContainer}>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '1.4rem',
                alignItems: 'center',
              }}
            >
              <img className={styles.secondSideImage1} src={careermapper2} />
              <div style={{ fontSize: '1.4rem' }}>Career mapper</div>
            </div>
            <div style={{ fontSize: '1.4rem' }}>
              Our Career Mapper tool helps you chart your professional path. Get
              personalized recommendations in minutes.
            </div>
          </div>
          <button className={styles.btnContainer2}>View More</button>
        </div>
        <img className={styles.secondSideImage2} src={careermapper} />
      </div>
      <div className={styles.thirdContainer}>
        <img src={course} className={styles.thirdContainerImage} />
        <div className={styles.thirdContinerLeft}>
          <div style={{fontSize:"2rem"}}>Courses</div>
          <div style={{fontSize:"1.4rem", width:"80%"}}>
            Discover your perfect course match. Dive into subjects that intrigue
            you, from programming to psychology. Start learning today!
          </div>
          <button className={styles.btnContainer3}>View more</button>
        </div>
      </div>
      <div>
      </div>
    </div>
  );
}

export default Landing;

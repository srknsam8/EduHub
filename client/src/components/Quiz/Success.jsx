import Lottie from 'react-lottie';
import { useNavigate } from 'react-router-dom';
import animationData from '../../assets/done.json';

function Success() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const navigate = useNavigate();
  return (
    <div>
      <Lottie options={defaultOptions} height={400} width={400} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <div style={{ fontSize: '2rem', alignSelf: 'center' }}>
          Quiz Submited successfully
        </div>
        <button
          onClick={() => {
            navigate('/report');
          }}
          style={{
            width: '15%',
            margin: 'auto',
            padding: '0.8rem',
            marginTop: '2rem',
            backgroundColor: '#0080ff',
            color: 'white',
            border: 'none',
            borderRadius: '0.2rem',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          Click to view report
        </button>
      </div>
    </div>
  );
}

export default Success;


import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTimeLeft, setTimeLeft } from '../store/countdownSlice';

const Countdown: React.FC = () => {
  const dispatch = useDispatch();
  const timeLeft = useSelector(selectTimeLeft);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(setTimeLeft(calculateTimeLeft()));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  const formatTimeLeft = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const styles = {
    description: {
      margin: '20px 0',
    },
    details: {
      fontSize: '16px',
    },
  };

  return (
    <div style={{ textAlign: 'center', fontSize: '2rem' }}>
      {timeLeft > 0 ? (
         <>
         <h3>Countdown to New Year 2025</h3>
        <h2>
        {formatTimeLeft(timeLeft)}
        </h2>
        </>
       
      ) : (
        <h1>Happy New Year!</h1>
      )}
       <div style={styles.description}>
        <h3>Event Description</h3>
        <p>This is an exciting event happening at the end of the year!</p>
      </div>
      <div style={styles.details}>
        <p><strong>Location:</strong> 404 Nilamber Primero, Vasna - Bhayli Main Rd, near Nilamber Circle, Vadodara, Gujarat 390021</p>
        <p><strong>Date:</strong> 31st December 2023</p>
        <p><strong>Time:</strong> 08:00 p.m. IST</p>
      </div>
    </div>
  );
};

function calculateTimeLeft() {
  const currentTime = new Date();
  const nextYear = currentTime.getFullYear() + 1;
  const newYearTime = new Date(`January 1, ${nextYear} 00:00:00`).getTime();
  return Math.max(newYearTime - currentTime.getTime(), 0);
}

export default Countdown;
    


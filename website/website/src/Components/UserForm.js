import React, { useState } from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './UserForm.module.css'; // Import the module CSS file

const UserForm = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', email: '', address: '', city: '' });
  const navigate = useNavigate();

  const handleSelection = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const progress = (step / 5) * 100; // Assuming 5 steps
  const totalSteps = 5;

  const hasSelectedOption = () => {
    switch (step) {
      case 1: return formData.name;
      case 2: return formData.email;
      case 3: return formData.address;
      case 4: return formData.city;
      default: return true;
    }
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      alert('Form submitted!');
      onComplete();
      navigate('/hackathons');
    }
  };

  const handlePrev = () => {
    setStep(Math.max(step - 1, 1));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Box className={styles.stepContainer}>
            <Typography className={styles.title} variant="h6">Tell Us your Goals</Typography>
            {['Professional Growth', 'Staying Sharp', 'Academic Excellence', 'Others..'].map((goal) => (
              <Box
                key={goal}
                className={`${styles.optionButton} ${formData.name.includes(goal) ? styles.selected : ''}`}
                onClick={() => handleSelection('name', goal)}
              >
                {goal}
              </Box>
            ))}
          </Box>
        );
      case 2:
        return (
          <Box className={styles.stepContainer}>
            <Typography className={styles.title} variant="h6">What is Your Top Goal?</Typography>
            {['Learn Specific Skills', 'Problem Solving Skills', 'Others...'].map((goal) => (
              <Box
                key={goal}
                className={`${styles.optionButton} ${formData.email.includes(goal) ? styles.selected : ''}`}
                onClick={() => handleSelection('email', goal)}
              >
                {goal}
              </Box>
            ))}
          </Box>
        );
      case 3:
        return (
          <Box className={styles.stepContainer}>
            <Typography className={styles.title} variant="h6">What is your primary focus?</Typography>
            {['Problem solving skills', 'Creativity', 'Thinking Capability'].map((address) => (
              <Box
                key={address}
                className={`${styles.optionButton} ${formData.address.includes(address) ? styles.selected : ''}`}
                onClick={() => handleSelection('address', address)}
              >
                {address}
              </Box>
            ))}
          </Box>
        );
      case 4:
        return (
          <Box className={styles.stepContainer}>
            <Typography className={styles.title} variant="h6">What are the subjects you want to explore first?</Typography>
            {['Beginner', 'Novice', 'Intermediate', 'Advanced'].map((subject) => (
              <Box
                key={subject}
                className={`${styles.optionButton} ${formData.city.includes(subject) ? styles.selected : ''}`}
                onClick={() => handleSelection('city', subject)}
              >
                {subject}
              </Box>
            ))}
          </Box>
        );
      case 5:
        return (
          <Box className={styles.stepContainer}>
            <Typography className={styles.title} variant="h6">How much time can you allocate daily?</Typography>
            {['5mins', '10mins', '30mins', '1Hour'].map((time) => (
              <Box
                key={time}
                className={`${styles.optionButton} ${formData.city.includes(time) ? styles.selected : ''}`}
                onClick={() => handleSelection('city', time)}
              >
                {time}
              </Box>
            ))}
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box className={styles.formContainer}>
      <LinearProgress className={styles.progressBar} variant="determinate" value={progress} />
      {renderStep()}
      <Box className={styles.buttonGroup}>
        <button
          className={`${styles.outlineButton} ${step === 1 ? styles.disabledButton : ''}`}
          onClick={handlePrev}
          disabled={step === 1}
        >
          Back
        </button>
        <button
          className={`${styles.primaryButton} ${!hasSelectedOption() ? styles.disabledButton : ''}`}
          onClick={handleNext}
          disabled={!hasSelectedOption()}
        >
          {step === totalSteps ? 'Submit' : 'Next'}
        </button>
      </Box>
    </Box>
  );
};

export default UserForm;

import React from 'react';
import { useInView } from 'react-intersection-observer';
import styled, { keyframes, css } from 'styled-components';

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Section = styled.section`
  padding: 32px 12px;
  background-color: #fff;
`;

const TitleContainer = styled.div`
  color: #fff;
  background: linear-gradient(to right, #008CFF, #63BEFF);
  padding: 10px 20px;
  border-radius: 42px;
  text-align: center;
  font-size: 22px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  margin: 0 auto 60px;
  max-width: 35%;
  opacity: 0;
  animation: ${fadeIn} 1s ease-out forwards;
  animation-delay: 0.5s;
  ${({ inView }) => inView && css`
    animation: ${fadeIn} 1s ease-out forwards;
  `}
`;

const FeaturesContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
`;

const FeatureCard = styled.div`
  width: calc(50% - 10px);
  text-align: center;
  padding: 0;
  border-radius: 8px;
  max-width: 35%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border: none;
  margin-bottom: 20px;
  opacity: 0;
  transform: translateY(20px);
  animation: ${slideIn} 1s ease-out forwards;
  ${({ inView, index }) => inView && css`
    animation: ${slideIn} 1s ease-out forwards;
    animation-delay: ${index * 0.3}s;
  `}
`;

const FeatureImage = styled.img`
  width: 50%;
  height: auto;
`;

const Judul = styled.h3`
  font-size: 32px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  background: linear-gradient(to right, #008CFF, #93CEFF);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 10px 0;
`;

function FiturPage() {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  return (
    <Section ref={sectionRef}>
      <TitleContainer inView={sectionInView}>
        Mari lihat apa saja fitur di ProActive
      </TitleContainer>

      <FeaturesContainer>
        {['Tugas & Daftar', 'Kalender', 'Kolaborasi', 'Waktu'].map((title, index) => (
          <FeatureCard key={index} index={index} inView={sectionInView}>
            <Judul>{title}</Judul>
            <FeatureImage src={`/img/assets/svg/${title.replace(' ', ' ')}.svg`} alt={`Fitur ${index + 1}`} />
          </FeatureCard>
        ))}
      </FeaturesContainer>
    </Section>
  );
}

export default FiturPage;

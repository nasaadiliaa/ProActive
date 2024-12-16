import React from 'react';
import { useInView } from 'react-intersection-observer';
import styled, { keyframes, css } from 'styled-components';

// Slide-in animation for elements
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

const Section = styled.section`
  display: flex;
  align-items: center;
  padding: 6em 5px;
  background-color: #CAF5FF;
  margin-bottom: 150px;
  position: relative;
  opacity: 0;
  transform: translateY(20px);
  ${({ inView }) => inView && css`
    animation: ${slideIn} 1s ease-out forwards;
  `}
`;

const Image = styled.img`
  width: 400px;
  margin-right: 3em;
  padding-left: 100px;
  ${({ inView }) => inView && css`
    animation: ${slideIn} 1.5s ease-out forwards;
  `}
`;

const H22 = styled.h2`
  color: #000;
  font-family: 'Montserrat', sans-serif;
  font-size: 42px;
  font-weight: 900;
  ${({ inView }) => inView && css`
    animation: ${slideIn} 1.5s ease-out forwards;
  `}
`;

const Paragraph = styled.p`
  font-size: 20px;
  margin-right: 3em;
  ${({ inView }) => inView && css`
    animation: ${slideIn} 2s ease-out forwards;
  `}
`;

const GradasiAtas = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 150px;
  background: linear-gradient(to bottom, #ffffff, transparent);
  z-index: 1;
`;

const GradasiBawah = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 150px;
  background: linear-gradient(to top, #ffffff, transparent);
  z-index: 1;
`;

const AboutProActive = () => {
  const { ref: sectionRef, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  return (
    <Section ref={sectionRef} inView={inView}  id='tentangproactive'>
      <GradasiAtas />
      <Image src="/img/assets/svg/gambar2.svg" alt="About ProActive" inView={inView} />
      <div>
        <H22 inView={inView}>Apa itu ProActive?</H22>
        <Paragraph inView={inView}>
          ProActive adalah platform produktivitas yang membantu kamu menyusun dan menyelesaikan setiap tugas dengan mudah. Dengan fitur to-do list yang sederhana namun kuat, ProActive mempermudah perencanaan harian hingga pengelolaan proyek besar.
        </Paragraph>
      </div>
      <GradasiBawah />
    </Section>
  );
};

export default AboutProActive;

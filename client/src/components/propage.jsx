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
  text-align: center;
  padding: 7em;
  background-color: #fff;
  opacity: 0;
  transform: translateY(20px);
  ${({ inView }) => inView && css`
    animation: ${slideIn} 1s ease-out forwards;
  `}
`;

const Image = styled.img`
  width: 582px;
  height: 476px;
  opacity: 0;
  transform: translateY(20px);
  ${({ inView }) => inView && css`
    animation: ${slideIn} 1.5s ease-out forwards;
  `}
`;

const Paragraph = styled.p`
  font-size: 20px;
  margin-top: 1em;
  line-height: 1.5;
  opacity: 0;
  transform: translateY(20px);
  ${({ inView }) => inView && css`
    animation: ${slideIn} 2s ease-out forwards;
  `}
`;

const ProPage = () => {
  const { ref: sectionRef, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  return (
    <Section ref={sectionRef} inView={inView}>
      <Image
        src="/img/assets/svg/gambar1.svg"
        alt="ProPage Image"
        inView={inView}
      />
      <Paragraph inView={inView}>
        Fokus pada satu daftar yang terstruktur rapi agar semua tujuanmu tercapai dengan efisien <br />
        dan tanpa hambatan. Jadikan hari-harimu lebih produktif bersama ProActive
      </Paragraph>
    </Section>
  );
};

export default ProPage;

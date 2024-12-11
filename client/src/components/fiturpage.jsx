import React from 'react';
import styled from 'styled-components';

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
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
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
  return (
    <Section>
      
      <TitleContainer>
        Mari lihat apa saja fitur di ProActive
      </TitleContainer>

      
      <FeaturesContainer>
        <FeatureCard>
          <Judul>Tugas & Daftar</Judul>
          <FeatureImage src="/img/assets/svg/Tugas daftar.svg" alt="Fitur 1" />
        </FeatureCard>

        <FeatureCard>
          <Judul>Kalender</Judul>
          <FeatureImage src="/img/assets/svg/Kalender.svg" alt="Fitur 2" />
        </FeatureCard>

        <FeatureCard>
          <Judul>Kolaborasi</Judul>
          <FeatureImage src="/img/assets/svg/Kolaborasi.svg" alt="Fitur 3" />
        </FeatureCard>

        <FeatureCard>
          <Judul>Waktu</Judul>
          <FeatureImage src="/img/assets/svg/Waktu.svg" alt="Fitur 4" />
        </FeatureCard>
      </FeaturesContainer>
    </Section>
  );
}

export default FiturPage;

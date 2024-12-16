import { Navigate, React, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Cookies from 'universal-cookie';


const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Header = styled.header`
  text-align: center;
  padding: 3.5em 2em;
  padding-bottom: 140px;
  color: #ffffff;
  background: linear-gradient(150deg, #007bff, #ffffff, #ffffff, #007bff);
  background-size: 200% 200%;
  animation: ${gradientAnimation} 20s ease infinite;
  position: relative;
`;

const Title = styled.h1`
  font-size: 72px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  margin-bottom: 10px;
  animation: ${fadeIn} 1.5s ease-out;
`;

const TitleSpanBlack = styled.span`
  color: black;
`;

const TitleSpanBlue = styled.span`
  color: #008CFF;
`;

const Paragraph = styled.p`
  font-size: 18px;
  color: #333;
  margin-top: 0;
  animation: ${slideUp} 1.5s ease-out;
`;

const Button = styled.button`
  font-size: 22px;
  position: relative;
  font-weight: 900;
  color: #fff;
  padding: 0.5em 2em;
  background: linear-gradient(to right, #008CFF, #63BEFF);
  border: none;
  border-radius: 42px;
  margin-top: 1em;
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  z-index: 2;
  animation: ${slideUp} 1.5s ease-out 0.5s; /* Adding delay for button animation */

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 140, 255, 0.4);
    transform: translateY(-3px);
  }
`;

const BottomGradient = styled.div`
  position: absolute;
  display: flex;
  bottom: 0;
  left: 0; 
  width: 100%;
  height: 230px;
  background: linear-gradient(to top, #ffff, transparent);
  z-index: 1;
`;

const cookies = new Cookies();

function LandingPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); 

  useEffect(() => {
    const token = cookies.get('accessToken');
    console.log("token", token);

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <Header id="landing-page">
      <Title>
        <TitleSpanBlack>Satu Daftar,</TitleSpanBlack><br />
        <TitleSpanBlack>Semua </TitleSpanBlack>
        <TitleSpanBlue>Tercapai!</TitleSpanBlue>
      </Title>
      <Paragraph>
        Kelola tugas pribadi, dan pekerjaan tim dengan <br />
        mudah di satu tempat. Hanya di ProActive
      </Paragraph>

      {isAuthenticated ? (
        <Button onClick={() => window.location.href = 'HariIni'}>Lesgoo, Mulai Produktif</Button>
      ) : (
        <Button onClick={() => window.location.href = 'Login'}>Lesgoo, Mari Mulai</Button>
      )}
      

      <BottomGradient />
    </Header>
  );
}

export default LandingPage;

import React from 'react';
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #091F5B;
  color: #fff;
  font-family: 'Montserrat', sans-serif;
  padding: 0.5em 2em;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
`;

const LogoAndTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const LogoStyle = styled.img`
  margin-right: 1em;
`;

const TitleAndParagraph = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Paragraph = styled.p`
  margin: 0;
  font-size: 16px;
`;

const FooterText = styled.p`
  margin-bottom: 0px;
  font-size: 15px;
`;

const Header = styled.h3`
  font-size: 32px;
  font-weight: 900;
  margin: 0.5em 0 0 0;
`;

const IconSosmed = styled.div`
  display: flex;
  gap: 1.5em;
  margin-top: 1em;
`;

const SocialIcon = styled.a`
  font-size: 24px;
  color: #fff;
  text-decoration: none;

  &:hover {
    color: #ddd;
  }
`;

const LinkGroup = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 5em;
`;

const Link = styled.a`
  font-size: 15px;
  color: #fff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Title = styled.h1`
  font-size: 1.5em;
  font-weight: bold;
  color: white;
`;

const ProactiveText = styled.span`
  font-size: 32px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  color: white;
`;

const FooterLinkTitle = styled.h4`
  font-size: 19px;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
`;

const handleScroll = () => {
  const targetSection = document.getElementById('tentangproactive');
  if (targetSection) {
    targetSection.scrollIntoView({ behavior: 'smooth' });
  }
};

function Footer() {
  return (
    <FooterContainer>
      <LogoAndTitle>
        <TitleAndParagraph>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <LogoStyle src="/img/assets/logo/logo putih.svg" alt="Footer Logo" />
            <Title>
              <ProactiveText>ProActive</ProactiveText>
            </Title>
          </div>

          <Paragraph>
            Solusi Terbaik untuk Menyusun To-Do List, <br />
            Mencapai Target, dan Meningkatkan <br />
            Produktivitas Setiap Hari
          </Paragraph>
        </TitleAndParagraph>

        <FooterText>dibuat oleh</FooterText>
        <Header>ProActive Tim</Header>

        <IconSosmed>
          <SocialIcon href="/" target="_blank" rel="noopener noreferrer" title="Instagram">
            <FaInstagram />
          </SocialIcon>
          <SocialIcon href="/" target="_blank" rel="noopener noreferrer" title="Facebook">
            <FaFacebook />
          </SocialIcon>
          <SocialIcon href="/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <FaLinkedinIn />
          </SocialIcon>
          <SocialIcon href="/" target="_blank" rel="noopener noreferrer" title="TikTok">
            <FaTiktok />
          </SocialIcon>
          <SocialIcon href="/" target="_blank" rel="noopener noreferrer" title="Twitter">
            <FaXTwitter />
          </SocialIcon>
        </IconSosmed>
      </LogoAndTitle>

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <LinkGroup>
          <FooterLinkTitle>ProActive</FooterLinkTitle>
          <Link href="#tentangproactive">Tentang ProActive</Link>
        </LinkGroup>

        <LinkGroup>
          <FooterLinkTitle>Temui ProActive</FooterLinkTitle>
          <Link href="HariIni">hari ini</Link>
          <Link href="Mendatang">mendatang</Link>
          <Link href="Kalender">kalender</Link>
          <Link href="Kolaborasi">kolaborasi</Link>
          {/* <Link href="#">waktu</Link> */}
        </LinkGroup>
      </div>
    </FooterContainer>
  );
}

export default Footer;

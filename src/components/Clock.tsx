import { useState, useEffect } from "react";
import styled, { css } from "styled-components";

import { TClock } from "../types/types";

import ShowInfoContext from "../contexts/ShowInfoContext";

import SunIcon from "../assets/desktop/icon-sun.svg";
import MoonIcon from "../assets/desktop/icon-moon.svg";
import ArrowIcon from "../assets/desktop/icon-arrow-down.svg";

type ShowInfoProps = {
  children: React.ReactNode;
};

export default function Clock({ children }: ShowInfoProps) {
  const [time, setTime] = useState<TClock | null>(null);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  async function fetchData() {
    try {
      const response = await fetch("https://worldtimeapi.org/api/ip");

      const data: TClock = (await response.json()) as TClock;
      console.log(data);
      setTime(data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleClock = () => {
    const dateObject = time ? new Date(time?.datetime) : null;

    if (dateObject) {
      const hours = dateObject?.getHours().toString().padStart(2, "0");
      const minutes = dateObject?.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    }
  };

  useEffect(() => {
    void fetchData();
  }, []);

  return (
    <ShowInfoContext.Provider value={showInfo}>
      {children}
      <ClockContainer showinfo={showInfo.toString()}>
        <DayContainer>
          <img src={SunIcon} alt="sun icon" />
          <Greeting>GOOD MORNING</Greeting>
        </DayContainer>
        <Time>{time?.datetime ? handleClock() : null}</Time>
        <Location>IN {time?.timezone}</Location>
        <Button>
          MORE
          <ArrowWrapper onClick={() => setShowInfo(!showInfo)}>
            <img
              src={ArrowIcon}
              alt="Arrow Icon"
              style={{
                rotate: showInfo ? "180deg" : undefined,
                transition: "0.3s",
              }}
            />
          </ArrowWrapper>
        </Button>
      </ClockContainer>

      <AdditionalInfo showinfo={showInfo.toString()}>
        <InfoSection>
          <p>CURRENT TIMEZONE</p>
          <h3>{time?.timezone}</h3>
        </InfoSection>
        <InfoSection>
          <p>Day of the year</p>
          <h3>{time?.day_of_year}</h3>
        </InfoSection>
        <InfoSection>
          <p>Day of the week</p>
          <h3>{time?.day_of_week}</h3>
        </InfoSection>
        <InfoSection>
          <p>Week number</p>
          <h3>{time?.week_number}</h3>
        </InfoSection>
      </AdditionalInfo>
    </ShowInfoContext.Provider>
  );
}

interface TClockContainer {
  showinfo: string;
}

const ClockContainer = styled.div<TClockContainer>`
  ${(props) => css`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    color: white;
    padding-top: ${props.showinfo === "true" ? "10rem" : "25.7rem"};
    padding-bottom: 4rem;
    transition: 0.5s;
  `}
`;

const DayContainer = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: center;
`;

const Greeting = styled.p`
  font-size: 1.5rem;
  line-height: 1.7em;
  font-weight: 400;
  letter-spacing: 3px;
`;

const Time = styled.p`
  font-size: 10rem;
  line-height: 1em;
  font-weight: 700;
  letter-spacing: -2.5px;

  &::after {
    content: "BST";
    font-size: 1.5rem;
    line-height: 1.9em;
    font-weight: 300;
    color: white;
  }
`;

const Location = styled.p`
  font-size: 1.5rem;
  line-height: 1.9em;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 3px;
`;

const Button = styled.button`
  width: 11.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  font-size: 1.2rem;
  line-height: 0.85em;
  font-weight: 700;
  padding: 0.35em 0.35rem 0.35em 1.4em;
  color: rgba(0, 0, 0, 0.5);
  background: white;
  border-radius: 20px;
  border: none;
`;

const ArrowWrapper = styled.div`
  width: 3.2rem;
  height: 3.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(48, 48, 48, 1);
  border-radius: 50%;
  cursor: pointer;
`;

const AdditionalInfo = styled.div<TClockContainer>`
  ${(props) => css`
    width: 100%;
    padding: 4.8rem 2.6rem 5rem;
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(20.387113571166992px);
    display: flex;
    flex-direction: column;
    gap: 2rem;
    position: absolute;
    left: 0;
    transform: translateY(${props.showinfo === "true" ? "31%" : "100%"});
    transition: 0.5s;
  `}
`;

const InfoSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & p {
    font-size: 1rem;
    line-height: 2.8em;
    font-weight: 400;
    color: #303030;
    text-transform: uppercase;
  }

  & h3 {
    font-size: 2rem;
    line-height: normal;
    font-weight: 700;
  }
`;

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

  const hour: number = new Date(time?.datetime as string).getHours();
  // get hours to determine how to greet user and what background to load

  return (
    <ShowInfoContext.Provider value={{ showInfo }}>
      <>{children}</>
      <ClockContainer showinfo={showInfo.toString()} time={hour}>
        <DayContainer>
          <img
            src={hour >= 5 && hour <= 18 ? SunIcon : MoonIcon}
            alt="sun icon"
          />
          <Greeting>
            {hour >= 5 && hour < 12
              ? "GOOD MORNING"
              : hour >= 12 && hour <= 18
              ? "GOOD AFTERNOON"
              : hour >= 19 && hour <= 22
              ? "GOOD EVENING"
              : (hour > 22 && hour <= 24) || (hour >= 0 && hour < 5)
              ? "GOOD NIGHT"
              : null}
          </Greeting>
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

      <AdditionalInfo showinfo={showInfo.toString()} time={hour}>
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
  time: number;
}

const ClockContainer = styled.div<TClockContainer>`
  ${(props) => css`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    color: white;
    position: absolute;
    bottom: ${props.showinfo === "true" ? "27rem" : "0"};
    padding-bottom: 4rem;
    transition: 0.5s;
  `}

  @media only screen and (min-width: 90em) {
    padding-right: 16.5rem;
    width: 100%;
  }
`;

const DayContainer = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: center;

  @media only screen and (min-width: 48em) {
    gap: 1.77rem;
  }
`;

const Greeting = styled.p`
  font-size: 1.5rem;
  line-height: 1.7em;
  font-weight: 400;
  letter-spacing: 3px;

  @media only screen and (min-width: 48em) {
    font-size: 1.8rem;

    &::after {
      content: ", IT'S CURRENTLY";
    }
  }

  @media only screen and (min-width: 90em) {
    font-size: 2rem;
  }
`;

const Time = styled.p`
  font-size: 10rem;
  line-height: 1em;
  font-weight: 700;
  letter-spacing: -2.5px;

  @media only screen and (min-width: 48em) {
    font-size: 17.5rem;
  }

  @media only screen and (min-width: 90em) {
    font-size: 20rem;
  }

  &::after {
    content: "BST";
    font-size: 1.5rem;
    line-height: 1.9em;
    font-weight: 300;
    letter-spacing: 0.7px;
    color: white;

    @media only screen and (min-width: 48em) {
      font-size: 3.2rem;
      margin-left: 1.1rem;
    }

    @media only screen and (min-width: 90em) {
      font-size: 4rem;
    }
  }
`;

const Location = styled.p`
  font-size: 1.5rem;
  line-height: 1.9em;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 3px;

  @media only screen and (min-width: 48em) {
    font-size: 1.8rem;
  }

  @media only screen and (min-width: 90em) {
    font-size: 2rem;
  }
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

  @media only screen and (min-width: 48em) {
    width: 14.6rem;
    font-size: 1.6rem;
    border-radius: 30px;
  }

  @media only screen and (min-width: 90em) {
    align-self: flex-end;
    transform: translateY(-155%);
  }
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

  @media only screen and (min-width: 48em) {
    width: 4rem;
    height: 4rem;
  }
`;

const AdditionalInfo = styled.div<TClockContainer>`
  ${(props) => css`
    width: 100%;
    padding: 4.8rem 2.6rem 5rem;
    background: ${props?.time >= 6 && props?.time <= 20
      ? "rgba(255, 255, 255, 0.75)"
      : (props.time > 20 && props.time <= 24) ||
        (props.time >= 0 && props.time <= 5)
      ? "rgba(0, 0, 0, 0.75)"
      : null};
    backdrop-filter: blur(20.387113571166992px);
    display: flex;
    flex-direction: column;
    gap: 2rem;
    position: absolute;
    left: 0;
    bottom: ${props.showinfo === "true" ? "0" : "-27rem"};
    transition: 0.5s;
    color: ${props?.time >= 6 && props?.time <= 20
      ? "#303030"
      : (props.time > 20 && props.time <= 24) ||
        (props.time >= 0 && props.time <= 5)
      ? "#FFF"
      : null};

    @media only screen and (min-width: 48em) {
      padding: 4.5rem 15.8rem 4.5rem 5.4rem;
      flex-direction: row;
      flex-wrap: wrap;
      column-gap: 8.1rem;
      justify-content: space-between;
      bottom: ${props.showinfo === "true" ? "0" : "-27.88rem"};
    }

    @media only screen and (min-width: 90em) {
      padding: 5.4rem 43.4rem 6.4rem 16.5rem;
      column-gap: 23.3rem;
      bottom: ${props.showinfo === "true" ? "0" : "-32.6rem"};
    }
  `}
`;

const InfoSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media only screen and (min-width: 48em) {
    flex-direction: column;
    align-items: flex-start;
  }

  @media only screen and (min-width: 90em) {
    gap: 1rem;
  }

  & p {
    font-size: 1rem;
    line-height: 2.8em;
    font-weight: 400;
    text-transform: uppercase;

    @media only screen and (min-width: 48em) {
      font-size: 1.3rem;
    }
  }

  & h3 {
    font-size: 2rem;
    line-height: normal;
    font-weight: 700;

    @media only screen and (min-width: 48em) {
      font-size: 4rem;
    }
  }
`;

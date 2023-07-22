import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { TQuote } from "../types/types";

import RefreshIcon from "../assets/desktop/icon-refresh.svg";

import ShowInfoContext from "../contexts/ShowInfoContext";

export default function Quotes() {
  const [quote, setQuote] = useState<string>("");
  const [name, setName] = useState<string>("");

  const showInfo = useContext(ShowInfoContext);

  async function fetchData() {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const data: TQuote = (await response.json()) as TQuote;
      setQuote(data.content);
      setName(data.author);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    void fetchData();
  }, []);

  return !showInfo.showInfo ? (
    <QuoteContainer>
      <Quote>"{quote}"</Quote>
      <Author>{name}</Author>
      <Refresh src={RefreshIcon} onClick={() => void fetchData()}></Refresh>
    </QuoteContainer>
  ) : null;
}

const QuoteContainer = styled.div`
  width: 100%;
  min-height: 5rem;
  padding: 3.2rem 0 0 0;
  display: flex;
  gap: 1.7rem;
  position: relative;
  color: #fff;
  font-size: 1.2rem;
  line-height: 1.8em;
  font-weight: 700;

  @media only screen and (min-width: 48em) {
    font-size: 1.8rem;
  }
`;

const Quote = styled.p`
  max-width: 80%;
  font-weight: 400;
`;

const Author = styled.p`
  position: absolute;
  bottom: -3rem;
  left: 0;
`;

const Refresh = styled.img`
  width: 1.7rem;
  height: 1.7rem;
  cursor: pointer;

  @media only screen and (min-width: 48em) {
    margin-top: 1rem;
  }
`;

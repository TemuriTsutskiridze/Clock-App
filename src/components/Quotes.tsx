import styled, { css } from "styled-components";
import { useEffect, useState } from "react";
import { Tquote } from "../types/types";

import RefreshIcon from "../assets/desktop/icon-refresh.svg";

export default function Quotes() {
  const [quote, setQuote] = useState<string>("");
  const [name, setName] = useState<string>("");

  async function fetchData() {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const data: Tquote = (await response.json()) as Tquote;
      setQuote(data.content);
      setName(data.author);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    void fetchData();
  }, []);

  return (
    <QuoteContainer>
      <Quote>{quote}</Quote>
      <Author>{name}</Author>
      <Refresh src={RefreshIcon} onClick={() => void fetchData()}></Refresh>
    </QuoteContainer>
  );
}

const QuoteContainer = styled.div`
  width: 100%;
  padding: 3.2rem 2.5rem 0;
  display: flex;
  gap: 1.7rem;
  position: relative;
  color: #fff;
  font-size: 1.2rem;
  line-height: 1.8em;
  font-weight: 700;
`;

const Quote = styled.p`
  max-width: 80%;
  font-weight: 400;
`;

const Author = styled.p`
  position: absolute;
  bottom: -3rem;
  left: 2.5rem;
`;

const Refresh = styled.img`
  width: 1.7rem;
  height: 1.7rem;
  cursor: pointer;
`;

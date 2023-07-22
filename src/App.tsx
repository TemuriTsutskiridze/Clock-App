import Quotes from "./components/Quotes";
import Clock from "./components/Clock";
import GlobalStyles from "./Globals";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";

function App() {
  const [currentTime, setCurrentTime] = useState<number>(15);

  useEffect(() => {
    const date = new Date();
    const hours = date.getHours();
    setCurrentTime(hours);
  }, []);
  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <GlobalStyles currentTime={currentTime} />
      <Clock>
        <Quotes />
      </Clock>
    </>
  );
}

export default App;

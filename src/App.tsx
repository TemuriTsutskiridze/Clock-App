import Quotes from "./components/Quotes";
import Clock from "./components/Clock";
import GlobalStyles from "./Globals/Globals";
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
      <GlobalStyles currentTime={currentTime} />
      <Clock>
        <Quotes />
      </Clock>
    </>
  );
}

export default App;

import GlobalStyle from "./Globals";
import Quotes from "./components/Quotes";
import Clock from "./components/Clock";

function App() {
  return (
    <>
      <GlobalStyle />

      <Clock>
        <Quotes />
      </Clock>
    </>
  );
}

export default App;

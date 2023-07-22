import { createContext } from "react";

// Create a context for the counter
const ShowInfoContext = createContext<{ showInfo: boolean }>({
  showInfo: false,
});

export default ShowInfoContext;

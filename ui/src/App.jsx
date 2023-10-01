import { ThemeProvider } from "@emotion/react";
import Login from "./Login";
import { theme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Login />
    </ThemeProvider>
  );
}

export default App;

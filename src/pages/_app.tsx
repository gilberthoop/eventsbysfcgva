import "@/styles/globals.css";
import "@/styles/form.css";
import "@/styles/main.css";
import { Provider } from "react-redux";
import { store } from "@/store";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <main className={poppins.className}>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </Provider>
  );
}

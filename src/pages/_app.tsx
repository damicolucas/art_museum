import { useEffect, useState } from "react";
import type { AppProps } from "next/app";

import { Grid } from "@mui/material";
import { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";

import Header from "../components/header";
import { useLocalStorage } from "../functions/hooks";
import { PaginationContextProvider } from "../contexts/paginationContext";
import { ModalContextProvider } from "../contexts/modalContext";
import createEmotionCache from "../utility/createEmotionCache";
import lightTheme from "../styles/theme/lightTheme";
import darkTheme from "../styles/theme/darkTheme";
import "../styles/globals.css";

const clientSideEmotionCache = createEmotionCache();

type MyAppProps = AppProps & {
  emotionCache?: EmotionCache;
};

export default function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [storedThemeMode, setStoredThemeMode] = useLocalStorage(
    "darkMode",
    false
  );

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    setDarkMode(storedThemeMode);
  }, [storedThemeMode]);

  return (
    <PaginationContextProvider>
      <ModalContextProvider>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <Grid container direction={"column"}>
              <Grid item>
                <Header toggleTheme={toggleTheme} darkMode={darkMode} />
              </Grid>
              <Grid item container>
                <Component {...pageProps} />
              </Grid>
            </Grid>
          </ThemeProvider>
        </CacheProvider>
      </ModalContextProvider>
    </PaginationContextProvider>
  );
}

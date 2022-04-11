import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import MaterialUISwitch from "../buttons/switch";

type HeaderProps = {
  toggleTheme: () => void;
  darkMode: boolean;
};
export default function Header({ toggleTheme, darkMode }: HeaderProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary" enableColorOnDark>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Art museum
          </Typography>
          <MaterialUISwitch checked={darkMode} onChange={toggleTheme} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

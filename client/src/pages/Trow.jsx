import {
  Box,
  Button,
  MobileStepper,
} from "@mui/material";
import React, { useState } from "react";
import Logo from "../assets/logo.png";
import MobileNavBar from "../components/MobileNavBar";
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import { useTheme } from "@mui/material/styles";
import Recipient from "../components/Trow/Recipient";
import EventName from "../components/Trow/EventName";
import EventPurpose from "../components/Trow/EventPurpose";
import EventPicture from "../components/Trow/EventPicture";
import EventShop from "../components/Trow/EventShop";

const Trow = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <Box mt={{sm:"none", xs:"none", md:7, lg:7}}>
      {/* header */}
      <MobileNavBar logo={Logo} title={"Trow"} />
      {/* pages to step through  */}
      <Box>
        {
          {
            0: <Recipient />,
            1: <EventName />,
            2: <EventPurpose />,
            3: <EventShop />,
            4: <EventPicture />,
            
            
          }[activeStep]
        }
      </Box>

      <MobileStepper
        variant="dots"
        steps={5}
        position="static"
        activeStep={activeStep}
        sx={{ maxWidth: "100%", flexGrow: 1, mb:10}}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === 4}>
            Next
            {theme.direction === "rtl" ? (
              <WestIcon />
            ) : (
              <EastIcon />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <EastIcon />
            ) : (
              <WestIcon/>
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
};

export default Trow;

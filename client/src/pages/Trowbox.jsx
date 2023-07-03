import { Box, Fab, Tooltip } from "@mui/material";
import React from "react";
import MobileNavBar from "../components/MobileNavBar";
import Logo from "../assets/logo.png";
import Header from "../components/Header";
import TrowboxNavTabs from "../components/TrowboxNavTabs";
import TrowboxIcon from "../assets/trowbox.png";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { useNavigate} from "react-router-dom";

const Trowbox = () => {
  const navigate = useNavigate();
  return (
    <Box mt={{sm:"none", xs:"none", md:7, lg:7}}>
      <MobileNavBar logo={Logo} title={"Trowbox"} />
      {/* Header section  */}
      <Header logo={TrowboxIcon} title={"My Trowbox"}/>

      {/* Other Sections start here */}

      <TrowboxNavTabs />
      <Tooltip
                onClick={(e) => navigate('/home/createevent')}
                title="Create Event"
                sx={{
                    position: "fixed",
                    bottom: 30,
                    left: { xs: "calc(50% - 25px)", md: 30 },
                }}
            >
                <Fab color="primary" aria-label="Add Item">
                  <EventAvailableIcon/>
                </Fab>
            </Tooltip>
    </Box>
  );
};

export default Trowbox;

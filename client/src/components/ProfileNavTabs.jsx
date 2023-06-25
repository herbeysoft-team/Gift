import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Recieved from './Recieved';
import Sent from './Sent';
import Wishlist from './Wishlist';

function TabPanel(props) {
  const { children, value, index, ...other } = props;


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Typography component={"div"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function ProfileNavTabs({userId, gift, checkWishlist, isMutual}) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const handleChangeIndex = (index) => {
  //   setValue(index);
  // };

  return (
    <Box p={2} sx={{ bgcolor: 'background.paper', width: "100%" }}>
        <Tabs
          centered
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
          sx={{
            "& button": {fontFamily:"Poppins", fontStyle:"normal", fontWeight:"bold"},
          }}
        >
          <Tab label="Received" {...a11yProps(0)} />
          <Tab label="Sent" {...a11yProps(1)} />
          <Tab label="Wishlist" {...a11yProps(2)} />
        </Tabs>
      {/* <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      > */}
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Recieved gift={gift?.recieveGift}/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Sent gift={gift?.sendGift}/>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Wishlist user_id ={userId} checkWishlist={checkWishlist} />
        </TabPanel>
      {/* </SwipeableViews> */}
    </Box>
  );
}
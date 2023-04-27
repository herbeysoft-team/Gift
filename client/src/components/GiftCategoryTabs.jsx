import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function GiftCategoryTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ maxWidth: { xs: 400, sm: 600, md: 780}, bgcolor: 'background.paper', mt:1}}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable auto tabs example"
        sx={{
            "& button": {fontFamily:"Poppins", fontStyle:"normal", fontWeight:"bold"},
          }}
      >
        <Tab label="All" />
        <Tab label="Birthday" />
        <Tab label="Ramadan" />
        <Tab label="Naming Ceremony" />
        <Tab label="Wedding Ceremony" />
        <Tab label="Item Six" />
        <Tab label="Item Seven" />
      </Tabs>
    </Box>
  );
}
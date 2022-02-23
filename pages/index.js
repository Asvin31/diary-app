import { Grid } from "@mui/material";
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useState } from "react";
import Layout from "../components/Layout";
import Login from '../components/Login';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ p: 3 }}>
          {children}
        </Grid>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function Home() {

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Layout>
      <Grid container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        spacing={2}
      >
        <Grid item sm={12} xs={12} md={6}>
          <Tabs value={value} onChange={handleChange} textColor="secondary"
            indicatorColor="secondary">
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
          <TabPanel value={value} index={0}>
            <Login parent={"Login"} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Login parent={"Register"} />
          </TabPanel>
        </Grid>
      </Grid>
    </Layout >
  )
}

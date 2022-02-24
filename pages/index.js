import { Grid } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useRouter } from "next/router";
import PropTypes from 'prop-types';
import * as React from 'react';
import { useState } from "react";
import Layout from "../components/Layout";
import Login from '../components/Login';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TransitionDown(props) {
  return <Slide {...props} direction="up" />;
}

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
  const router = useRouter();
  const [value, setValue] = useState(0);
  const [snackBar, setSnackBar] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const login = (userName, password) => {
    setLoading(true);
    fetch("http://localhost:4545/authenticate", {
      method: 'POST',
      credentials: 'include',
      withCredentials: true,
      crossDomain: true,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "userName": userName,
        "password": password
      })
    }).then(function (response) {
      setLoading(false);
      if (response.status === 200) {
        window.localStorage.setItem("loggedIn", userName);
        router.push("/my-diary");
      }
      else {
        setSnackBar(true);
        setSeverity("error");
        setMessage("Enter Proper creds");
      }
    }).catch(error => {
      setLoading(false);
      setSnackBar(true);
      setSeverity("error");
      setMessage("Not Able to Proceed");
    })
  }

  const register = (userName, password, roles = []) => {
    setLoading(true);
    fetch("http://localhost:4545/register", {
      method: 'POST',
      credentials: 'include',
      withCredentials: true,
      crossDomain: true,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "userName": userName,
        "password": password,
        "roles": roles
      })
    }).then(function (response) {
      setLoading(false);
      if (response.status === 200) {
        setLoading(false);
        setSnackBar(true);
        setMessage("Login to continue");
        setValue(0)
      }
      else {
        setSnackBar(true);
        setSeverity("error");
        setMessage("Registeration failed");
      }
    }).catch(error => {
      setLoading(false);
      setSnackBar(true);
      setSeverity("error");
      setMessage("Not Able to Proceed");
    })
  }
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
            <Login parent={"Login"} signIn={login} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Login parent={"Register"} signIn={register} />
          </TabPanel>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={snackBar}
        autoHideDuration={6000}
        TransitionComponent={TransitionDown}
        onClose={() => setSnackBar(false)}>
        <Alert onClose={() => setSnackBar(false)} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      {loading &&
        <Backdrop
          sx={{ color: '##008080', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      }
    </Layout >
  )
}

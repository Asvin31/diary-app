import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Button, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { useState } from "react";

function Login({ parent, signIn }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <Grid item sm={12} xs={12} md={12}>
            <Grid item sm={12} xs={12} md={12}>
                <Typography variant="h4" align="left">
                    {parent}
                </Typography>
                <Typography variant="body1" align="left">
                    Welcome to your personal space
                </Typography>
            </Grid>
            <Grid item sm={12} xs={12} md={12}>
                <TextField
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="dense"
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <Grid item sm={12} xs={12} md={12}>
                <TextField
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="dense"
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <VpnKeyIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <br />
            <Grid item sm={12} xs={12} md={12}>
                <Button
                    disabled={email.length === 0 || password.length === 0}
                    fullWidth
                    variant='contained'
                    onClick={(e) => signIn(email, password)}
                >
                    {parent}
                </Button>
            </Grid>
        </Grid>
    )
}
export default Login;
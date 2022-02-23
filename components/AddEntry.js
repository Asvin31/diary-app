import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import { Grid, InputAdornment, TextField, Typography, Button } from "@mui/material";

const AddEntry = ({ setDisplayContent }) => {
    return (
        <Grid item sm={12} xs={12} md={12} sx={{ margin: '0px 2%' }}>
            <Grid item sm={12} xs={12} md={12}>
                <Typography variant="subtitle2" align="left">Title</Typography>
            </Grid>
            <Grid item sm={12} xs={12} md={12}>
                <TextField
                    variant="outlined"
                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                    margin="dense"
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <ViewHeadlineIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <Grid item sm={12} xs={12} md={12}>
                <Typography variant="subtitle2" align="left">Content</Typography>
            </Grid>
            <Grid item sm={12} xs={12} md={12}>
                <TextField
                    type="password"
                    variant="outlined"
                    // value={password}
                    // onChange={(e) => setPassword(e.target.value)}
                    margin="dense"
                    fullWidth
                    multiline
                    rows={10}
                />
            </Grid>
            <br />
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
            >
                <Grid item sm={12} xs={12} md={6}>
                    <Button
                        fullWidth
                        variant='contained'
                    // onClick={(e) => signIn(email, password)}
                    >
                        Save
                    </Button>
                </Grid>
                <Grid item sm={12} xs={12} md={6}>
                    <Button
                        fullWidth
                        variant='contained'
                        onClick={(e) => setDisplayContent("home")}
                    >
                        Back
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}
export default AddEntry
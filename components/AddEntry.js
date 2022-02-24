import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import { Button, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { DateContext } from "../context/DateContext";

const AddEntry = ({ setDisplayContent }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [id, setId] = useState(null);
    const { contentDetails, setContentDetails,
        setLoading, setSnackBar, setSeverity, setMessage, dateSelected
        , setGetDetailsFlag } = useContext(DateContext);
    useEffect(() => {
        if (contentDetails.id !== null) {
            setId(contentDetails.id);
            const { title, content } = contentDetails.content;
            setTitle(title);
            setContent(content);
        }
    }, [])

    const back = () => {
        setContentDetails({
            "id": null,
            "content": null
        })
        setDisplayContent("home")
    }

    const saveContent = () => {
        setLoading(true)
        fetch("http://localhost:4545/save", {
            method: 'POST',
            credentials: 'include',
            withCredentials: true,
            crossDomain: true,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "contentDate": dateSelected?.format("YYYY-MM-DD"),
                "content": content,
                "contentId": id,
                "title": title
            })
        }).then(function (response) {
            setLoading(false);
            if (response.status === 200) {
                setSnackBar(true);
                setSeverity("success");
                setMessage("Your data saved!");
                back();
                setGetDetailsFlag(true);
            }
            else {
                response.json().then(function (result) {
                    console.error(result);
                })
                setSnackBar(true);
                setSeverity("error");
                setMessage("Some Error Occurred");
            }
        }).catch(error => {
            setLoading(false);
            setSnackBar(true);
            setSeverity("error");
            setMessage("Some Error Occurred");
        })
    }
    return (
        <Grid item sm={12} xs={12} md={12} sx={{ margin: '0px 2%' }}>
            <Grid item sm={12} xs={12} md={12}>
                <Typography variant="subtitle2" align="left">Title</Typography>
            </Grid>
            <Grid item sm={12} xs={12} md={12}>
                <TextField
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                    variant="outlined"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
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
                        onClick={(e) => saveContent()}
                    >
                        Save
                    </Button>
                </Grid>
                <Grid item sm={12} xs={12} md={6}>
                    <Button
                        fullWidth
                        variant='contained'
                        onClick={(e) => back()}
                    >
                        Back
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}
export default AddEntry
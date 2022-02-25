import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { Button, Card, CardContent, CardHeader, DialogActions, Grid, Paper, Typography } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { red } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useContext, useEffect, useState } from "react";
import { DateContext } from "../context/DateContext";
import cardImage from "../public/AddEntry.webp";
import AddEntry from './AddEntry';

const CustomDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const CustomDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

CustomDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TransitionDown(props) {
    return <Slide {...props} direction="up" />;
}

const DiaryContent = () => {
    const { dateSelected, snackBar, severity, message, loading, setSnackBar,
        dateDetails, setContentDetails, contentDetails, setLoading,
        setSeverity, setMessage, setGetDetailsFlag } = useContext(DateContext);
    const [displayContent, setDisplayContent] = useState("home");
    const [dialogFlag, setDialogFlag] = useState(false);

    const toggleFlag = value => {
        setDialogFlag(value);
    }

    const generateColor = () => {
        const randomColor = Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, '0');
        return `#${randomColor}`;
    };

    useEffect(() => {
        setDisplayContent("home");
    }, [dateSelected])

    const checkDateDetails = () => {
        return (dateDetails.errorData == null && dateDetails.content != null
            && Object.keys(dateDetails.content).length > 0);
    }

    const getListOfContents = () => {
        return (
            Object.entries(dateDetails?.content)
                .filter(([key, value]) => `${key}`[value] !== 'undefined') //has options
                .map(([key, value], idx) => (
                    <Grid item sm={6} xs={6} md={4}>
                        <Card
                            sx={{
                                margin: '4%',
                                backgroundColor: generateColor(),
                                cursor: "pointer"
                            }}
                            onClick={(e) => editContent(key, value)}
                        >
                            <CardHeader
                                sx={{ color: "white", textTransform: "capitalize" }}
                                title={value.title}
                            />
                            <CardContent>
                                <Typography variant="body1" align="center">
                                    Last Edited
                                </Typography>
                                <Typography variant="h6" align="center">
                                    {value.date}
                                </Typography>
                                <Typography variant="body1" align="center">
                                    {value.lastUpdated}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                )
                ))
    }

    const editContent = (key, value) => {
        setContentDetails({
            "id": key,
            "content": value
        })
        setDisplayContent("create")
    }

    const checkScreen = () => {
        return displayContent == "create";
    }

    const removeEntry = () => {
        toggleFlag(false);
        let url = checkScreen() ?
            "http://localhost:4545/deleteEntry/" + dateSelected?.format("YYYY-MM-DD") + "/" + contentDetails.id :
            "http://localhost:4545/deleteAllEntry/" + dateSelected?.format("YYYY-MM-DD");
        setLoading(true)
        fetch(url, {
            method: 'DELETE',
            credentials: 'include',
            withCredentials: true,
            crossDomain: true,
        }).then(function (response) {
            setLoading(false);
            if (response.status === 200) {
                setSnackBar(true);
                setSeverity("success");
                setMessage(checkScreen() ?
                    contentDetails?.content?.title + " is removed"
                    : `Entries for ${dateSelected?.format("YYYY-MM-DD")} is removed`);
                setGetDetailsFlag(true);
                checkScreen() ? setDisplayContent("home") : null;
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
        <>
            {dateSelected != null && dateSelected != undefined &&
                <Paper sx={{ width: '100%', height: '100%', minHeight: '80vh' }}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ width: '100%', backgroundColor: red['A200'] }}
                    >
                        <Grid item>
                            <IconButton
                                id="back"
                                disabled
                            >
                                <TextSnippetIcon style={{ color: "white" }} />
                            </IconButton>
                        </Grid>
                        <Grid item sm={9} xs={9} md={9}>

                            <Typography
                                variant="h6"
                                color="white"
                            >
                                {dateSelected.format("MMMM D YYYY")}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <IconButton
                                id="back"
                            >
                                {checkDateDetails() &&
                                    <DeleteTwoToneIcon
                                        onClick={(e) => toggleFlag(true)}
                                        style={{ color: "white" }} />
                                }
                            </IconButton>
                        </Grid>
                    </Grid>
                    {displayContent == "home" &&
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="stretch"
                            spacing={2}
                        >
                            <Grid item sm={6} xs={6} md={4}>
                                <Card
                                    sx={{
                                        margin: '4%',
                                        backgroundColor: generateColor(),
                                        cursor: "pointer"
                                    }}
                                    onClick={(e) => setDisplayContent("create")}
                                >
                                    <CardHeader
                                        sx={{ color: "white" }}
                                        action={
                                            <IconButton disabled>
                                                <AddCircleIcon
                                                    style={{ color: "white" }}
                                                />
                                            </IconButton>
                                        }
                                        title="Add Entry"
                                    />
                                    <CardContent>
                                        <Image
                                            alt="Create Entry"
                                            src={cardImage}
                                            quality={100}
                                        />
                                    </CardContent>
                                </Card>
                            </Grid>
                            {checkDateDetails() &&
                                getListOfContents()
                            }
                        </Grid>
                    }
                    {displayContent == "create" &&
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={2}
                        >
                            <AddEntry setDisplayContent={setDisplayContent} />
                        </Grid>
                    }
                </Paper>
            }
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

            <CustomDialog
                onClose={(e) => toggleFlag(false)}
                open={dialogFlag}
                fullWidth
                maxWidth="xs"
            >
                <CustomDialogTitle onClose={(e) => toggleFlag(false)}>
                    Remove Entrie(s)
                </CustomDialogTitle>
                <DialogContent dividers>
                    <Typography variant="h6">
                        Are you sure to remove "{displayContent == "create" ? contentDetails?.content?.title : "All Entries"}" ?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ width: '100%' }}
                        spacing={1}
                    >
                        <Grid item sm={6} xs={6} md={6}>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={(e) => removeEntry()}
                            >
                                Remove Entry
                            </Button>
                        </Grid>
                        <Grid item sm={6} xs={6} md={6}>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={(e) => toggleFlag(false)}
                            >
                                cancel
                            </Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </CustomDialog>
        </>
    )
}
export default DiaryContent
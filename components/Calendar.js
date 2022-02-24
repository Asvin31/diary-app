import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Grid, Typography } from '@mui/material';
import { blue, red } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { DateContext } from '../context/DateContext';


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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: blue['400'],
        color: theme.palette.common.white,
    },
}));

const MonthTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: red['A200'],
        color: theme.palette.common.black,
    },
}));

const BlankTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
        borderBottom: '1px solid white',
    },
}));

const Calendar = () => {
    const [dateObject, setDateObject] = useState(moment());
    const [customFlag, setCustomFlag] = useState({
        open: false,
        dialogFor: ''
    });
    const { dateSelected, storeDateSelected, getDetailsFlag, setGetDetailsFlag,
        setLoading, setSnackBar, setSeverity, setMessage, setDateDetails } = useContext(DateContext);

    useEffect(() => {
        storeDateSelected(dateObject);
    }, [dateObject])

    const getDetails = () => {
        setLoading(true)
        setDateDetails({
            "content": null,
            "errorData": null
        })
        fetch("http://localhost:4545/getDetailsForDate/" + dateSelected?.format("YYYY-MM-DD"), {
            credentials: 'include',
            withCredentials: true,
            crossDomain: true,
        }).then(function (response) {
            setLoading(false);
            if (response.status === 200) {
                response.json().then(function (result) {
                    const { content, errorData } = result;
                    setDateDetails({
                        "content": content,
                        "errorData": errorData
                    })
                })
            }
            else if (response.status === 204) {

            }
            else {
                setSnackBar(true);
                setSeverity("warning");
                setMessage("No details found for the date");
            }
        }).catch(error => {
            setLoading(false);
            setSnackBar(true);
            setSeverity("error");
            setMessage("Some Error Occurred");
        })
    }
    useEffect(() => {
        getDetails();
    }, [dateSelected])

    if (getDetailsFlag) {
        getDetails();
        setGetDetailsFlag(false);
    }
    /**
     * Getting weekdays short name for table header
     */
    const weekdays = moment.weekdaysShort().map(day => {
        return (
            <StyledTableCell key={day}>{day}</StyledTableCell>
        )
    });
    /**
     * 
     * @returns Getting the first day for the month
     */
    const getFirstDay = () => {
        return moment(dateObject).startOf("month").format("d");
    }
    /**
     * getting the number of days in the month
     * @returns 
     */
    const daysInMonth = () => {
        return moment(dateObject).daysInMonth();
    }
    /**
     * blank days to indicate when the calendar starts in the week
     */
    let blankDays = [];
    for (let i = 0; i < getFirstDay(); i++) {
        blankDays.push(
            <BlankTableCell>{""}</BlankTableCell>
        )
    }
    const isDateSelected = (d) => {
        return d == dateSelected?.format("DD");
    }
    /**
     * days in month
     */
    let monthDays = [];
    for (let d = 1; d <= daysInMonth(); d++) {
        monthDays.push(
            <TableCell
                key={d}
                sx={{
                    border: "none",
                    cursor: 'pointer',
                    backgroundColor: isDateSelected(d) ? red['A200'] : 'none',
                    color: isDateSelected(d) ? "white" : "black"

                }}
                onClick={(e) => changeDate(d)}
            >
                {d}
            </TableCell>
        )
    }
    const changeDate = (d) => {
        setDateObject(moment().set(
            {
                "date": d,
                "month": moment(dateObject).format("MMMM"),
                "year": moment(dateObject).format("YYYY")
            }
        ))
    }
    var totalSlots = [...blankDays, ...monthDays];
    let rows = [];
    let cells = [];
    totalSlots.forEach((row, i) => {
        if (i % 7 !== 0) {
            cells.push(row); // if index not equal 7 that means not go to next week
        } else {
            rows.push(cells); // when reach next week we contain all td in last week to rows 
            cells = []; // empty container 
            cells.push(row); // in current loop we still push current row to new container
        }
        if (i === totalSlots.length - 1) { // when end loop we add remain date
            rows.push(cells);
        }
    });

    let daysToBeDisplayed = rows.map((d, i) => {
        return <TableRow>{d}</TableRow>;
    });

    const changeMonth = (event) => {
        const { id } = event.currentTarget;
        if (id == "next") {
            setDateObject(moment(dateObject).add(1, "months"));
        }
        else if (id == "back") {
            setDateObject(moment(dateObject).subtract(1, "months"))
        }
        else {
            setDateObject(moment().set(
                {
                    "month": id,
                    "year": moment(dateObject).format("YYYY")
                }));
            changeFlag(false, "")
        }
    }

    const getAllMonths = () => {
        return moment.months();
    }
    const changeFlag = (flag, name) => {
        setCustomFlag({
            open: flag,
            dialogFor: name
        })
        if (name === "close") setDateObject(moment())
    }

    const changeYear = (event) => {
        const { id } = event.currentTarget;
        setDateObject(moment().set({ "year": id }));
        changeFlag(true, "Month")
    }

    const getAllYears = () => {
        let prevYears = moment().subtract(10, "years",).format("YYYY");
        let nextYears = moment().add(10, "years").format("YYYY");
        let yearsArr = []
        while (prevYears <= nextYears) {
            yearsArr.push(moment(prevYears).format("YYYY"));
            prevYears = moment(prevYears).add(1, "years").format("YYYY");
        }
        return yearsArr;
    }
    const getCurrentMonth = () => {
        return (
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
                        onClick={(e) => changeMonth(e)}
                    >
                        <ChevronLeftIcon
                            style={{ color: "white" }}
                        />
                    </IconButton>
                </Grid>
                <Grid item sm={9} xs={9} md={9}>
                    <Grid container
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Grid item>
                            <Typography
                                variant="h6"
                                color="white"
                                sx={{ cursor: "pointer" }}
                                onClick={(e) => changeFlag(true, "Month")}
                            >
                                {moment(dateObject).format("MMMM")}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography
                                variant="h6"
                                color="white"
                                sx={{ cursor: "pointer" }}
                                onClick={(e) => changeFlag(true, "Year")}
                            >
                                - {moment(dateObject).format("YYYY")}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <IconButton
                        id="next"
                        onClick={(e) => changeMonth(e)}
                    >
                        <ChevronRightIcon style={{ color: "white" }} />
                    </IconButton>
                </Grid>
            </Grid>
        )
    }
    return (
        <>
            {getCurrentMonth()}
            <TableContainer component={Paper}>
                <Table sx={{ width: '100%' }}>
                    <TableHead>
                        <TableRow>
                            {weekdays}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {daysToBeDisplayed}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button
                variant="contained"
                fullWidth
                sx={{ backgroundColor: blue['400'], }}
                onClick={(e) => setDateObject(moment())}
            >
                Go To Today
            </Button>

            <CustomDialog
                onClose={(e) => changeFlag(false, "close")}
                open={customFlag.open}
                fullWidth
                maxWidth="xs"
            >
                <CustomDialogTitle id="customized-dialog-title" onClose={(e) => changeFlag(false, "close")}>
                    Select {customFlag.dialogFor}
                </CustomDialogTitle>
                <DialogContent dividers>
                    {customFlag.dialogFor == "Month" &&
                        <Grid container
                            alignItems="center"
                            justifyContent="space-between"
                            spacing={2}
                        >
                            {getAllMonths().map((months, index) => (
                                <Grid
                                    item sm={6} xs={6} md={4}>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        id={index}
                                        onClick={(e) => changeMonth(e)}
                                    >
                                        {months}
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                    }
                    {customFlag.dialogFor == "Year" &&
                        <>
                            <Grid container
                                alignItems="center"
                                justifyContent="space-between"
                                spacing={2}
                            >
                                {getAllYears().map((years) => (
                                    <Grid
                                        item sm={6} xs={6} md={4}>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            id={years}
                                            onClick={(e) => changeYear(e)}
                                        >
                                            {years}
                                        </Button>
                                    </Grid>
                                ))}
                            </Grid>
                        </>
                    }
                </DialogContent>
            </CustomDialog>
        </>
    )
}
export default Calendar
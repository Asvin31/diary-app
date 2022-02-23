import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { Card, CardContent, CardHeader, Grid, Paper, Typography } from "@mui/material";
import { red } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import Image from 'next/image';
import * as React from 'react';
import { useContext, useState, useEffect } from "react";
import { DateContext } from "../context/DateContext";
import cardImage from "../public/AddEntry.webp";
import AddEntry from './AddEntry';

const DiaryContent = () => {
    const { dateSelected } = useContext(DateContext);
    const [displayContent, setDisplayContent] = useState("home");

    const generateColor = () => {
        const randomColor = Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, '0');
        return `#${randomColor}`;
    };

    useEffect(() => {
        setDisplayContent("home");
    }, [dateSelected])
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
                                disabled
                            >
                            </IconButton>
                        </Grid>
                    </Grid>
                    {displayContent == "home" &&
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
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
        </>
    )
}
export default DiaryContent
import { Container, Grid, Typography } from "@mui/material";
import Head from 'next/head';
import * as React from 'react';

const Layout = (props) => {
    return (
        <div style={{ textAlign: 'center' }}>
            <Head>
                <title>Personal Diary</title>
                <meta name="description" content="Personal Diary App" />
                <link rel="icon" href="https://icons8.com/icon/vnEhSTlue5iv/book" />
            </Head>
            <Container sx={{ margin: '2%' }}>
                <Grid container direction="row" justifyContent="space-around" alignItems="center" spacing={2}
                    sx={{ marginBottom: '2%' }}>
                    <Grid item sm={12} xs={12} md={12}>
                        <Typography variant="h4">
                            Personal Diary
                        </Typography>
                    </Grid>
                </Grid>
                {props.children}
            </Container>
        </div>
    )
}
export default Layout
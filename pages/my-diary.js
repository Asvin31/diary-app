import { Grid } from "@mui/material";
import Calendar from "../components/Calendar";
import DiaryContent from "../components/DiaryContent";
import Layout from "../components/Layout";

const MyDiary = () => {
    return (
        <Layout>
            <Grid item sm={12} xs={12} md={12}>
                <Grid container direction="row" justifyContent="center" alignItems="flex-start" spacing={2}>
                    <Grid item sm={12} xs={12} md={5}>
                        <Calendar />
                    </Grid>
                    <Grid item sm={12} xs={12} md={7}>
                        <DiaryContent />
                    </Grid>
                </Grid>
            </Grid>
        </Layout>
    )
}
export default MyDiary
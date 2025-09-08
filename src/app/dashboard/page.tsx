import React from "react";
import Grid from "@mui/material/Grid";

import PageContainer from "@/app/_componets/container/PageContainer";
import Dashboard from "@/app/_componets/dashboard/Dashboard";
import styles from "../index.module.css";

export default async function dashboard() {
    // if (typeof window == 'undefined') return;
    const title = 'Dashboard'
    const pageDisc = 'Dashboard';
    const element = <Dashboard />;

    return (
        <main className={styles.main}>
            <PageContainer title={title} description={pageDisc}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, lg: 12 }} >
                        {element}
                    </Grid>
                </Grid>
            </PageContainer>
        </main>
    );
}

import React from "react";
import Grid from "@mui/material/Grid";

import PageContainer from "@/app/_componets/container/PageContainer";
import Games from "@/app/_componets/games/chanceAndSimulation/Games";
import styles from "../../index.module.css";

export default async function games() {
    // if (typeof window == 'undefined') return;
    const title = 'Games'
    const pageDisc = 'Games';
    const element = <Games />;

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

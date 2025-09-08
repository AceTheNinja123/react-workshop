import React from "react";
import Grid from "@mui/material/Grid";

import PageContainer from "@/app/_componets/container/PageContainer";
import Graphs from "@/app/_componets/graphs/lineGraphs/LineGraphs";

export default async function lineGraphsPage() {
    // if (typeof window == 'undefined') return;
    const title = 'Line Graphs'
    const pageDisc = 'Line Graphs';
    const element = <Graphs />;

    return (
        <main>
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

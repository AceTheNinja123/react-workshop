import React from "react";
import Grid from "@mui/material/Grid";

import PageContainer from "@/app/_componets/container/PageContainer";
import Graphs from "@/app/_componets/graphs/donutGraphs/DonutGraphs";

export default async function donutGraphsPage() {
    // if (typeof window == 'undefined') return;
    const title = 'Donut Graphs'
    const pageDisc = 'Donut Graphs';
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

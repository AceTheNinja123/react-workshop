import React from "react";
import Grid from "@mui/material/Grid";

import PageContainer from "@/app/_componets/container/PageContainer";
import Graphs from "@/app/_componets/graphs/radialBarGraphs/RadialBarGraphs";

export default async function radialBarGraphsPage() {
    // if (typeof window == 'undefined') return;
    const title = 'Radial Bar Graphs'
    const pageDisc = 'Radial Bar Graphs';
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

import React from "react";
import Grid from "@mui/material/Grid";

import PageContainer from "@/app/_componets/container/PageContainer";
import Graphs from "@/app/_componets/graphs/wordCloudGraphs/WordCloudGraphs";

export default async function wordCloudGraphsPage() {
    // if (typeof window == 'undefined') return;
    const title = 'Word Cloud Graphs'
    const pageDisc = 'Word Cloud Graphs';
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

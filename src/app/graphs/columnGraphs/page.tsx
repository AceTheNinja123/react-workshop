import React from "react";
import Grid from "@mui/material/Grid";

import PageContainer from "@/app/_componets/container/PageContainer";
import ColumnGraphs from "@/app/_componets/graphs/columnGraphs/ColumnGraphs";

export default async function columnGraphsPage() {
    // if (typeof window == 'undefined') return;
    const title = 'Column Graphs'
    const pageDisc = 'Column Graphs';
    const element = <ColumnGraphs />;

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

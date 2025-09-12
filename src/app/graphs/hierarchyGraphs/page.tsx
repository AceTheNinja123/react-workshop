import React from "react";
import Grid from "@mui/material/Grid";

import PageContainer from "@/app/_componets/container/PageContainer";
import HierarchyGraphs from "@/app/_componets/graphs/hierarchyGraphs/HierarchyGraphs";

export default async function hierarchyGraphsPage() {
    // if (typeof window == 'undefined') return;
    const title = 'Hierarchy Graphs'
    const pageDisc = 'Hierarchy Graphs';
    const element = <HierarchyGraphs />;

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

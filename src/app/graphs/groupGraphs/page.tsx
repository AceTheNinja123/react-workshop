import React from "react";
import Grid from "@mui/material/Grid";

import PageContainer from "@/app/_componets/container/PageContainer";
import GroupGraphs from "@/app/_componets/graphs/groupGraphs/GroupGraphs";

export default async function groupGraphsPage() {
    // if (typeof window == 'undefined') return;
    const title = 'Group Graphs'
    const pageDisc = 'Group Graphs';
    const element = <GroupGraphs />;

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

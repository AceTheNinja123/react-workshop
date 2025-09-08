import React from "react";
import Grid from "@mui/material/Grid";

import PageContainer from "@/app/_componets/container/PageContainer";
import Graphs from "@/app/_componets/graphs/otherGraphs/OtherGraphs";

export default async function otherGraphsPage() {
    // if (typeof window == 'undefined') return;
    const title = 'Other Graphs'
    const pageDisc = 'Other Graphs';
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

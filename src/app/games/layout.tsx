import LayoutWrapper from "@/app/_componets/layout/layout";

export default async function DashboardLayout({ children, }: { children: React.ReactNode }) {
    return (
        <div id="dashboard-layout">
            <LayoutWrapper>{children}</LayoutWrapper>
        </div>
    )
}
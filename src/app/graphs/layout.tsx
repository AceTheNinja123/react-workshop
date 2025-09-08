import LayoutWrapper from "@/app/_componets/layout/layout";

export default async function GraphsLayout({ children, }: { children: React.ReactNode }) {
    return (
        <div id="graphs-layout">
            <LayoutWrapper>{children}</LayoutWrapper>
        </div>
    )
}
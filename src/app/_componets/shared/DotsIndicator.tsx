import { Box } from "@mui/material";
type Props = {
    count: number;
    activeIndex: number;
};
const DotsIndicator = ({ count, activeIndex }: Props) => {
    return (
        <Box sx={{ width: '100%', display: "flex", alignItems: "center", gap: 0.5, mx: "auto", alignContent: 'center', justifyContent: 'center', padding: "10px"}}>
            {[...Array(count)].map((_, index) => (
                <Box
                    key={index}
                    sx={{
                        borderRadius: '50%',
                        width: 10,
                        height: 10,
                        mx: 0.5,
                        backgroundColor: index === activeIndex ? 'primary.main' : 'grey.400',
                        transition: 'all 0.3s ease',
                    }}
                />
            ))}
        </Box>
    );
}

export default DotsIndicator;
// Card.js
//working of individual cards like the ability to toggle or flip and there design is carried out in this file

import { Box, useTheme } from "@mui/material";
import { cardType } from "./data";

function Card({ item, handleSelectedCards, toggled, stopflip }: cardType) {
    const theme = useTheme()
    return (
        <Box sx={{ perspective: "1000px", width: "8rem", height: "8rem", position: "relative", }}        >
            <Box sx={{ position: "absolute", width: "100%", height: "100%", }}            >
                {toggled ? (
                    /* Front face */
                    < Box component="img" src={item.img} alt="face" sx={{ width: "100%", height: "100%", borderRadius: "50%", backfaceVisibility: "hidden", position: "absolute", top: 0, left: 0, }} />
                ) : (
                    /* Back face */
                    < Box
                        onClick={() => !stopflip && handleSelectedCards(item)}
                        sx={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: theme.palette.primary.main,
                            borderRadius: "50%",
                            border: "1px solid black",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            backfaceVisibility: "hidden",
                            cursor: stopflip ? "default" : "pointer",
                        }}
                    />
                )}
            </Box>
        </Box>
    );
}
export default Card;
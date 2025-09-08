import React, {  useState } from "react";
import { Box, Typography, Button, List, ListItem, Fab } from "@mui/material";
import { IconTrash } from "@tabler/icons-react";

const PostWordCount = () => {
    const [count, setCount] = useState(0);
    const [postText, setPostText] = useState('');
    const [isPost, setIsPost] = useState<Array<string>>([]);

    const maxCharacter = 140;
    const post = () => {
        if (postText.trim() === "") return;
        setIsPost((prev) => [...prev, postText]);
        setPostText("");
        setCount(0);
    };
    const deletePost = (index: number) => { setIsPost((prev) => prev.filter((_, i) => i !== index)); };
    return (
        <Box sx={{ display: 'flex', maxHeight: '750px', height: '740px', overflowY: 'auto', overflowX: 'auto', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ width:'100%',display: 'flex', height: '340px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h1"> {`You have witten ${count} characters. You have ${maxCharacter - count} left`} </Typography>
                {/* <TextField
                    id="outlined-basic"
                    variant="outlined"
                    margin="normal"
                    value={postText}
                    onChange={(e) => {
                        setCount(e.target.value.length);
                        setPostText(e.target.value);
                    }}
                    minRows={10}
                    multiline
                    fullWidth
                    sx={{ "& .MuiInputBase-input": { fontWeight: "bold", fontSize: "1.1rem", } }}

                /> */}
                <textarea
                    id="outlined-basic"
                    value={postText}
                    onChange={(e) => {
                        setCount(e.target.value.length);
                        setPostText(e.target.value);
                    }}
                    maxLength={maxCharacter}
                    rows={4} // Number of visible text lines
                    style={{
                        border: "1px solid #000",
                        margin: 10,
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                        padding: 10,
                        width: '100%',
                        height: '100px', // You can adjust height directly
                        resize: "vertical", // Allows user to resize vertically
                    }}
                />
                <Button variant="contained" onClick={post}>Post</Button>
            </Box>
            {/* Display posts */}
            {isPost.length > 0 &&
                <Box sx={{ width: "100%", height: '400px', overflowY: 'auto', overflowX: 'auto', }}>
                    <List sx={{ width: "100%" }}>
                        {isPost.map((item, index) => (
                            <ListItem key={index} sx={{ border: "1px solid #ddd", borderRadius: 1, mb: 1, bgcolor: "#f9f9f9", width: '100%', whiteSpace: 'normal', wordBreak: 'break-word', overflowWrap: 'anywhere' }} secondaryAction={<Fab size="small" color="error" onClick={() => deletePost(index)}><IconTrash size={20} style={{ margin: 5 }} /></Fab>}>
                                {item}
                            </ListItem>
                        ))}
                    </List>
                </Box>
            }

        </Box>
    );
};
export default PostWordCount;
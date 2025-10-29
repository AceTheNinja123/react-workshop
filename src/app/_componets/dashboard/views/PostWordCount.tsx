import React, { useState } from "react";
import { Box, Typography, Button, List, ListItem, Fab, TextField } from "@mui/material";
import { IconTrash } from "@tabler/icons-react";

const PostWordCount = () => {
    const [charCount, setCharCount] = useState(0);
    const [wordCount, setWordCount] = useState(0);
    const [postText, setPostText] = useState("");
    const [isPost, setIsPost] = useState<Array<string>>([]);
    const maxCharacter = 140;

    const wordCountCheck = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const content = e.target.value;
        setPostText(content); // ✅ update text state

        // ✅ Character count
        setCharCount(content.length);

        // ✅ Word count logic
        const trimmed = content.trim();
        if (trimmed === "") {
            setWordCount(0);
            return;
        }

        const words = trimmed.split(/\s+/);
        setWordCount(words.length);
    };

    const post = () => {
        if (postText.trim() === "") return;
        setIsPost((prev) => [...prev, postText]);
        setPostText("");
        setCharCount(0);
        setWordCount(0);
    };

    const deletePost = (index: number) => { setIsPost((prev) => prev.filter((_, i) => i !== index)); };

    return (
        <Box sx={{ display: "flex", maxHeight: "750px", height: "750px", overflowY: "auto", overflowX: "auto", flexDirection: "column", alignItems: "center", justifyContent: "center", }}>
            <Box sx={{ width: "100%", display: "flex", height: "340px", flexDirection: "column", alignItems: "center", justifyContent: "center", }}>
                <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>You have written {charCount} characters and {wordCount} words.<br />You have {maxCharacter - charCount} characters left.</Typography>
                <TextField
                    id="outlined-basic"
                    value={postText}
                    onChange={wordCountCheck}
                    variant="outlined"
                    multiline
                    disabled={charCount >= maxCharacter}
                    rows={4}
                    style={{ margin: 10, fontWeight: "bold", fontSize: "1.1rem", padding: 10, width: "80%", height: "100px", resize: "vertical", }}
                />
                <Button variant="contained" onClick={post} disabled={charCount === 0} sx={{ mt: 2 }}>Post</Button>
            </Box>

            {/* Display posts */}
            {isPost.length > 0 && (
                <Box sx={{ width: "100%", height: "400px", overflowY: "auto", overflowX: "auto", }}>
                    <List sx={{ width: "100%" }}>
                        {isPost.map((item, index) => (
                            <ListItem
                                key={index}
                                sx={{ border: "1px solid #ddd", borderRadius: 1, mb: 1, padding: 2, width: "100%", whiteSpace: "normal", wordBreak: "break-word", overflowWrap: "anywhere", }}
                                secondaryAction={<Fab size="small" color="error" onClick={() => deletePost(index)}> <IconTrash size={20} style={{ margin: 5 }} />                                    </Fab>}
                            >
                                {item}
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}
        </Box>
    );
};
export default PostWordCount;
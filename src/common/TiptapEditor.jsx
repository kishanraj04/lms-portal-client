import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";

const TiptapEditor = ({ description, setDescription }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: description,
    onUpdate: ({ editor }) => {
      setDescription(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <>
      <Box
        sx={{
          border: "2px solid #555",
          borderRadius: "8px",
          p: 2,
          backgroundColor: "#000",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
            mb: 2,
            backgroundColor: "#222",
            padding: "0.5rem",
            borderRadius: "6px",
          }}
        >
          <Tooltip title="Bold">
            <IconButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              color="inherit"
            >
              <FormatBoldIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Italic">
            <IconButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              color="inherit"
            >
              <FormatItalicIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Underline">
            <IconButton
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              color="inherit"
            >
              <FormatUnderlinedIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Align Left">
            <IconButton
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              color="inherit"
            >
              <FormatAlignLeftIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Align Center">
            <IconButton
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
              color="inherit"
            >
              <FormatAlignCenterIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Align Right">
            <IconButton
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              color="inherit"
            >
              <FormatAlignRightIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Tooltip>
        </Box>

        <EditorContent
          editor={editor}
          style={{
            minHeight: "200px",
            padding: "1rem",
            border: "1px solid #444",
            borderRadius: "6px",
            backgroundColor: "#121212", // dark background
            color: "#fff", // white text
          }}
        />
      </Box>
    </>
  );
};

export default TiptapEditor;

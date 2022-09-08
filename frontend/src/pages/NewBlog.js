import React, { useState } from 'react';
import { Button, Container, Form } from "react-bootstrap";
import { useCreateBlogMutation } from '../services/apiSlice';
import { MenuBar } from '../components/MenuBar';
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useNavigate } from "react-router-dom";

function NewBlog() {
    const [title, setTitle] = useState("");
    const [ createBlog, { isSuccess } ] = useCreateBlogMutation();
    const navigate = useNavigate();

    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: ``,
        autofocus: true
    })

    function handlePublish(e) {
        e.preventDefault();
        const content = editor.getHTML();
        if(!title || !content) {
            return alert("Title and content required");
        }
        createBlog({ title, content })
    }

    if (isSuccess) {
        setTimeout(() => {
            navigate("/my_blogs");
        }, 500);
        return (
            <div className="d-flex justify-content-center py-5">
                <h1 className="text-center">Post blog successfully</h1>
            </div>
        );
    }

    return (
        <Container>
            <Form onSubmit={handlePublish}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </Form.Group>
                <br/>

                <div>
                    <MenuBar editor={editor} />
                    <EditorContent editor={editor} />
                </div>

                <br/>
                <Button variant="primary" type="submit">
                    Create Blog
                </Button>
            </Form>
        </Container>
    );
}

export default NewBlog;
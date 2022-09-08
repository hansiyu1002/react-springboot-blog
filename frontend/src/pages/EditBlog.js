import React, { useState } from 'react';
import { Button, Container, Form } from "react-bootstrap";
import { useUpdateBlogMutation } from '../services/apiSlice';
import { MenuBar } from '../components/MenuBar';
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function EditBlog() {
    const { id } = useParams();
    const blogs = useSelector(state => state.blogs);
    const blog = blogs.find(blog => blog._id === id)
    const [title, setTitle] = useState(blog.title);
    const [updateBlog, { isSuccess }] = useUpdateBlogMutation();
    const navigate = useNavigate();

    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: `${blog.content}`,
        autofocus: true
    })

    function handleEdit(e) {
        e.preventDefault();
        const content = editor.getHTML();
        if(!title || !content) {
            return alert("Title and content required");
        }
        updateBlog({ id, title, content })
    }

    if (isSuccess) {
        setTimeout(() => {
            navigate("/my_blogs");
        }, 500);
        return (
            <div className="d-flex justify-content-center py-5">
                <h1 className="text-center">Update blog successfully</h1>
            </div>
        );
    }

    return (
        <Container>
            <Form onSubmit={handleEdit}>
                <h2 className="text-center">Edit Blog</h2>
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
                    Update Blog
                </Button>
            </Form>
        </Container>
    );
}

export default EditBlog;
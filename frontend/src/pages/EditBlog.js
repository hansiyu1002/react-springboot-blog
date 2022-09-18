import React, { useState } from 'react';
import {Button, Container, Form, Spinner} from "react-bootstrap";
import {useUpdateBlogMutation} from '../services/apiSlice';
import { MenuBar } from '../components/MenuBar';
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useNavigate, useParams } from "react-router-dom";
import {LinkContainer} from "react-router-bootstrap";
import {useSelector} from "react-redux";

function EditBlog() {
    const { id } = useParams();
    const navigate = useNavigate();
    const blogs = useSelector(state => state.blogs);
    const blog = blogs.find(blog => blog.id === id);
    const [title, setTitle] = useState(blog.title);
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: `${blog.content}`,
        autofocus: true
    });
    const [updateBlog, { isSuccess }] = useUpdateBlogMutation();


    function handleEdit(e) {
        e.preventDefault();
        const content = editor.getHTML();
        if(!title || !content) {
            return alert("Title and content required.");
        }
        updateBlog({ id, title, content })
    }

    if (isSuccess) {
        setTimeout(() => {
            navigate("/my_blogs");
        }, 500);
        return (
            <div className="d-flex justify-content-center py-5">
                <h1 className="text-center">Update blog successfully.</h1>
            </div>
        );
    }

    return (
        <Container>
            <LinkContainer to={"/my_blogs"}>
                <Button variant="primary">Back</Button>
            </LinkContainer>
            <Form onSubmit={handleEdit}>
                <h2 className="text-center">Edit Blog</h2>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </Form.Group>
                <br/>

                <div>
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
import React from 'react';
import {Button, ButtonGroup, Card} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDeleteBlogMutation } from "../services/apiSlice";

function BlogPreview({ blog }) {
    const { title, content, _id } = blog;
    const [deleteBlog] = useDeleteBlogMutation();
    function handleDelete(e) {
        e.preventDefault();
        deleteBlog(_id);
    }

    return (
        <Card style={{width: "18rem"}}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text dangerouslySetInnerHTML={{ __html: content?.substring(0, 50) + '...' }} />
                <ButtonGroup>
                    <LinkContainer to={`/blog/${_id}`}>
                        <Button variant="primary">View</Button>
                    </LinkContainer>
                    <LinkContainer to={`/edit_blog/${_id}`}>
                        <Button variant="outline-primary">Edit</Button>
                    </LinkContainer>
                    <Button variant="outline-danger" onClick={handleDelete}>Delete</Button>
                </ButtonGroup>
            </Card.Body>
        </Card>
    );
}

export default BlogPreview;
import React from 'react';
import { useParams } from 'react-router-dom';
import {Container, Row, Col} from "react-bootstrap";
import {useSelector} from "react-redux";

function PublicBlog() {
    const { id } = useParams();
    const blogs = useSelector(state => state.hot_blogs);
    const blog = blogs.find(blog => blog.id === id);

    return (
        <Container>
            <Row>
                <Col>
                    <h1>{blog.title}</h1>
                    <p>By {blog.author}</p>
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </Col>
            </Row>
        </Container>
    );
}

export default PublicBlog;
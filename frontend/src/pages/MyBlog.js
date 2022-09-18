import React from 'react';
import { useParams } from 'react-router-dom';
import {Container, Row, Col, Button} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {useSelector} from "react-redux";

function MyBlog() {
    const { id } = useParams();
    const blogs = useSelector(state => state.my_blogs);
    const blog = blogs.find(blog => blog.id === id);

    return (
        <Container>
            <Row>
                <Col>
                    <LinkContainer to={"/my_blogs"}>
                        <Button variant="primary">Back</Button>
                    </LinkContainer>
                    <h1>{blog.title}</h1>
                    <p>By {blog.author}</p>
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </Col>
            </Row>
        </Container>
    );
}

export default MyBlog;
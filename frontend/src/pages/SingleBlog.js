import React from 'react';
import { useParams } from 'react-router-dom';
import {Container, Row, Col, Spinner, Button} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {useSelector} from "react-redux";

function SingleBlog() {
    const { id } = useParams();
    const user = useSelector(state => state.account.email);
    const blogs = useSelector(state => state.blogs);
    const blog = blogs.find(blog => blog.id === id);

    return (
        <Container>
            <Row>
                <Col>
                    {blog.author === user  && <LinkContainer to={"/my_blogs"}>
                        <Button variant="primary">Back</Button>
                        </LinkContainer>
                    }
                    <h1>{blog.title}</h1>
                    <p>By {blog.author}</p>
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </Col>
            </Row>
        </Container>
    );
}

export default SingleBlog;
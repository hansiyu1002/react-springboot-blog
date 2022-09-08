import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetOneBlogQuery } from '../services/apiSlice';
import {Container, Row, Col, Spinner} from "react-bootstrap";

function SingleBlog() {
    const { id } = useParams();
    const { data: blog, isLoading, isError } = useGetOneBlogQuery(id);

    if (isError) {
        return (
            <div className="d-flex justify-content-center py-5">
                <h1 className="text-center">An error has occurred</h1>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center py-5">
                <Spinner animation="border" />
            </div>
        );
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h1>{blog.title}</h1>
                    <p>By {blog.author.email}</p>
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </Col>
            </Row>
        </Container>
    );
}

export default SingleBlog;
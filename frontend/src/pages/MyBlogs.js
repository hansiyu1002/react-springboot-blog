import React from 'react';
import {Col, Container, Row, Spinner} from 'react-bootstrap';
import BlogPreview from '../components/BlogPreview';
import { useGetMyBlogsQuery } from '../services/apiSlice';

function MyBlogs() {
    const { data: blogs, isLoading, isError } = useGetMyBlogsQuery();
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

    if (blogs.length === 0) {
        return (
            <div className="d-flex justify-content-center py-5">
                <h1 className="text-center">You have no blog yet</h1>
            </div>
        );
    }

    return (
        <Container>
            <div className="banner">
                <h1 className="banner__title">My Blog List</h1>
            </div>

            <Row>
                <Col className="d-flex pb-4 flex-wrap gap-4">
                    { blogs.map((blog, idx) => <BlogPreview key={idx} blog={blog} />) }
                </Col>
            </Row>
        </Container>
    );
}

export default MyBlogs;
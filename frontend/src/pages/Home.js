import React from 'react';
import './Home.css'
import {useGetHotBlogsQuery} from "../services/apiSlice";
import {Col, Container, Row, Spinner} from "react-bootstrap";
import BlogPreviewHome from "../components/BlogPreviewHome";

function Home() {
    const { data: res, isLoading } = useGetHotBlogsQuery();

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center py-5">
                <Spinner animation="border" />
            </div>
        );
    }

    if (res.success === false) {
        return (
            <div className="d-flex justify-content-center py-5">
                <h1 className="text-center">An error has occurred.</h1>
            </div>
        );
    }

    if (res.data.length === 0) {
        return (
            <div className="d-flex justify-content-center py-5">
                <h1 className="text-center">Oops! Nothing right now.</h1>
            </div>
        );
    }

    return(
        <div className="home_bg_container">
            <Container>
                <Row>
                    <Col>
                        { res.data.map((blog, idx) => <BlogPreviewHome key={idx} blog={blog} />) }
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Home
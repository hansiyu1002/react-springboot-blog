import React from 'react';
import Card from 'react-bootstrap/Card';
import { LinkContainer } from 'react-router-bootstrap';
import { BsEye } from "react-icons/bs";
import {Nav} from "react-bootstrap";

function BlogPreviewHome({ blog }) {
    const { title, author, content, viewCount, id } = blog;

    return (
        <Card style={{margin: "1rem"}}>
            <Card.Body>
                <Card.Title>
                    <LinkContainer to={`/public_blog/${id}`}>
                        <Nav.Link><u>{title}</u></Nav.Link>
                    </LinkContainer>
                </Card.Title>
                <Card.Text dangerouslySetInnerHTML={{ __html: content?.substring(0, 200) + '...' }} />
                <div className="text-muted text-right">
                    <span className="float-left">
                        {'By ' + author}
                    </span>
                    <BsEye/>
                    <span>
                        {viewCount}
                    </span>
                </div>
            </Card.Body>
        </Card>
    );
}

export default BlogPreviewHome;
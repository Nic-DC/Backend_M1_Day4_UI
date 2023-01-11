import { saveAs } from "file-saver";
import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import BlogAuthor from "../blog-author/BlogAuthor";
import "./styles.css";
const BlogItem = (props) => {
  const { title, cover, author, _id } = props;

  const downloadPDF = async () => {
    const url = process.env.REACT_APP_BE_URL;
    const endpoint = `${url}/files/${_id}/pdf`;

    const res = await fetch(endpoint);
    if (res.ok) {
      const blob = await res.blob();
      saveAs(blob, "blogPost.pdf");
    }
  };

  return (
    // <Link to={`/blog/${_id}`} className="blog-link">
    <Card className="blog-card">
      <Card.Img variant="top" src={cover} className="blog-cover" />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Button onClick={() => downloadPDF()}>Download PDF</Button>
      </Card.Body>
      <Card.Footer>
        <BlogAuthor {...author} />
      </Card.Footer>
    </Card>
    // </Link>
  );
};

export default BlogItem;

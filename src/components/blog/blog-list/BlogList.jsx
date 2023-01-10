import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
// import posts from "../../../data/posts.json";
import BlogItem from "../blog-item/BlogItem";

const BlogList = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const apiUrl = process.env.REACT_APP_BE_URL;
    // const endpoint = `http://localhost:3003/blogPosts`;
    const endpoint = `${apiUrl}/blogPosts`;

    try {
      const options = {
        method: "GET",
      };

      const res = await fetch(endpoint, options);

      //if (res.ok) {
      const postData = await res.json();
      setData(postData);
      console.log("post data: ", postData);

      // }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Row>
      {data.map((post) => (
        <Col
          md={4}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem key={post.title} {...post} />
        </Col>
      ))}
    </Row>
  );
};

export default BlogList;

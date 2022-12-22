import { convertToHTML } from "draft-convert";
import { EditorState } from "draft-js";
import React, { useEffect, useState } from "react";
import { Button, Container, Form, FormControl } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.css";
const NewBlogPost = (props) => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [html, setHTML] = useState(null);
  console.log("title is: ", title);

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleImage = (event) => {
    console.log(event.target.files);
    setImage(event.target.files[0]);
  };
  console.log("The file is: ", image);

  useEffect(() => {
    console.log("editorState is: ", editorState);
    let html = convertToHTML(editorState.getCurrentContent());
    console.log("html is", html);
    setHTML(html);
  }, [editorState]);

  const handleFileUpload = async (id) => {
    const formData = new FormData();
    formData.append("cover", image);

    const endpoint = `http://localhost:3003/files/blogPosts/${id}`;

    const options = {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: formData,
    };

    const res = await fetch(endpoint, options);
    const data = await res.json();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = `http://localhost:3003/blogPosts`;

    try {
      const post = {
        category: category,
        title: title,
        content: html,
      };
      console.log("the post is: ", post);

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      };
      const res = await fetch(endpoint, options);

      //if (res.ok) {
      const postData = await res.json();
      console.log("post data: ", postData);
      handleFileUpload(postData.id);

      // }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="new-blog-container">
      <Form className="mt-5" onSubmit={(e) => handleSubmit(e)}>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Title</Form.Label>
          <Form.Control size="lg" placeholder="Title" value={title} onChange={(e) => handleTitle(e)} />
        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control size="lg" as="select" value={category} onChange={(e) => handleCategory(e)}>
            <option>Category1</option>
            <option>Category2</option>
            <option>Category3</option>
            <option>Category4</option>
            <option>Category5</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Blog Content</Form.Label>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={setEditorState}
          />
        </Form.Group>
        <Form.Group controlId="image-content" className="mt-3">
          <Form.Label>Upload Image</Form.Label>
          <FormControl type="file" onChange={(e) => handleImage(e)}></FormControl>
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
          >
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;

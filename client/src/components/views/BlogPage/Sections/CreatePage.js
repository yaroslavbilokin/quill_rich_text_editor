import React, { useState } from 'react';
import { Typography, Button, Form, message } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import QuillEditor from '../../../editor/QuillEditor'
const { Title } = Typography;

function CreatePage() {
    const [content, setContent] = useState("");
    const [files, setFiles] = useState([]);
    const user = useSelector(state => state.user);

    const onEditorChange = (value) => {
        setContent(value);
    };

    const onFilesChange = (files) => {
        setFiles(files);
    }

    const onSubmit = (event) => {
        event.preventDefault();

        setContent('');

        if (user.userData && !user.userData.isAuth) {
            return alert('Please Log in first!');
        }

        const variables = {
            content: content,
            userID: user.userData._id
        };

        axios.post('/api/blog/createPost', variables)
            .then(response => {
                console.log(response)
            });
    }
    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <Title level={2} > Editor</Title>
            </div>
            <QuillEditor
                placeholder={"Start Posting Something"}
                onEditorChange={onEditorChange}
                onFilesChange={onFilesChange}
            />

            <Form onSubmit={onSubmit}>
                <div style={{ textAlign: 'center', margin: '2rem', }}>
                    <Button
                        size="large"
                        htmlType="submit"
                        className=""
                        onSubmit={onSubmit}
                    >
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default CreatePage;
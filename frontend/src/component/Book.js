import React, { useState, useEffect } from "react";
import { Form, Input, Button, DatePicker } from 'antd';
import axios from 'axios';
import { Redirect, withRouter } from "react-router-dom";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const Book = (props) => {
    const onFinish = async (values) => {
        console.log('Success:', values);
        const response = await axios.post('/books', values);
        if (response.data.success) {
            props.history.push(`/books`);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Please input book name!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Author"
                name="author"
                rules={[
                    {
                        required: true,
                        message: 'Please input book\'s author name!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item label="DatePicker" name="date">
                <DatePicker />
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" >
                    Create
                </Button>
            </Form.Item>
        </Form>
    );
};

export default withRouter(Book);
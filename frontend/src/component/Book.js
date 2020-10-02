import React, { useState, useEffect } from "react";
import { Form, Input, Button, DatePicker } from 'antd';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import moment from 'moment';

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
    const onCreate = async (values) => {
        console.log('Success:', values);
        const response = await axios.post('/books', values);
        if (response.data.success) {
            props.history.push(`/books`);
        }
    };

    const onEdit = async (values) => {
        console.log('Success:', values);
        // const response = await axios.post('/books', values);
        // if (response.data.success) {
        //     props.history.push(`/books`);
        // }
    };

    const newBook = props.new;

    const [form] = Form.useForm();


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {

        const getData = async () => {
            const response = await axios.get('/books/' + props.match.params.id);
            var newData = response.data;
            newData.date = new Date(newData.date)
            console.log(newData);
            form.setFieldsValue({
                name: newData.name,
                author: newData.author,
                date: moment(newData.date)
            });
        }

        if (!newBook) {
            getData();
        }
    }, []);

    return (
        <div>
            <Form
                {...layout}
                name="basic"
                form={form}
                onFinish={newBook ? onCreate : onEdit}
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
                        {newBook ? "Create" : "Edit"}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default withRouter(Book);
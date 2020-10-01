import React, { useState, useEffect } from "react";
import { Table, Button } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import "./BookList.css"
import { withRouter } from "react-router-dom";

const BookList = (props) => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
        },
    ];

    const redirectToCreate = () => {
        props.history.push(`/books/create`);
    }

    const [books, setBooks] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const response = await (await fetch('/books')).json();
            console.log(response);
            setBooks(response.map(obj => ({
                ...obj, action: [
                    <Button className="button" type="primary" danger icon={<DeleteOutlined />} />,
                    <Button className="button" type="primary" icon={<EditOutlined />} />
                ]
            })));
        }

        getData();
    }, [])

    return (
        <div className="BookList.content">
            <Button
                className="button-header"
                type="primary"
                icon={<PlusOutlined />}
                onClick={redirectToCreate}
            >
                Create
            </Button>
            <Table dataSource={books} columns={columns} />
        </div>
    );
}

export default withRouter(BookList);
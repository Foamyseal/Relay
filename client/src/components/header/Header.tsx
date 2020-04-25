import React from 'react';
import { Layout, Menu, Row, Col, Input, Button } from 'antd';
import SearchBar from './SearchBar';
import Profile from './Profile';

import Chat from '../Chat/Chat';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const HeaderBar = () => {
    return (
        <Header id="header" style={{ zIndex: 1, width: '100%' }}>
            <Row>
                <Col span={3}> 
                <Button type="link" ghost>
                            <Link to="/"> RELAY</Link>
                        </Button> </Col>
                <Col span={20}>
                    {' '}
                    <SearchBar />{' '}
                </Col>
                <Col span={1}>
                    {' '}
                    <Profile />{' '}
                </Col>
            </Row>
        </Header>
    );
};

export default HeaderBar
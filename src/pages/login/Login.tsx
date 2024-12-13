import './Login.css';

import {FC, FormEventHandler, useEffect, useState} from "react";
import {useAuth} from "../../feature/provider/AuthProvider.tsx";
import {Card, Form, Button, Container, Row, Col} from "react-bootstrap";
import {toastError} from "../../feature/utils/toast.tsx";
import {useData} from "../../feature/provider/DataProvider.tsx";

export const Login: FC = () => {
    const {dispatch} = useData();
    const [load, setLoad] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [tryLogin, setTryLogin] = useState(false);
    const {authentication, setAuthentication} = useAuth();

    const login: FormEventHandler = async event => {
        event.preventDefault();
        if(authentication || tryLogin){
            return;
        }

        const message = <>서버 접속에 실패했습니다.<br/>잠시 후 다시 시도합니다.</>;
        try{
            setTryLogin(true);
            const res = await fetch(`/login/account`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, password}),
                credentials: 'include',
            });
            const jsonData = await res.json();
            if(res.ok){
                setAuthentication(true);
                dispatch({key: 'profile', value: jsonData})
            }else{
                toastError(message);
            }
        }catch(error){
            toastError(message);
            console.error('Login failed:', error);
        }
        setTryLogin(false);
    };

    useEffect(() => {
        document.body.classList.add("login-theme");
        document.documentElement.classList.add("login-theme");
        setLoad(true);
        return () => {
            document.body.classList.remove("login-theme");
            document.documentElement.classList.remove("login-theme");
        };
    }, []);

    if(!load){
        return <></>;
    }
    return (
        <Container fluid className="d-flex align-items-center justify-content-center vh-100">
            <Row>
                <Col>
                    <Card className="shadow" style={{ width: '22rem', borderRadius: '20px', padding: '20px' }}>
                        <Card.Body>
                            <h3 className="text-center mb-4">IoT Management</h3>
                            <Form onSubmit={login}>
                                <Form.Group controlId="username" className="mb-3">
                                    <Form.Label>사용자명</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="사용자명"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="password" className="mb-3">
                                    <Form.Label>비밀번호</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="비밀번호"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100">
                                    로그인
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
import { KeyOutlined, SafetyOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Form, Input, Row, Typography } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import Topbar from '../../components/Topbar'
import { LoginAPI } from './API/LoginAPI'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { login } from '../../store/slices/authSlice'

const { Text } = Typography;

export default function Login() {
    const [form] = Form.useForm()
    const dispatch = useDispatch()

    // State
    const [stuIdHasError, setStuIdHasError] = useState(false);
    const [pwdHasError, setPwdHasError] = useState(false);
    const [messageError, setMessageError] = useState(null);

    // Ref
    const stuIdRef = useRef(null);
    const passwordRef = useRef(null);

    const navigate = useNavigate();

    const onLogin = async (dataOnSubmit) => {
        const result = await LoginAPI(dataOnSubmit)
        if(result.status === 200) {
            dispatch(login({token: result.data.access_token}))
            // sessionStorage.setItem('token', result.data.access_token)
            navigate('/')
        }else if (result.status === 403) {
            if(result.data.message.includes("ไม่พบข้อมูล")) {
                setStuIdHasError(true)
                setPwdHasError(false)
                stuIdRef.current.focus()
            }else if(result.data.message.includes("รหัสผ่านไม่")) {
                setStuIdHasError(false)
                setPwdHasError(true)
                passwordRef.current.focus()
            }
            setMessageError(result.data.message)
        }
    }

    useEffect(() => {
        document.body.style.background = "#f7f7f7"
    }, [])

    return (
        <div>
            <Topbar />
            <section className='mx-auto w-9/12 lg:w-7/12 xl:w-7/12 mb-5 bg-white shadow-md rounded-lg min-h-fit mt-20'>
                <div className='flex justify-between'>
                    <div className='w-2/2 lg:w-1/2 xl:w-1/2 xl:p-20 lg:p-20 p-11'>
                        <Form form={form} onFinish={onLogin}>
                            <Row>
                                <Col span={24}>
                                    <h1 className='text-3xl font-bold flex justify-center items-center'>
                                        <SafetyOutlined style={{ color: "green" }} />
                                        <span className='pl-2'>เข้าสู่ระบบ</span>
                                    </h1>
                                </Col>
                                <Col span={24}><Divider style={{ margin: 0 }} /></Col>
                                <Col span={24}>
                                    <Form.Item
                                        name="stuId"
                                        style={{ marginBottom: 5, marginTop: 5 }}
                                        labelCol={{ span: 24, style: { paddingBottom: 0 } }}
                                        label={<label className='text-gray-500'>รหัสนักศึกษา</label>}
                                        rules={[
                                            {
                                                required: true,
                                                message: "กรุณากรอกรหัสนักศึกษา"
                                            }
                                        ]}
                                    >
                                        <Input
                                            ref={stuIdRef}
                                            status={stuIdHasError ? 'error' : ""}
                                            size='large'
                                            onChange={() => setStuIdHasError(false)}
                                            onPressEnter={(ev) => {
                                                if(ev.code === "Enter" || ev.code === "NumpadEnter") {
                                                    form.submit()
                                                }
                                            }}
                                            prefix={<UserOutlined style={{ color: 'gray' }} />}
                                            placeholder='รหัสนักศึกษา'
                                        />
                                    </Form.Item>
                                    <AnimatePresence>
                                        {stuIdHasError
                                            ?
                                                <motion.div
                                                    initial={{ x: 0, y: -10, opacity: 0 }}
                                                    animate={{ x: 0, y: 0, opacity: 1 }}
                                                    exit={{ x: 0, y: -10, opacity: 0 }}
                                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                                >
                                                    <Text type="danger">{messageError}</Text>
                                                </motion.div>
                                            : null
                                        }
                                    </AnimatePresence>
                                </Col>
                                <Col span={24}>
                                    <Form.Item
                                        name="password"
                                        style={{ marginBottom: 5, marginTop: 5 }}
                                        labelCol={{ span: 24, style: { paddingBottom: 0 } }}
                                        label={<label className='text-gray-500'>รหัสผ่าน</label>}
                                        rules={[
                                            {
                                                required: true,
                                                message: "กรุณากรอกรหัสผ่าน"
                                            }
                                        ]}
                                    >
                                        <Input
                                            ref={passwordRef}
                                            size='large'
                                            status={pwdHasError ? 'error' : ""}
                                            onPressEnter={(ev) => {
                                                if(ev.code === "Enter" || ev.code === "NumpadEnter") {
                                                    form.submit()
                                                }
                                            }}
                                            type='password'
                                            onChange={() => setPwdHasError(false)}
                                            placeholder='รหัสผ่าน'
                                            prefix={<KeyOutlined style={{ color: 'gray' }} />}
                                        />
                                    </Form.Item>
                                    <AnimatePresence>
                                        {pwdHasError
                                            ?
                                                <motion.div
                                                    initial={{ x: 0, y: -10, opacity: 0 }}
                                                    animate={{ x: 0, y: 0, opacity: 1 }}
                                                    exit={{ x: 0, y: -10, opacity: 0 }}
                                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                                >
                                                    <Text type="danger">{messageError}</Text>
                                                </motion.div>
                                            : null
                                        }
                                    </AnimatePresence>
                                </Col>
                                <Col span={24} style={{ marginTop: 17 }}>
                                    <Button type='primary' onClick={() => { form.submit() }} size='large' block>เข้าสู่ระบบ</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                    <div className='hidden lg:block xl:block w-1/2'>
                        <img alt="login" width={"100%"} height={'100%'} src="https://www.gossipto.com/loginimg.jpg" />
                    </div>
                </div>
            </section>
        </div>
    )
}

import React, { useState } from 'react'
import Topbar from '../../components/Topbar'
import { motion } from 'framer-motion'
import { Avatar, Breadcrumb, Button, Col, Collapse, Divider, Form, Input, Row, Select, Upload, Spin } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { authSelector } from '../../store/slices/authSlice'

const { Panel } = Collapse;
const { Option } = Select;

export default function AddListLostItem() {
    const [formCurrentUser] = Form.useForm();
    const authReducer = useSelector(authSelector);

    const [activeKey, setActiveKey] = useState(1);
    const [reload, setReload] = useState(false);

    // IsSuccess
    const [isLoadingProfile, setIsLoadingProfile] = useState(false);

    // stateUpdate
    const [isUpdateProfile, setIsUpdateProfile] = useState(false);
    const [userImg, setUserImg] = useState(null);

    const onFinishCurrentUser = () => {

    }

    const navigate = useNavigate();
    return (
        <div>
            <Topbar />
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >

                <div className='mx-auto w-10/12 mt-10 min-h-fit'>
                    <div className='flex flex-col xl:flex-row lg:flex-row justify-center xl:justify-between lg:justify-between gap-1 xl:gap-2 lg:gap-2 mb-1'>
                        <div className='flex flex-col xl:flex-row items-center lg:flex-row gap-1 xl:gap-2 lg:gap-2'>
                            <Button
                                size='middle'
                                icon={<i className="fa-solid fa-angle-left"></i>}
                                onClick={() => navigate('/')}
                            >
                                &nbsp; ย้อนกลับ
                            </Button>
                            <Divider type='vertical' />
                            <Breadcrumb>
                                <Breadcrumb.Item>หน้าแรก</Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    <a href="/#">รายการประกาศของหาย</a>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    <a href="/#">เพิ่มรายการประกาศของหาย</a>
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>

                    </div>
                    <section className='p-6 bg-white shadow-xl rounded-lg  '>
                        <div className='flex flex-col xl:flex-row lg:flex-row lg:justify-between xl:justify-between'>
                            <h1 className='text-3xl m-0 text-center mb-5 lg:mb-0 xl:mb-0'>เพิ่มรายการประกาศตามหาของหาย</h1>
                            <Button size='large' type='primary' icon={<i className="fa-solid fa-floppy-disk"></i>}>&nbsp; บันทึก</Button>
                        </div>
                        <Divider />
                        <Form>
                            <Row gutter={[8, 8]} align="top">
                                {authReducer.isLoggedIn ? (
                                    <Col xl={24}>
                                        <Collapse activeKey={[activeKey]} bordered={true}>
                                            <Panel
                                                showArrow={false}
                                                header={
                                                    <label className="text-purple-800">
                                                        ข้อมูลผู้ประกาศ
                                                    </label>
                                                }
                                                extra={
                                                    <>
                                                        {isUpdateProfile ? (
                                                            <Button
                                                                loading={isLoadingProfile}
                                                                type="primary"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    setIsUpdateProfile(false);
                                                                    setActiveKey(1);
                                                                    setReload(!reload);

                                                                    formCurrentUser.submit();
                                                                }}
                                                            >
                                                                บันทึกข้อมูลส่วนตัว
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                type="button"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    setIsUpdateProfile(true);
                                                                    setActiveKey(1);
                                                                    setReload(!reload);
                                                                }}
                                                            >
                                                                แก้ไข
                                                            </Button>
                                                        )}
                                                    </>
                                                }
                                                key="1"
                                            >
                                                <Spin
                                                    spinning={isLoadingProfile}
                                                    tip={"กำลังบันทึกข้อมูล"}
                                                    size="large"
                                                >
                                                    <Form
                                                        form={formCurrentUser}
                                                        onFinish={() => onFinishCurrentUser()}
                                                    >
                                                        <Row gutter={[0, 6]}>
                                                            <Col xl={2}>
                                                                <Form.Item name="file">
                                                                    {isUpdateProfile ? (
                                                                        <Upload
                                                                            multiple={false}
                                                                            maxCount={1}
                                                                            showUploadList={false}
                                                                            accept={".jpg,.jpeg,.png"}
                                                                            beforeUpload={(file) => {
                                                                                console.log(file);
                                                                                const reader = new FileReader();

                                                                                reader.onload = (e) => {
                                                                                    setUserImg(e.target.result);
                                                                                };
                                                                                reader.readAsDataURL(file);

                                                                                // Prevent upload
                                                                                return false;
                                                                            }}
                                                                        >
                                                                            {userImg ? (
                                                                                <Avatar
                                                                                    size={80}
                                                                                    src={userImg}
                                                                                    icon={
                                                                                        <i className="fa-solid fa-user-astronaut"></i>
                                                                                    }
                                                                                />
                                                                            ) : (
                                                                                <Avatar
                                                                                    size={80}
                                                                                    icon={
                                                                                        <i className="fa-solid fa-user-astronaut"></i>
                                                                                    }
                                                                                />
                                                                            )}
                                                                        </Upload>
                                                                    ) : userImg ? (
                                                                        <Avatar
                                                                            size={80}
                                                                            src={userImg}
                                                                            icon={
                                                                                <i className="fa-solid fa-user-astronaut"></i>
                                                                            }
                                                                        />
                                                                    ) : (
                                                                        <Avatar
                                                                            size={80}
                                                                            icon={
                                                                                <i className="fa-solid fa-user-astronaut"></i>
                                                                            }
                                                                        />
                                                                    )}
                                                                </Form.Item>
                                                            </Col>
                                                            <Col xl={22}>
                                                                <Row gutter={[6, 6]}>
                                                                    <Col xl={8}>
                                                                        <Form.Item
                                                                            style={{ marginBottom: 5 }}
                                                                            name="firstName"
                                                                            rules={[
                                                                                {
                                                                                    required: true,
                                                                                    message: "กรุณากรอกชื่อ",
                                                                                },
                                                                            ]}
                                                                        >
                                                                            <Input
                                                                                placeholder="ชื่อ"
                                                                                disabled={!isUpdateProfile}
                                                                            />
                                                                        </Form.Item>
                                                                    </Col>
                                                                    <Col xl={8}>
                                                                        <Form.Item
                                                                            style={{ marginBottom: 5 }}
                                                                            name="lastName"
                                                                            rules={[
                                                                                {
                                                                                    required: true,
                                                                                    message: "กรุณากรอกนามสกุล",
                                                                                },
                                                                            ]}
                                                                        >
                                                                            <Input
                                                                                placeholder="นามสกุล"
                                                                                disabled={!isUpdateProfile}
                                                                            />
                                                                        </Form.Item>
                                                                    </Col>
                                                                    <Col xl={8}>
                                                                        <Form.Item
                                                                            style={{ marginBottom: 5 }}
                                                                            name="phone"
                                                                            rules={[
                                                                                {
                                                                                    required: true,
                                                                                    message: "กรุณากรอกเบอร์โทร",
                                                                                },
                                                                            ]}
                                                                        >
                                                                            <Input
                                                                                prefix={
                                                                                    <i className="fa-solid fa-phone text-green-500"></i>
                                                                                }
                                                                                placeholder="เบอร์โทร"
                                                                                disabled={!isUpdateProfile}
                                                                            />
                                                                        </Form.Item>
                                                                    </Col>
                                                                    <Col xl={8}>
                                                                        <Form.Item name="email">
                                                                            <Input
                                                                                placeholder="Email"
                                                                                disabled={!isUpdateProfile}
                                                                            />
                                                                        </Form.Item>
                                                                    </Col>
                                                                    <Col xl={8}>
                                                                        <Form.Item name="lineId">
                                                                            <Input
                                                                                prefix={
                                                                                    <i className="fa-brands fa-line text-green-400"></i>
                                                                                }
                                                                                placeholder="Line (ใส่หรือไม่ก็ได้)"
                                                                                disabled={!isUpdateProfile}
                                                                            />
                                                                        </Form.Item>
                                                                    </Col>
                                                                    <Col xl={8}>
                                                                        <Form.Item name="facebookUrl">
                                                                            <Input
                                                                                prefix={
                                                                                    <i className="fa-brands fa-facebook text-blue-400"></i>
                                                                                }
                                                                                placeholder="Facebook (ใส่หรือไม่ก็ได้)"
                                                                                disabled={!isUpdateProfile}
                                                                            />
                                                                        </Form.Item>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                    </Form>
                                                </Spin>
                                            </Panel>
                                        </Collapse>
                                    </Col>
                                ) : null}
                                <Col xl={12} style={{ marginTop: 10 }}>
                                    <Row gutter={[0, 0]}>
                                        <Col xl={24}>
                                            <Form.Item

                                                label={<label className='text-purple-600 font-bold'>ชื่อประกาศ</label>}
                                                labelCol={{ span: 24 }}
                                            >
                                                <Input
                                                    style={{ width: '100%' }}
                                                    size='large'
                                                    placeholder="ชื่อประกาศ"
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xl={24}>
                                            <Form.Item
                                                style={{ marginBottom: 9 }}
                                                label={<label className='text-purple-600 font-bold'>วิทยาเขต</label>}
                                                labelCol={{ span: 24 }}
                                            >
                                                <Select
                                                    size='large'
                                                    placeholder="เลือกวิทยาเขต"
                                                >
                                                    <Option>ทดสอบ</Option>
                                                    <Option>ทดสอบ////</Option>
                                                    <Option>อื่น ๆ</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xl={24}>
                                            <Form.Item
                                                labelCol={{ span: 24 }}
                                                label={<label className='text-purple-600 font-bold'>อัพโหลดรูปภาพ</label>}
                                            >
                                                <Upload
                                                    multiple={false}
                                                    maxCount={1}
                                                >
                                                    <Button icon={<UploadOutlined />}>อัพโหลดรูปภาพ</Button>
                                                </Upload>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xl={12} style={{ marginTop: 10 }}>
                                    <Row>
                                        <Col xl={24}>
                                            <Form.Item
                                                label={<label className='text-purple-600 font-bold'>รายละเอียด</label>}
                                                labelCol={{ span: 24 }}
                                            >
                                                <TextArea
                                                    placeholder='รายละเอียด'
                                                    autoSize={{
                                                        minRows: 10,
                                                        maxRows: 12,
                                                    }}
                                                    size='large'
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Form>
                    </section>
                </div>
            </motion.div>
        </div>
    )
}

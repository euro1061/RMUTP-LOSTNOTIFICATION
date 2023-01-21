import React, { useEffect, useState } from 'react'
import Topbar from '../../components/Topbar'
import { Avatar, Card, Col, Divider, Form, Image, Row, Select, Input, Button, Upload, notification, Spin } from 'antd'
import { CloudUploadOutlined, SaveOutlined } from '@ant-design/icons';
import { getAllDepartment, getAllPrefix } from './API/ProfileAPI';
import { getUserCurrentAPI } from '../../util/Functions/userFunction';
import axios from 'axios';

const { Option } = Select;
export default function Profile() {
    const [formUser] = Form.useForm();
    const [prefixList, setPrefixList] = useState([]);
    const [userImg, setUserImg] = useState("");
    const [user, setUser] = useState({})
    const [departmentList, setDepartmentList] = useState([]);
    const [saveLoadingEdit, setSaveLoadingEdit] = useState(false);
    const [userImgOldEdit, setUserImgOldEdit] = useState(null);

    const GetUserCurrent = async () => {
        const res = await getUserCurrentAPI()
        if (res) {
            setUser(res)
            setUserImg(res.urlPicture)
            setUserImgOldEdit(res.urlPicture)
            formUser.setFieldsValue({
                ...res,
                prefix_id: `${res.prefix_id}`,
                department_id: `${res.department_id}`,
            })
        }
    }

    const GetAllPrefix = async () => {
        const { isSuccess, responseData } = await getAllPrefix();
        if (isSuccess) {
            setPrefixList(responseData)
        }
    }

    const GetAllDepartment = async () => {
        const { isSuccess, responseData } = await getAllDepartment();
        if (isSuccess) {
            setDepartmentList(responseData)
        }
    }
    const onFinishUser = async () => {
        setSaveLoadingEdit(true)
        const data = formUser.getFieldValue();
        // console.log(data);
        const request = {
            ...data,
            userId: `${user.id}`,
            file: data?.file ? data?.file?.file : null,
            urlPicture: userImgOldEdit,
        }
        try {
            const { data } = await axios.patch(
                `${process.env.REACT_APP_DOMAINENDPOINT}/api/users/editProfileAdmin`,
                request,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            const { isSuccess, message } = data;
            if (isSuccess) {
                notification['success']({
                    message: 'บันทึกข้อมูลสำเร็จ',
                    description: 'บันทึกข้อมูลสำเร็จ',
                })
                GetUserCurrent()
                setSaveLoadingEdit(false)
            } else {
                notification['error']({
                    message: 'บันทึกข้อมูลไม่สำเร็จ',
                    description: message,
                })
                setSaveLoadingEdit(false)
            }
        } catch (error) {
            const { data } = error.response
            if (data.statusCode === 403) {
                notification['error']({
                    message: "บันทึกไม่สำเร็จ",
                    description: "มีข้อมูลผู้ใช้งานนี้อยู่ในระบบแล้ว"
                })
            }
            setSaveLoadingEdit(false)
        }
    }

    useEffect(() => {
        GetAllPrefix()
        GetAllDepartment()
        GetUserCurrent()
    }, [])

    return (
        <div>
            <Topbar />
            <div className="mx-auto w-10/12 mt-10 min-h-fit">
                <Card
                    title={<h1 className='text-3xl mb-0 pb-0 text-center font-bold'>ข้อมูลส่วนตัว</h1>}
                    bordered={true}
                >
                    <Spin spinning={saveLoadingEdit} tip="กำลังบันทึก" size='large'>
                        <Row>
                            <Col xl={4}>
                                <div className='flex flex-col justify-center items-center'>
                                    <Avatar
                                        size={200}
                                        src={
                                            <Image
                                                src={userImg}
                                            />
                                        }
                                        icon={
                                            <i className="fa-solid fa-user-astronaut"></i>
                                        }
                                        style={{ marginBottom: 18 }}
                                    />
                                    <Form form={formUser} onFinish={onFinishUser}>
                                        <Form.Item
                                            name="file"
                                            style={{ marginBottom: 0 }}
                                        >
                                            <Upload
                                                multiple={false}
                                                maxCount={1}
                                                showUploadList={false}
                                                accept={".jpg,.jpeg,.png"}
                                                beforeUpload={(file) => {
                                                    const reader = new FileReader();

                                                    reader.onload = (e) => {
                                                        setUserImg(e.target.result);
                                                    };
                                                    reader.readAsDataURL(file);

                                                    // Prevent upload
                                                    return false;
                                                }}
                                            >
                                                <Button
                                                    loading={saveLoadingEdit}
                                                    icon={<CloudUploadOutlined />}
                                                >
                                                    อัพโหลดรูปภาพ
                                                </Button>
                                            </Upload>
                                        </Form.Item>
                                    </Form>
                                    <h2 className='text-2xl mt-4'>{user.firstName} {user.lastName}</h2>
                                    <p className='text-xl text-primaryTheme'>{user.stuId}</p>
                                </div>
                            </Col>
                            <Col xl={1}>
                                <Divider type='vertical' style={{ height: "100%" }} />
                            </Col>
                            <Col xl={19}>
                                <Form form={formUser} onFinish={onFinishUser}>
                                    <Row gutter={[8, 8]}>
                                        <Col xl={5}>
                                            <Form.Item
                                                name="prefix_id"
                                                label={<label className=' font-semibold text-primaryTheme'>คำนำหน้า</label>}
                                                labelCol={{ span: 24, style: { padding: 0 } }}
                                                wrapperCol={{ span: 24 }}
                                                style={{ marginBottom: 0 }}
                                                rules={
                                                    [
                                                        {
                                                            required: true,
                                                            message: 'กรุณาเลือกคำนำหน้า'
                                                        }
                                                    ]
                                                }
                                            >
                                                <Select
                                                    size='large'
                                                    showSearch
                                                    placeholder="เลือก"
                                                    optionFilterProp="children"
                                                    filterOption={(input, option) =>
                                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                    }
                                                >
                                                    {prefixList.map(prefix => (
                                                        <Option value={`${prefix.id}`} key={prefix.id}>{prefix.prefixTh}</Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                        </Col>

                                        <Col xl={10}>
                                            <Form.Item
                                                label={<label className=' font-semibold text-primaryTheme'>ชื่อ</label>}
                                                labelCol={{ span: 24, style: { padding: 0 } }}
                                                wrapperCol={{ span: 24 }}
                                                style={{ marginBottom: 0 }}
                                                rules={
                                                    [
                                                        {
                                                            required: true,
                                                            message: 'กรุณากรอกชื่อ'
                                                        }
                                                    ]
                                                }
                                                name="firstName"
                                            >
                                                <Input
                                                    size='large'
                                                    placeholder='ชื่อจริง'
                                                />
                                            </Form.Item>
                                        </Col>

                                        <Col xl={9}>
                                            <Form.Item
                                                name="lastName"
                                                label={<label className=' font-semibold text-primaryTheme'>นามสกุล</label>}
                                                labelCol={{ span: 24, style: { padding: 0 } }}
                                                wrapperCol={{ span: 24 }}
                                                style={{ marginBottom: 0 }}
                                                rules={
                                                    [
                                                        {
                                                            required: true,
                                                            message: 'กรุณากรอกนามสกุล'
                                                        }
                                                    ]
                                                }
                                            >
                                                <Input
                                                    size='large'
                                                    placeholder='นามสกุล'
                                                />
                                            </Form.Item>
                                        </Col>

                                        <Col xl={8}>
                                            <Form.Item
                                                name="department_id"
                                                label={<label className=' font-semibold text-primaryTheme'>คณะ</label>}
                                                labelCol={{ span: 24, style: { padding: 0 } }}
                                                wrapperCol={{ span: 24 }}
                                                style={{ marginBottom: 0 }}
                                                rules={
                                                    [
                                                        {
                                                            required: true,
                                                            message: 'กรุณาเลือกคณะ'
                                                        }
                                                    ]
                                                }
                                            >
                                                <Select
                                                    size='large'
                                                    showSearch
                                                    placeholder="เลือก"
                                                    optionFilterProp="children"
                                                    filterOption={(input, option) =>
                                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                    }
                                                >
                                                    {departmentList.map(department => (
                                                        <Option value={`${department.id}`} key={department.id}>{department.departmentTh}</Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                        </Col>

                                        <Col xl={8}>
                                            <Form.Item
                                                name="phone"
                                                label={<label className=' font-semibold text-primaryTheme'>เบอร์โทร</label>}
                                                labelCol={{ span: 24, style: { padding: 0 } }}
                                                wrapperCol={{ span: 24 }}
                                                style={{ marginBottom: 0 }}
                                            >
                                                <Input
                                                    size='large'
                                                    placeholder='เบอร์โทร'
                                                />
                                            </Form.Item>
                                        </Col>

                                        <Col xl={8}>
                                            <Form.Item
                                                name="email"
                                                label={<label className=' font-semibold text-primaryTheme'>E-Mail</label>}
                                                labelCol={{ span: 24, style: { padding: 0 } }}
                                                wrapperCol={{ span: 24 }}
                                                style={{ marginBottom: 0 }}
                                            >
                                                <Input
                                                    size='large'
                                                    type='email'
                                                    placeholder='E-Mail'
                                                />
                                            </Form.Item>
                                        </Col>

                                        <Col xl={12}>
                                            <Form.Item
                                                name="lineId"
                                                label={<label className=' font-semibold text-primaryTheme'>Line ID</label>}
                                                labelCol={{ span: 24, style: { padding: 0 } }}
                                                wrapperCol={{ span: 24 }}
                                                style={{ marginBottom: 0 }}
                                            >
                                                <Input
                                                    size='large'
                                                    placeholder='Line ID'
                                                />
                                            </Form.Item>
                                        </Col>

                                        <Col xl={12}>
                                            <Form.Item
                                                name="facebookUrl"
                                                label={<label className=' font-semibold text-primaryTheme'>Facebook</label>}
                                                labelCol={{ span: 24, style: { padding: 0 } }}
                                                wrapperCol={{ span: 24 }}
                                                style={{ marginBottom: 0 }}
                                            >
                                                <Input
                                                    size="large"
                                                    placeholder='Facebook'
                                                />
                                            </Form.Item>
                                        </Col>

                                        <Col xl={24}>
                                            <div className='mt-5'>
                                                <Button
                                                    block
                                                    type='primary'
                                                    size="large"
                                                    icon={<SaveOutlined style={{ display: 'inline-grid' }} />}
                                                    onClick={() => formUser.submit()}
                                                >
                                                    บันทึกข้อมูล
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                    </Spin>
                </Card>
            </div>

        </div>
    )
}

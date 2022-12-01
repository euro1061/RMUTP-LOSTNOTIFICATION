
import { ClearOutlined, CloudUploadOutlined, IdcardOutlined, LockOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Layout, Input, Table, Modal, Avatar, Divider, Row, Col, Form, Select, Upload, notification, Spin, Tag } from 'antd';
import React, { useEffect, useState } from 'react'
import { getAllDepartment, getAllPrefix, getAllRole, getAllUsers } from './API/AdminUserAPI';
import axios from 'axios';

const { Content } = Layout;
const { Search } = Input;
const { Column } = Table;
const { Option } = Select;

export default function AdminUser() {
    const [formUser] = Form.useForm();
    const [formUserEdit] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [prefixList, setPrefixList] = useState([]);
    const [departmentList, setDepartmentList] = useState([]);
    const [roleList, setRoleList] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const [userImg, setUserImg] = useState(null);
    const [userImgEdit, setUserImgEdit] = useState(null);
    const [userImgOldEdit, setUserImgOldEdit] = useState(null);
    const [saveLoading, setSaveLoading] = useState(false);
    const [saveLoadingEdit, setSaveLoadingEdit] = useState(false);
    const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false)

    const showModal = () => {
        setIsModalOpen(true);
    };

    const showModalEdit = (record) => {
        setIsModalVisibleEdit(true);
        setUserImgEdit(record.urlPicture)
        setUserImgOldEdit(record.urlPicture)
        formUserEdit.setFieldsValue({
            stuId: record.stuId,
            prefix_id: `${record.prefix_id}`,
            firstName: record.firstName,
            lastName: record.lastName,
            department_id: `${record.department_id}`,
            phone: record.phone,
            email: record.email,
            role_id: `${record.role_id}`,
            lineId: record.lineId,
            facebookUrl: record.facebookUrl,
        })
    };

    const handleOk = () => {
        formUser.submit()
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleOkEdit = () => {
        setIsModalVisibleEdit(false)
    };
    const handleCancelEdit = () => {
        setIsModalVisibleEdit(false);
        formUserEdit.resetFields();
        setUserImgEdit(null);
        setUserImgOldEdit(null);
    };

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

    const GetAllRole = async () => {
        const { isSuccess, responseData } = await getAllRole();
        if (isSuccess) {
            setRoleList(responseData)
        }
    }

    const GetAllUsers = async (search) => {
        const { isSuccess, responseData } = await getAllUsers(search || "xx456789");
        if (isSuccess) {
            const cleanUsersDataToTable = responseData.map(item => {
                return {
                    id: item.id,
                    prefix: item.Prefix.prefixTh,
                    fullName: item.Prefix.prefixTh + "" + item.firstName + " " + item.lastName,
                    firstName: item.firstName,
                    lastName: item.lastName,
                    department: item.Department.departmentTh,
                    role: item.Role.role_th,
                    urlPicture: item.urlPicture,
                    phone: item.phone,
                    key: item.id,
                    email: item.email,
                    stuId: item.stuId,
                    prefix_id: item.Prefix.id,
                    department_id: item.Department.id,
                    role_id: item.Role.id,
                    lineId: item.lineId,
                    facebookUrl: item.facebookUrl,
                }
            })
            setUsersList(cleanUsersDataToTable)
        }
    }

    const onFinishUser = async () => {
        setSaveLoading(true)
        const data = formUser.getFieldValue();
        const request = {
            ...data,
            file: data?.file?.file,
        }
        try {
            const resSave = await axios.post(
                `${process.env.REACT_APP_DOMAINENDPOINT}/api/auth/signup`,
                request,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (resSave) {
                setIsModalOpen(false)
                notification['success']({
                    message: 'บันทึกข้อมูลสำเร็จ',
                    description: 'บันทึกข้อมูลสำเร็จ',
                })
                GetAllUsers("")
                setSaveLoading(false)
                formUser.resetFields()
                setUserImg(null)
            }
        } catch (error) {
            const { data } = error.response
            if (data.statusCode === 403) {
                notification['error']({
                    message: "บันทึกไม่สำเร็จ",
                    description: "มีข้อมูลผู้ใช้งานนี้อยู่ในระบบแล้ว"
                })
            }
            setSaveLoading(false)
        }
    }

    const onFinishUserEdit = async () => {
        // setSaveLoading(true)
        const data = formUserEdit.getFieldValue();
        console.log(data);
        // const request = {
        //     ...data,
        //     file: data?.file?.file,
        // }
        // try {
        //     const resSave = await axios.post(
        //         `${process.env.REACT_APP_DOMAINENDPOINT}/api/auth/signup`,
        //         request,
        //         {
        //             headers: {
        //                 "Content-Type": "multipart/form-data",
        //             },
        //         }
        //     );

        //     if (resSave) {
        //         setIsModalOpen(false)
        //         notification['success']({
        //             message: 'บันทึกข้อมูลสำเร็จ',
        //             description: 'บันทึกข้อมูลสำเร็จ',
        //         })
        //         GetAllUsers("")
        //         setSaveLoading(false)
        //         formUser.resetFields()
        //         setUserImg(null)
        //     }
        // } catch (error) {
        //     const { data } = error.response
        //     if (data.statusCode === 403) {
        //         notification['error']({
        //             message: "บันทึกไม่สำเร็จ",
        //             description: "มีข้อมูลผู้ใช้งานนี้อยู่ในระบบแล้ว"
        //         })
        //     }
        //     setSaveLoading(false)
        // }
    }

    useEffect(() => {
        GetAllPrefix()
        GetAllDepartment()
        GetAllRole()
        GetAllUsers("")
    }, [])

    return (
        <>
            <Content>
                <Card
                    title={<label className='text-xl font-bold text-purple-700'>จัดการข้อมูลผู่ใช้</label>}
                    extra={
                        <>
                            <div className='flex'>
                                <Search 
                                    allowClear
                                    placeholder="ค้นหาด้วยชื่อหรือรหัสนักศึกษา" 
                                    enterButton
                                    onSearch={(v) => {
                                        GetAllUsers(v)
                                    }}
                                />
                                <Button type='primary' icon={<PlusOutlined style={{ display: "inline-grid" }} />} onClick={showModal}>เพิ่มข้อมูล</Button>
                            </div>
                        </>
                    }
                >
                    <Modal
                        title="เพิ่มข้อมูลนักศึกษา"
                        width={900}
                        visible={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={[
                            <Button
                                onClick={() => handleCancel()}
                            >
                                ปิด
                            </Button>,
                            <Button
                                onClick={() => handleOk()}
                                type='primary'
                            >
                                บันทึก
                            </Button>
                        ]}
                    >
                        <Row>
                            <Col xl={4}>
                                <Form form={formUser} onFinish={onFinishUser}>
                                    <div className='flex flex-col items-center'>
                                        {userImg ? (
                                            <Avatar
                                                size={100}
                                                src={userImg}
                                                icon={
                                                    <i className="fa-solid fa-user-astronaut"></i>
                                                }
                                                style={{ marginBottom: 18 }}
                                            />
                                        ) : (
                                            <Avatar
                                                size={100}
                                                icon={
                                                    <i className="fa-solid fa-user-astronaut"></i>
                                                }
                                                style={{ marginBottom: 18 }}
                                            />
                                        )}
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
                                                    loading={saveLoading}
                                                    icon={<CloudUploadOutlined />}
                                                >
                                                    อัพโหลดรูปภาพ
                                                </Button>
                                            </Upload>
                                        </Form.Item>
                                        <Divider />
                                        <Button
                                            loading={saveLoading}
                                            onClick={() => {
                                                formUser.resetFields()
                                                setUserImg(null)
                                            }}
                                            icon={<ClearOutlined />}
                                        >
                                            ล้างข้อมูล
                                        </Button>
                                    </div>
                                </Form>
                            </Col>
                            <Col xl={1}>
                                <Divider type='vertical' style={{ height: "100%" }} />
                            </Col>
                            <Col xl={19}>
                                <Form form={formUser} onFinish={onFinishUser}>
                                    <Spin spinning={saveLoading} tip="กำลังบันทึกข้อมูล">
                                        <Row gutter={[4, 4]}>
                                            <Col span={24}>
                                                <Divider>
                                                    <span className='text-2xl font-bold text-purple-700'>ข้อมูลที่ใช้ Login</span>
                                                </Divider>
                                            </Col>
                                            <Col xl={24}>
                                                <Form.Item
                                                    name="stuId"
                                                    label={<label className=' font-semibold text-purple-500'>รหัสนักศึกษา</label>}
                                                    labelCol={{ span: 24, style: { padding: 0 } }}
                                                    wrapperCol={{ span: 24 }}
                                                    style={{ marginBottom: 0 }}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "กรุณากรอกรหัสนักศึกษา"
                                                        }
                                                    ]}
                                                >
                                                    <Input
                                                        prefix={<IdcardOutlined style={{ color: "#ccc" }} />}
                                                        placeholder='รหัสนักศึกษา'
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col xl={24}>
                                                <Form.Item
                                                    name="password"
                                                    label={<label className=' font-semibold text-purple-500'>รหัสผ่าน</label>}
                                                    labelCol={{ span: 24, style: { padding: 0 } }}
                                                    wrapperCol={{ span: 24 }}
                                                    rules={
                                                        [
                                                            {
                                                                required: true,
                                                                message: 'กรุณากรอกรหัสผ่าน'
                                                            }
                                                        ]
                                                    }
                                                >
                                                    <Input.Password
                                                        prefix={<LockOutlined style={{ color: "#ccc" }} />}
                                                        placeholder='รหัสผ่าน'
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={24}>
                                                <Divider>
                                                    <span className='text-2xl font-bold text-purple-700'>ข้อมูลทั่วไป</span>
                                                </Divider>
                                            </Col>
                                            <Col xl={5}>
                                                <Form.Item
                                                    name="prefix_id"
                                                    label={<label className=' font-semibold text-purple-500'>คำนำหน้า</label>}
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
                                                        showSearch
                                                        placeholder="เลือก"
                                                        optionFilterProp="children"
                                                        filterOption={(input, option) =>
                                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                        }
                                                    >
                                                        {prefixList.map(prefix => (
                                                            <Option value={`${prefix.id}`}>{prefix.prefixTh}</Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </Col>

                                            <Col xl={10}>
                                                <Form.Item
                                                    label={<label className=' font-semibold text-purple-500'>ชื่อ</label>}
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
                                                        placeholder='ชื่อจริง'
                                                    />
                                                </Form.Item>
                                            </Col>

                                            <Col xl={9}>
                                                <Form.Item
                                                    name="lastName"
                                                    label={<label className=' font-semibold text-purple-500'>นามสกุล</label>}
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
                                                        placeholder='นามสกุล'
                                                    />
                                                </Form.Item>
                                            </Col>

                                            <Col xl={8}>
                                                <Form.Item
                                                    name="department_id"
                                                    label={<label className=' font-semibold text-purple-500'>คณะ</label>}
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
                                                        showSearch
                                                        placeholder="เลือก"
                                                        optionFilterProp="children"
                                                        filterOption={(input, option) =>
                                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                        }
                                                    >
                                                        {departmentList.map(department => (
                                                            <Option value={`${department.id}`}>{department.departmentTh}</Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </Col>

                                            <Col xl={8}>
                                                <Form.Item
                                                    name="phone"
                                                    label={<label className=' font-semibold text-purple-500'>เบอร์โทร</label>}
                                                    labelCol={{ span: 24, style: { padding: 0 } }}
                                                    wrapperCol={{ span: 24 }}
                                                    style={{ marginBottom: 0 }}
                                                >
                                                    <Input
                                                        placeholder='เบอร์โทร'
                                                    />
                                                </Form.Item>
                                            </Col>

                                            <Col xl={8}>
                                                <Form.Item
                                                    name="email"
                                                    label={<label className=' font-semibold text-purple-500'>E-Mail</label>}
                                                    labelCol={{ span: 24, style: { padding: 0 } }}
                                                    wrapperCol={{ span: 24 }}
                                                    style={{ marginBottom: 0 }}
                                                >
                                                    <Input
                                                        type='email'
                                                        placeholder='E-Mail'
                                                    />
                                                </Form.Item>
                                            </Col>

                                            <Col xl={8}>
                                                <Form.Item
                                                    initialValue={"3"}
                                                    label={<label className=' font-semibold text-purple-500'>สิทธิการใช้งาน</label>}
                                                    labelCol={{ span: 24, style: { padding: 0 } }}
                                                    wrapperCol={{ span: 24 }}
                                                    style={{ marginBottom: 0 }}
                                                    name="role_id"
                                                    rules={
                                                        [
                                                            {
                                                                required: true,
                                                                message: 'กรุณาเลือกสิทธิการใช้งาน'
                                                            }
                                                        ]
                                                    }
                                                >
                                                    <Select
                                                        showSearch
                                                        placeholder="เลือก"
                                                        optionFilterProp="children"
                                                        filterOption={(input, option) =>
                                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                        }
                                                    >
                                                        {roleList.map(role => (
                                                            <Option value={`${role.id}`}>{role.role_th}</Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </Col>

                                            <Col xl={8}>
                                                <Form.Item
                                                    name="lineId"
                                                    label={<label className=' font-semibold text-purple-500'>Line ID</label>}
                                                    labelCol={{ span: 24, style: { padding: 0 } }}
                                                    wrapperCol={{ span: 24 }}
                                                    style={{ marginBottom: 0 }}
                                                >
                                                    <Input
                                                        placeholder='Line ID'
                                                    />
                                                </Form.Item>
                                            </Col>

                                            <Col xl={8}>
                                                <Form.Item
                                                    name="facebookUrl"
                                                    label={<label className=' font-semibold text-purple-500'>Facebook</label>}
                                                    labelCol={{ span: 24, style: { padding: 0 } }}
                                                    wrapperCol={{ span: 24 }}
                                                    style={{ marginBottom: 0 }}
                                                >
                                                    <Input
                                                        placeholder='Facebook'
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Spin>
                                </Form>
                            </Col>
                        </Row>
                    </Modal>

                    <Modal
                        title="แก้ไขข้อมูล"
                        visible={isModalVisibleEdit}
                        width={900}
                        onOk={handleOkEdit}
                        onCancel={handleCancelEdit}
                        footer={[
                            <Button
                                onClick={() => handleCancelEdit()}
                            >
                                ปิด
                            </Button>,
                            <Button
                                onClick={() => handleOkEdit()}
                                type='primary'
                            >
                                บันทึก
                            </Button>
                        ]}
                    >
                        <Row>
                            <Col xl={4}>
                                <Form form={formUserEdit} onFinish={onFinishUserEdit}>
                                    <div className='flex flex-col items-center'>
                                        {userImgEdit ? (
                                            <Avatar
                                                size={100}
                                                src={userImgEdit}
                                                icon={
                                                    <i className="fa-solid fa-user-astronaut"></i>
                                                }
                                                style={{ marginBottom: 18 }}
                                            />
                                        ) : (
                                            <Avatar
                                                size={100}
                                                icon={
                                                    <i className="fa-solid fa-user-astronaut"></i>
                                                }
                                                style={{ marginBottom: 18 }}
                                            />
                                        )}
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
                                                        setUserImgEdit(e.target.result);
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
                                        <Divider />
                                        <Button
                                            loading={saveLoadingEdit}
                                            onClick={() => {
                                                formUserEdit.resetFields()
                                                setUserImgEdit(null)
                                            }}
                                            icon={<ClearOutlined />}
                                        >
                                            ล้างข้อมูล
                                        </Button>
                                    </div>
                                </Form>
                            </Col>
                            <Col xl={1}>
                                <Divider type='vertical' style={{ height: "100%" }} />
                            </Col>
                            <Col xl={19}>
                                <Form form={formUserEdit} onFinish={onFinishUserEdit}>
                                    <Spin spinning={saveLoadingEdit} tip="กำลังบันทึกข้อมูล">
                                        <Row gutter={[4, 4]}>
                                            <Col span={24}>
                                                <Divider>
                                                    <span className='text-2xl font-bold text-purple-700'>ข้อมูลที่ใช้ Login</span>
                                                </Divider>
                                            </Col>
                                            <Col xl={24}>
                                                <Form.Item
                                                    name="stuId"
                                                    label={<label className=' font-semibold text-purple-500'>รหัสนักศึกษา</label>}
                                                    labelCol={{ span: 24, style: { padding: 0 } }}
                                                    wrapperCol={{ span: 24 }}
                                                    style={{ marginBottom: 0 }}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "กรุณากรอกรหัสนักศึกษา"
                                                        }
                                                    ]}
                                                >
                                                    <Input
                                                        prefix={<IdcardOutlined style={{ color: "#ccc" }} />}
                                                        placeholder='รหัสนักศึกษา'
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={24}>
                                                <Divider>
                                                    <span className='text-2xl font-bold text-purple-700'>ข้อมูลทั่วไป</span>
                                                </Divider>
                                            </Col>
                                            <Col xl={5}>
                                                <Form.Item
                                                    name="prefix_id"
                                                    label={<label className=' font-semibold text-purple-500'>คำนำหน้า</label>}
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
                                                        showSearch
                                                        placeholder="เลือก"
                                                        optionFilterProp="children"
                                                        filterOption={(input, option) =>
                                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                        }
                                                    >
                                                        {prefixList.map(prefix => (
                                                            <Option value={`${prefix.id}`}>{prefix.prefixTh}</Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </Col>

                                            <Col xl={10}>
                                                <Form.Item
                                                    label={<label className=' font-semibold text-purple-500'>ชื่อ</label>}
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
                                                        placeholder='ชื่อจริง'
                                                    />
                                                </Form.Item>
                                            </Col>

                                            <Col xl={9}>
                                                <Form.Item
                                                    name="lastName"
                                                    label={<label className=' font-semibold text-purple-500'>นามสกุล</label>}
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
                                                        placeholder='นามสกุล'
                                                    />
                                                </Form.Item>
                                            </Col>

                                            <Col xl={8}>
                                                <Form.Item
                                                    name="department_id"
                                                    label={<label className=' font-semibold text-purple-500'>คณะ</label>}
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
                                                        showSearch
                                                        placeholder="เลือก"
                                                        optionFilterProp="children"
                                                        filterOption={(input, option) =>
                                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                        }
                                                    >
                                                        {departmentList.map(department => (
                                                            <Option value={`${department.id}`}>{department.departmentTh}</Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </Col>

                                            <Col xl={8}>
                                                <Form.Item
                                                    name="phone"
                                                    label={<label className=' font-semibold text-purple-500'>เบอร์โทร</label>}
                                                    labelCol={{ span: 24, style: { padding: 0 } }}
                                                    wrapperCol={{ span: 24 }}
                                                    style={{ marginBottom: 0 }}
                                                >
                                                    <Input
                                                        placeholder='เบอร์โทร'
                                                    />
                                                </Form.Item>
                                            </Col>

                                            <Col xl={8}>
                                                <Form.Item
                                                    name="email"
                                                    label={<label className=' font-semibold text-purple-500'>E-Mail</label>}
                                                    labelCol={{ span: 24, style: { padding: 0 } }}
                                                    wrapperCol={{ span: 24 }}
                                                    style={{ marginBottom: 0 }}
                                                >
                                                    <Input
                                                        type='email'
                                                        placeholder='E-Mail'
                                                    />
                                                </Form.Item>
                                            </Col>

                                            <Col xl={8}>
                                                <Form.Item
                                                    initialValue={"3"}
                                                    label={<label className=' font-semibold text-purple-500'>สิทธิการใช้งาน</label>}
                                                    labelCol={{ span: 24, style: { padding: 0 } }}
                                                    wrapperCol={{ span: 24 }}
                                                    style={{ marginBottom: 0 }}
                                                    name="role_id"
                                                    rules={
                                                        [
                                                            {
                                                                required: true,
                                                                message: 'กรุณาเลือกสิทธิการใช้งาน'
                                                            }
                                                        ]
                                                    }
                                                >
                                                    <Select
                                                        showSearch
                                                        placeholder="เลือก"
                                                        optionFilterProp="children"
                                                        filterOption={(input, option) =>
                                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                        }
                                                    >
                                                        {roleList.map(role => (
                                                            <Option value={`${role.id}`}>{role.role_th}</Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </Col>

                                            <Col xl={8}>
                                                <Form.Item
                                                    name="lineId"
                                                    label={<label className=' font-semibold text-purple-500'>Line ID</label>}
                                                    labelCol={{ span: 24, style: { padding: 0 } }}
                                                    wrapperCol={{ span: 24 }}
                                                    style={{ marginBottom: 0 }}
                                                >
                                                    <Input
                                                        placeholder='Line ID'
                                                    />
                                                </Form.Item>
                                            </Col>

                                            <Col xl={8}>
                                                <Form.Item
                                                    name="facebookUrl"
                                                    label={<label className=' font-semibold text-purple-500'>Facebook</label>}
                                                    labelCol={{ span: 24, style: { padding: 0 } }}
                                                    wrapperCol={{ span: 24 }}
                                                    style={{ marginBottom: 0 }}
                                                >
                                                    <Input
                                                        placeholder='Facebook'
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Spin>
                                </Form>
                            </Col>
                        </Row>
                    </Modal>
                    <Table
                        dataSource={usersList}
                    >
                        <Column
                            title="รหัสนักศึกษา"
                            dataIndex={"stuId"}
                        />
                        <Column
                            title="ชื่อ - นามสกุล"
                            dataIndex={"fullName"}
                        />
                        <Column
                            title="คณะ"
                            dataIndex={"department"}
                        />
                        <Column
                            title="เบอร์โทร"
                            dataIndex={"phone"}
                        />
                        <Column
                            title="สิทธิการใช้งาน"
                            dataIndex={"role"}
                            render={(text, record) => (text === "แอดมิน" ? <Tag color="blue">{text}</Tag> : <Tag color="green">{text}</Tag>)}
                        />
                        <Column
                            title="#"
                            render={(text, record) => (<>
                                <div className='flex gap-1'>
                                    <Button
                                        onClick={() => showModalEdit(record)}
                                    >
                                        แก้ไข
                                    </Button>
                                    <Button type="danger">ลบ</Button>
                                </div>
                            </>)}
                        />
                    </Table>
                </Card>
            </Content>
        </>
    )
}

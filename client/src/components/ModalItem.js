import React, { useEffect, useState } from 'react'
import { Avatar, Modal, notification, Popconfirm } from 'antd'
import TextArea from 'antd/lib/input/TextArea';
import { Button, Col, Divider, Form, Image, Input, Row } from 'antd'
import { useNavigate } from 'react-router-dom'
import moment from 'moment';
import { useSelector } from 'react-redux';
import { authSelector } from '../store/slices/authSlice';
import { ClearOutlined, DeleteOutlined, EditOutlined, EyeOutlined, SendOutlined } from '@ant-design/icons';
import SearchStudent from '../routes/addListMissingItem/Components/SearchStudent';
import { getStudentByNameOrStuIdAPI } from '../routes/addListMissingItem/API/AddListMissingItem';
import axios from 'axios';

const { Search } = Input;

export default function ModalItem(props) {
    const [form] = Form.useForm();
    const authReducer = useSelector(authSelector)

    const { handleCancel, isModalVisible, itemModal, GetUserCurrent, setIsModalVisible } = props
    const [isModalUpdateStatusVisible, setIsModalUpdateStatusVisible] = useState(false);

    const [nameOrStuId, setNameOrStuId] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [depositorImg, setDepositorImg] = useState(null)
    const [userMissingItemDrop, setUserMissingItemDrop] = useState(null)
    const [disabledDepositorForm, setDisabledDepositorForm] = useState(false)
    const [loadingListSearchStudent, setLoadingListSearchStudent] = useState(false)
    const [listSearchStudent, setListSearchStudent] = useState([])

    const navigate = useNavigate()
    const pathname = window.location.pathname

    const handleCancelUpdate = async () => {
        await setIsModalUpdateStatusVisible(false);
        setTimeout(() => {
            setIsModalVisible(false)
        }, 200);
    };

    useEffect(() => {


    }, [itemModal])

    const showModal = () => {
        setIsModalOpen(true);
    };

    const getStudentByNameOrStuId = async (nameOrStuId) => {
        setLoadingListSearchStudent(true);
        const { isSuccess, responseData } = await getStudentByNameOrStuIdAPI({
            nameOrStuId: nameOrStuId,
        });
        if (isSuccess) {
            setListSearchStudent(responseData);
            setLoadingListSearchStudent(false);
        }
    };

    const onFinishUpdateStatus = async () => {
        // handleCancelUpdate();
        const dataForm = form.getFieldValue()
        let request
        if (userMissingItemDrop !== null) {
            request = {
                firstName: dataForm.firstNameDrop,
                lastName: dataForm.lastNameDrop,
                phone: dataForm.phoneDrop,
                email: dataForm.emailDrop,
                lineId: dataForm.lineIdDrop,
                facebookUrl: dataForm.facebookUrlDrop,
                userMissingItemReceive: userMissingItemDrop,
                missingItem_id: itemModal.id,
            }
        } else {
            request = {
                firstName: dataForm.firstNameDrop,
                lastName: dataForm.lastNameDrop,
                phoneDrop: dataForm.phoneDrop,
                emailDrop: dataForm.emailDrop,
                lineIdDrop: dataForm.lineIdDrop,
                facebookUrlDrop: dataForm.facebookUrlDrop,
                userMissingItemReceive: null,
                missingItem_id: itemModal.id,
            }
        }

        const { data } = await axios.put(
            `${process.env.REACT_APP_DOMAINENDPOINT}/api/missing-item/updateStatus`,
            request
        )

        const { isSuccess } = data;
        console.log(isSuccess)
        if (isSuccess) {
            handleCancelUpdate();
            // handleCancel();
            // setIsModalVisible(false);
            setDisabledDepositorForm(false);
            GetUserCurrent();
            setNameOrStuId(null);
            setDepositorImg(null);
            notification['success']({
                message: 'บันทึกสำเร็จ',
                description: "อัพเดทสถานะเรียบร้อยแล้ว"
            })
            form.resetFields()
            
        } else {
            notification['error']({
                message: 'Error',
                description: 'Update status failed',
            })
        }
    }


    return (
        <Modal
            style={{
                top: 40,
            }}
            title={<>
                <label>{itemModal?.title} &nbsp;</label>
                {itemModal?.StatusMissingItem?.id === 1 ? 
                <span className='px-2 py-1 bg-red-500 text-xs text-white rounded-full'>{itemModal?.StatusMissingItem?.statusTh}</span>
                : <span className='px-2 py-1 bg-green-500 text-xs text-white rounded-full'>{itemModal?.StatusMissingItem?.statusTh}</span>}
                
            </>}
            visible={isModalVisible}
            // onOk={handleOk}
            onCancel={handleCancel}
            footer={[
            ]}
            width={800}
        >
            <SearchStudent
                form={form}
                setNameOrStuId={setNameOrStuId}
                nameOrStuId={nameOrStuId}
                setIsModalOpen={setIsModalOpen}
                isModalOpen={isModalOpen}
                setDepositorImg={setDepositorImg}
                setUserMissingItemDrop={setUserMissingItemDrop}
                setDisabledDepositorForm={setDisabledDepositorForm}
                listSearchStudent={listSearchStudent}
                setListSearchStudent={setListSearchStudent}
                loadingListSearchStudent={loadingListSearchStudent}
                setLoadingListSearchStudent={setLoadingListSearchStudent}
            />
            <Modal
                width={900}
                visible={isModalUpdateStatusVisible}
                title="อัพเดทสถานะ"
                onCancel={() => setIsModalUpdateStatusVisible(false)}
                footer={[
                    <Button onClick={() => setIsModalUpdateStatusVisible(false)}>ยกเลิก</Button>,
                    <Button type="primary" onClick={() => {
                        form.submit()
                    }}>บันทึก</Button>,
                ]}
            >
                <Row gutter={[8, 8]}>
                    <Col xl={4}>
                        <div className='flex justify-center flex-col items-center'>
                            <Avatar
                                size={120}
                                src={depositorImg}
                                icon={
                                    <i className="fa-solid fa-user-astronaut"></i>
                                }
                            />
                            <Divider />
                            <Button
                                onClick={() => {
                                    form.setFieldsValue({
                                        firstNameDrop: null,
                                        lastNameDrop: null,
                                        phoneDrop: null,
                                        emailDrop: null,
                                        lineIdDrop: null,
                                        facebookUrlDrop: null,
                                    });
                                    setDisabledDepositorForm(false);
                                    setDepositorImg(null);
                                    setNameOrStuId(null);
                                    setUserMissingItemDrop(null);
                                }}
                                icon={
                                    <ClearOutlined
                                        style={{ display: "inline-grid" }}
                                    />
                                }
                            >
                                ล้างข้อมูล
                            </Button>
                        </div>
                    </Col>
                    <Col xl={1}>
                        <Divider type='vertical' style={{ height: "100%" }} />
                    </Col>
                    <Col xl={19}>
                        <Divider>
                            <span className='text-2xl font-bold text-purple-700'>ข้อมูลที่มารับของ</span>
                        </Divider>
                        <Row>
                            <Col xl={24}>
                                <Search
                                    placeholder="ค้นหาด้วยชื่อหรือรหัสนักศึกษา"
                                    enterButton="ค้นหา"
                                    onChange={(e) => {
                                        setNameOrStuId(e.target.value);
                                    }}
                                    value={nameOrStuId}
                                    onSearch={(e) => {
                                        if (
                                            nameOrStuId === null ||
                                            nameOrStuId === ""
                                        ) {
                                            notification["warning"]({
                                                message: "ค้นหาไม่สำเร็จ",
                                                description: "กรุณากรอกข้อมูลก่อนค้นหา",
                                                placement: "topRight",
                                            });
                                        } else {
                                            // console.log("nameOrStuId", e)
                                            getStudentByNameOrStuId(e);
                                            showModal();
                                        }
                                    }}
                                />
                            </Col>
                            <Col xl={24}>
                                <Divider />
                            </Col>
                            <Form form={form} onFinish={() => onFinishUpdateStatus()}>
                                <Row gutter={[0, 6]}>
                                    <Col xl={24}>
                                        <Row gutter={[6, 6]}>
                                            <Col xl={8}>
                                                <Form.Item
                                                    style={{ marginBottom: 5 }}
                                                    name="firstNameDrop"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "กรุณากรอกชื่อ"
                                                        }
                                                    ]}
                                                    labelCol={{ span: 24, style: { padding: 0 } }}
                                                    wrapperCol={{ span: 24 }}
                                                    label={<label className=' font-semibold text-purple-500'>ชื่อ</label>}
                                                >
                                                    <Input
                                                        placeholder="ชื่อ"
                                                        disabled={disabledDepositorForm}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col xl={8}>
                                                <Form.Item
                                                    style={{ marginBottom: 5 }}
                                                    name="lastNameDrop"
                                                    labelCol={{ span: 24, style: { padding: 0 } }}
                                                    wrapperCol={{ span: 24 }}
                                                    label={<label className=' font-semibold text-purple-500'>นามสกุล</label>}
                                                >
                                                    <Input
                                                        placeholder="นามสกุล"
                                                        disabled={disabledDepositorForm}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col xl={8}>
                                                <Form.Item
                                                    style={{ marginBottom: 5 }}
                                                    name="phoneDrop"
                                                    labelCol={{ span: 24, style: { padding: 0 } }}
                                                    wrapperCol={{ span: 24 }}
                                                    label={<label className=' font-semibold text-purple-500'>เบอร์โทร</label>}
                                                >
                                                    <Input
                                                        // prefix={
                                                        //   <i className="fa-solid fa-phone text-green-500"></i>
                                                        // }
                                                        placeholder="เบอร์โทร"
                                                        disabled={disabledDepositorForm}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col xl={8}>
                                                <Form.Item
                                                    labelCol={{ span: 24, style: { padding: 0 } }}
                                                    wrapperCol={{ span: 24 }}
                                                    label={<label className=' font-semibold text-purple-500'>Email</label>}
                                                    name="emailDrop"
                                                >
                                                    <Input
                                                        placeholder="Email"
                                                        disabled={disabledDepositorForm}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col xl={8}>
                                                <Form.Item
                                                    name="lineIdDrop"
                                                    labelCol={{ span: 24, style: { padding: 0 } }}
                                                    wrapperCol={{ span: 24 }}
                                                    label={<label className=' font-semibold text-purple-500'>Line</label>}
                                                >
                                                    <Input
                                                        // prefix={
                                                        //   <i className="fa-brands fa-line text-green-400"></i>
                                                        // }
                                                        placeholder="Line (ใส่หรือไม่ก็ได้)"
                                                        disabled={disabledDepositorForm}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col xl={8}>
                                                <Form.Item
                                                    name="facebookUrlDrop"
                                                    labelCol={{ span: 24, style: { padding: 0 } }}
                                                    wrapperCol={{ span: 24 }}
                                                    label={<label className=' font-semibold text-purple-500'>Facebook</label>}
                                                >
                                                    <Input
                                                        // prefix={
                                                        //   <i className="fa-brands fa-facebook text-blue-400"></i>
                                                        // }
                                                        placeholder="Facebook (ใส่หรือไม่ก็ได้)"
                                                        disabled={disabledDepositorForm}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Form>
                        </Row>
                    </Col>
                </Row>
            </Modal>
            <Row gutter={[24, 24]}>
                <Col xl={9} sm={9} xs={24}>
                    <Image
                        style={{ borderRadius: 10 }}
                        src={itemModal?.imageItem}
                    />
                    <Divider />
                    {
                        pathname === "/profileNotification" ?
                            <div className='flex flex-col gap-2'>
                                <Button block icon={<EyeOutlined style={{ display: "inline-grid" }} />}>ดูข้อมูลแบบเต็ม</Button>
                                <Button disabled={itemModal?.StatusMissingItem?.id !== 1} block icon={<EditOutlined style={{ display: "inline-grid" }} />}>แก้ไขข้อมูล</Button>
                                <Button
                                    block
                                    disabled={itemModal?.StatusMissingItem?.id !== 1}
                                    type="primary"
                                    icon={<SendOutlined style={{ display: "inline-grid" }} />}
                                    onClick={() => setIsModalUpdateStatusVisible(true)}
                                >
                                    อัพเดทสถานะ
                                </Button>
                                <Popconfirm disabled={itemModal?.StatusMissingItem?.id !== 1} title="คุณต้องการลบประกาศนี้?">
                                    <Button disabled={itemModal?.StatusMissingItem?.id !== 1} type="danger" block icon={<DeleteOutlined style={{display: "inline-grid"}} />}>ลบประกาศนี้</Button>
                                </Popconfirm>
                            </div>
                            : null
                    }
                </Col>
                <Col xl={15} sm={15} xs={24}>
                    <div className='flex justify-between items-center'>
                        <div className='flex justify-start items-center space-x-2'>
                            <Image
                                style={{ borderRadius: "50%" }}
                                width={26}
                                height={26}
                                preview={false}
                                src={itemModal?.User?.urlPicture}
                            />
                            <div className="font-light dark:text-white">
                                <button
                                    type="link"
                                    className='hover:text-gray-500 text-primaryTheme'
                                    onClick={() => {
                                        handleCancel()
                                        navigate('/profileNotification')
                                    }}
                                >
                                    {itemModal?.User?.firstName} {itemModal?.User?.lastName}
                                </button>
                            </div>
                        </div>
                        <div className="text-slate-900 font-light text-xs dark:text-white">วันที่แจ้ง : {moment(itemModal?.updatedAt).format("DD/MM/YYYY")}</div>
                    </div>
                    <Divider style={{ margin: 10 }} />
                    <p className=""><span className='font-bold'>รายละเอียด</span> : {itemModal?.description}</p>
                    <Divider style={{ margin: 10 }} />
                    <h1 className='font-light'><i className="fa-solid fa-building"></i> <b>สถานที่พบ</b> :
                        <a className='hover:text-gray-500' href="/#">
                            {itemModal?.Campus?.campusTh} {itemModal?.Building?.buildingTh ? 
                            itemModal?.Building?.buildingTh : itemModal?.buildingOther} {" "}
                            {itemModal?.Room?.roomTh ? itemModal?.Room?.roomTh : itemModal?.roomOther}
                        </a>
                    </h1>
                    <Divider style={{ margin: 10 }} />
                    <h1 className='font-light'><i className="fa-solid fa-phone text-green-600"></i> <b>เบอร์โทรติดต่อ</b> : {itemModal?.User?.phone}</h1>
                    <h1 className='font-light'><i className="fa-solid fa-envelope text-red-600"></i> <b>อีเมล์</b> : {itemModal?.User?.email}</h1>
                    <Divider style={{ margin: 10 }} />
                    <h1 className='font-light'><i className="fa-solid fa-message text-blue-600"></i> <b>ส่งข้อความหาเจ้าของกระทู้</b></h1>
                    <Form>
                        <Row gutter={[16, 0]}>
                            <>
                                {!authReducer.isLoggedIn
                                    ?
                                    <>
                                        <Col span={12}>
                                            <Form.Item
                                                style={{ marginBottom: 5 }}
                                                labelCol={{ span: 24, style: { paddingBottom: 0 } }}
                                                label={<label className='text-gray-500'>ชื่อ - นามสกุล</label>}
                                            >
                                                <Input
                                                    disabled={itemModal?.StatusMissingItem?.id !== 1}
                                                    placeholder='ชื่อ - นามสกุล'
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                style={{ marginBottom: 5 }}
                                                labelCol={{ span: 24, style: { paddingBottom: 0 } }}
                                                label={<label className='text-gray-500'>เบอร์โทร</label>}
                                                tooltip={{ title: "เบอร์โทรสำหรับติดต่อกลับ", placement: 'right', color: "gray" }}
                                            >
                                                <Input
                                                    placeholder='เบอร์โทรศัพท์'
                                                    disabled={itemModal?.StatusMissingItem?.id !== 1}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item
                                                style={{ marginBottom: 5 }}
                                                labelCol={{ span: 24, style: { paddingBottom: 0 } }}
                                                label={<label className='text-gray-500'>Email</label>}
                                                tooltip={{ title: "Email สำหรับติดต่อกลับ", placement: 'right', color: "gray" }}
                                            >
                                                <Input
                                                    placeholder='email@example.com'
                                                    disabled={itemModal?.StatusMissingItem?.id !== 1}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </>
                                    :
                                    ""
                                }

                                <Col span={24}>
                                    <Form.Item
                                        style={{ marginBottom: 5 }}
                                        labelCol={{ span: 24, style: { paddingBottom: 0 } }}
                                        label={<label className='text-gray-500'>ข้อความ</label>}
                                    >
                                        <TextArea
                                            rows={4}
                                            disabled={pathname === "/profileNotification" || itemModal?.StatusMissingItem?.id !== 1}
                                            placeholder="ข้อความ"
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={24} style={{ marginTop: 10 }}>
                                    <Button
                                        block
                                        type="primary"
                                        size='large'
                                        disabled={pathname === "/profileNotification" || itemModal?.StatusMissingItem?.id !== 1}
                                    >
                                        ส่งข้อความ
                                    </Button>
                                </Col>
                            </>


                        </Row>
                    </Form>
                </Col>
            </Row>
        </Modal>
    )
}

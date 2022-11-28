import React, { useEffect, useState } from 'react'
import { Modal } from 'antd'
import TextArea from 'antd/lib/input/TextArea';
import { Button, Col, Divider, Form, Image, Input, Row } from 'antd'
import { useNavigate } from 'react-router-dom'
import moment from 'moment';
import { useSelector } from 'react-redux';
import { authSelector } from '../store/slices/authSlice';

export default function ModalItem(props) {
    const authReducer = useSelector(authSelector)

    const { handleCancel, isModalVisible, itemModal } = props

    const [test, setTest] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        setTest(null)
    }, [itemModal])
    return (
        <Modal
            style={{
                top: 40,
            }}
            title={<>
                <label>{itemModal?.title} &nbsp;</label>
                <span className='px-2 py-1 bg-red-500 text-xs text-white rounded-full'>ยังไม่มีผู้มารับคืน</span>
            </>}
            visible={isModalVisible}
            // onOk={handleOk}
            onCancel={handleCancel}
            footer={[
            ]}
            width={800}
        >
            <Row gutter={[24, 24]}>
                <Col xl={9} sm={9} xs={24}>
                    <Image
                        style={{ borderRadius: 10 }}
                        src={itemModal?.imageItem}
                    />
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
                            {itemModal?.Campus?.campusTh} {itemModal?.Building?.buildingTh} {itemModal?.Room?.roomTh}
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
                                            placeholder="ข้อความ"
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={24} style={{ marginTop: 10 }}>
                                    <Button block type="primary" size='large'>ส่งข้อความ</Button>
                                </Col>
                            </>


                        </Row>
                    </Form>
                </Col>
            </Row>
        </Modal>
    )
}

import { Card, Col, Empty, Input, Modal, notification, Row, Spin } from 'antd';
import React, { useState } from 'react'
import { getStudentByNameOrStuIdAPI } from '../API/AddListMissingItem';
const { Search } = Input;
const { Meta } = Card;

export default function SearchStudent(props) {
    const { 
        form, 
        setNameOrStuId, 
        nameOrStuId, 
        setIsModalOpen, 
        isModalOpen, 
        setDepositorImg,
        listSearchStudent, 
        setListSearchStudent,
        loadingListSearchStudent,
        setLoadingListSearchStudent,
        setUserMissingItemDrop, 
        setDisabledDepositorForm 
    } = props

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
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

    return (
        <>
            <Modal
                title="ค้นหาข้อมูลนักศึกษา"
                visible={isModalOpen}
                width={900}
                footer={null}
                onCancel={handleCancel}
            >
                <Search
                    placeholder="ค้นหาด้วยชื่อหรือรหัสนักศึกษา"
                    enterButton="ค้นหา"
                    onChange={(e) => {
                        setNameOrStuId(e.target.value);
                    }}
                    value={nameOrStuId}
                    onSearch={(e) => {
                        if (nameOrStuId === null || nameOrStuId === "") {
                            notification["warning"]({
                                message: "ค้นหาไม่สำเร็จ",
                                description: "กรุณากรอกข้อมูลก่อนค้นหา",
                            });
                        } else {
                            getStudentByNameOrStuId(e);
                        }
                    }}
                />
                <div className="mb-5"></div>
                <Spin tip="กำลังค้นหา..." spinning={loadingListSearchStudent}>
                    <Row gutter={[8, 8]}>
                        {listSearchStudent.length > 0 ? (
                            listSearchStudent.map((item) => (
                                <Col xl={6} key={item.id}>
                                    <Card
                                        bodyStyle={{
                                            border: "2px solid #e8e8e8",
                                        }}
                                        hoverable
                                        onClick={() => {
                                            form.setFieldsValue({
                                                firstNameDrop: item.firstName,
                                                lastNameDrop: item.lastName,
                                                phoneDrop: item.phone,
                                                emailDrop: item.email,
                                                lineIdDrop: item.lineId,
                                                facebookUrlDrop: item.facebookUrl,
                                            });
                                            setDisabledDepositorForm(true);
                                            setDepositorImg(item.urlPicture);
                                            setNameOrStuId(item.stuId);
                                            setUserMissingItemDrop(item.id);
                                            setIsModalOpen(false);
                                        }}
                                        cover={
                                            <div style={{ height: "190px" }}>
                                                <img
                                                    alt="example"
                                                    style={{
                                                        height: "100%",
                                                        width: "100%",
                                                        borderTop: "2px solid #e8e8e8",
                                                        borderLeft: "2px solid #e8e8e8",
                                                        borderRight: "2px solid #e8e8e8",
                                                    }}
                                                    src={
                                                        item.urlPicture
                                                            ? item.urlPicture
                                                            : "https://i.pinimg.com/originals/46/5e/0d/465e0db3e6f531eb2f05987a013a23ad.jpg"
                                                    }
                                                />
                                            </div>
                                        }
                                    >
                                        <Meta
                                            title={`${item.firstName} ${item.lastName}`}
                                            description={
                                                <div>
                                                    <div>
                                                        <span className="font-bold">รหัสนักศึกษา</span>
                                                        <br /> {item.stuId}
                                                    </div>
                                                    <div>
                                                        <span className="font-bold">คณะที่กำลังศึกษา</span>
                                                        <br />{" "}
                                                        {item.Department?.departmentTh
                                                            ? item.Department?.departmentTh
                                                            : "ไม่มีข้อมูล"}
                                                    </div>
                                                </div>
                                            }
                                        />
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <Col xl={24}>
                                <Empty description={`ไม่พบข้อมูลการค้นหา`} />
                            </Col>
                        )}
                    </Row>
                </Spin>
            </Modal>
        </>
    )
}

import { Button, Card, Col, Divider, Form, Input, Layout, Modal, Popconfirm, Row, Table, notification } from 'antd';
import { useState } from 'react'
import { CreateBuildingAPI, CreateCampusAPI, CreateRoomAPI, DeleteBuildingAPI, DeleteCampusAPI, DeleteRoomAPI, GetAllCampusAPI, GetBuildingByCampusIdAPI, GetRoomByBuildingIdAPI, UpdateBuildingAPI, UpdateCampusAPI, UpdateRoomAPI } from './API/locationAPI';
import { useEffect } from 'react';
import { DeleteOutlined, EditOutlined, LeftOutlined, PlusCircleOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Column } = Table;

export default function Location() {
    const [formCampus] = Form.useForm();
    const [formBuilding] = Form.useForm();
    const [formRoom] = Form.useForm();

    const [isShowCampus, setIsShowCampus] = useState(true)
    const [isShowBuilding, setIsShowBuilding] = useState(false)
    const [isShowRoom, setIsShowRoom] = useState(false)

    const [campusIdActive, setCampusIdActive] = useState(null)
    const [campusNameActive, setCampusNameActive] = useState(null)

    const [buildingIdActive, setBuildingIdActive] = useState(null)
    const [buildingNameActive, setBuildingNameActive] = useState(null)

    const [campusData, setCampusData] = useState([])
    const [campusVisible, setCampusVisible] = useState(false)
    const [campusIsEdited, setCampusIsEdited] = useState(false)
    const [campusIdEdited, setCampusIdEdited] = useState(null)

    const [buildingData, setBuildingData] = useState([])
    const [buildingVisible, setBuildingVisible] = useState(false)
    const [buildingIsEdited, setBuildingIsEdited] = useState(false)
    const [buildingIdEdited, setBuildingIdEdited] = useState(null)

    const [roomData, setRoomData] = useState([])
    const [roomVisible, setRoomVisible] = useState(false)
    const [roomIsEdited, setRoomIsEdited] = useState(false)
    const [roomIdEdited, setRoomIdEdited] = useState(null)
    // start Campus
    const getAllCampus = async () => {
        const { isSuccess, responseData } = await GetAllCampusAPI()
        if (isSuccess) {
            const data = responseData.map(item => {
                return {
                    ...item,
                    key: item.id
                }
            })
            setCampusData(data)
        }
    }

    const createCampus = async (campusTitle) => {
        const { isSuccess } = await CreateCampusAPI({ campusTh: campusTitle })
        if (isSuccess) {
            notification['success']({
                placement: 'top',
                message: 'เพิ่มข้อมูลสำเร็จ',
                duration: 1.3
            })
        }
    }

    const updateCampus = async (campusId, campusTitle) => {
        const { isSuccess } = await UpdateCampusAPI(campusId, { campusTh: campusTitle })
        if (isSuccess) {
            getAllCampus()
            notification['success']({
                placement: 'top',
                message: 'แก้ไขข้อมูลสำเร็จ',
                duration: 1.3
            })
            setCampusVisible(false)
        }
    }

    const onFinishedCampus = async (campusTitle) => {
        if (campusIsEdited) {
            if (campusTitle === '' || campusTitle === null || campusTitle === undefined) {
                notification['warning']({
                    placement: 'top',
                    message: 'กรุณากรอกชื่อวิทยาเขตก่อน',
                    duration: 1.3
                })
            } else {
                await updateCampus(campusIdEdited, campusTitle);
            }
        } else {
            if (campusTitle === '' || campusTitle === null || campusTitle === undefined) {
                notification['warning']({
                    placement: 'top',
                    message: 'กรุณากรอกชื่อวิทยาเขตก่อน',
                    duration: 1.3
                })
            } else {
                await createCampus(campusTitle);
                await getAllCampus();
                setCampusVisible(false)
            }
        }
    }

    const deleteCampus = async (campusId) => {
        const { isSuccess, message } = await DeleteCampusAPI(campusId)
        if (isSuccess) {
            await getAllCampus()
            notification['success']({
                placement: 'top',
                message: message,
                duration: 3
            })

        } else {
            notification['error']({
                placement: 'top',
                message: message,
                duration: 1.3
            })
        }
    }
    // end Campus


    // start Building
    const getBuildingByCampusId = async (campusId) => {
        const { isSuccess, responseData } = await GetBuildingByCampusIdAPI(campusId)
        if (isSuccess) {
            const data = responseData.map(item => {
                return {
                    ...item,
                    key: item.id
                }
            })
            // console.log(data)
            setBuildingData(data)
        }
    }

    const deleteBuilding = async (buildingId) => {
        const { isSuccess, message } = await DeleteBuildingAPI(buildingId)
        if (isSuccess) {
            await getBuildingByCampusId(campusIdActive)
            notification['success']({
                placement: 'top',
                message: message,
                duration: 3
            })

        } else {
            notification['error']({
                placement: 'top',
                message: message,
                duration: 1.3
            })
        }
    }

    const createBuilding = async (buildingTitle) => {
        const { isSuccess } = await CreateBuildingAPI({ buildingTh: buildingTitle, campus_id: campusIdActive })
        if (isSuccess) {
            notification['success']({
                placement: 'top',
                message: 'เพิ่มข้อมูลสำเร็จ',
                duration: 1.3
            })
        }
    }

    const updateBuilding = async (buildingId, buildingTitle) => {
        const { isSuccess } = await UpdateBuildingAPI(buildingId, { buildingTh: buildingTitle })
        if (isSuccess) {
            getAllCampus()
            notification['success']({
                placement: 'top',
                message: 'แก้ไขข้อมูลสำเร็จ',
                duration: 1.3
            })
            setBuildingVisible(false)
        }
    }

    const onFinishedBuilding = async (buildingTitle) => {
        if (buildingIsEdited) {
            if (buildingTitle === '' || buildingTitle === null || buildingTitle === undefined) {
                notification['warning']({
                    placement: 'top',
                    message: 'กรุณากรอกชื่ออาคารก่อน',
                    duration: 1.3
                })
            } else {
                await updateBuilding(buildingIdEdited, buildingTitle);
                await getBuildingByCampusId(campusIdActive);
            }
        } else {
            if (buildingTitle === '' || buildingTitle === null || buildingTitle === undefined) {
                notification['warning']({
                    placement: 'top',
                    message: 'กรุณากรอกชื่ออาคารก่อน',
                    duration: 1.3
                })
            } else {
                // console.log(buildingTitle)
                // console.log(campusIdActive)
                await createBuilding(buildingTitle);
                await getBuildingByCampusId(campusIdActive);
                setBuildingVisible(false)
            }
        }
    }
    // end Building

    // start Room
    const getRoomByBuildingId = async (buildingId) => {
        const { isSuccess, responseData } = await GetRoomByBuildingIdAPI(buildingId)
        if (isSuccess) {
            const data = responseData.map(item => {
                return {
                    ...item,
                    key: item.id
                }
            })
            // console.log(data)
            setRoomData(data)
        }
    }

    const createRoom = async (roomTh) => {
        const { isSuccess } = await CreateRoomAPI({ roomTh: roomTh, building_id: buildingIdActive })
        if (isSuccess) {
            notification['success']({
                placement: 'top',
                message: 'เพิ่มข้อมูลสำเร็จ',
                duration: 1.3
            })
        }
    }

    const deleteRoom = async (roomId) => {
        const { isSuccess, message } = await DeleteRoomAPI(roomId)
        if (isSuccess) {
            await getRoomByBuildingId(buildingIdActive)
            notification['success']({
                placement: 'top',
                message: message,
                duration: 3
            })
            getRoomByBuildingId(buildingIdActive)
        } else {
            notification['error']({
                placement: 'top',
                message: message,
                duration: 1.3
            })
        }
    }

    const updateRoom = async (roomId, roomTitle) => {
        const { isSuccess } = await UpdateRoomAPI(roomId, { roomTh: roomTitle })
        if (isSuccess) {
            notification['success']({
                placement: 'top',
                message: 'แก้ไขข้อมูลสำเร็จ',
                duration: 1.3
            })
            setRoomVisible(false)
        }
    }

    const onFinishedRoom = async (roomTitle) => {
        if (roomIsEdited) {
            if (roomTitle === '' || roomTitle === null || roomTitle === undefined) {
                notification['warning']({
                    placement: 'top',
                    message: 'กรุณากรอกชื่อห้องก่อน',
                    duration: 1.3
                })
            } else {
                await updateRoom(roomIdEdited, roomTitle);
                await getRoomByBuildingId(buildingIdActive);
            }
        } else {
            if (roomTitle === '' || roomTitle === null || roomTitle === undefined) {
                notification['warning']({
                    placement: 'top',
                    message: 'กรุณากรอกชื่อห้องก่อน',
                    duration: 1.3
                })
            } else {
                await createRoom(roomTitle);
                await getRoomByBuildingId(buildingIdActive);
                setRoomVisible(false)
            }
        }
    }
    // end Room

    useEffect(() => {
        getAllCampus()
    }, [])

    useEffect(() => {
        if (isShowBuilding) {
            getBuildingByCampusId(campusIdActive)
        }
    }, [campusIdActive])

    useEffect(() => {
        if (isShowRoom) {
            getRoomByBuildingId(buildingIdActive)
        }
    }, [buildingIdActive])

    const CampusShow = () => {
        const [campusTitle, setCampusTitle] = useState('')
        return (
            <>
                <Modal
                    title={campusIsEdited ? 'แก้ไขข้อมูลวิทยาเขต' : 'เพิ่มข้อมูลวิทยาเขต'}
                    visible={campusVisible}
                    onCancel={() => setCampusVisible(false)}
                    footer={[
                        <Button onClick={() => setCampusVisible(false)}>ปิด</Button>,
                        <Button
                            type='primary'
                            onClick={() => onFinishedCampus(campusTitle)}
                        >
                            บันทึก
                        </Button>
                    ]}
                >
                    <Form form={formCampus}>
                        <Form.Item
                            name="campusTitle"
                        >
                            <Input
                                value={campusTitle}
                                onChange={(e) => {
                                    setCampusTitle(e.target.value)
                                }}
                                placeholder='ชื่อวิทยาเขต'
                            />
                        </Form.Item>
                    </Form>

                </Modal>
                <Row gutter={[8, 8]}>
                    <Col xl={24}>
                        <div className='flex justify-between'>
                            <h1 className='text-xl font-bold'>ข้อมูลวิทยาเขต ({campusData.length} รายการ)</h1>
                            <Button
                                icon={<PlusCircleOutlined style={{display: "inline-grid"}} />}
                                type='primary'
                                onClick={() => {
                                    setCampusVisible(true)
                                    setCampusIsEdited(false)
                                    setCampusTitle('')
                                    formCampus.setFieldsValue({
                                        campusTitle: ''
                                    })
                                }
                                }
                            >
                                เพิ่มข้อมูล
                            </Button>
                        </div>
                    </Col>
                    <Col xl={24}>
                        <Table
                            dataSource={campusData}
                        >
                            <Column
                                title={<label className='font-bold'>ชื่อวิทยาเขต</label>}
                                dataIndex={"campusTh"}
                                render={(text, record) => (
                                    <button
                                        className='text-primaryTheme'
                                        onClick={() => {
                                            setCampusIdActive(record.id)
                                            setCampusNameActive(record.campusTh)
                                            // setStateShow(2)
                                            setIsShowCampus(false)
                                            setIsShowBuilding(true)
                                        }}
                                    >
                                        {text}
                                    </button>
                                )}
                            />
                            <Column
                                width={170}
                                title="#"
                                render={(text, record) => (<>
                                    <div className='flex gap-1'>
                                        <Button
                                            icon={<EditOutlined style={{display: "inline-grid"}} />}
                                            onClick={() => {
                                                setCampusVisible(true)
                                                setCampusIsEdited(true)
                                                setCampusIdEdited(record.id)
                                                setCampusTitle(record.campusTh)
                                                formCampus.setFieldsValue({
                                                    campusTitle: record.campusTh
                                                })
                                            }}
                                        >
                                            แก้ไข
                                        </Button>
                                        <Popconfirm
                                            placement="top"
                                            title={"คุณต้องการลบข้อมูลจริงหรือไม่?"}
                                            onConfirm={() => deleteCampus(record.id)}
                                            okText="ใช่"
                                            cancelText="ไม่"
                                        >
                                            <Button icon={<DeleteOutlined style={{display: "inline-grid"}} />} type="danger">ลบ</Button>
                                        </Popconfirm>

                                    </div>
                                </>)}
                            />
                        </Table>
                    </Col>
                </Row>
            </>
        )
    }

    const BuildingShow = () => {
        const [buildingTitle, setBuildingTitle] = useState('')
        return <>
            <Modal
                title={buildingIsEdited ? 'แก้ไขข้อมูลอาคาร' : 'เพิ่มข้อมูลอาคาร'}
                visible={buildingVisible}
                onCancel={() => setBuildingVisible(false)}
                footer={[
                    <Button onClick={() => setBuildingVisible(false)}>ปิด</Button>,
                    <Button
                        type='primary'
                        onClick={() => onFinishedBuilding(buildingTitle)}
                    >
                        บันทึก
                    </Button>
                ]}
            >
                <Form form={formBuilding}>
                    <Form.Item
                        name="buildingTitle"
                    >
                        <Input
                            value={buildingTitle}
                            onChange={(e) => {
                                setBuildingTitle(e.target.value)
                            }}
                            placeholder='ชื่ออาคาร'
                        />
                    </Form.Item>
                </Form>
            </Modal>
            <Row gutter={[8, 8]}>
                <Col xl={24}>
                    <div className='flex justify-between'>
                        <div className='flex'>
                            <Button
                                icon={<LeftOutlined style={{ display: "inline-grid" }} />}
                                onClick={() => {
                                    setIsShowBuilding(false)
                                    setIsShowCampus(true)
                                }}
                            >
                                ย้อนกลับ
                            </Button>
                            <span>&nbsp;&nbsp;&nbsp;</span>
                            <h1 className='text-xl font-bold'><i class="fa-solid fa-building">&nbsp;</i> ข้อมูลอาคารภายใน <span className='text-primaryTheme'>{campusNameActive}</span> ({buildingData?.length} รายการ)</h1>
                        </div>
                        <Button
                            icon={<PlusCircleOutlined style={{display: "inline-grid"}} />}
                            type='primary'
                            onClick={() => {
                                setBuildingVisible(true)
                                setBuildingIsEdited(false)
                                setBuildingTitle('')
                                formBuilding.setFieldsValue({
                                    buildingTitle: ''
                                })
                            }
                            }
                        >
                            เพิ่มข้อมูลอาคาร
                        </Button>
                    </div>
                </Col>
                <Col xl={24}>
                    <Table
                        dataSource={buildingData}
                    >
                        <Column
                            title={<label className='font-bold'>ชื่ออาคาร</label>}
                            dataIndex={"buildingTh"}
                            render={(text, record) => (
                                <button
                                    className='text-primaryTheme'
                                    onClick={() => {
                                        setBuildingIdActive(record.id)
                                        setBuildingNameActive(record.buildingTh)
                                        setIsShowCampus(false)
                                        setIsShowBuilding(false)
                                        setIsShowRoom(true)
                                    }}
                                >
                                    {text}
                                </button>
                            )}
                        />
                        <Column
                            width={170}
                            title="#"
                            render={(text, record) => (<>
                                <div className='flex gap-1'>
                                    <Button
                                        icon={<EditOutlined style={{display: "inline-grid"}} />}
                                        onClick={() => {
                                            setBuildingVisible(true)
                                            setBuildingIsEdited(true)
                                            setBuildingTitle(record.buildingTh)
                                            setBuildingIdEdited(record.id)
                                            formBuilding.setFieldsValue({
                                                buildingTitle: record.buildingTh
                                            })
                                        }}
                                    >
                                        แก้ไข
                                    </Button>
                                    <Popconfirm
                                        placement="top"
                                        title={"คุณต้องการลบข้อมูลจริงหรือไม่?"}
                                        onConfirm={() => deleteBuilding(record.id)}
                                        okText="ใช่"
                                        cancelText="ไม่"
                                    >
                                        <Button icon={<DeleteOutlined style={{display: "inline-grid"}} />} type="danger">ลบ</Button>
                                    </Popconfirm>

                                </div>
                            </>)}
                        />
                    </Table>
                </Col>
            </Row>
        </>
    }

    const RoomShow = () => {
        const [roomTitle, setRoomTitle] = useState('')
        return <>
            <Modal
                title={roomIsEdited ? 'แก้ไขข้อมูลห้อง' : 'เพิ่มข้อมูลห้อง'}
                visible={roomVisible}
                onCancel={() => setRoomVisible(false)}
                footer={[
                    <Button onClick={() => setRoomVisible(false)}>ปิด</Button>,
                    <Button
                        type='primary'
                        onClick={() => onFinishedRoom(roomTitle)}
                    >
                        บันทึก
                    </Button>
                ]}
            >
                <Form form={formRoom}>
                    <Form.Item
                        name="roomTitle"
                    >
                        <Input
                            value={roomTitle}
                            onChange={(e) => {
                                setRoomTitle(e.target.value)
                            }}
                            placeholder='ชื่อห้อง'
                        />
                    </Form.Item>
                </Form>
            </Modal>
            <Row gutter={[8, 8]}>
                <Col xl={24}>
                    <div className='flex justify-between'>
                        <div className='flex'>
                            <Button
                                icon={<LeftOutlined style={{ display: "inline-grid" }} />}
                                onClick={() => {
                                    setIsShowCampus(false)
                                    setIsShowRoom(false)
                                    setIsShowBuilding(true)
                                }}
                            >
                                ย้อนกลับ
                            </Button>
                            <span>&nbsp;&nbsp;&nbsp;</span>
                            <h1 className='text-xl font-bold'><i class="fa-solid fa-building">&nbsp;</i> ข้อมูลห้องภายในอาคาร <span className='text-primaryTheme'>{buildingNameActive}</span> (5 รายการ)</h1>
                        </div>
                        <Button
                            icon={<PlusCircleOutlined style={{display: "inline-grid"}} />}
                            type='primary'
                            onClick={() => {
                                setRoomVisible(true)
                                setRoomIsEdited(false)
                                setRoomTitle('')
                                formRoom.setFieldsValue({
                                    roomTitle: ''
                                })
                            }
                            }
                        >
                            เพิ่มข้อมูลห้อง
                        </Button>
                    </div>
                </Col>
                <Col xl={24}>
                    <Table
                        dataSource={roomData}
                    >
                        <Column
                            title={<label className='font-bold'>ชื่อห้อง</label>}
                            dataIndex={"roomTh"}
                            render={(text, record) => (
                                <button
                                    className=''
                                    onClick={() => {
                                        // setBuildingIdActive(record.id)
                                        // setBuildingNameActive(record.buildingTh)
                                        // setIsShowCampus(false)
                                        // setIsShowBuilding(false)
                                        // setIsShowRoom(true)
                                    }}
                                >
                                    {text}
                                </button>
                            )}
                        />
                        <Column
                            width={170}
                            title="#"
                            render={(text, record) => (<>
                                <div className='flex gap-1'>
                                    <Button
                                        icon={<EditOutlined style={{display: "inline-grid"}} />}
                                        onClick={() => {
                                            setRoomVisible(true)
                                            setRoomIsEdited(true)
                                            setRoomTitle(record.roomTh)
                                            setRoomIdEdited(record.id)
                                            formRoom.setFieldsValue({
                                                roomTitle: record.roomTh
                                            })
                                        }}
                                    >
                                        แก้ไข
                                    </Button>
                                    <Popconfirm
                                        placement="top"
                                        title={"คุณต้องการลบข้อมูลจริงหรือไม่?"}
                                        onConfirm={() => deleteRoom(record.id)}
                                        okText="ใช่"
                                        cancelText="ไม่"
                                    >
                                        <Button icon={<DeleteOutlined style={{display: "inline-grid"}} />} type="danger">ลบ</Button>
                                    </Popconfirm>

                                </div>
                            </>)}
                        />
                    </Table>
                </Col>
            </Row>
        </>
    }

    return (
        <>
            <Content>
                <Card
                    title={
                        <label className='text-xl font-bold text-primaryTheme'>
                            จัดการข้อมูลสถานที่ <span className='text-xs'>**(สำหรับจัดการข้อมูลวิทยาเขต อาคาร และห้องเรียน)</span>
                        </label>
                    }
                >
                    {isShowCampus && <CampusShow />}
                    {isShowBuilding && <BuildingShow />}
                    {isShowRoom && <RoomShow />}
                </Card>
            </Content>
        </>
    )
}

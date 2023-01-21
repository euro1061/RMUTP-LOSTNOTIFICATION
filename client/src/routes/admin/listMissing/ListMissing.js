import { Button, Card, Form, Input, Modal, Select, Table, notification } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import React, { useEffect, useState } from 'react'
import { GetAllMissingItem, getAllCampusAPI } from './API/listMissingAPI';
import moment from 'moment';
import axios from 'axios';
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled, EyeOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Column } = Table;
const { confirm } = Modal;

export default function ListMissing() {

    const [listMissingData, setListMissingData] = useState([])
    const [campus, setCampus] = useState([])
    const [loading, setLoading] = useState(false)

    const [queryTitle, setQueryTitle] = useState("")
    const [selectedCampus, setselectedCampus] = useState("")
    const [deleteLoading ,setDeleteLoading] = useState(false)

    const getAllMissingItem = async (selectedCampus, queryTitle) => {
        setLoading(true)
        const resData = await GetAllMissingItem(selectedCampus, queryTitle)
        const data = resData.map((item, index) => {
            return {
                ...item,
                key: item.id,
                indexNo: index + 1,
                campusTh: item.Campus.campusTh,
                dateCreated: moment(item.dateCreated).format('DD/MM/YYYY'),
                status: item.StatusMissingItem.id === 1 ? <label className='p-1 bg-red-500 text-white rounded-2xl'>{item.StatusMissingItem.statusTh}</label> : <label className='p-1 bg-green-500 text-white rounded-2xl'>{item.StatusMissingItem.statusTh}</label>
            }
        })
        setLoading(false)
        setListMissingData(data)
    }

    const getAllCampus = async () => {
        const { isSuccess, responseData } = await getAllCampusAPI()
        if (isSuccess) {
            setCampus(responseData)
        }
    }

    useEffect(() => {
        getAllCampus()
        getAllMissingItem("", "")
    }, [])

    useEffect(() => {
        if (
            (selectedCampus !== "" && selectedCampus !== null) ||
            (queryTitle !== "" && queryTitle !== null)) {
            getAllMissingItem(selectedCampus, queryTitle)
        }
    }, [selectedCampus, queryTitle])

    const handleDelete = async (id) => {
        setDeleteLoading(true)
        try {
            const { data } = await axios.delete(
                `${process.env.REACT_APP_DOMAINENDPOINT}/api/missing-item/delete/${id}`
            )
            const { isSuccess } = data;
            if (isSuccess) {
                getAllMissingItem("", "")
                notification['success']({
                    message: 'ลบสำเร็จ',
                    description: "ลบข้อมูลสำเร็จแล้ว"
                })
            } else {
                notification['error']({
                    message: 'Error',
                    description: 'Delete failed',
                })
            }
        } catch (error) {
            return error
        }
        setDeleteLoading(false)
    }

    return (
        <Content>
            <Card
                title={<label className='text-xl font-bold text-primaryTheme'>จัดการรายการแจ้งของหาย</label>}
                bodyStyle={{ background: '#f0f2f5' }}
                extra={
                    <div className='flex flex-col lg:flex-row xl:flex-row justify-center gap-3'>
                        <Form.Item
                            style={{ margin: 0 }}
                            name="queryMissingItem"
                        >
                            <Input
                                onChange={(e) => {
                                    if (e.target.value === "") {
                                        setQueryTitle(undefined)
                                    } else {
                                        setQueryTitle(e.target.value)
                                    }
                                }}
                                allowClear
                                size="large"
                                placeholder='คำค้นหา...'
                            />
                        </Form.Item>
                        <Form.Item
                            style={{ margin: 0 }}
                            name="selectedCampusMissingItem"
                        >
                            <Select
                                allowClear
                                style={{ width: "200px" }}
                                size='large'
                                placeholder="วิทยาเขต"
                                onChange={(value) => {
                                    setselectedCampus(value)
                                }}
                            >
                                {campus?.map(item => (<Option key={item.id} value={item.id}>{item.campusTh}</Option>))}

                            </Select>
                        </Form.Item>
                        {/* <Button size='large' type='primary'>ค้นหา</Button> */}
                    </div>
                }
            >
                <Table
                    loading={loading}
                    dataSource={listMissingData}
                >
                    <Column
                        title="No."
                        dataIndex="indexNo"
                        width={10}
                    />
                    <Column
                        title="ชื่อประกาศ"
                        dataIndex="title"
                    />
                    <Column
                        title="วิทยาเขต"
                        dataIndex="campusTh"
                    />
                    <Column
                        title="วันที่ลงประกาศ"
                        dataIndex="dateCreated"
                    />
                    <Column
                        title="สถานะ"
                        dataIndex="status"
                        sorter={(a, b) => a.StatusMissingItem.id - b.StatusMissingItem.id}
                        
                    />
                    <Column
                        title="#"
                        render={(text, record) => {
                            return (
                                <>
                                    <Button
                                        icon={<EyeOutlined style={{ display: 'inline-grid' }} />}
                                        onClick={() => {
                                            window.open(`/infomissingitem/${record.id}`, '_blank')
                                        }}
                                    >
                                        ดูข้อมูล
                                    </Button>
                                    <Button
                                        icon={<EditOutlined style={{ display: "inline-grid" }} />}
                                        onClick={() => {
                                            window.open(`/infomissingitem/${record.id}/edit`, '_blank')
                                        }}
                                    >
                                        แก้ไข
                                    </Button>
                                    <Button
                                        loading={deleteLoading}
                                        icon={<DeleteOutlined style={{ display: "inline-grid" }} />}
                                        type='danger'
                                        onClick={() => {
                                            confirm({
                                                title: 'คุณต้องการลบประกาศนี้หรือไม่?',
                                                icon: <ExclamationCircleFilled />,
                                                okText: 'Yes',
                                                okType: 'danger',
                                                cancelText: 'No',
                                                onOk() {
                                                    handleDelete(record.id)
                                                },
                                                onCancel() {
                                                    console.log('Cancel');
                                                },
                                            });
                                        }}
                                    >
                                        ลบ
                                    </Button>
                                </>
                            )
                        }}
                    />
                </Table>
            </Card>
        </Content>
    )
}

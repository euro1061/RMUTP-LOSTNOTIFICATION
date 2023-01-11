import { Button, Card, Form, Input, Modal, Select, Table } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { GetAllLosingItem, getAllCampusAPI } from './API/listLosingAPI'
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled, EyeOutlined } from '@ant-design/icons'

const { Column } = Table 
const { confirm } = Modal
const { Option } = Select

export default function ListLosing() {
    const [listLosingData, setListLosingData] = useState([])
    const [campus, setCampus] = useState([])
    const [loading, setLoading] = useState(false)

    const [queryTitle, setQueryTitle] = useState("")
    const [selectedCampus, setselectedCampus] = useState("")

    const getAllLosingItem = async (selectedCampus, queryTitle) => {
        setLoading(true)
        const resData = await GetAllLosingItem(selectedCampus, queryTitle)
        const data = resData.map((item, index) => {
            return {
                ...item,
                key: item.id,
                indexNo: index + 1,
                campusTh: item.Campus.campusTh,
                dateCreated: moment(item.dateCreated).format('DD/MM/YYYY'),
                status: item.StatusLosingItem.id === 1 ? <label className='p-1 bg-red-500 text-white rounded-2xl'>{item.StatusLosingItem.statusTh}</label> : <label className='p-1 bg-green-500 text-white rounded-2xl'>{item.StatusLosingItem.statusTh}</label>
            }
        })
        setLoading(false)
        setListLosingData(data)
    }

    const getAllCampus = async () => {
        const { isSuccess, responseData } = await getAllCampusAPI()
        if (isSuccess) {
            setCampus(responseData)
        }
    }

    useEffect(() => {
        getAllCampus()
        getAllLosingItem("", "")
    }, [])

    useEffect(() => {
        if (
            (selectedCampus !== "" && selectedCampus !== null) ||
            (queryTitle !== "" && queryTitle !== null)) {
            getAllLosingItem(selectedCampus, queryTitle)
        }
    }, [selectedCampus, queryTitle])

    return (
        <Content>
            <Card
                title={<label className='text-xl font-bold text-primaryTheme'>จัดการรายการประกาศตามหาของหาย</label>}
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
                    dataSource={listLosingData}
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
                                            window.open(`/infolosingitem/${record.id}`, '_blank')
                                        }}
                                    >
                                        ดูข้อมูล
                                    </Button>
                                    <Button
                                        icon={<EditOutlined style={{ display: "inline-grid" }} />}
                                        onClick={() => {
                                            window.open(`/infolosingitem/${record.id}/edit`, '_blank')
                                        }}
                                    >
                                        แก้ไข
                                    </Button>
                                    <Button
                                        icon={<DeleteOutlined style={{ display: "inline-grid" }} />}
                                        type='danger'
                                        onClick={() => {
                                            confirm({
                                                title: 'Are you sure delete this task?',
                                                icon: <ExclamationCircleFilled />,
                                                content: 'Some descriptions',
                                                okText: 'Yes',
                                                okType: 'danger',
                                                cancelText: 'No',
                                                onOk() {
                                                    console.log('OK');
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

import { FilePdfOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, Card, Col, DatePicker, Divider, Row, Select, Table } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import React, { useEffect, useState } from 'react'
import { GetReportAPI, GetReportLosingAPI, getAllCampusAPI } from './API/reportAPI'
import _ from 'lodash'
import moment from 'moment'
import axios from 'axios'

const { Column } = Table
const { Option } = Select
const { RangePicker } = DatePicker;

const test = [
    {
        "key": 1,
        "placeLocation": "วิทยาเขตเทเวศร์",
        "placeLocationCount": 1,
        "campus_id": 1,
        "children": [
            {
                "key": 16,
                "placeLocation": "ตึก A",
                "placeLocationCount": 1,
                "campus_id": 1,
                "building_id": 1,
                "children": null
            }
        ]
    },
    {
        "key": 2,
        "placeLocation": "วิทยาเขตโชติเวช",
        "placeLocationCount": 1,
        "campus_id": 2,
        "children": [
            {
                "key": 22,
                "placeLocation": "ตึก B",
                "placeLocationCount": 1,
                "campus_id": 2,
                "building_id": 2,
                "children": [
                    {
                        "key": 33,
                        "placeLocation": "ห้อง 201",
                        "placeLocationCount": 1,
                        "campus_id": 2,
                        "building_id": 2,
                        "room_id": 2
                    }
                ]
            }
        ]
    },
    {
        "key": 3,
        "placeLocation": "วิทยาเขตพณิชยการพระนคร",
        "placeLocationCount": 4,
        "campus_id": 3,
        "children": [
            {
                "key": 17,
                "placeLocation": "ตึก C",
                "placeLocationCount": 2,
                "campus_id": 3,
                "building_id": 3,
                "children": [
                    {
                        "key": 28,
                        "placeLocation": "ห้อง 302",
                        "placeLocationCount": 2,
                        "campus_id": 3,
                        "building_id": 3,
                        "room_id": 9
                    }
                ]
            },
            {
                "key": 15,
                "placeLocation": "ตึก โรงอาหาร",
                "placeLocationCount": 1,
                "campus_id": 3,
                "building_id": 9,
                "children": null
            },
            {
                "key": 21,
                "placeLocation": "อื่น ๆ",
                "placeLocationCount": 1,
                "campus_id": 3,
                "building_id": null,
                "children": null
            }
        ]
    },
    {
        "key": 7,
        "placeLocation": "วิทยาเขตชุมพรเขตรอุดมศักดิ์",
        "placeLocationCount": 2,
        "campus_id": 4,
        "children": [
            {
                "key": 13,
                "placeLocation": "ตึก D",
                "placeLocationCount": 2,
                "campus_id": 4,
                "building_id": 4,
                "children": [
                    {
                        "key": 24,
                        "placeLocation": "ห้อง 401",
                        "placeLocationCount": 2,
                        "campus_id": 4,
                        "building_id": 4,
                        "room_id": 4
                    }
                ]
            }
        ]
    },
    {
        "key": 9,
        "placeLocation": "วิทยาเขตพระนครเหนือ",
        "placeLocationCount": 3,
        "campus_id": 5,
        "children": [
            {
                "key": 19,
                "placeLocation": "อื่น ๆ",
                "placeLocationCount": 2,
                "campus_id": 5,
                "building_id": null,
                "children": null
            },
            {
                "key": 12,
                "placeLocation": "ตึก E",
                "placeLocationCount": 1,
                "campus_id": 5,
                "building_id": 5,
                "children": null
            }
        ]
    }
]

export default function Report() {
    const [dataReportMissing, setDataReportMissing] = useState([])
    const [dateRangeDefault, setDateRangeDefault] = useState([moment().startOf('month'), moment()])
    const [selectedCampusMissing, setSelectedCampusMissing] = useState("")
    const [loadingMissing, setLoadingMissing] = useState(false)
    const [loadingExportMissing, setLoadingExportMissing] = useState(false)

    const [dataReportLosing, setDataReportLosing] = useState([])
    const [dateRangeDefaultLosing, setDateRangeDefaultLosing] = useState([moment().startOf('month'), moment()])
    const [selectedCampusLosing, setSelectedCampusLosing] = useState("")
    const [loadingLosing, setLoadingLosing] = useState(false)
    const [loadingExportLosing, setLoadingExportLosing] = useState(false)

    const [campus, setCampus] = useState([])

    const getReport = async (startDate = dateRangeDefault[0], endDate = dateRangeDefault[1], campusId = "") => {
        setLoadingMissing(true)
        const AllData = await GetReportAPI(startDate, endDate, campusId)
        const groupByCampus = _.groupBy(AllData, 'campus_id')
        const groupByBuilding = _.groupBy(AllData, (item => {
            return [item['campus_id'], item['building_id']]
        }))
        const groupByRoom = _.groupBy(AllData, (item => {
            return [item['campus_id'], item['building_id'], item['room_id']]
        }))
        let i = 0;
        let dataCampus = []
        for (const [key, value] of Object.entries(groupByCampus)) {
            const format = value.map((item) => {
                return {
                    key: ++i,
                    placeLocation: item?.Campus?.campusTh,
                    placeLocationCount: value.length,
                    campus_id: item.campus_id,
                }
            })
            dataCampus.push(format[0])
        }

        let dataBuilding = []
        for (const [key, value] of Object.entries(groupByBuilding)) {
            const format = value.map((item) => {
                // console.log(item)
                return {
                    key: ++i,
                    placeLocation: item?.Building?.buildingTh || "อื่น ๆ",
                    placeLocationCount: value.length,
                    campus_id: item.campus_id,
                    building_id: item.building_id,
                }
            })
            dataBuilding.push(format[0])
        }

        let dataRoom = []
        for (const [key, value] of Object.entries(groupByRoom)) {
            const format = value.map((item) => {
                // console.log(item)
                return {
                    key: ++i,
                    placeLocation: item?.Room?.roomTh || "อื่น ๆ",
                    placeLocationCount: value.length,
                    campus_id: item.campus_id,
                    building_id: item.building_id,
                    room_id: item.room_id
                }
            })
            dataRoom.push(format[0])
        }

        const mergeFieldRoomAndBuilding = dataBuilding.map((item) => {
            const filter = dataRoom.filter((item2) => item2.building_id === item.building_id && item2.placeLocation !== "อื่น ๆ").sort((a, b) => b.placeLocationCount - a.placeLocationCount)
            return {
                ...item,
                children: filter?.length > 0 ? filter : null
            }
        })


        const mergeField1 = dataCampus.map((item) => {
            const filter = mergeFieldRoomAndBuilding.filter((item2) => item2.campus_id === item.campus_id).sort((a, b) => b.placeLocationCount - a.placeLocationCount)
            return {
                ...item,
                children: filter
            }
        })
        // console.log(mergeField1)
        setDataReportMissing(mergeField1)
        // console.log(mergeField1)
        setLoadingMissing(false)
    }

    const getReportLosing = async (startDate = dateRangeDefaultLosing[0], endDate = dateRangeDefaultLosing[1], campusId = "") => {
        setLoadingLosing(true)
        const AllData = await GetReportLosingAPI(startDate, endDate, campusId)
        const groupData = AllData?.map((item, index) => {
            return {
                key: index,
                placeLocation: item.campusTh,
                placeLocationCount: item.count,
                campus_id: item.id,
            }
        }).filter(item => item.placeLocationCount !== 0)

        const reduceCheck = groupData.reduce((acc, cur) => {
            return acc + cur.placeLocationCount
        }, 0)

        if (reduceCheck === 0) {
            setDataReportLosing([])
        } else {
            setDataReportLosing(groupData)
        }


        setLoadingLosing(false)
    }

    const getAllCampus = async () => {
        const { isSuccess, responseData } = await getAllCampusAPI()
        if (isSuccess) {
            setCampus(responseData)
        }
    }

    const exportPDFMissing = async () => {
        setLoadingExportMissing(true)
        axios({
            url: `${process.env.REACT_APP_DOMAINENDPOINT}/api/pdf-service/missing`, // download url
            method: 'POST',
            data: {
                data: {
                    dateStart: moment(dateRangeDefault[0], "YYYY-MM-DD").format("DD/MM/YYYY"),
                    dateEnd: moment(dateRangeDefault[1], "YYYY-MM-DD").format("DD/MM/YYYY"),
                    dataInfo: dataReportMissing,
                }
            },
            responseType: "blob"
        })
            .then(response => {
                // window.open(URL.createObjectURL(response.data)
                // create a link for download
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
                link.setAttribute('download', 'file.pdf');
                document.body.appendChild(link);
                link.click();
                // remove the link when done
                link.parentNode.removeChild(link);
                setLoadingExportMissing(false)
            })
    }

    const exportPDFLosing = async () => {
        setLoadingExportLosing(true)
        axios({
            url: `${process.env.REACT_APP_DOMAINENDPOINT}/api/pdf-service/losing`, // download url
            method: 'POST',
            data: {
                data: {
                    dateStart: moment(dateRangeDefaultLosing[0], "YYYY-MM-DD").format("DD/MM/YYYY"),
                    dateEnd: moment(dateRangeDefaultLosing[1], "YYYY-MM-DD").format("DD/MM/YYYY"),
                    dataInfo: dataReportLosing,
                }
            },
            responseType: "blob"
        })
            .then(response => {
                // window.open(URL.createObjectURL(response.data)
                // create a link for download
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
                link.setAttribute('download', 'file.pdf');
                document.body.appendChild(link);
                link.click();
                // remove the link when done
                link.parentNode.removeChild(link);
                setLoadingExportLosing(false)
            })
    }

    useEffect(() => {
        getAllCampus()
        getReportLosing()
    }, [])

    useEffect(() => {
        getReport(dateRangeDefault[0], dateRangeDefault[1], selectedCampusMissing)
    }, [dateRangeDefault, selectedCampusMissing])

    useEffect(() => {
        getReportLosing(dateRangeDefaultLosing[0], dateRangeDefaultLosing[1], selectedCampusLosing)
    }, [dateRangeDefaultLosing, selectedCampusLosing])

    return (
        <Content>
            <Card
                title={<label className='text-xl font-bold text-primaryTheme'>Report พิมพ์รายงาน</label>}
                bodyStyle={{ background: '#fff' }}
            >
                <Row gutter={[16, 16]}>
                    <Col xl={24}>
                        <div className='flex justify-between'>
                            <h1 className='text-xl font-bold'>รายการพบเห็นของหาย</h1>
                            <div className='flex'>
                                <div>
                                    <label className='ml-2 font-bold'>ข้อมูลระหว่าง : </label>
                                    <RangePicker
                                        defaultValue={dateRangeDefault}
                                        // allowClear
                                        allowClear={false}
                                        size='large'
                                        onCalendarChange={(values, valueString_Arr) => {
                                            setDateRangeDefault([valueString_Arr[0], valueString_Arr[1]])
                                            getReport(valueString_Arr[0], valueString_Arr[1])
                                        }}
                                    />
                                </div>
                                <div>
                                    <Select
                                        allowClear
                                        style={{ width: "200px" }}
                                        size='large'
                                        placeholder="วิทยาเขต"
                                        onChange={(value) => {
                                            setSelectedCampusMissing(value)
                                        }}
                                    >
                                        {campus?.map(item => (<Option key={item.id} value={item.id}>{item.campusTh}</Option>))}

                                    </Select>
                                </div>
                                <div className='ml-3'>
                                    <Button
                                        loading={loadingExportMissing}
                                        disabled={dataReportMissing.length === 0}
                                        type='danger'
                                        size='large'
                                        icon={<FilePdfOutlined style={{ display: 'inline-grid' }} />}
                                        onClick={() => {
                                            exportPDFMissing()
                                        }}
                                    >
                                        EXPORT PDF
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xl={24}>
                        {dataReportMissing.length > 0 ?
                            <Table
                                // rowSelection={{
                                //     checkStrictly,
                                // }}
                                key="loading-done"
                                defaultExpandAllRows={false}
                                dataSource={dataReportMissing}
                            >
                                {/* <Column title="No" dataIndex="indexNo" width={"5%"}/> */}
                                <Column title="ชื่อสถานที่" dataIndex="placeLocation" key="1" />
                                <Column title="จำนวนครั้ง" dataIndex="placeLocationCount" key="2" />
                            </Table> :
                            <Table
                                // rowSelection={{
                                //     checkStrictly,
                                // }}
                                key="loading-not-done"
                                loading={loadingMissing}
                            // defaultExpandAllRows={true}
                            // dataSource={dataReportMissing}
                            >
                                {/* <Column title="No" dataIndex="indexNo" width={"5%"}/> */}
                                <Column title="ชื่อสถานที่" dataIndex="placeLocation" key="1" />
                                <Column title="จำนวนครั้ง" dataIndex="placeLocationCount" key="2" />
                            </Table>}
                        <Divider />
                    </Col>

                    <Col xl={24}>
                        <div className='flex justify-between'>
                            <h1 className='text-xl font-bold'>รายการประกาศตามหาของหาย</h1>
                            <div className='flex'>
                                <div>
                                    <label className='ml-2 font-bold'>ข้อมูลระหว่าง : </label>
                                    <RangePicker
                                        defaultValue={dateRangeDefault}
                                        // allowClear
                                        allowClear={false}
                                        size='large'
                                        onCalendarChange={(values, valueString_Arr) => {
                                            setDateRangeDefaultLosing([valueString_Arr[0], valueString_Arr[1]])
                                            getReportLosing(valueString_Arr[0], valueString_Arr[1])
                                        }}
                                    />
                                </div>
                                <div>
                                    <Select
                                        allowClear
                                        style={{ width: "200px" }}
                                        size='large'
                                        placeholder="วิทยาเขต"
                                        onChange={(value) => {
                                            setSelectedCampusLosing(value)
                                        }}
                                    >
                                        {campus?.map(item => (<Option key={item.id} value={item.id}>{item.campusTh}</Option>))}

                                    </Select>
                                </div>
                                <div className='ml-3'>
                                    <Button
                                        disabled={dataReportLosing.length === 0}
                                        loading={loadingExportLosing}
                                        type='danger'
                                        size='large'
                                        icon={<FilePdfOutlined style={{ display: 'inline-grid' }} />}
                                        onClick={() => {
                                            exportPDFLosing()
                                        }}
                                    >
                                        EXPORT PDF
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xl={24}>
                        {dataReportLosing.length > 0 ?
                            <Table
                                // rowSelection={{
                                //     checkStrictly,
                                // }}
                                key="loading-done"
                                defaultExpandAllRows={false}
                                dataSource={dataReportLosing}
                            >
                                {/* <Column title="No" dataIndex="indexNo" width={"5%"}/> */}
                                <Column title="ชื่อสถานที่" dataIndex="placeLocation" key="1" />
                                <Column title="จำนวนครั้ง" dataIndex="placeLocationCount" key="2" />
                            </Table> :
                            <Table
                                // rowSelection={{
                                //     checkStrictly,
                                // }}
                                key="loading-not-done"
                                loading={loadingLosing}
                            // defaultExpandAllRows={true}
                            // dataSource={dataReportMissing}
                            >
                                {/* <Column title="No" dataIndex="indexNo" width={"5%"}/> */}
                                <Column title="ชื่อสถานที่" dataIndex="placeLocation" key="1" />
                                <Column title="จำนวนครั้ง" dataIndex="placeLocationCount" key="2" />
                            </Table>}
                        <Divider />
                    </Col>
                </Row>
            </Card>
        </Content>
    )
}

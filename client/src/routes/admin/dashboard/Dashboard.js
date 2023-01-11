import { Button, Card, Col, DatePicker, Divider, Layout, List, Row } from 'antd';
import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from "react-chartjs-2";
import { getLosingStaticAPI, getMissingStaticAPI } from './API/DashboardAPI';
import moment from 'moment';

const { Content } = Layout;
const { RangePicker } = DatePicker;

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
    const [missingStaticData, setMissingStaticData] = useState({})
    const [listCampusStatic, setListCampusStatic] = useState([])
    const [pieCountMissing, setPieCountMissing] = useState([0, 0])

    const [losingStaticData, setLosingStaticData] = useState({})
    const [listLosingCampusStatic, setListLosingCampusStatic] = useState([])
    const [pieCountLosing, setPieCountLosing] = useState([0, 0])

    const dateRangeDefault = [moment().startOf('month'), moment()]

    const getMissingStatic = async (startDate = dateRangeDefault[0], endDate = dateRangeDefault[1]) => {
        const { isSuccess, responseData } = await getMissingStaticAPI(startDate, endDate)
        if (isSuccess) {
            setMissingStaticData(responseData)
            const listCampus = responseData.staticCampus.map((item) => (
                <div className='flex justify-between w-full items-center'>
                    <span className=''>{item.campusTh}</span>
                    <span className='text-xl'>{item.count} <span className='text-sm'>รายการ</span></span>
                </div>
            ))
            setListCampusStatic(listCampus)
            setPieCountMissing([responseData.countByStatus[0].count, responseData.countByStatus[1].count])
        }
    }

    const getLosingStatic = async (startDate = dateRangeDefault[0], endDate = dateRangeDefault[1]) => {
        const { isSuccess, responseData } = await getLosingStaticAPI(startDate, endDate)
        if (isSuccess) {
            // console.log(responseData)
            setLosingStaticData(responseData)
            const listCampus = responseData.staticCampus.map((item) => (
                <div className='flex justify-between w-full items-center'>
                    <span className=''>{item.campusTh}</span>
                    <span className='text-xl'>{item.count} <span className='text-sm'>รายการ</span></span>
                </div>
            ))
            setListLosingCampusStatic(listCampus)
            setPieCountLosing([responseData.countByStatus[0].count, responseData.countByStatus[1].count])
        }
    }

    const dataMissingItem = {
        labels: ['ยังไม่มีผู้มารับคืน', 'มีผู้มารับคืนแล้ว'],
        datasets: [
            {
                label: '# รายการ',
                data: pieCountMissing,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const dataLosingItem = {
        labels: ['ยังไม่ได้รับของคืน', 'ได้รับของคืนแล้ว'],
        datasets: [
            {
                label: '# รายการ',
                data: pieCountLosing,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    useEffect(() => {
        getMissingStatic()
        getLosingStatic()
    }, [])

    const MenuBox = ({ text, bgBorder, shortKey, hoverBg }) => {
        return <div className={`border-b-4 bg-white ${bgBorder} rounded-md text-center p-4 cursor-pointer drop-shadow-md ${hoverBg} transition duration-200`}>
            <h1 className='text-gray-700 text-2xl mb-0'>{text} <span className='text-sm text-gray-400'>{shortKey}</span></h1>
        </div>
    }

    return (
        <>
            <Content>
                <Card
                    title={<label className='text-xl font-bold text-primaryTheme'>Dashboard ภาพรวมระบบ</label>}
                    bodyStyle={{ background: '#f0f2f5' }}
                >
                    <Row gutter={[16, 16]}>
                        <Col xl={24}>
                            <Row gutter={[8, 16]}>
                                <Col xl={4}>
                                    <MenuBox
                                        text={"Dashboard"}
                                        bgBorder={"border-purple-600"}
                                        shortKey={"F1"}
                                        hoverBg={"hover:bg-purple-200"}
                                    />
                                </Col>
                                <Col xl={4}>
                                    <MenuBox
                                        text={"ข้อมูลผู้ใช้"}
                                        bgBorder={"border-lime-600"}
                                        shortKey={"F2"}
                                        hoverBg={"hover:bg-lime-200"}
                                    />
                                </Col>
                                <Col xl={4}>
                                    <MenuBox
                                        text={"ข้อมูลสถานที่"}
                                        bgBorder={"border-green-600"}
                                        shortKey={"F3"}
                                        hoverBg={"hover:bg-green-200"}
                                    />
                                </Col>
                                <Col xl={4}>
                                    <MenuBox
                                        text={"พิมพ์รายงาน"}
                                        bgBorder={"border-blue-600"}
                                        shortKey={"F4"}
                                        hoverBg={"hover:bg-blue-200"}
                                    />
                                </Col>
                                <Col xl={4}>
                                    <MenuBox
                                        text={"ตั้งค่าระบบ"}
                                        bgBorder={"border-orange-600"}
                                        shortKey={"F5"}
                                        hoverBg={"hover:bg-orange-200"}
                                    />
                                </Col>
                                <Col xl={4}>
                                    <MenuBox
                                        text={"ออกจากระบบ"}
                                        bgBorder={"border-red-600"}
                                        shortKey={"F6"}
                                        hoverBg={"hover:bg-red-200"}
                                    />
                                </Col>
                                <Col xl={12}>
                                    <MenuBox
                                        text={"รายการแจ้งพบเห็นของหาย"}
                                        bgBorder={"border-fuchsia-600"}
                                        shortKey={"F7"}
                                        hoverBg={"hover:bg-fuchsia-200"}
                                    />
                                </Col>
                                <Col xl={12}>
                                    <MenuBox
                                        text={"รายการประกาศตามหาของหาย"}
                                        bgBorder={"border-teal-600"}
                                        shortKey={"F8"}
                                        hoverBg={"hover:bg-teal-200"}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col xl={24}>
                            <Card
                                extra={
                                    <div>
                                        <label className='ml-2'>ข้อมูลระหว่าง : </label>
                                        <RangePicker
                                            defaultValue={dateRangeDefault}
                                            allowClear
                                            onChange={(values, valueString_Arr) => {
                                                getMissingStatic(valueString_Arr[0], valueString_Arr[1])
                                                getLosingStatic(valueString_Arr[0], valueString_Arr[1])
                                            }}
                                        />
                                    </div>
                                }
                                title={<label className='text-xl font-bold'>รายงานสรุปผล</label>}
                            >
                                <Row gutter={[8, 8]}>
                                    <Col xl={12}>
                                        <List
                                            header={<div className='font-bold text-xl'>รายการแจ้งพบเห็นของหาย</div>}
                                            bordered
                                            dataSource={
                                                [
                                                    <div className='flex justify-between w-full items-center'>
                                                        <span className='p-2 bg-gray-300 rounded-xl'>รายการแจ้งพบเห็นของหายทั้งหมด</span>
                                                        <span className='text-xl'>{missingStaticData?.countAll} <span className='text-sm'>รายการ</span></span>
                                                    </div>,
                                                    <div className='flex justify-between w-full items-center'>
                                                        <span className='p-2 bg-green-300 rounded-xl'>มีผู้มารับคืนแล้ว</span>
                                                        <span className='text-xl'>{missingStaticData?.countByStatus ? missingStaticData?.countByStatus[1].count : null} <span className='text-sm'>รายการ</span></span>
                                                    </div>,
                                                    <div className='flex justify-between w-full items-center'>
                                                        <span className='p-2 bg-red-300 rounded-xl'>ยังไม่มีผู้มารับคืน</span>
                                                        <span className='text-xl'>{missingStaticData?.countByStatus ? missingStaticData?.countByStatus[0].count : null} <span className='text-sm'>รายการ</span></span>
                                                    </div>,
                                                ]
                                            }
                                            renderItem={(item) => (
                                                <List.Item>
                                                    {item}
                                                </List.Item>
                                            )}
                                        />

                                        <List
                                            header={<div className='font-bold text-sm'>รายการของหายตามวิทยาเขต</div>}
                                            bordered
                                            dataSource={
                                                listCampusStatic
                                            }
                                            renderItem={(item) => (
                                                <List.Item>
                                                    {item}
                                                </List.Item>
                                            )}
                                        />
                                        <div className='mt-3'></div>
                                        <Card>
                                            <Doughnut data={dataMissingItem} />
                                        </Card>
                                    </Col>
                                    {/* <Col xl={1}>
                                        <Divider type="vertical" style={{ height: "100%" }} />
                                    </Col> */}
                                    <Col xl={12}>
                                        <List
                                            header={<div className='font-bold text-xl'>รายการประกาศตามหาของหาย</div>}
                                            bordered
                                            dataSource={
                                                [
                                                    <div className='flex justify-between w-full items-center'>
                                                        <span className='p-2 bg-gray-300 rounded-xl'>รายการประกาศตามหาของหายทั้งหมด</span>
                                                        <span className='text-xl'>{losingStaticData?.countAll} <span className='text-sm'>รายการ</span></span>
                                                    </div>,
                                                    <div className='flex justify-between w-full items-center'>
                                                        <span className='p-2 bg-green-300 rounded-xl'>ได้รับของคืนแล้ว</span>
                                                        <span className='text-xl'>{losingStaticData?.countByStatus ? losingStaticData?.countByStatus[1].count : null} <span className='text-sm'>รายการ</span></span>
                                                    </div>,
                                                    <div className='flex justify-between w-full items-center'>
                                                        <span className='p-2 bg-red-300 rounded-xl'>ยังไม่ได้รับของคืน</span>
                                                        <span className='text-xl'>{losingStaticData?.countByStatus ? losingStaticData?.countByStatus[0].count : null} <span className='text-sm'>รายการ</span></span>
                                                    </div>,
                                                ]
                                            }
                                            renderItem={(item) => (
                                                <List.Item>
                                                    {item}
                                                </List.Item>
                                            )}
                                        />
                                        <List
                                            header={<div className='font-bold text-sm'>รายการประกาศตามหาของหายตามวิทยาเขต</div>}
                                            bordered
                                            dataSource={
                                                listLosingCampusStatic
                                            }
                                            renderItem={(item) => (
                                                <List.Item>
                                                    {item}
                                                </List.Item>
                                            )}
                                        />
                                        <div className='mt-3'></div>
                                        <Card>
                                            <Doughnut data={dataLosingItem} />
                                        </Card>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </Card>
            </Content>
        </>
    )
}

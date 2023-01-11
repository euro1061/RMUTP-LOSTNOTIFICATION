import React, { useEffect, useState } from 'react'
import { Button, Col, Divider, Empty, Form, Image, Input, Row, Select, Spin, Tooltip } from 'antd'
import ModalItem from '../../../components/ModalItem';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { GetAllLosingItem, GetAllMissingItem, getAllCampusAPI } from '../API/HomeApi';
import moment from 'moment';

const { Option } = Select;

export default function HomeList(props) {
    const { testData, testData2 } = props
    const navigate = useNavigate()

    const [itemModal, setItemModal] = useState({})
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [missingItem, setMissingItem] = useState([])
    const [loadingItem, setLoadingItem] = useState(true)

    const [losingItem, setLosingItem] = useState([])
    const [loadingItemLosing, setLoadingItemLosing] = useState(true)

    const [campus, setCampus] = useState([]);

    const [page, setPage] = useState(1);

    const [selectedCampus, setselectedCampus] = useState("")
    const [queryTitle, setQueryTitle] = useState("")

    const [selectedCampusLosing, setselectedCampusLosing] = useState("")
    const [queryTitleLosing, setQueryTitleLosing] = useState("")

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const getAllMissingItem = (campus, query) => {
        GetAllMissingItem(campus, query).then((res) => {
            setLoadingItem(true)
            setMissingItem(res)
            setLoadingItem(false)
        })
    }

    const getAllLosingItem = (campus, query) => {
        GetAllLosingItem(campus, query).then((res) => {
            setLoadingItemLosing(true)
            setLosingItem(res)
            setLoadingItemLosing(false)
        })
    }

    const getAllCampus = async () => {
        const { isSuccess, responseData } = await getAllCampusAPI()
        if (isSuccess) {
            setCampus(responseData)
        }
    }

    useEffect(() => {
        getAllMissingItem("", "")
        getAllLosingItem("", "")
        getAllCampus()
    }, [])

    useEffect(() => {
        if (
            (selectedCampus !== "" && selectedCampus !== null) ||
            (queryTitle !== "" && queryTitle !== null)) {
            getAllMissingItem(selectedCampus, queryTitle)
        }
    }, [selectedCampus, queryTitle])

    useEffect(() => {
        if (
            (selectedCampusLosing !== "" && selectedCampusLosing !== null) ||
            (queryTitleLosing !== "" && queryTitleLosing !== null)) {
            getAllLosingItem(selectedCampusLosing, queryTitleLosing)
        }
    }, [selectedCampusLosing, queryTitleLosing])

    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
        >
            <div className='mx-auto w-10/12 -mt-64 xl:-mt-[95px] lg:-mt-[95px] min-h-fit'>
                <div className='flex flex-col xl:flex-row lg:flex-row justify-center xl:justify-between lg:justify-between gap-1 xl:gap-2 lg:gap-2 mb-1'>
                    <div className='flex flex-col xl:flex-row lg:flex-row gap-1 xl:gap-2 lg:gap-2'>
                        <Button
                            size='large'
                            icon={<i className="fa-solid fa-bell"></i>}
                            onClick={() => {
                                setPage(1)
                            }}
                        >
                            &nbsp; รายการแจ้งพบเห็นของหาย
                        </Button>
                        <Button
                            size='large'
                            icon={<i className="fa-solid fa-bullhorn"></i>}
                            onClick={() => {
                                setPage(2)
                            }}
                        >
                            &nbsp; รายการประกาศตามหาของหาย
                        </Button>
                    </div>
                    {page === 1 ?
                        <Button
                            size="large"
                            type='primary'
                            icon={<PlusOutlined style={{ display: "inline-grid" }} />}
                            onClick={() => navigate('/addlistmissingitem')}
                        >
                            เพิ่มรายการแจ้งพบเห็นของหาย
                        </Button>
                        :
                        <Button
                            size="large"
                            type='primary'
                            icon={<PlusOutlined style={{ display: "inline-grid" }} />}
                            onClick={() => navigate('/addlistlostitem')}
                        >
                            เพิ่มรายการประกาศของหาย
                        </Button>
                    }

                </div>
                {page === 1 ?
                    <section className='p-6 bg-white shadow-xl rounded-lg  '>
                        <div className='flex flex-col xl:flex-row lg:flex-row lg:justify-between xl:justify-between'>
                            {!loadingItem ?
                                <>
                                    <h1 className='text-3xl m-0 text-center mb-5 lg:mb-0 xl:mb-0'>รายการแจ้งพบเห็นของหาย
                                        <small className='text-sm text-primaryTheme'> ({missingItem.length} รายการ)</small>
                                    </h1>
                                    <div className='flex flex-col lg:flex-row xl:flex-row justify-center items-center gap-3'>
                                        <Form.Item
                                            style={{ margin: 0 }}
                                            name="queryMissingItem"
                                        >
                                            <Input
                                                onChange={(e) => {
                                                    if(e.target.value === "") {
                                                        setQueryTitle(undefined)
                                                    }else{
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
                                </>
                                :
                                null}

                        </div>
                        <Divider />
                        <Row gutter={[8, 8]} align="middle">
                            {
                                missingItem.length > 0 && !loadingItem ?
                                    missingItem.map((item, index) => (
                                        <Col xl={6} xs={24} key={index}>
                                            <Tooltip
                                                zIndex={1}
                                                title={
                                                    <>
                                                        <div className='block xl:hidden lg:hidden text-center text-black'>{item.title}</div>
                                                        <div className='hidden xl:block lg:block'>
                                                            <div className='flex justify-between items-center'>
                                                                <div className='flex justify-start items-center space-x-2'>
                                                                    <Image
                                                                        style={{ borderRadius: "50%" }}
                                                                        width={26}
                                                                        height={26}
                                                                        preview={false}
                                                                        src={item.User.urlPicture}
                                                                    />
                                                                    <div className="font-light text-xs dark:text-white">
                                                                        <Link to="/profileNotification" className='hover:text-gray-500'>{item.User.firstName} {item.User.lastName}</Link>
                                                                    </div>
                                                                </div>
                                                                <div className="text-slate-900 font-light text-xs dark:text-white">วันที่แจ้ง : {moment(item.updatedAt).format("DD/MM/YYYY")}</div>
                                                            </div>
                                                            <Divider style={{ margin: 5 }} />
                                                            <div className='title text-black text-base font-bold'>
                                                                <h1>{item.title}</h1>
                                                            </div>

                                                            <Divider style={{ margin: 5 }} />
                                                            <p className='text-black line-clamp-2'>รายละเอียด : {item.description}</p>
                                                            <Divider style={{ margin: 0 }} />
                                                            <div className='flex justify-between'>
                                                                <Button type="primary"
                                                                    onClick={() => {
                                                                        setItemModal(item)
                                                                        showModal()
                                                                    }}
                                                                    block>ดูรายละเอียดเพิ่มเติม</Button>
                                                            </div>
                                                        </div>
                                                    </>
                                                }
                                                placement='top'
                                                color='#f7f7f7'
                                            >
                                                <div
                                                    className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
                                                    <button onClick={() => {
                                                        setItemModal(item)
                                                        showModal()
                                                    }}>
                                                        <div className='relative w-full h-56 overflow-hidden'>
                                                            <img className="rounded-t-lg w-full h-fit hover:brightness-75 ease-in-out duration-300" src={`${item.imageItem}`} alt="" />
                                                        </div>
                                                    </button>
                                                    <div className="p-3">
                                                        <a href="/#">
                                                            <h5 className="text-base font-normal tracking-tight text-gray-900 dark:text-white line-clamp-1">{item.title}</h5>
                                                            <Divider style={{ margin: 0 }} />
                                                        </a>
                                                    </div>
                                                </div>

                                            </Tooltip>
                                        </Col>
                                    )) : missingItem.length === 0 && !loadingItem ?
                                        <div className='flex justify-center w-full'>
                                            <Empty
                                                description="ยังไม่มีข้อมูล"
                                            />
                                        </div> :
                                        <div className='flex justify-center w-full'>
                                            <Spin size='large' tip="กำลังโหลด" spinning={loadingItem}>
                                                <Empty
                                                    description="ยังไม่มีข้อมูล"
                                                />
                                            </Spin>

                                        </div>

                            }

                        </Row>

                        <ModalItem
                            handleCancel={handleCancel}
                            isModalVisible={isModalVisible}
                            itemModal={itemModal}
                        />
                    </section>
                    :
                    <section className='p-6 bg-white shadow-xl rounded-lg  '>
                        <div className='flex flex-col xl:flex-row lg:flex-row lg:justify-between xl:justify-between'>
                            <h1 className='text-3xl m-0 text-center mb-5 lg:mb-0 xl:mb-0'>รายการประกาศตามหาของหาย <small className='text-sm text-primaryTheme'>({losingItem.length} รายการ)</small></h1>
                            <div className='flex flex-col lg:flex-row xl:flex-row justify-center gap-3'>
                                <Form.Item
                                    style={{ margin: 0 }}
                                    name="queryLosingItem"
                                    allowClear
                                >
                                    <Input
                                        allowClear
                                        size="large"
                                        placeholder='คำค้นหา...'
                                        onChange={(e) => {
                                            if(e.target.value === "") {
                                                setQueryTitleLosing(undefined)
                                            }else{
                                                setQueryTitleLosing(e.target.value)
                                            }
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    style={{ margin: 0 }}
                                    name="selectedCampusLosingItem"
                                >
                                    <Select
                                        size='large'
                                        allowClear
                                        style={{ width: "200px" }}
                                        placeholder="วิทยาเขต"
                                        onChange={(value) => setselectedCampusLosing(value)}
                                    >
                                        {campus?.map(item => (<Option key={item.id} value={item.id}>{item.campusTh}</Option>))}
                                    </Select>
                                </Form.Item>
                                {/* <Button size='large' type='primary'>ค้นหา</Button> */}
                            </div>
                        </div>
                        <Divider />
                        <Row gutter={[8, 8]} align="middle">
                            {
                                losingItem.length > 0 && !loadingItemLosing ?
                                    losingItem.map((item, index) => (
                                        <Col xl={6} xs={12} key={index}>
                                            <Tooltip
                                                zIndex={1}
                                                title={
                                                    <>
                                                        <div className='block xl:hidden lg:hidden text-center text-black'>{item.title}</div>
                                                        <div className='hidden xl:block lg:block'>
                                                            <div className='flex justify-between items-center'>
                                                                <div className='flex justify-start items-center space-x-2'>
                                                                    <Image
                                                                        style={{ borderRadius: "50%" }}
                                                                        width={26}
                                                                        height={26}
                                                                        preview={false}
                                                                        src={item.LosingItem.urlPicture}
                                                                    />
                                                                    <div className="font-light text-xs dark:text-white">
                                                                        <Link to="/profileNotification" className='hover:text-gray-500'>{item.LosingItem.firstName} {item.LosingItem.lastName}</Link>
                                                                    </div>
                                                                </div>
                                                                <div className="text-slate-900 font-light text-xs dark:text-white">วันที่แจ้ง : {moment(item.updatedAt).format("DD/MM/YYYY")}</div>
                                                            </div>
                                                            <Divider style={{ margin: 5 }} />
                                                            <div className='title text-black text-base font-bold'>
                                                                <h1>{item.title}</h1>
                                                            </div>

                                                            <Divider style={{ margin: 5 }} />
                                                            <p className='text-black line-clamp-2'>รายละเอียด : {item.description}</p>
                                                            <Divider style={{ margin: 0 }} />
                                                            <div className='flex justify-between'>
                                                                <Button type="primary"
                                                                    onClick={() => {
                                                                        setItemModal(item)
                                                                        showModal()
                                                                    }}
                                                                    block>ดูรายละเอียดเพิ่มเติม</Button>
                                                            </div>
                                                        </div>
                                                    </>
                                                }
                                                placement='top'
                                                color='#f7f7f7'
                                            >
                                                <div
                                                    className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
                                                    <button onClick={() => {
                                                        setItemModal(item)
                                                        showModal()
                                                    }}>
                                                        <div className='relative w-full h-56 overflow-hidden'>
                                                            <img className="rounded-t-lg w-full h-fit hover:brightness-75 ease-in-out duration-300" src={item.imageItem !== null ? item.imageItem : "https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image.png"} alt="" />
                                                        </div>
                                                    </button>
                                                    <div className="p-3">
                                                        <a href="/#">
                                                            <h5 className="text-base font-normal tracking-tight text-gray-900 dark:text-white line-clamp-1">{item.title}</h5>
                                                            <Divider style={{ margin: 0 }} />
                                                        </a>
                                                    </div>
                                                </div>

                                            </Tooltip>
                                        </Col>
                                    )) : losingItem.length === 0 && !loadingItemLosing ?
                                        <div className='flex justify-center w-full'>
                                            <Empty
                                                description="ยังไม่มีข้อมูล"
                                            />
                                        </div> :
                                        <div className='flex justify-center w-full'>
                                            <Spin size='large' tip="กำลังโหลด" spinning={loadingItemLosing}>
                                                <Empty
                                                    description="ยังไม่มีข้อมูล"
                                                />
                                            </Spin>
                                        </div>
                            }

                        </Row>
                        <ModalItem
                            handleCancel={handleCancel}
                            isModalVisible={isModalVisible}
                            itemModal={itemModal}
                        />
                    </section>
                }
            </div>
        </motion.div>

    )
}

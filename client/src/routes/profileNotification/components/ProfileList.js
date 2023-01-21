import React, { useEffect, useState } from 'react'
import { Avatar, Divider, Image, Tabs, Row, Col, Button, Tooltip, Empty } from 'antd'
import ModalItem from '../../../components/ModalItem';
import { Link } from 'react-router-dom'
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons';

export default function ProfileList(props) {
    const { dataList, user, GetUserCurrent, propsNavigate, dataListLosing } = props
    const [itemModal, setItemModal] = useState({})
    const [activeTabs, setActiveTabs] = useState("1")
    const navigate = useNavigate();

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const { TabPane } = Tabs;

    const onChange = (key) => {
        setActiveTabs(key);
    };

    useEffect(() => {
        if (propsNavigate?.selectActiveTabs) {
            // console.log(propsNavigate.selectActiveTabs)
            setActiveTabs(propsNavigate?.selectActiveTabs)
        }
    }, [propsNavigate])



    useEffect(() => {
        document.body.style.background = "#f7f7f7"
    }, [])

    return (
        <section className='mx-auto w-10/12 p-6 mb-5 bg-white shadow-md rounded-lg min-h-fit mt-10'>
            <div className='flex justify-center items-center w-full'>
                <div className='text-5xl font-bold pr-4'>
                    <span className='text-primaryTheme'>PRO</span>FILE
                </div>
                <div className='flex pr-4'>

                    <Avatar
                        style={{ width: 50, height: 50 }}
                        src={
                            <Image
                                width={50}
                                src={user?.urlPicture}
                            />
                        }
                    />
                </div>
                <div className='flex flex-col'>
                    <p className='text-xl font-bold mb-1'>
                        {user?.firstName} {user?.lastName}
                    </p>
                    <span><i className="fa-solid fa-envelope text-red-600"></i> {user?.email && user.email !== null ? user.email : "ไม่มีข้อมูล"}</span>
                </div>
            </div>
            <Divider />
            <Row>
                <Col xl={24} lg={24} md={24} sm={24}>
                    <Tabs
                        // defaultActiveKey={activeTabs}
                        activeKey={activeTabs}
                        onChange={onChange}
                        size='large'
                        centered={true}
                        tabBarGutter={50}
                    >
                        <TabPane
                            tab={`รายการแจ้งพบเห็นของรายของฉัน (${dataList.length})`}
                            key="1"
                        >
                            {dataList.length > 0 ?
                                <Row gutter={[8, 8]} align="middle">
                                    {
                                        dataList.map((item, index) => (
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
                                        ))
                                    }
                                </Row> :
                                <Empty
                                    description={
                                        <>
                                            <p>ยังไม่มีข้อมูล</p>
                                            <Button
                                                onClick={() => navigate('/addlistmissingitem')}
                                                icon={<PlusCircleOutlined style={{ display: "inline-grid" }} />}
                                            >
                                                เพิ่มรายการแจ้งพบเห็นของหาย
                                            </Button>
                                        </>
                                    }
                                />
                            }

                        </TabPane>
                        <TabPane
                            tab={`รายการประกาศตามหาของหายของฉัน (${dataListLosing.length})`}
                            key="2"
                        >
                            {dataListLosing.length > 0 ?
                                <Row gutter={[8, 8]} align="middle">
                                    {
                                        dataListLosing.map((item, index) => (
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
                                        ))
                                    }
                                </Row> :
                                <Empty
                                    description={
                                        <>
                                            <p>ยังไม่มีข้อมูล</p>
                                            <Button
                                                onClick={() => navigate('/addlistlostitem')}
                                                icon={<PlusCircleOutlined style={{ display: "inline-grid" }} />}
                                            >
                                                เพิ่มรายการประกาศหาของหาย
                                            </Button>
                                        </>
                                    }
                                />
                            }

                        </TabPane>
                    </Tabs>
                </Col>
            </Row>
            <ModalItem
                handleCancel={handleCancel}
                isModalVisible={isModalVisible}
                itemModal={itemModal}
                GetUserCurrent={GetUserCurrent}
                setIsModalVisible={setIsModalVisible}
            />
        </section>
    )
}

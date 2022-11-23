import React, { useEffect, useState } from 'react'
import { Avatar, Divider, Image, Tabs, Row, Col, Button, Tooltip, Empty } from 'antd'
import ModalItem from '../../../components/ModalItem';
import { Link } from 'react-router-dom'

export default function ProfileList(props) {
    const { testData } = props
    const [itemModal, setItemModal] = useState({})

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const { TabPane } = Tabs;

    const onChange = (key) => {
        console.log(key);
    };

    useEffect(() => {
        document.body.style.background = "#f7f7f7"
    }, [])

    return (
        <section className='mx-auto w-10/12 p-6 mb-5 bg-white shadow-md rounded-lg min-h-fit mt-10'>
            <div className='flex justify-center items-center'>
                <div className='text-5xl font-bold pr-4'>
                    <span className='text-purple-800'>PRO</span>FILE
                </div>
                <div className='flex pr-4'>

                    <Avatar
                        style={{ width: 50, height: 50 }}
                        src={
                            <Image
                                width={50}
                                src="https://images.generated.photos/Cu7Uk2u06qGpVLO6AkzPCgLYuqZ3WbkmbNK4Y0ol2E4/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NTkzNDczLmpwZw.jpg"
                            />
                        }
                    />
                </div>
                <div className='flex flex-col'>
                    <p className='text-xl font-bold mb-1'>พิชญ์ พิสิฐฏ์เสฏ</p>
                    <span><i className="fa-solid fa-envelope text-red-600"></i> email@example.com</span>
                </div>
            </div>
            <Divider />
            <Row>
                <Col xl={24} lg={24} md={24} sm={24}>
                    <Tabs
                        defaultActiveKey="1"
                        onChange={onChange}
                        size='large'
                        centered={true}
                        tabBarGutter={50}
                    >
                        <TabPane tab="รายการแจ้งพบเห็นของราย" key="1">
                            <Row gutter={[8, 8]} align="middle">
                                {
                                    testData.map((item, index) => (
                                        <Col xl={4} xs={12} key={index}>
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
                                                                        src="https://images.generated.photos/Cu7Uk2u06qGpVLO6AkzPCgLYuqZ3WbkmbNK4Y0ol2E4/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NTkzNDczLmpwZw.jpg"
                                                                    />
                                                                    <div className="font-light text-xs dark:text-white">
                                                                        <Link to="/test" className='hover:text-gray-500'>สหัสวรรษ บุญชิต</Link>
                                                                    </div>
                                                                </div>
                                                                <div className="text-slate-900 font-light text-xs dark:text-white">วันที่แจ้ง : 12/8/2022</div>
                                                            </div>
                                                            <Divider style={{ margin: 5 }} />
                                                            <div className='title text-black text-base font-bold'>
                                                                <h1>{item.title}</h1>
                                                            </div>

                                                            <Divider style={{ margin: 5 }} />
                                                            <p className='text-black line-clamp-2'>ซิม คาราโอเกะเซ็นเซอร์ จีดีพีมัฟฟินต้าอ่วยบัตเตอร์เพลซ ซัมเมอร์สเตเดียมทาวน์เฮาส์บอกซ์ บร็อกโคลีแฟนตาซีสถาปัตย์สังโฆ </p>
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
                                                placement='right'
                                                color='#f7f7f7'
                                            >
                                                <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
                                                    <button onClick={() => {
                                                        setItemModal(item)
                                                        showModal()
                                                    }}>
                                                        <img className="rounded-t-lg hover:brightness-75 ease-in-out duration-300" src={`${process.env.PUBLIC_URL}/${item.image}`} alt="" />
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
                            </Row>
                        </TabPane>
                        <TabPane tab="รายการประกาศตามหาของหาย" key="2">
                            <Empty description="ไม่มีข้อมูล" style={{ marginTop: 10 }} />
                        </TabPane>
                    </Tabs>
                </Col>
            </Row>
            <ModalItem
                handleCancel={handleCancel}
                isModalVisible={isModalVisible}
                itemModal={itemModal}
            />
        </section>
    )
}

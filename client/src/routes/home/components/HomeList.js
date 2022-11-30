import React, { useEffect, useState } from 'react'
import { Button, Col, Divider, Form, Image, Input, Row, Select, Tooltip } from 'antd'
import ModalItem from '../../../components/ModalItem';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { GetAllMissingItem } from '../API/HomeApi';
import moment from 'moment';

export default function HomeList(props) {
    const { testData, testData2 } = props
    const navigate = useNavigate()

    const [itemModal, setItemModal] = useState({})
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [missingItem, setMissingItem] = useState([])

    const [page, setPage] = useState(1);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const getAllMissingItem = () => {
        GetAllMissingItem().then((res) => {
            setMissingItem(res)
        })
    }

    useEffect(() => {
        getAllMissingItem()
    }, [])

    const { Option } = Select;

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
                            size='middle'
                            icon={<i className="fa-solid fa-bell"></i>}
                            onClick={() => setPage(1)}
                        >
                            &nbsp; รายการแจ้งพบเห็นของหาย
                        </Button>
                        <Button
                            size='middle'
                            icon={<i className="fa-solid fa-bullhorn"></i>}
                            onClick={() => setPage(2)}
                        >
                            &nbsp; รายการประกาศตามหาของหาย
                        </Button>
                    </div>
                    {page === 1 ?
                        <Button
                            type='primary'
                            icon={<PlusOutlined />}
                            onClick={() => navigate('/addlistmissingitem')}
                        >
                            เพิ่มรายการแจ้งพบเห็นของหาย
                        </Button>
                        :
                        <Button
                            type='primary'
                            icon={<PlusOutlined />}
                            onClick={() => navigate('/addlistlostitem')}
                        >
                            เพิ่มรายการประกาศของหาย
                        </Button>
                    }

                </div>
                {page === 1 ?
                    <section className='p-6 bg-white shadow-xl rounded-lg  '>
                        <div className='flex flex-col xl:flex-row lg:flex-row lg:justify-between xl:justify-between'>
                            <h1 className='text-3xl m-0 text-center mb-5 lg:mb-0 xl:mb-0'>รายการแจ้งพบเห็นของหาย 
                                <small className='text-sm text-primaryTheme'> ({missingItem.length} รายการ)</small>
                            </h1>
                            <div className='flex flex-col lg:flex-row xl:flex-row justify-center gap-3'>
                                <Form.Item
                                    style={{ margin: 0 }}
                                >
                                    <Input
                                        size="large"
                                        placeholder='คำค้นหา...'
                                    />
                                </Form.Item>
                                <Form.Item
                                    style={{ margin: 0 }}
                                >
                                    <Select
                                        size='large'
                                        placeholder="วิทยาเขต"
                                    >
                                        <Option value="test">ทั้งหมด</Option>
                                    </Select>
                                </Form.Item>
                                <Button size='large' type='primary'>ค้นหา</Button>
                            </div>
                        </div>
                        <Divider />
                        <Row gutter={[8, 8]} align="middle">
                            {
                                missingItem.map((item, index) => (
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
                                                    <img width="100%" className="rounded-t-lg hover:brightness-75 ease-in-out duration-300" src={`${item.imageItem}`} alt="" />
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
                        <ModalItem
                            handleCancel={handleCancel}
                            isModalVisible={isModalVisible}
                            itemModal={itemModal}
                        />
                    </section>
                    :
                    <section className='p-6 bg-white shadow-xl rounded-lg  '>
                        <div className='flex flex-col xl:flex-row lg:flex-row lg:justify-between xl:justify-between'>
                            <h1 className='text-3xl m-0 text-center mb-5 lg:mb-0 xl:mb-0'>รายการประกาศตามหาของหาย <small className='text-sm text-purple-500'>({testData.length} รายการ)</small></h1>
                            <div className='flex flex-col lg:flex-row xl:flex-row justify-center gap-3'>
                                <Form.Item
                                    style={{ margin: 0 }}
                                >
                                    <Input
                                        size="large"
                                        placeholder='คำค้นหา...'
                                    />
                                </Form.Item>
                                <Form.Item
                                    style={{ margin: 0 }}
                                >
                                    <Select
                                        size='large'
                                        placeholder="วิทยาเขต"
                                    >
                                        <Option value="test">ทั้งหมด</Option>
                                    </Select>
                                </Form.Item>
                                <Button size='large' type='primary'>ค้นหา</Button>
                            </div>
                        </div>
                        <Divider />
                        <Row gutter={[8, 8]} align="middle">
                            {
                                testData2.map((item, index) => (
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
                                            placement='top'
                                            color='#f7f7f7'
                                        >
                                            <div
                                                className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
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
                    </section>
                }
            </div>
        </motion.div>

    )
}

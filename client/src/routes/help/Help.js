import React from 'react'
import Footer from '../../components/Footer'
import Topbar from '../../components/Topbar'
import { Anchor, Breadcrumb, Card, Col, Divider, Image, Row } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
const { Link } = Anchor;

export default function Help() {
    return (
        <>
            <Topbar />
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <div className='mx-auto w-10/12 mt-10 min-h-fit'>
                    <Breadcrumb>
                        <Breadcrumb.Item>หน้าแรก</Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <span>คำถามที่พบบ่อย</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <Card
                        title={<label className='text-3xl font-bold text-primaryTheme'><QuestionCircleOutlined style={{ display: "inline-grid" }} /> คำถามที่พบบ่อย</label>}
                        style={{ marginTop: 10 }}
                    >
                        <Row>
                            <Col xl={4}>
                                <Anchor
                                    bounds={10}
                                >
                                    <Link href="#part-1" title="วิธีเพิ่มประกาศ" />
                                    <Link href="#part-2" title="รหัสผ่านเข้าใช้งานคืออะไร" />
                                    <Link href="#part-3" title="ติดต่อกับเจ้าของประกาศยังไง" />
                                </Anchor>
                            </Col>
                            <Col xl={20}>
                                <div
                                    id="part-1"
                                />
                                <h1 className='text-2xl mb-5'>วิธีเพิ่มประกาศ</h1>

                                <Row gutter={[16, 16]}>
                                    <Col xl={24}>
                                        <p className='text-lg'>1. กดที่เมนู "เพิ่มรายการแจ้งพบเห็นของหาย"</p>
                                        <Image
                                            src={`${process.env.PUBLIC_URL}/1/help01.jpg`}
                                        />
                                    </Col>
                                    <Col xl={24}>
                                        <p className='text-lg'>2. หากยังไม่ได้ทำการเข้าสู่ระบบให้ทำการเข้าสู่ระบบก่อน"</p>
                                        <Image
                                            src={`${process.env.PUBLIC_URL}/1/help02.jpg`}
                                        />
                                    </Col>
                                    <Col xl={24}>
                                        <p className='text-lg'>3. กรอกข้อมูลให้ครบถ้วนและกดปุ่มบันทึก</p>
                                        <ul className='list-disc'>
                                            <li>(1) กรอกชื่อประกาศ หรือ สิ่งของที่เก็บได้</li>
                                            <li>(2) เลือกสถานที่พบเห็นสิ่งของที่เก็บได้โดยต้องเลือก วิทยาเขตก่อนแล้วเลือกอาคารและห้องตามลำดับ</li>
                                            <li>(3) รูปภาพสิ่งของที่พบเห็นหรือเก็บได้</li>
                                            <li>(4) รอยตำหนิบนสิ่งของ (ใส่หรือไม่ก็ได้)</li>
                                            <li>(5) กรอกรายละเอียดเพิ่มเติมเกี่ยวกับสิ่งของที่เก็บได้</li>
                                            <li>(6) หากมีผู้นำสิ่งของมาฝากลงประกาศ สามารถเพิ่มข้อมูลผู้นำมาฝากได้ว่าใครเป็นคนนำมาฝากไว้ โดยสามารถค้นหาได้โดยใช้ รหัสนักศึกษาและชื่อสกุล หรือ สามารถกรอกข้อมูลเองได้</li>
                                        </ul>
                                        <Image
                                            src={`${process.env.PUBLIC_URL}/1/help03.jpg`}
                                        />
                                    </Col>
                                    <Col xl={12}>
                                        <p className='text-lg'>เมื่อกดบันทึกแล้วข้อมูลประกาศจะถูกเผยแพร์ทันที"</p>
                                        <Image
                                            src={`${process.env.PUBLIC_URL}/1/help04.jpg`}
                                        />
                                    </Col>
                                    <Col xl={12}>
                                        <p className='text-lg'>โดยสามารถเข้าไปดูประกาศแบบเต็มหรือ แก้ไขประกาศ, ลบประกาศ และอัพเดทสถานะของประกาศได้"</p>
                                        <Image
                                            src={`${process.env.PUBLIC_URL}/1/help05.jpg`}
                                        />
                                    </Col>
                                </Row>
                                <div
                                    id="part-2"
                                    className='mt-20'
                                />
                                <Divider />
                                <h1 className='text-2xl mb-5 mt-5'>รหัสผ่านเข้าใช้งานคืออะไร</h1>
                                <p className='text-lg'>คุณสามารถเข้าสู่ระบบได้โดย</p>
                                <ul className='list-disc'>
                                    <li>(1) กรอก Username เป็นรหัสนักศึกษา</li>
                                    <li>(2) กรอก Password เป็นรหัสบัตรประชาชนของนักศึกษา</li>
                                </ul>
                                <Image
                                    src={`${process.env.PUBLIC_URL}/1/help06.jpg`}
                                />
                                <p className='text-lg mb-9 mt-5'>หากยังไม่สามารถเข้าใช้งานได้สามารถติดต่อห้องทะเบียนที่ชั้น 2 หรืออาจารย์ที่ปรึกษาได้</p>
                                <div
                                    id="part-3"
                                />
                                <Divider />
                                <h1 className='text-2xl mb-5 mt-5'>ติดต่อกับเจ้าของประกาศยังไง</h1>
                                <p className='text-lg'>คุณสามารถคลิกที่รายการประกาศของหายเพื่อดูข้อมูลต่าง ๆ ของผู้ประกาศได้ เช่น ชื่อ เบอร์โทร อีเมล์ และรายละเอียดต่าง ๆ หรือสามารถส่งข้อความหาเจ้าของประกาศได้โดยการกรอกข้อความด่านล่างและกดส่ง ข้อความจะถูกส่งไปใน Email ของเจ้าของประกาศ</p>

                                <Image
                                    src={`${process.env.PUBLIC_URL}/1/help07.jpg`}
                                />
                            </Col>
                        </Row>
                    </Card>
                </div>
            </motion.div>

            <Footer />
        </>
    )
}

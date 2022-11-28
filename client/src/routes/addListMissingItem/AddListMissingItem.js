import React, { useEffect } from "react";
import Topbar from "../../components/Topbar";
import { motion } from "framer-motion";
import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Col,
  Collapse,
  Divider,
  Empty,
  Form,
  Input,
  Modal,
  notification,
  Row,
  Select,
  Spin,
  Upload,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import {
  ClearOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserCurrentAPI } from "../../util/Functions/userFunction";
import { authSelector, login } from "../../store/slices/authSlice";
import { useState } from "react";
import axios from "axios";
import {
  getAllCampusAPI,
  getBuildingByCampusIdAPI,
  getRoomByBuildingIdAPI,
  getStudentByNameOrStuId,
  getStudentByNameOrStuIdAPI,
} from "./API/AddListMissingItem";
const { Option } = Select;
const { Panel } = Collapse;
const { Search } = Input;
const { Meta } = Card;

export default function AddListMissingItem() {
  const [formCurrentUser] = Form.useForm();
  const [formMissingItem] = Form.useForm();

  const authReducer = useSelector(authSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeKey, setActiveKey] = useState(1);
  const [campus, setCampus] = useState(null);
  const [building, setBuilding] = useState(null);
  const [room, setRoom] = useState(null);
  const [reload, setReload] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [nameOrStuId, setNameOrStuId] = useState(null);
  const [listSearchStudent, setListSearchStudent] = useState([]);
  const [loadingListSearchStudent, setLoadingListSearchStudent] = useState(false);
  const [lodaingSaveMissing, setLodaingSaveMissing] = useState(false);
  useState(false);
  const [disabledDepositorForm, setDisabledDepositorForm] = useState(false);
  const [userMissingItemDrop, setUserMissingItemDrop] = useState(null);

  // IsSuccess
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);

  // stateUpdate
  const [isUpdateProfile, setIsUpdateProfile] = useState(false);

  //isSelected
  const [isCampusSelected, setIsCampusSelected] = useState(false);
  const [isBuildingSelected, setIsBuildingSelected] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [depositorImg, setDepositorImg] = useState(null);
  const [userImg, setUserImg] = useState(null);
  const [oldImg, setOldImg] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getUserCurrent = async () => {
    const data = await getUserCurrentAPI();
    setUserInfo(data);
    formCurrentUser.setFieldsValue(data);
    setUserImg(data.urlPicture);
    setOldImg(data.urlPicture);
  };

  const getAllCampus = async () => {
    const { isSuccess, responseData } = await getAllCampusAPI();
    if (isSuccess) {
      setCampus(responseData);
    }
  };

  const getBuildingByCampusId = async (campusId) => {
    const { isSuccess, responseData } = await getBuildingByCampusIdAPI(
      campusId
    );
    if (isSuccess) {
      setBuilding(responseData);
    }
  };

  const getRoomByBuildingId = async (roomId) => {
    const { isSuccess, responseData } = await getRoomByBuildingIdAPI(roomId);
    if (isSuccess) {
      setRoom(responseData);
    }
  };

  const getStudentByNameOrStuId = async (nameOrStuId) => {
    setLoadingListSearchStudent(true);
    const { isSuccess, responseData } = await getStudentByNameOrStuIdAPI({
      nameOrStuId: nameOrStuId,
    });
    if (isSuccess) {
      setListSearchStudent(responseData);
      setLoadingListSearchStudent(false);
    }
  };

  /*eslint-disable */
  useEffect(() => {
    getUserCurrent();
    getAllCampus();
  }, []);
  /*eslint-enable */

  const onFinishCurrentUser = async () => {
    setIsLoadingProfile(true);
    const dataForm = formCurrentUser.getFieldValue();
    const dataSend = {
      ...dataForm,
      file: dataForm.file ? dataForm.file.file : null,
      urlPicture: oldImg,
    };
    console.log(dataSend);
    const { status, data } = await axios.patch(
      `${process.env.REACT_APP_DOMAINENDPOINT}/api/users/editProfile`,
      dataSend,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (status === 200 && data.isSuccess) {
      dispatch(login({ token: data.token.access_token }));
      getUserCurrent();
      setIsLoadingProfile(false);
      notification["success"]({
        message: "บันทึกข้อมูล",
        description: "บันทึกข้อมูลสำเร็จ!",
        placement: "bottomRight",
      });
    }
  };

  const onFinishMissingItem = async (dataInform) => {
    // console.log(dataInform)
    setLodaingSaveMissing(true);
    const data = formMissingItem.getFieldValue();
    const request = {
      ...data,
      user_id: userInfo.id,
      file: data.file.file,
      statusMissing_id: "1",
      buildingOther: data.building_id === "9999" ? data.buildingOther : null,
      roomOther: data.room_id === "9999" ? data.roomOther : null,
      userMissingItemDrop_id: userMissingItemDrop
    };

    if (request.building_id === "9999" || request.building_id === null) delete request.building_id;
    if (request.room_id === "9999" || request.room_id === null) delete request.room_id;

    console.log(request);

    const resSave = await axios.post(
      `${process.env.REACT_APP_DOMAINENDPOINT}/api/missing-item`,
      request,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (resSave) {
      notification["success"]({
        message: "บันทึกข้อมูล",
        description: "บันทึกข้อมูลสำเร็จ!",
        placement: "bottomRight",
      });
    }

    setLodaingSaveMissing(false)
    console.log(resSave);
  };

  return (
    <div>
      <Topbar />
      <Modal
        title="ค้นหาข้อมูลนักศึกษา"
        visible={isModalOpen}
        width={900}
        footer={null}
        onCancel={handleCancel}
      >
        <Search
          placeholder="ค้นหาด้วยชื่อหรือรหัสนักศึกษา"
          enterButton="ค้นหา"
          onChange={(e) => {
            setNameOrStuId(e.target.value);
          }}
          value={nameOrStuId}
          onSearch={(e) => {
            if (nameOrStuId === null || nameOrStuId === "") {
              notification["warning"]({
                message: "ค้นหาไม่สำเร็จ",
                description: "กรุณากรอกข้อมูลก่อนค้นหา",
              });
            } else {
              getStudentByNameOrStuId(e);
            }
          }}
        />
        <div className="mb-5"></div>
        <Spin tip="กำลังค้นหา..." spinning={loadingListSearchStudent}>
          <Row gutter={[8, 8]}>
            {listSearchStudent.length > 0 ? (
              listSearchStudent.map((item) => (
                <Col xl={6} key={item.id}>
                  <Card
                    bodyStyle={{
                      border: "2px solid #e8e8e8",
                    }}
                    hoverable
                    onClick={() => {
                      formMissingItem.setFieldsValue({
                        firstNameDrop: item.firstName,
                        lastNameDrop: item.lastName,
                        phoneDrop: item.phone,
                        emailDrop: item.email,
                        lineIdDrop: item.lineId,
                        facebookUrlDrop: item.facebookUrl,
                      });
                      setDisabledDepositorForm(true);
                      setDepositorImg(item.urlPicture);
                      setNameOrStuId(item.stuId);
                      setUserMissingItemDrop(item.id);
                      setIsModalOpen(false);
                    }}
                    cover={
                      <div style={{ height: "190px" }}>
                        <img
                          alt="example"
                          style={{
                            height: "100%",
                            width: "100%",
                            borderTop: "2px solid #e8e8e8",
                            borderLeft: "2px solid #e8e8e8",
                            borderRight: "2px solid #e8e8e8",
                          }}
                          src={
                            item.urlPicture
                              ? item.urlPicture
                              : "https://i.pinimg.com/originals/46/5e/0d/465e0db3e6f531eb2f05987a013a23ad.jpg"
                          }
                        />
                      </div>
                    }
                  >
                    <Meta
                      title={`${item.firstName} ${item.lastName}`}
                      description={
                        <div>
                          <div>
                            <span className="font-bold">รหัสนักศึกษา</span>
                            <br /> {item.stuId}
                          </div>
                          <div>
                            <span className="font-bold">คณะที่กำลังศึกษา</span>
                            <br />{" "}
                            {item.Department?.departmentTh
                              ? item.Department?.departmentTh
                              : "ไม่มีข้อมูล"}
                          </div>
                        </div>
                      }
                    />
                  </Card>
                </Col>
              ))
            ) : (
              <Col xl={24}>
                <Empty description={`ไม่พบข้อมูลการค้นหา`} />
              </Col>
            )}

            {/* <Col xl={6}>
                        <Card
                            hoverable
                            cover={<img alt="example" src="https://i.pinimg.com/originals/46/5e/0d/465e0db3e6f531eb2f05987a013a23ad.jpg" />}
                        >
                            <Meta title="นายประหยัด จันอังคาร"
                                description={<div>
                                    <div><span className='font-bold'>รหัสนักศึกษา</span><br /> 05625002154-0</div>
                                    <div><span className='font-bold'>คณะที่กำลังศึกษา</span><br /> วิทยาศาสตร์และเทคโนโลยี</div>
                                </div>} />
                        </Card>
                    </Col>
                    <Col xl={6}>
                        <Card
                            hoverable
                            cover={<img alt="example" src="https://i.pinimg.com/originals/46/5e/0d/465e0db3e6f531eb2f05987a013a23ad.jpg" />}
                        >
                            <Meta title="นายยิ่งใหญ่ จันอังคาร"
                                description={<div>
                                    <div><span className='font-bold'>รหัสนักศึกษา</span><br /> 05625002154-0</div>
                                    <div><span className='font-bold'>คณะที่กำลังศึกษา</span><br /> วิทยาศาสตร์และเทคโนโลยี</div>
                                </div>} />
                        </Card>
                    </Col> */}
          </Row>
        </Spin>
      </Modal>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0 }}
      >
        <div className="mx-auto w-10/12 mt-10 min-h-fit">
          <div className="flex flex-col xl:flex-row lg:flex-row justify-center xl:justify-between lg:justify-between gap-1 xl:gap-2 lg:gap-2 mb-1">
            <div className="flex flex-col xl:flex-row items-center lg:flex-row gap-1 xl:gap-2 lg:gap-2">
              <Button
                size="middle"
                icon={<i className="fa-solid fa-angle-left"></i>}
                onClick={() => navigate("/")}
              >
                &nbsp; ย้อนกลับ
              </Button>
              <Divider type="vertical" />
              <Breadcrumb>
                <Breadcrumb.Item>หน้าแรก</Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a href="/#">รายการแจ้งพบเห็นของหาย</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a href="/#">เพิ่มรายการแจ้งพบเห็นของหาย</a>
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
          <section className="p-6 bg-white shadow-xl rounded-lg  ">
            <div className="flex flex-col xl:flex-row lg:flex-row lg:justify-between xl:justify-between">
              <h1 className="text-3xl m-0 text-center mb-5 lg:mb-0 xl:mb-0">
                เพิ่มรายการแจ้งพบเห็นของหาย
              </h1>
              <Button
                size="large"
                type="primary"
                loading={lodaingSaveMissing}
                disabled={!authReducer.isLoggedIn}
                onClick={() => {
                  formMissingItem.submit();
                }}
                icon={<i className="fa-solid fa-floppy-disk"></i>}
              >
                &nbsp; บันทึก
              </Button>
            </div>
            <Divider />
            <Form
              form={formMissingItem}
              onFinish={(e) => onFinishMissingItem(e)}
            >
              <Row gutter={[8, 8]} align="top">
                {authReducer.isLoggedIn ? (
                  <Col xl={24}>
                    <Collapse activeKey={[activeKey]} bordered={true}>
                      <Panel
                        showArrow={false}
                        header={
                          <label className="text-purple-800">
                            ข้อมูลผู้ประกาศ
                          </label>
                        }
                        extra={
                          <>
                            {isUpdateProfile ? (
                              <Button
                                loading={isLoadingProfile}
                                type="primary"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setIsUpdateProfile(false);
                                  setActiveKey(1);
                                  setReload(!reload);

                                  formCurrentUser.submit();
                                }}
                              >
                                บันทึกข้อมูลส่วนตัว
                              </Button>
                            ) : (
                              <Button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setIsUpdateProfile(true);
                                  setActiveKey(1);
                                  setReload(!reload);
                                }}
                              >
                                แก้ไข
                              </Button>
                            )}
                          </>
                        }
                        key="1"
                      >
                        <Spin
                          spinning={isLoadingProfile}
                          tip={"กำลังบันทึกข้อมูล"}
                          size="large"
                        >
                          <Form
                            form={formCurrentUser}
                            onFinish={() => onFinishCurrentUser()}
                          >
                            <Row gutter={[0, 6]}>
                              <Col xl={2}>
                                <Form.Item name="file">
                                  {isUpdateProfile ? (
                                    <Upload
                                      multiple={false}
                                      maxCount={1}
                                      showUploadList={false}
                                      accept={".jpg,.jpeg,.png"}
                                      beforeUpload={(file) => {
                                        console.log(file);
                                        const reader = new FileReader();

                                        reader.onload = (e) => {
                                          setUserImg(e.target.result);
                                        };
                                        reader.readAsDataURL(file);

                                        // Prevent upload
                                        return false;
                                      }}
                                    >
                                      {userImg ? (
                                        <Avatar
                                          size={80}
                                          src={userImg}
                                          icon={
                                            <i className="fa-solid fa-user-astronaut"></i>
                                          }
                                        />
                                      ) : (
                                        <Avatar
                                          size={80}
                                          icon={
                                            <i className="fa-solid fa-user-astronaut"></i>
                                          }
                                        />
                                      )}
                                    </Upload>
                                  ) : userImg ? (
                                    <Avatar
                                      size={80}
                                      src={userImg}
                                      icon={
                                        <i className="fa-solid fa-user-astronaut"></i>
                                      }
                                    />
                                  ) : (
                                    <Avatar
                                      size={80}
                                      icon={
                                        <i className="fa-solid fa-user-astronaut"></i>
                                      }
                                    />
                                  )}
                                </Form.Item>
                              </Col>
                              <Col xl={22}>
                                <Row gutter={[6, 6]}>
                                  <Col xl={8}>
                                    <Form.Item
                                      style={{ marginBottom: 5 }}
                                      name="firstName"
                                      rules={[
                                        {
                                          required: true,
                                          message: "กรุณากรอกชื่อ",
                                        },
                                      ]}
                                    >
                                      <Input
                                        placeholder="ชื่อ"
                                        disabled={!isUpdateProfile}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col xl={8}>
                                    <Form.Item
                                      style={{ marginBottom: 5 }}
                                      name="lastName"
                                      rules={[
                                        {
                                          required: true,
                                          message: "กรุณากรอกนามสกุล",
                                        },
                                      ]}
                                    >
                                      <Input
                                        placeholder="นามสกุล"
                                        disabled={!isUpdateProfile}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col xl={8}>
                                    <Form.Item
                                      style={{ marginBottom: 5 }}
                                      name="phone"
                                      rules={[
                                        {
                                          required: true,
                                          message: "กรุณากรอกเบอร์โทร",
                                        },
                                      ]}
                                    >
                                      <Input
                                        prefix={
                                          <i className="fa-solid fa-phone text-green-500"></i>
                                        }
                                        placeholder="เบอร์โทร"
                                        disabled={!isUpdateProfile}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col xl={8}>
                                    <Form.Item name="email">
                                      <Input
                                        placeholder="Email"
                                        disabled={!isUpdateProfile}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col xl={8}>
                                    <Form.Item name="lineId">
                                      <Input
                                        prefix={
                                          <i className="fa-brands fa-line text-green-400"></i>
                                        }
                                        placeholder="Line (ใส่หรือไม่ก็ได้)"
                                        disabled={!isUpdateProfile}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col xl={8}>
                                    <Form.Item name="facebookUrl">
                                      <Input
                                        prefix={
                                          <i className="fa-brands fa-facebook text-blue-400"></i>
                                        }
                                        placeholder="Facebook (ใส่หรือไม่ก็ได้)"
                                        disabled={!isUpdateProfile}
                                      />
                                    </Form.Item>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </Form>
                        </Spin>
                      </Panel>
                    </Collapse>
                  </Col>
                ) : null}
                <Col xl={24}>
                  {authReducer.isLoggedIn ?
                    <Collapse>
                      <Panel
                        key="1"
                        showArrow={false}
                        header={
                          <label className="text-purple-800">ข้อมูลผู้ฝาก (Optional)</label>
                        }
                      >
                        {/* <Button type="primary" onClick={() => {
                                              console.log("asdasd")
                                              showModal()
                                          }} icon={<SearchOutlined style={{ display: "inline-grid" }} />}>ค้นหาข้อมูลนักศึกษา</Button> */}
                        <Row gutter={[8, 8]}>
                          <Col xl={7}>
                            <Search
                              placeholder="ค้นหาด้วยชื่อหรือรหัสนักศึกษา"
                              enterButton="ค้นหา"
                              onChange={(e) => {
                                setNameOrStuId(e.target.value);
                              }}
                              value={nameOrStuId}
                              onSearch={(e) => {
                                if (nameOrStuId === null || nameOrStuId === "") {
                                  notification["warning"]({
                                    message: "ค้นหาไม่สำเร็จ",
                                    description: "กรุณากรอกข้อมูลก่อนค้นหา",
                                    placement: "topRight"
                                  });
                                } else {
                                  // console.log("nameOrStuId", e)
                                  getStudentByNameOrStuId(e);
                                  showModal();
                                }
                              }}
                            />
                          </Col>
                          <Col xl={3}>
                            <Button
                              onClick={() => {
                                formMissingItem.setFieldsValue({
                                  firstNameDrop: null,
                                  lastNameDrop: null,
                                  phoneDrop: null,
                                  emailDrop: null,
                                  lineIdDrop: null,
                                  facebookUrlDrop: null,
                                });
                                setDisabledDepositorForm(false);
                                setDepositorImg(null);
                                setNameOrStuId(null);
                                setUserMissingItemDrop(null);
                              }}
                              icon={
                                <ClearOutlined
                                  style={{ display: "inline-grid" }}
                                />
                              }
                            >
                              ล้างข้อมูล
                            </Button>
                          </Col>
                        </Row>

                        <div className="mb-4"></div>
                        <Row gutter={[0, 6]}>
                          <Col xl={2}>
                            {depositorImg ? (
                              <Avatar
                                size={80}
                                src={depositorImg}
                                icon={
                                  <i className="fa-solid fa-user-astronaut"></i>
                                }
                              />
                            ) : (
                              <Avatar
                                size={80}
                                icon={
                                  <i className="fa-solid fa-user-astronaut"></i>
                                }
                              />
                            )}
                          </Col>
                          <Col xl={22}>
                            <Row gutter={[6, 6]}>
                              <Col xl={8}>
                                <Form.Item
                                  style={{ marginBottom: 5 }}
                                  name="firstNameDrop"
                                >
                                  <Input
                                    placeholder="ชื่อ"
                                    disabled={disabledDepositorForm}
                                  />
                                </Form.Item>
                              </Col>
                              <Col xl={8}>
                                <Form.Item
                                  style={{ marginBottom: 5 }}
                                  name="lastNameDrop"
                                >
                                  <Input
                                    placeholder="นามสกุล"
                                    disabled={disabledDepositorForm}
                                  />
                                </Form.Item>
                              </Col>
                              <Col xl={8}>
                                <Form.Item
                                  style={{ marginBottom: 5 }}
                                  name="phoneDrop"
                                >
                                  <Input
                                    // prefix={
                                    //   <i className="fa-solid fa-phone text-green-500"></i>
                                    // }
                                    placeholder="เบอร์โทร"
                                    disabled={disabledDepositorForm}
                                  />
                                </Form.Item>
                              </Col>
                              <Col xl={8}>
                                <Form.Item name="emailDrop">
                                  <Input
                                    placeholder="Email"
                                    disabled={disabledDepositorForm}
                                  />
                                </Form.Item>
                              </Col>
                              <Col xl={8}>
                                <Form.Item name="lineIdDrop">
                                  <Input
                                    // prefix={
                                    //   <i className="fa-brands fa-line text-green-400"></i>
                                    // }
                                    placeholder="Line (ใส่หรือไม่ก็ได้)"
                                    disabled={disabledDepositorForm}
                                  />
                                </Form.Item>
                              </Col>
                              <Col xl={8}>
                                <Form.Item name="facebookUrlDrop">
                                  <Input
                                    // prefix={
                                    //   <i className="fa-brands fa-facebook text-blue-400"></i>
                                    // }
                                    placeholder="Facebook (ใส่หรือไม่ก็ได้)"
                                    disabled={disabledDepositorForm}
                                  />
                                </Form.Item>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Panel>
                    </Collapse>
                    : null}

                </Col>
                <Col xl={24}>
                  {authReducer.isLoggedIn ?
                    <Card>
                      <Row gutter={[8, 8]}>
                        <Col xl={12} style={{ marginTop: 10 }}>
                          <Row gutter={[0, 0]}>
                            <Col xl={24}>
                              <Form.Item
                                name="title"
                                label={
                                  <label className="text-purple-600 font-bold">
                                    ชื่อประกาศ
                                  </label>
                                }
                                labelCol={{ span: 24 }}
                                rules={[
                                  {
                                    required: true,
                                    message: "กรุณากรอกชื่อประกาศ",
                                  },
                                ]}
                              >
                                <Input
                                  style={{ width: "100%" }}
                                  size="large"
                                  placeholder="ชื่อประกาศ"
                                />
                              </Form.Item>
                            </Col>

                            <Col xl={24}>
                              <Form.Item
                                name="campus_id"
                                style={{ marginBottom: 5 }}
                                label={
                                  <label className="text-purple-600 font-bold">
                                    สถานที่พบ
                                  </label>
                                }
                                labelCol={{ span: 24 }}
                                rules={[
                                  {
                                    required: true,
                                    message: "กรุณาเลือกวิทยาเขตที่พบ",
                                  },
                                ]}
                              >
                                <Select
                                  size="large"
                                  placeholder="เลือกวิทยาเขต"
                                  onChange={(value) => {
                                    getBuildingByCampusId(value);
                                    formMissingItem.setFieldsValue({
                                      building_id: null,
                                      room_id: null,
                                    });
                                    setIsCampusSelected(true);
                                  }}
                                >
                                  {campus?.map((item) => (
                                    <Option value={item.id} key={item.id}>
                                      {item.campusTh}
                                    </Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </Col>
                            <Col xl={24}>
                              <Form.Item
                                style={{ marginBottom: 5 }}
                                labelCol={{ span: 24 }}
                                name="building_id"
                              >
                                <Select
                                  disabled={!isCampusSelected}
                                  size="large"
                                  placeholder="เลือกอาคาร"
                                  onChange={(value) => {
                                    getRoomByBuildingId(value);
                                    formMissingItem.setFieldsValue({
                                      room_id: null,
                                    });
                                    setIsBuildingSelected(true);
                                    setReload(!reload);
                                  }}
                                >
                                  {building?.map((item) => (
                                    <Option value={item.id} key={item.id}>
                                      {item.buildingTh}
                                    </Option>
                                  ))}
                                  <Option value="9999">อื่น ๆ ระบุเอง</Option>
                                </Select>
                              </Form.Item>
                            </Col>
                            {formMissingItem.getFieldValue().building_id ===
                              "9999" ? (
                              <Col xl={24}>
                                <Form.Item
                                  style={{ marginBottom: 5 }}
                                  labelCol={{ span: 24 }}
                                  name="buildingOther"
                                  rules={[
                                    {
                                      required:
                                        formMissingItem.getFieldValue()
                                          .building_id === "9999",
                                      message: "กรุณาระบุสถานที่พบ",
                                    },
                                  ]}
                                >
                                  <Input size="large" placeholder="โปรดระบุ" />
                                </Form.Item>
                              </Col>
                            ) : null}
                            {formMissingItem.getFieldValue().building_id !==
                              "9999" && (
                                <Col xl={24}>
                                  <Form.Item labelCol={{ span: 24 }} name="room_id">
                                    <Select
                                      size="large"
                                      disabled={!isBuildingSelected}
                                      placeholder="เลือกห้อง"
                                      onChange={() => {
                                        setReload(!reload);
                                      }}
                                    >
                                      {room?.map((item) => (
                                        <Option value={item.id} key={item.id}>
                                          {item.roomTh}
                                        </Option>
                                      ))}
                                      <Option value="9999">อื่น ๆ ระบุเอง</Option>
                                    </Select>
                                  </Form.Item>
                                </Col>
                              )}

                            {formMissingItem.getFieldValue().room_id ===
                              "9999" && (
                                <Col xl={24}>
                                  <Form.Item
                                    style={{ marginBottom: 5 }}
                                    labelCol={{ span: 24 }}
                                    name="roomOther"
                                    rules={[
                                      {
                                        required:
                                          formMissingItem.getFieldValue()
                                            .room_id === "9999",
                                        message: "กรุณาระบุสถานที่พบ",
                                      },
                                    ]}
                                  >
                                    <Input size="large" placeholder="โปรดระบุ" />
                                  </Form.Item>
                                </Col>
                              )}

                            <Col xl={24}>
                              <Form.Item
                                name="file"
                                rules={[
                                  {
                                    required: true,
                                    message: "กรุณาเลือกรูปภาพ",
                                  },
                                ]}
                                labelCol={{ span: 24 }}
                                label={
                                  <label className="text-purple-600 font-bold">
                                    อัพโหลดรูปภาพ
                                  </label>
                                }
                              >
                                <Upload
                                  multiple={false}
                                  maxCount={1}
                                  listType={"picture"}
                                  accept=".png,.jpeg,.jpg,.gif"
                                  beforeUpload={(file) => {
                                    return false;
                                  }}
                                >
                                  <Button icon={<UploadOutlined />}>
                                    อัพโหลดรูปภาพ
                                  </Button>
                                </Upload>
                              </Form.Item>
                            </Col>
                          </Row>
                        </Col>
                        <Col xl={12} style={{ marginTop: 10 }}>
                          <Row>
                            <Col xl={24}>
                              <Form.Item
                                label={
                                  <label className="text-purple-600 font-bold">
                                    รายละเอียด
                                  </label>
                                }
                                labelCol={{ span: 24 }}
                                name="description"
                              >
                                <TextArea
                                  placeholder="รายละเอียด"
                                  autoSize={{
                                    minRows: 13,
                                    maxRows: 15,
                                  }}
                                  size="large"
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Card>
                    :
                    <div className="flex justify-center backdrop-blur-lg bg-purple-300/50 p-10 rounded-lg relative overflow-hidden">
                      <div className="flex flex-col items-center">
                        <img src="https://cdn-icons-png.flaticon.com/512/473/473704.png" width="150" />
                        <h1 className="text-[23px] text-center mt-8">ไม่สามารถทำรายการได้</h1>
                        <p className="mt-3 text-xl">กรุณาเข้าสู่ระบบก่อน! <a href="#">เข้าสู่ระบบ</a></p>
                      </div>
                      <img src={`${process.env.PUBLIC_URL}/lgoho.png`} className="absolute top-5 right-5 opacity-20" width="250"/>
                    </div>
                  }

                </Col>
              </Row>
            </Form>
          </section>
        </div>
      </motion.div>
    </div>
  );
}

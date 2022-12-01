import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { searchStudent, UserProfileEdit } from './dto';
import { AuthService } from '../auth/auth.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(
        private prismaService: PrismaService,
        private authService: AuthService,
        private cloudinary: CloudinaryService
    ) { }

    async userEditProfile(dto: UserProfileEdit, userId: Number, file: Express.Multer.File) {
        try {
            console.log(dto)
            console.log(file)
            let response = {}
            let urlImage = null
            if (file) {
                let resUploadImage
                if (dto.urlPicture !== null && dto.urlPicture !== "") {
                    const oldPicture = dto.urlPicture.split('/').pop().split('.')[0]
                    let resDeleteImage = await this.cloudinary.deleteImage(oldPicture)
                    if (resDeleteImage.result === "ok") {
                        resUploadImage = await this.cloudinary.uploadImage(file).catch(() => {
                            throw new BadRequestException('Invalid file type.')
                        })
                        urlImage = resUploadImage.url
                    } else {
                        urlImage = null
                    }
                } else {
                    resUploadImage = await this.cloudinary.uploadImage(file).catch(() => {
                        throw new BadRequestException('Invalid file type.')
                    })
                    urlImage = resUploadImage.url
                }
                urlImage = resUploadImage.url
            } else {
                urlImage = dto.urlPicture
            }
            const userUpdate = await this.prismaService.user.update({
                where: {
                    id: Number(userId)
                },
                data: {
                    ...dto,
                    urlPicture: urlImage
                }
            })
            const token = await this.authService.signToken(userUpdate.id, userUpdate.email)
            if (userUpdate) {
                response = {
                    isSuccess: true,
                    message: 'บันทึกข้อมูลสำเร็จ',
                    token: token
                }
            } else {
                response = {
                    isSuccess: false,
                    message: 'บันทึกไม่ข้อมูลสำเร็จ',
                    token: null
                }
            }
            return response
        } catch (error) {
            if (error.code === "P2002") {
                return {
                    isSuccess: false,
                    message: `${error.meta.target.join(',')} ซ้ำกับในระบบ`,
                    token: null
                }
            } else if (error.code === "P2003") {
                return {
                    isSuccess: false,
                    message: `${error.meta.field_name} ไม่มีอยู่ในระบบ`,
                    token: null
                }
            }
        }
    }

    async searchStudents(dto: searchStudent, user: User) {
        try {
            let response = {}
            const students = await this.prismaService.user.findMany({
                where: {
                    OR: [
                        {
                            firstName: {
                                contains: `${dto.nameOrStuId}`
                            },
                        },
                        {
                            lastName: {
                                contains: `${dto.nameOrStuId}`
                            }
                        },
                        {
                            stuId: {
                                contains: `${dto.nameOrStuId}`
                            }
                        }
                    ],
                    NOT: {
                        id: user.id
                    }
                },
                include: {
                    Department: {
                        select: {
                            departmentTh: true
                        }
                    },
                }
            })

            if (students) {
                response = {
                    isSuccess: true,
                    responseData: students
                }
            } else {
                response = {
                    isSuccess: false,
                    responseData: null
                }
            }
            return response
        } catch (error) {
            return error
        }
    }

    async getAllUsers(search: string) {
        try {
            let response = {}
            if (search !== "xx456789") {
                const users = await this.prismaService.user.findMany({
                    where: {
                        OR: [
                            {
                                firstName: {
                                    contains: `${search}`
                                },
                            },
                            {
                                lastName: {
                                    contains: `${search}`
                                }
                            },
                            {
                                stuId: {
                                    contains: `${search}`
                                }
                            }
                        ],
                    },
                    include: {
                        Prefix: {
                            select: {
                                prefixTh: true
                            }
                        },
                        Department: {
                            select: {
                                departmentTh: true
                            }
                        },
                        Role: {
                            select: {
                                role_th: true
                            }
                        }
                    }
                })
                if (users) {
                    response = {
                        isSuccess: true,
                        responseData: users
                    }
                } else {
                    response = {
                        isSuccess: false,
                        responseData: null
                    }
                }
            } else {
                const users = await this.prismaService.user.findMany({
                    include: {
                        Prefix: {
                            select: {
                                id: true,
                                prefixTh: true
                            }
                        },
                        Department: {
                            select: {
                                id: true,
                                departmentTh: true
                            }
                        },
                        Role: {
                            select: {
                                id: true,
                                role_th: true
                            }
                        }
                    }
                })
                if (users) {
                    response = {
                        isSuccess: true,
                        responseData: users
                    }
                } else {
                    response = {
                        isSuccess: false,
                        responseData: null
                    }
                }
            }

            return response
        } catch (error) {
            return error
        }
    }
}

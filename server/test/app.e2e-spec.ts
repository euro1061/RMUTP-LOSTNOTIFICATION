import { INestApplication, ValidationPipe } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import { PrismaService } from "../src/prisma/prisma.service"
import { AppModule } from '../src/app.module'
import * as pactum from 'pactum'
import { AuthDto } from "src/auth/dto"

describe('App e2e', () => {
  let app: INestApplication
  let prisma: PrismaService
  beforeAll(async () => {
    const moduleRef =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true
    }))
    await app.init()
    await app.listen(3002)

    prisma = app.get(PrismaService)

    await prisma.cleanDb()
  })

  afterAll(() => {
    app.close();
  })
  describe('Auth', () => {
    describe('Signup', () => {
      const dto: AuthDto = {
        email: "test@gmail.com",
        password: "123456"
      }
      it('should signup', () => {
        return pactum
          .spec()
          .post('http://localhost:3001/api/auth/signup')
          .withBody(dto)
          .inspect()
      })
    })
    // describe('Signin', () => {})
  })
  // describe('User', () => {
  //   describe('Get Me', () => {})
  //   describe('Edit User', () => {})
  // })
  // describe('Bookmarks', () => {
  //   describe('CreateBookmark', () => {})
  //   describe('Get Bookmarks', () => {})
  //   describe('Get Bookmark ByID', () => {})
  //   describe('Edit Bookmark', () => {})
  //   describe('Delete Bookmark', () => {})
  // })
  it.todo("should test")
})

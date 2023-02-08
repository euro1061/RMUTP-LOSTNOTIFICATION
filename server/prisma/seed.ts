import { roles } from './roles'
import { prefixs } from './prefixs'
import { campus } from './campus'
import { PrismaClient } from '@prisma/client'
import { buildings } from './buildings';
import { rooms } from './rooms';
import { statusMissingItems } from './statusMissingItems';
import { departments } from './department';
import { statusLosingItems } from './statusLosingItem';
import { users } from './users';

const prisma = new PrismaClient();

async function main() {
    for(let role of roles) {
        await prisma.role.create({
            data: role
        })
    }

    for(let prefix of prefixs) {
        await prisma.prefix.create({
            data: prefix
        })
    }

    for(let campusOne of campus) {
        await prisma.campus.create({
            data: campusOne
        })
    }

    for(let building of buildings) {
        await prisma.building.create({
            data: building
        })
    }

    for(let room of rooms) {
        await prisma.room.create({
            data: room
        })
    }
    
    for(let statusMissingItem of statusMissingItems) {
        await prisma.statusMissingItem.create({
            data: statusMissingItem
        })
    }

    for(let department of departments) {
        await prisma.department.create({
            data: department
        })
    }

    for(let statusLosingItem of statusLosingItems) {
        await prisma.statusLosingItem.create({
            data: statusLosingItem
        })
    }

    for(let user of users) {
        await prisma.user.create({
            data: user
        })
    }
}

main().catch(e => {
    console.log(e);
    process.exit(1)
}).finally(() => {
    prisma.$disconnect()
})
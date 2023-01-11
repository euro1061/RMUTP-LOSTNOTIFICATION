import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { RoomService } from './room.service';
import { createRoom, updateRoom } from './dto';

@Controller('room')
export class RoomController {
    constructor(private roomService: RoomService) {}

    @Get()
    getAllRoom() {
        return this.roomService.getAllRoom()
    }

    @Get(':id')
    getRoomByBuilding(@Param('id', ParseIntPipe) buildingId: number) {
        return this.roomService.getRoomByBuilding(buildingId);
    }

    @Post('create')
    createRoom(
        @Body() dto: createRoom,
    ) {
        return this.roomService.createRoom(dto);
    }

    @Delete('delete/:id')
    deleteRoom(
        @Param('id', ParseIntPipe) roomId: number
    ) {
        return this.roomService.deleteRoom(roomId);
    }

    @Patch('update/:id')
    editRoom(
        @Param('id', ParseIntPipe) roomId: number,
        @Body() dto: updateRoom
    ) {
        return this.roomService.editRoom(roomId, dto)
    }
}

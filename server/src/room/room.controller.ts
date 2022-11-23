import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { RoomService } from './room.service';

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
}

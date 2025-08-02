import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { BidsService } from './bids.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { UpdateBidDto } from './dto/update-bid.dto';

@Controller('bids')
export class BidsController {
  constructor(private readonly bidsService: BidsService) {}

  @Get()
  findAll() {
    return this.bidsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bidsService.findOne(+id);
  }

  @Post()
  create(@Body() createBidDto: CreateBidDto) {
    return this.bidsService.create(createBidDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBidDto: UpdateBidDto) {
    return this.bidsService.update(+id, updateBidDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bidsService.remove(+id);
  }
}

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { LearningService } from './learning.service';

@Controller('courses')
export class LearningController {
  constructor(private readonly learningService: LearningService) {}

  @Get()
  findAll() {
    return this.learningService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.learningService.findOne(+id);
  }

  @Post()
  create(@Body() createCourseDto: any) {
    return this.learningService.create(createCourseDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: any) {
    return this.learningService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.learningService.remove(+id);
  }
}

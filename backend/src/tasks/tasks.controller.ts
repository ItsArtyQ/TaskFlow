import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDto } from './dto/task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  createTask(@Body() body: TaskDto) {
    return this.tasksService.createTask({
      title: body.title,
      description: body.description,
      boardId: body.boardId,
    });
  }

  @Get()
  getTask() {
    return this.tasksService.tasks({});
  }

  @Patch(':id')
  updateTask(@Param('id') id: string, @Body() body: TaskDto) {
    return this.tasksService.updateTask({
      where: { id },
      data: {
        title: body.title,
      },
    });
  }

  @Delete(':id')
  deleteBorder(@Param('id') id: string) {
    return this.tasksService.deleteTask({ id });
  }

  @Post(':id/comments')
  createComment(@Param('id') @Body() body: { content: string }) {
    return this.tasksService.createComment({ content: body.content });
  }
}

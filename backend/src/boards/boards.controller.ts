import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardDto } from './dto/board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  createBoard(@Body() body: BoardDto) {
    return this.boardsService.createBoard({ title: body.title });
  }

  @Get()
  getBoards() {
    return this.boardsService.boards({});
  }

  @Patch(':id')
  updateBoard(@Param('id') id: string, @Body() body: BoardDto) {
    return this.boardsService.updateBoard({
      where: { id },
      data: {
        title: body.title,
      },
    });
  }

  @Delete(':id')
  deleteBorder(@Param('id') id: string) {
    return this.boardsService.deleteBoard({ id });
  }
}

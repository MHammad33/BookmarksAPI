import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { Bookmark } from './schemas/bookmark.schema';

@Controller('bookmarks')
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  // POST /bookmarks
  @Post()
  async create(@Body() data: Partial<Bookmark>): Promise<Bookmark> {
    return this.bookmarksService.createBookmark(data);
  }

  // GET /bookmarks
  @Get()
  async findAll(): Promise<Bookmark[]> {
    return this.bookmarksService.findAllBookmarks();
  }

  // GET /bookmarks/:id
  @Get(':id')
  async findById(@Body('id') id: string): Promise<Bookmark> {
    return this.bookmarksService.findBookmarkById(id);
  }

  // PUT /bookmarks/:id
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Bookmark>,
  ): Promise<Bookmark> {
    return this.bookmarksService.updateBookmark(id, data);
  }

  // DELETE /bookmarks/:id
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    console.log(`Request to delete bookmark with id: ${id}`);
    await this.bookmarksService.deleteBookmark(id);
  }
}

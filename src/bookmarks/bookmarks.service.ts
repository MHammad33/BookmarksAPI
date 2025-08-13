import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Bookmark, BookmarkDocument } from './schemas/bookmark.schema';
import { Model } from 'mongoose';

@Injectable()
export class BookmarksService {
  constructor(
    @InjectModel(Bookmark.name) private bookmarkModel: Model<BookmarkDocument>,
  ) {}

  async createBookmark(data: Partial<Bookmark>) {
    const newBookmark = new this.bookmarkModel(data);
    return newBookmark.save();
  }

  async findAllBookmarks(): Promise<Bookmark[]> {
    return this.bookmarkModel.find().exec();
  }

  async findBookmarkById(id: string): Promise<Bookmark> {
    const bookmark = await this.bookmarkModel.findById(id).exec();
    if (!bookmark) {
      throw new Error(`Bookmark with id ${id} not found`);
    }
    return bookmark;
  }

  async updateBookmark(id: string, data: Partial<Bookmark>): Promise<Bookmark> {
    const updatedBookmark = await this.bookmarkModel
      .findByIdAndUpdate(id, data, { new: true, useFindAndModify: false })
      .exec();
    if (!updatedBookmark) {
      throw new Error(`Bookmark with id ${id} not found`);
    }
    return updatedBookmark;
  }
}

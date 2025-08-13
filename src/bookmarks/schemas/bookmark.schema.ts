import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BookmarkDocument = Bookmark & Document;

@Schema({ timestamps: true })
export class Bookmark {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  url: string;

  @Prop()
  description?: string;

  @Prop({ default: false })
  tags?: string[];
}

export const BookmarkSchema = SchemaFactory.createForClass(Bookmark);

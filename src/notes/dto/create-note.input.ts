import { InputType, Field } from '@nestjs/graphql';
import { Note } from 'src/graphql';

@InputType()
export class CreateNoteInput extends Note {
  @Field()
  content: string;

  @Field()
  bookId: number;
}

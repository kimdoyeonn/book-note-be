import { InputType, Field } from '@nestjs/graphql';
import { Book } from 'src/graphql';

@InputType()
export class CreateBookInput extends Book {
  @Field()
  isbn: string;

  @Field()
  title: string;

  @Field()
  summary: string;

  @Field({ nullable: true })
  shared?: boolean;

  @Field()
  author: string;

  @Field()
  thumbnailUrl: string;

  @Field()
  publisher: string;

  @Field()
  userId: number;
}

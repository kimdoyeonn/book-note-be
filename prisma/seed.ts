import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const bookData: Prisma.BookCreateInput[] = [
  {
    isbn: '323453234',
    title: '가나다가라',
    summary: 'ssssuuummmmnarfdf dfdhsjkd',
    publisher: 'test',
    author: 'Test author',
  },
  {
    isbn: '323453233',
    title: '두번째',
    summary: 'ssssuuummmmnarfdf dfdhsjkd',
    publisher: 'test',
    author: 'Test author',
  },
  {
    isbn: '323453222',
    title: '세번째',
    summary: 'ssssuuummmmnarfdf dfdhsjkd',
    publisher: 'test',
    author: 'Test author',
  },
  {
    isbn: '323453666',
    title: '네번째',
    summary: 'ssssuuummmmnarfdf dfdhsjkd',
    publisher: 'test',
    author: 'Test author',
  },
];

const userData: Prisma.UserCreateInput[] = [
  {
    provider: 'kakao',
    providerId: '234566',
    username: 'Test User1',
    userBooks: {
      create: [
        {
          bookId: 1,
        },
        {
          bookId: 2,
        },
        {
          bookId: 3,
        },
        {
          bookId: 4,
        },
      ],
    },
    notes: {
      create: [
        {
          bookId: 1,
          content: '첫번째 소감 노트노트',
        },
        {
          bookId: 1,
          content: '22 소감 노트노트',
        },
        {
          bookId: 2,
          content: '랄랄라',
        },
        {
          bookId: 3,
          content: '룰루 랄라 룰루 랄라 룰루 랄라',
        },
        {
          bookId: 2,
          content: '어쩌고 저쩌고 샬랴샬라',
        },
        {
          bookId: 4,
          content: '어쩌고 저쩌고 샬랴샬라',
        },
      ],
    },
  },
  {
    provider: 'kakao',
    providerId: '234533',
    username: 'Test User2',
    userBooks: {
      create: [
        {
          bookId: 2,
        },
        {
          bookId: 4,
        },
      ],
    },
    notes: {
      create: [
        {
          bookId: 2,
          content: '랄랄라',
        },
        {
          bookId: 2,
          content: '어쩌고 저쩌고 샬랴샬라',
        },
        {
          bookId: 4,
          content: '어쩌고 저쩌고 샬랴샬라',
        },
      ],
    },
  },
  {
    provider: 'kakao',
    providerId: '23453333',
    username: 'Test User3',
    userBooks: {
      create: [
        {
          bookId: 1,
        },
        {
          bookId: 3,
        },
      ],
    },
    notes: {
      create: [
        {
          bookId: 1,
          content: '첫번째 소감 노트노트',
        },
        {
          bookId: 1,
          content: '22 소감 노트노트',
        },
        {
          bookId: 3,
          content: '룰루 랄라 룰루 랄라 룰루 랄라',
        },
      ],
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const b of bookData) {
    const book = await prisma.book.create({
      data: b,
    });
    console.log(`Created book with id: ${book.id}`);
  }

  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

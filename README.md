# Book Note BE

GraphQL과 JWT를 사용하여 구현한 외부 사용자와 공유 가능한 공유 독서 노트

- [Postman 링크](https://www.postman.com/lunar-crescent-491034/workspace/book-note/collection/17978117-80b33f50-9761-48bf-8e70-de453a235876?action=share&creator=17978117)

## 기술 스택

1. Node.js 18.18.x
2. NestJS 9.5.x
3. TypeScript 5.1.x
4. PostgreSQL 15.7.x
5. Prisma 5.18.x
6. KAKAO OAuth2
7. Naver 책검색 API
8. Git을 사용한 버전 관리

## TODO

### 기능구현

- [x] 회원 REST
  - [x] 카카오 소셜 회원가입
  - [x] 카카오 소셜 로그인
- [x] Book
  - [x] 검색 (Naver 검색 API) REST
  - [x] 저장 - 선택한 책을 DB에 저장 GraphQL
  - [x] 저장한 책 좋아요 - GraphQL
  - [x] 공유 - REST
    - 로그인하지 않은 사용자가 10분간 책의 정보와 노트를 조회할 수 있음
    - 공유 설정하여 token을 발급받는 API
    - token을 사용하여 조회하는 API
- [x] Note GraphQL
  - [x] 작성 - 저장한 책에 대해 여러 개의 노트를 작성할 수 있음
  - [x] 조회 - 작성한 본인만 노트를 열람할 수 있음(공유 상태에는 타인도 열람 가능) / 최근 작성한 순으로 정렬
  - [x] 삭제 - Soft Delete
  - [x] 수정

### 기타

- [x] [API 테스트 Postman 사용](https://www.postman.com/lunar-crescent-491034/book-note/collection/xitymnj/api-documentation)
- [ ] NestJS의 Guard, Interceptor 클래스 활용
- [x] GraphQL Schema First 방식 사용
- [ ] Jest 테스트 코드 작성
- [ ] AWS 배포
  - [ ] 앱 서버: EC2, ElasticBeanstalk, Fargate 등
  - [ ] DB: RDS free tier 사용
- [ ] Github Action CI/CD 구성
- [ ] Dockerize

## 기능

### 사용자 인증

- 카카오 소셜 회원가입 / 로그인 (REST)

### 도서

인증된 사용자만 접근 가능

- 도서 검색 및 저장
    - Naver 도서 검색 API를 사용하여 도서를 검색합니다. (REST)
    - 검색된 도서 중 저장할 도서를 DB에 저장합니다. (GraphQL)
- 도서 조회 (GraphQL)
    - 목록 조회: 사용자가 작성한 도서 목록을 조회합니다.
    - 상세 조회: id로 도서를 조회합니다.
- 저장한 도서에 즐겨찾기/좋아요 (GraphQL)
- 저장한 도서과 작성한 노트를 공유 (REST)
    - JWT을 사용하여 공유합니다. (10분간 유효)
    - 작성자가 아닌 외부의 유저가 저장한 도서 정보와 작성자가 작성한 노트를 조회할 수 있습니다.

### 노트

인증된 사용자만 접근 가능

- 노트 작성 (GraphQL)
    - 도서에 대한 노트를 작성합니다.
- 노트 조회 (GraphQL)
    - 목록 조회: 도서에 대한 노트 목록을 조회합니다.
    - 상세 조회: id에 대한 노트 상세를 조회합니다.
- 노트 수정 (GraphQL)
    - 작성한 노트를 수정합니다.
- 노트 삭제 (GraphQL)
    - isDeleted 컬럼의 값을 사용하여 작성한 노트를 삭제합니다.

### 구현 방법

- 사용자 인증
    - 로그인 및 회원가입 - passport kakao 라이브러리를 사용하여 개발
    - JWT, 토큰 재발급 - passport jwt 라이브러리, Nest.js Guard를 사용하여 개발
- GraphQL의 Schema FIrst 방식을 사용하여 구현
- DB는 docker를 사용하여 개발

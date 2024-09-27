# Book Note BE

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

- [x] API 테스트 Postman 사용
- [ ] NestJS의 Guard, Interceptor 클래스 활용
- [x] GraphQL Schema First 방식 사용
- [ ] Jest 테스트 코드 작성
- [ ] AWS 배포
  - [ ] 앱 서버: EC2, ElasticBeanstalk, Fargate 등
  - [ ] DB: RDS free tier 사용
- [ ] Github Action CI/CD 구성
- [ ] Dockerize

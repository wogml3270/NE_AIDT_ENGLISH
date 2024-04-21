# 코딩의 기본 규칙 정의

BEM (Block Element Modifier) 방법론의 규칙을 따름

- 코드는 최대한 간결하게 작성
- 연결단어 구분은 '-' 사용, 카멜케이스 사용 허용
- 클래스명은 소문자
- 반드시 웹 접근성을 준수해야 함.(디자인 쪽은 별도로 얘기 합니다)

# gulp를 사용하여 작업을 진행

- npm install gulp-cli -g
- npm install
- console 모드에서
- gulp 실행
- gulpfile.js 파일 참조

/static 퍼블의 모든 경로

// 선생님 전용 화일
/static/teacher/css css 파일
/static/teacher/js js 파일
/static/teacher/img 이미지 파일
/static/teacher/scss scss 파일
/static/teacher/guide/html html 파일

// 학생 전용 화일
/static/student/css css 파일
/static/student/js js 파일
/static/student/img 이미지 파일
/static/student/scss scss 파일
/static/student/guide/html html 파일

//코딩 설정값 
기본 4칸 탭 사용
코드 가독성 높이기 위해 들여쓰기 사용

# font 
네트워크 용량의 문제로 최소화 시킴
@import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,600,0,0");
@import url("https://cdnjs.cloudflare.com/ajax/libs/pretendard/1.3.9/static/pretendard.min.css");

# 순차 작업 목록
### 1순위 작업(위에서부터 순서대로 작업)
수업하기	42~56	https://xd.adobe.com/view/36e0fa29-e2cf-41d3-b12d-070812e1d84f-63b3/screen/3931fd26-5da5-48c5-9eaf-347b19d40d89/	퍼블 요청	1	4-9
출석부	49~50	https://xd.adobe.com/view/36e0fa29-e2cf-41d3-b12d-070812e1d84f-63b3/screen/bbc02937-3159-4e1e-b34b-dbf251956e03/	퍼블 요청	1	4-9
모니터링	46	https://xd.adobe.com/view/36e0fa29-e2cf-41d3-b12d-070812e1d84f-63b3/screen/4f723ac8-237b-4599-91f6-06bfbf948815/	퍼블 요청	1	4-9


### 2순위 작업(위에서부터 순서대로 작업)
수업 대기화면	38~41	https://xd.adobe.com/view/36e0fa29-e2cf-41d3-b12d-070812e1d84f-63b3/screen/78e19039-1b27-4d90-8cd4-945f00336682/	퍼블 요청	2	4-9
홈	8~12	https://xd.adobe.com/view/36e0fa29-e2cf-41d3-b12d-070812e1d84f-63b3/	퍼블 요청	3	4-9	



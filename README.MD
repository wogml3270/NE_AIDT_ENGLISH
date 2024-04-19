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

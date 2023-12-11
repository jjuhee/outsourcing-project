# 커플더플 (Couple the Place)

이 프로젝트는 스파르타 내일배움 캠프의 React 심화과정 05팀(5지고지리고렛잇고) 프로젝트입니다.

## 프로젝트 소개
데이트 코스 공유 사이트
친구나 애인끼리 가고싶은 장소를 조합하여 각자만의 데이트 코스를 만들 수 있는 웹사이트 입니다.

## page 설명

### 로그인 전
Login 로그인 페이지

SignUp 회원가입 페이지

### 로그인 후
MainPages : 지도와 장소검색을 통해 나만의 코스를 만드는 부분과 사용자들의 코스 게시물을 종합해서 보여준다.

Profile : 나의 프로필과 내 게시물들을 보여준다.

DetailPages : 게시물들의 상세페이지, 코스 경로와 상세정보를 표시한다.

## component 설명
### MainPages
MapSearch : 장소를 검색하면 검색된 리스트를 보여주고, 지도에 검색된 장소들의 마커를 찍어 보여준다.

MakeDatingCourse : 선택된 코스를 보여준다. 코스 저장 버튼을 누르면 코스가 파이어 베이스로 저장.

CompletedDatingCourse : 코스 게시물들을 보여준다.

Loding: 게시물 로딩 중에 보여주는 화면 ❤❤❤

### DetailPages
ShowMapsWithLine : 클릭한 코스의 장소들만 마커를 찍어 보여주고 선으로 연결한 지도, 게시물 상세정보

### Common
MyMap : 지도 Component  (MainPages 와 DetailPages 에서 사용)

Avatar : 나의 프로필 이미지 Component (Profile과 CompletedDatingCourse 에서 사용)

Header : 타이틀과 홈 버튼, 프로필 버튼 상단 고정

Footer : 업체정보


## 담당자
코드 문의와 유지보수 문의는 아래 각 파트 담당자에게 부탁드립니다.

김주희 - MapSearch, ShowMapsWithLine

천민규 - Login, css

강지향 - MakeDatingCourse, CompletedDatingCourse

윤홍상 - Login, SignUp

김희찬 - Profile, Avatar

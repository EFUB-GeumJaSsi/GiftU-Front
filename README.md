# GiftU-Front

## 프로젝트 개요
**선물 펀딩 서비스 &lt;GiftU&gt;**<br>

🎁 이화여대 웹 개발 동아리 EFUB 4기 SWS 2팀 <br>
🎁 개발 기간: 2024.07.02 ~ 2024.08.10

✔️ 선물을 금액대별로 등록하여 펀딩을 열면 친구들이 참여하고 펀딩에 성공하는 경우 모인 금액에 맞는 선물이 배송됩니다. 

✔️ 친구 목록을 통해서 친구의 생일을 쉽게 확인할 수 있으며 주고받은 선물이 있는지도 확인할 수 있습니다. 펀딩 참여 시 축하 메시지를 작성하고 펀딩 성공 시 선물 후기를 작성하는 등 기프트유를 통해 친구와의 추억을 기록할 수 있습니다.

✔️ 고가의 물건이라 여러 친구를 모아야만 받을 수 있었던 선물, 정말 나에게 필요한 선물을 펀딩을 통해 받을 수 있습니다. 받고 싶은 선물을 친구들에게 직접 말하기 껄끄러웠던 사람, 매년 돌아오는 친구 생일 선물 고민이 어려웠던 사람을 위한 서비스입니다.

<br>

## 팀원 소개
<table>
<!--     <tr height="30px">
        <td align="center">
        <a><b>성혜린 (팀장)</b></a><br>
        </td>
        <td align="center">
        <a><b>조아령</b></a><br>
        </td>
        <td align="center">
        <a><b>이승진</b></a><br>
         </td>
      <td align="center">
        <a><b>이찬희</b></a><br>
         </td>
    </tr> -->
  <tr height="160px">
        <td align="center" width="200px">
            <a href="https://github.com/hyerinxx"><img height="150px" width="150px" src="https://avatars.githubusercontent.com/hyerinxx"/></a>
            <br />
        </td>
        <td align="center" width="200px">
            <a href="https://github.com/rwaeng"><img height="150px" width="150px" src="https://avatars.githubusercontent.com/rwaeng"/></a>
            <br />
        </td>
      <td align="center" width="200px">
            <a href="https://github.com/sj0919"><img height="150px" width="150px" src="https://avatars.githubusercontent.com/sj0919"/></a>
            <br />
        </td>
         <td align="center" width="200px">
            <a href="https://github.com/ch9968"><img height="150px" width="150px" src="https://avatars.githubusercontent.com/ch9968"/></a>
            <br />
        </td>
    </tr>
 <tr height="30px">
        <td align="center">
        <a><b>성혜린 (팀장)</b></a><br>
        </td>
        <td align="center">
        <a><b>조아령</b></a><br>
        </td>
        <td align="center">
        <a><b>이승진</b></a><br>
         </td>
      <td align="center">
        <a><b>이찬희</b></a><br>
         </td>
    </tr>
</table>

<br>

## 배포 주소
🔗 [GiftU 바로가기](https://gift-u.netlify.app/)

<br>

## 🚀 시작 방법
```
$ git clone https://github.com/EFUB-GeumJaSsi/GiftU-Front.git
$ cd GiftU-Front
$ npm install
$ npm start
```

<br>

## ⚙️ 스택

**Config**

<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">

**Development**
  
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"> 

**Deploy**

<img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white">

**Collaboration**

<img src="https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white"> <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">

<br>

## 📁 디렉토리 구조
```
src
├─App.js
├─index.js
├─global.css
├─reset.css
├─api
├─assets
│  ├─common
│  │  ├─Bottomsheet
│  │  └─NavigationBar
│  ├─Friend
│  ├─FundingInfo
│  ├─FundingJoin
│  ├─FungingOpen
│  ├─Home
│  ├─Login
│  ├─PasswordSet
│  └─Tutorial
├─components
│  ├─common
│  ├─Friend
│  ├─FundingInfo
│  ├─Home
│  ├─Notification
│  └─Tutorial
└─pages
    ├─Edit
    ├─Friend
    ├─FundingInfo
    ├─FundingJoin
    ├─FundingOpen
    ├─Home
    ├─List
    ├─Login
    ├─My
    ├─Notification
    ├─ProfileEdit
    ├─Search
    └─Tutorial
```

<br>

## 💻 주요 페이지 및 기능
- 로그인 페이지
  
  카카오 로그인
- 메인 페이지
    - 검색 바
        
        → 검색 결과 페이지
        
    - 네비게이션바
- 친구 페이지
- 알림 페이지
- 마이 페이지
    - 내 정보 페이지
    - 내가 개설한 펀딩 페이지
        
        → 펀딩 관리 페이지
        
        → 선물 후기 작성 페이지
        
    - 내가 참여한 펀딩 페이지
        
        → 펀딩 참여 내역 페이지
        
    - 튜토리얼 페이지
- 펀딩 개설 페이지
- 펀딩 상세 페이지
    
    → 펀딩 관리 페이지
    
    → 펀딩 참여 페이지
    
    → 결제 페이지

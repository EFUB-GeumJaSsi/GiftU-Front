# GiftU-Front

![리드미 대표사진](https://github.com/user-attachments/assets/e23d2a0f-46c7-4c02-80a7-bfd12cf502fb)

## 프로젝트 개요

**선물 펀딩 서비스 &lt;GiftU&gt;**<br>

🎁 이화여대 웹 개발 동아리 EFUB 4기 SWS 2팀 <br>
✨ 기획 기간: 2024.03.12 ~ 2024.04.09
✨ 개발 기간: 2024.07.02 ~ 2024.08.10

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

- 로그인 페이지: 로그인 및 회원가입은 카카오 계정 이용
- 메인 페이지

  |<img src="https://github.com/user-attachments/assets/f88a8a2c-dd73-4a2a-8121-cd30b1730939" width="200px"/>|
  |:-:|

- 검색 결과 페이지: 원하는 펀딩 검색 기능
    
  |<img src="https://github.com/user-attachments/assets/88c10836-7dd7-4e30-8bb0-5034a612ae93" width="200px"/>|
  |:-:|

    
- 친구 페이지: 친구 관리 기능

  |<img src="https://github.com/user-attachments/assets/39d60285-14ff-47ff-b087-f4a9c563a663" width="200px"/>|<img src="https://github.com/user-attachments/assets/1ca47f6d-0996-4d93-9d03-7ada64f37155" width="200px"/>|
  |:-:|:-:|

- 펀딩 개설 페이지
  - 하나의 펀딩에 선물 여러 개 설정 가능<br><br>
  
  |<img src="https://github.com/user-attachments/assets/8ce63c42-cf4c-4049-91f3-165a40303438" width="200px"/>|<img src="https://github.com/user-attachments/assets/21445d20-8a04-445f-a42b-cea6dea6ee19" width="200px"/>|<img src="https://github.com/user-attachments/assets/9c5bfaf7-494c-4ab4-9587-10e6fe63fd55" width="200px"/>|<img src="https://github.com/user-attachments/assets/6b543d90-cc19-4b6f-b02a-5f1c22a33d02" width="200px"/>
  |:-:|:-:|:-:|:-:|
  
- 펀딩 상세 페이지
  
  |미참여|기참여|내가 개설한 경우|
  |:-:|:-:|:-:|
  |<img src="https://github.com/user-attachments/assets/f669e409-ea9b-4343-a703-bee375187e2a" width="200px" />|<img src="https://github.com/user-attachments/assets/f5f3702f-55b0-4610-9888-de350edbac0e" width="200px" />|<img src="https://github.com/user-attachments/assets/0e9dbde1-1f60-4709-8125-4fcf3a9bc5e0" width="200px" />|

- 펀딩 참여 페이지

  |<img src="https://github.com/user-attachments/assets/507c1a18-1e47-4476-9084-3139af7ce72b" width="200px"/>|
  |:-:|
  
- 결제 페이지

- 알림 페이지: 알림 확인 기능, 친구 요청이 온 경우 해당 페이지에서 수락 가능
  
  |<img src="https://github.com/user-attachments/assets/810c1a9e-592f-4e32-8e03-8c2c40910a86" width="200px"/>|
  |:-:|

- 마이 페이지
  
  |<img src="https://github.com/user-attachments/assets/b2476df1-e453-4a76-b4a5-8cc73ea2c7a9" width="200px"/>|
  |:-:|
  
  - 내 정보 페이지
  - 내가 개설한 펀딩 페이지, 내가 참여한 펀딩 페이지로 이동 가능
  - 튜토리얼 페이지

      
- 펀딩 목록 페이지
  
  |내가 개설한 펀딩|내가 참여한 펀딩|
  |:-:|:-:|
  |<img src="https://github.com/user-attachments/assets/f2715cd8-6d8e-44a8-8e0d-e56aab8384c8" width="200px"/>|<img src="https://github.com/user-attachments/assets/302935b0-b81f-4592-9805-81f677811fd3" width="200px"/>|
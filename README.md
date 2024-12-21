# 🎁 GiftU Frontend

이화여자대학교 웹 개발 동아리 EFUB 4기 SWS 2팀 &lt;GiftU&gt; 프론트엔드 레포지토리입니다.

![리드미 대표사진](https://github.com/user-attachments/assets/e23d2a0f-46c7-4c02-80a7-bfd12cf502fb)

### 선물 펀딩 서비스 &lt;GiftU&gt;

🔗 [GiftU 바로가기](https://gift-u.netlify.app) <br>

✨ 기획: 2024.03.12 ~ 2024.04.09 <br>
✨ 디자인: 2024.05.21 ~ 2024.06.30 <br>
✨ 개발: 2024.07.02 ~ 2024.08.10

✔️ 갖고 싶은 선물을 원하는 만큼 등록하여 펀딩을 열고, 축하메시지와 함께 부담 없는 금액으로 펀딩에 참여하고, 모인 금액에 맞는 선물을 받고, 감사함을 후기로 남깁니다.

✔️ 친구 목록을 통해 친구의 생일을 쉽게 확인할 수 있고, 또 최근 내 펀딩에 참여한 친구를 확인할 수 있습니다. 펀딩 참여 시 축하 메시지를 작성하고 펀딩 성공 시 선물 후기를 작성하는 등 기프트유를 통해 친구와의 추억을 기록할 수 있습니다.

✔️ 고가의 물건이라 여러 친구를 모아야만 받을 수 있었던 선물, 정말 나에게 필요한 선물을 펀딩을 통해 받을 수 있습니다. 받고 싶은 선물을 친구들에게 직접 말하기 껄끄러웠던 사람, 매년 돌아오는 친구 생일 선물 고민이 어려웠던 사람을 위한 서비스입니다.

<br>

## ⭐️ 팀원 소개

<table>
  <tr height="160px">
    <td width="300px" align="center">
      <a href="https://github.com/hyerindev">
        <img height="150px" width="150px" src="https://avatars.githubusercontent.com/hyerindev" />
      </a>
    </td>
    <td width="300px" align="center">
      <a href="https://github.com/rwaeng">
        <img height="150px" width="150px" src="https://avatars.githubusercontent.com/rwaeng" />
      </a>
    </td>
    <td width="300px" align="center">
      <a href="https://github.com/sj0919">
        <img height="150px" width="150px" src="https://avatars.githubusercontent.com/sj0919" />
      </a>
    </td>
    <td width="300px" align="center">
      <a href="https://github.com/ch9968">
        <img height="150px" width="150px" src="https://avatars.githubusercontent.com/ch9968" />
      </a>
    </td>
  </tr>
  <tr height="30px">
    <td align="center">
      <a href="https://github.com/hyerindev">
        <b>성혜린</b>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/rwaeng">
        <b>조아령</b>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/sj0919">
        <b>이승진</b>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/ch9968">
        <b>이찬희</b>
      </a>
    </td>
  </tr>
  <tr height="30px">
    <td align="center">
      Product Manager <br>
      Frontend Lead
    </td>
    <td align="center">
      Frontend Lead
    </td>
    <td align="center">
      Frontend Intern
    </td>
    <td align="center">
      Frontend Intern
    </td>
  </tr>
  <tr>
    <td valign="top">
      <details>
        <summary>담당 파트</summary>
        <ol type="I">
          <li>
            퍼블리싱
            <ol type="i">
              <li>
                공통 UI
                <ul>
                  <li>캐러셀</li>
                  <li>다이얼로그</li>
                  <li>바텀시트</li>
                  <li>슬라이드업 모달</li>
                  <li>토스트</li>
                  <li>스피너</li>
                  <li>가격 인풋필드</li>
                </ul>
              </li>
              <li>
                페이지
                <ul>
                  <li>로그인 페이지</li>
                  <li>홈 페이지</li>
                  <li>친구 페이지</li>
                  <li>펀딩 개설 > 선물 정보입력 페이지</li>
                  <li>펀딩 개설 > 완료 페이지</li>
                </ul>
              </li>
            </ol>
          </li>
          <li>
            API 연결
            <ol type="i">
              <li>
                API 요청 Hook
                <ul>
                  <li>카카오 로그인/회원가입</li>
                  <li>엑세스 토큰 재발급</li>
                  <li>친구 요청</li>
                  <li>친구 요청 수락</li>
                  <li>친구 요청 거절</li>
                  <li>친구 조회</li>
                  <li>최근 내 펀딩에 참여한 친구 조회</li>
                  <li>친구 삭제</li>
                  <li>펀딩 상세 조회</li>
                </ul>
              </li>
              <li>
                페이지
                <ul>
                  <li>카카오 로그인/회원가입</li>
                  <li>액세스 토큰 재발급</li>
                  <li>친구 페이지</li>
                </ul>
              </li>
            </ol>
          </li>
          <li>
            기타
            <ul>
              <li>프로젝트 초기 세팅</li>
              <li>Axios 인스턴스 관리</li>
              <li>API 요청 로직 관리</li>
              <li>라우팅 path 관리 및 접근 권한 인증/인가 HOC 작업</li>
              <li>Context API 조건부 렌더링 및 데이터 관리</li>
              <li>배포</li>
              <li>README 작성</li>
              <li>매주 코드 리뷰</li>
              <li>매주 전체 코드 리팩토링</li>
            </ul>
          </li>
        </ol>
      </details>
    </td>
    <td valign="top">
      <details>
        <summary>담당 파트</summary>
        <ol type="I">
          <li>
            퍼블리싱
            <ol type="i">
              <li>
                공통 UI
                <ul>
                  <li>버튼</li>
                  <li>뒤로가기 헤더</li>
                  <li>스크롤 최상단 조정</li>
                  <li>바텀 백그라운드</li>
                </ul>
              </li>
              <li>
                페이지
                <ul>
                  <li>홈 페이지 캘린더 컴포넌트</li>
                  <li>펀딩 개설 > 선물 추가 페이지</li>
                  <li>펀딩 상세 페이지(개설자)</li>
                  <li>펀딩 상세 페이지(미참여자)</li>
                  <li>펀딩 상세 페이지(기참여자)</li>
                  <li>펀딩 참여 > 정보입력 페이지</li>
                  <li>펀딩 참여 > 완료 페이지</li>
                </ul>
              </li>
            </ol>
          </li>
          <li>
            API 연결
            <ol type="i">
              <li>
                API 요청 Hook
                <ul>
                  <li>포트원 결제</li>
                  <li>유저 조회</li>
                  <li>유저 정보 수정</li>
                  <li>회원 탈퇴</li>
                  <li>2주 날짜별 펀딩 개설 여부 조회</li>
                  <li>마감일별 펀딩 목록 조회</li>
                </ul>
              </li>
              <li>
                페이지
                <ul>
                  <li>포트원 결제</li>
                  <li>홈 페이지 캘린더 컴포넌트</li>
                  <li>펀딩 상세 페이지(개설자)</li>
                  <li>펀딩 상세 페이지(미참여자)</li>
                  <li>펀딩 상세 페이지(기참여자)</li>
                  <li>펀딩 참여 페이지</li>
                </ul>
              </li>
            </ol>
          </li>
          <li>
            기타
            <ul>
              <li>이슈 템플릿</li>
              <li>README 작성</li>
              <li>매주 코드 리뷰</li>
            </ul>
          </li>
        </ol>
      </details>
    </td>
    <td valign="top">
      <details>
        <summary>담당 파트</summary>
        <ol type="I">
          <li>
            퍼블리싱
            <ol type="i">
              <li>
                공통 UI
                <ul>
                  <li>태그 필터</li>
                </ul>
              </li>
              <li>
                페이지
                <ul>
                  <li>알림 페이지</li>
                  <li>검색 페이지</li>
                  <li>프로필 편집 페이지</li>
                  <li>선물후기 작성 페이지</li>
                  <li>축하메세지 작성 페이지</li>
                  <li>튜토리얼 페이지</li>
                </ul>
              </li>
            </ol>
          </li>
          <li>
            API 연결
            <ol type="i">
              <li>
                API 요청 Hook
                <ul>
                  <li>모든 알림 조회</li>
                  <li>친구 알림 조회</li>
                  <li>펀딩 알림 조회</li>
                  <li>검색</li>
                  <li>선물 후기 생성</li>
                  <li>선물 후기 조회</li>
                  <li>선물 후기 수정</li>
                  <li>선물 후기 삭제</li>
                  <li>축하메시지 수정 PATCH</li>
                </ul>
              </li>
              <li>
                페이지
                <ul>
                  <li>알림 페이지</li>
                  <li>검색 페이지</li>
                  <li>프로필 편집 페이지</li>
                  <li>선물후기 작성 페이지</li>
                  <li>축하메세지 작성 페이지</li>
                </ul>
              </li>
            </ol>
          </li>
        </ol>
      </details>
    </td>
    <td valign="top">
      <details>
        <summary>담당 파트</summary>
        <ol type="I">
          <li>
            퍼블리싱
            <ol type="i">
              <li>
                공통 UI
                <ul>
                  <li>네비게이션바</li>
                  <li>datepicker</li>
                  <li>비밀번호 입력</li>
                  <li>펀딩 요소</li>
                  <li>태그</li>
                </ul>
              </li>
              <li>
                페이지
                <ul>
                  <li>마이 페이지</li>
                  <li>내가 만든 펀딩 목록 페이지</li>
                  <li>내가 참여한 펀딩 목록 페이지</li>
                  <li>펀딩 개설 > 펀딩 정보입력 페이지</li>
                  <li>펀딩 개설 > 공개/비공개 설정 페이지</li>
                </ul>
              </li>
            </ol>
          </li>
          <li>
            API 연결
            <ol type="i">
              <li>
                API 요청 Hook
                <ul>
                  <li>펀딩 개설</li>
                  <li>비공개 펀딩 비밀번호 인증</li>
                  <li>펀딩 참여</li>
                  <li>펀딩 참여 취소</li>
                  <li>펀딩 목록 조회(내가 개설한)</li>
                  <li>펀딩 목록 조회(내가 참여한)</li>
                  <li>펀딩 목록 조회(친구가 개설한)</li>
                  <li>펀딩 삭제</li>
                </ul>
              </li>
              <li>
                페이지
                <ul>
                  <li>우편번호 찾기</li>
                  <li>펀딩 개설</li>
                  <li>마이 페이지(시작)</li>
                  <li>내가 만든 펀딩 목록 페이지</li>
                  <li>내가 참여한 펀딩 목록 페이지</li>
                </ul>
              </li>
            </ol>
          </li>
        </ol>
      </details>
    </td>
  </tr>
</table>

<br>

## ⚙️ 스택

#### Config & Package Management
<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" />

#### Core Technologies
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black" />

#### Styling
<img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white" />

#### Data Handling
<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
<img src="https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=ReactHookForm&logoColor=white">
<img src="https://img.shields.io/badge/date--fns-770C56?style=for-the-badge&logo=date-fns&logoColor=white">

#### Utilities
<img src="https://img.shields.io/badge/react--daum--postcode-FFCD00?style=for-the-badge&logo=kakao&logoColor=black" />

#### Deployment
<img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white">

<br>

## 🚀 시작 방법

```
$ git clone https://github.com/EFUB-GeumJaSsi/GiftU-Front.git
$ cd GiftU-Front
$ npm install
$ npm start
```

<br>

## 📁 디렉토리 구조

```
📦src
├─ 📂api               # API 호출 로직 관리
├─ 📂assets            # 이미지 파일 (페이지, 컴포넌트별 분류)
├─ 📂components
│  ├─ 📂common         # nav, button 등 공통 컴포넌트
│  ├─ 📂Friend         # 친구 페이지 컴포넌트
│  ├─ 📂FundingInfo    # 펀딩 상세 페이지 컴포넌트
│  ├─ 📂Home           # 홈 페이지 컴포넌트
│  ├─ 📂List           # 목록 페이지 컴포넌트
│  ├─ 📂Notification   # 알림 페이지 컴포넌트
│  ├─ 📂Search         # 검색 페이지 컴포넌트
│  └─ 📂Tutorial       # 튜토리얼 페이지 컴포넌트
├─ 📂hoc               # 고차 컴포넌트 (라우팅 접근 권한 인증/인가 HOC)
├─ 📂hooks             # 커스텀 Hook
├─ 📂pages
│  ├─ 📂Edit           # 축하메시지 작성 페이지, 선물후기 작성 페이지 관련
│  ├─ 📂Friend         # 친구 페이지 관련
│  ├─ 📂FundingInfo    # 펀딩 상세 페이지 관련
│  ├─ 📂FundingJoin    # 펀딩 참여 페이지 관련
│  ├─ 📂FundingOpen    # 펀딩 개설 페이지 관련
│  ├─ 📂Home           # 홈 페이지 관련
│  ├─ 📂List           # 내가 만든 펀딩 목록 페이지, 내가 참여한 펀딩 목록 페이지 관련
│  ├─ 📂Login          # 로그인 페이지 관련
│  ├─ 📂My             # 마이 페이지 관련
│  ├─ 📂Notification   # 알림 페이지 관련
│  ├─ 📂ProfileEdit    # 프로필 편집 페이지 관련
│  ├─ 📂Search         # 검색 페이지 관련
│  └─ 📂Tutorial       # 튜토리얼 페이지 관련
├─ 📂styles            # 공통 스타일 관련
├─📜App.js
└─📜index.js
```

<br>

## 💻 주요 페이지 및 기능

- 로그인 페이지: 로그인 및 회원가입은 카카오 계정 이용
- 메인 페이지

  | <img src="https://github.com/user-attachments/assets/f88a8a2c-dd73-4a2a-8121-cd30b1730939" width="200px"/> |
  | :--------------------------------------------------------------------------------------------------------: |

- 검색 결과 페이지: 원하는 펀딩 검색 기능
  | <img src="https://github.com/user-attachments/assets/88c10836-7dd7-4e30-8bb0-5034a612ae93" width="200px"/> |
  | :--------------------------------------------------------------------------------------------------------: |
- 친구 페이지: 친구 관리 기능

  | <img src="https://github.com/user-attachments/assets/39d60285-14ff-47ff-b087-f4a9c563a663" width="200px"/> | <img src="https://github.com/user-attachments/assets/1ca47f6d-0996-4d93-9d03-7ada64f37155" width="200px"/> |
  | :--------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------: |

- 펀딩 개설 페이지

  - 하나의 펀딩에 선물 여러 개 설정 가능<br><br>

  | <img src="https://github.com/user-attachments/assets/8ce63c42-cf4c-4049-91f3-165a40303438" width="200px"/> | <img src="https://github.com/user-attachments/assets/21445d20-8a04-445f-a42b-cea6dea6ee19" width="200px"/> | <img src="https://github.com/user-attachments/assets/9c5bfaf7-494c-4ab4-9587-10e6fe63fd55" width="200px"/> | <img src="https://github.com/user-attachments/assets/6b543d90-cc19-4b6f-b02a-5f1c22a33d02" width="200px"/> |
  | :--------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------: |

- 펀딩 상세 페이지

  |                                                   미참여                                                    |                                                   기참여                                                    |                                              내가 개설한 경우                                               |
  | :---------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------: |
  | <img src="https://github.com/user-attachments/assets/f669e409-ea9b-4343-a703-bee375187e2a" width="200px" /> | <img src="https://github.com/user-attachments/assets/f5f3702f-55b0-4610-9888-de350edbac0e" width="200px" /> | <img src="https://github.com/user-attachments/assets/0e9dbde1-1f60-4709-8125-4fcf3a9bc5e0" width="200px" /> |

- 펀딩 참여 페이지

  | <img src="https://github.com/user-attachments/assets/507c1a18-1e47-4476-9084-3139af7ce72b" width="200px"/> |
  | :--------------------------------------------------------------------------------------------------------: |

- 결제 페이지

- 알림 페이지: 알림 확인 기능, 친구 요청이 온 경우 해당 페이지에서 수락 가능

  | <img src="https://github.com/user-attachments/assets/810c1a9e-592f-4e32-8e03-8c2c40910a86" width="200px"/> |
  | :--------------------------------------------------------------------------------------------------------: |

- 마이 페이지

  | <img src="https://github.com/user-attachments/assets/b2476df1-e453-4a76-b4a5-8cc73ea2c7a9" width="200px"/> |
  | :--------------------------------------------------------------------------------------------------------: |

  - 내 정보 페이지
  - 내가 개설한 펀딩 페이지, 내가 참여한 펀딩 페이지로 이동 가능
  - 튜토리얼 페이지

- 펀딩 목록 페이지

  |                                              내가 개설한 펀딩                                              |                                              내가 참여한 펀딩                                              |
  | :--------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------: |
  | <img src="https://github.com/user-attachments/assets/f2715cd8-6d8e-44a8-8e0d-e56aab8384c8" width="200px"/> | <img src="https://github.com/user-attachments/assets/302935b0-b81f-4592-9805-81f677811fd3" width="200px"/> |

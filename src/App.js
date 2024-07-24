import { Route, Routes } from 'react-router-dom';
// 로그인
import LoginPage from './pages/Login/LoginPage';
import OAuthRedirectPage from './pages/Login/OAuthRedirectPage';
// 홈
import HomePage from './pages/Home/HomePage';
import SearchPage from './pages/Search/SearchPage';
// 친구
import FriendPage from './pages/Friend/FriendPage';
// 펀딩 개설
import FundingOpenPage from './pages/FundingOpen/IndexPage';
// 알림
import NotificationPage from './pages/Notification/NotificationPage';
// 마이(시작)
import MyPage from './pages/My/MyPage';
// 프로필 편집
import ProfileEditPage from './pages/ProfileEdit/ProfileEditPage';
// 내가 ~한 목록
import ListOpenPage from './pages/List/ListOpenPage';
import ListJoinPage from './pages/List/ListJoinPage';
// 튜토리얼
import TutorialPage from './pages/Tutorial/TutorialPage';
// 펀딩 상세
import FundingInfoPage from './pages/FundingInfo/FundingInfoPage';
// 펀딩 참여
import FundingJoinPage from './pages/FundingJoin/IndexPage';
// 작성/수정
import ReviewEditPage from './pages/Edit/ReviewEditPage';
import MessageEditPage from './pages/Edit/MessageEditPage';

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/api/oauth/kakao' element={<OAuthRedirectPage />} />
      <Route path='/' element={<HomePage />} />
      <Route path='/search' element={<SearchPage />} />
      <Route path='/friend' element={<FriendPage />} />
      <Route path='/notifications' element={<NotificationPage />} />
      <Route path='/my' element={<MyPage />} />
      <Route path='/my/edit' element={<ProfileEditPage />} />
      <Route path='/my/funding/open' element={<ListOpenPage />} />
      <Route path='/my/funding/join' element={<ListJoinPage />} />
      <Route path='/tutorial' element={<TutorialPage />} />
      <Route path='/funding/open' element={<FundingOpenPage />} />
      <Route path='/funding/:fundingId' element={<FundingInfoPage />} />
      <Route path='/funding/:fundingId/join' element={<FundingJoinPage />} />
      <Route
        path='/funding/:fundingId/review/edit'
        element={<ReviewEditPage />}
      />
      <Route
        path='/funding/:fundingId/message/edit'
        element={<MessageEditPage />}
      />
    </Routes>
  );
};

export default App;

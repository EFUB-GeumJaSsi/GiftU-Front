import { Route, Routes, Navigate } from 'react-router-dom';
import Auth from './hoc/Auth';
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
      <Route
        path='/login'
        element={<Auth Page={LoginPage} option='logout' />}
      />
      <Route
        path='/api/oauth/kakao'
        element={<Auth Page={OAuthRedirectPage} option='logout' />}
      />
      <Route path='/' element={<Auth Page={HomePage} option='login' />} />
      <Route
        path='/search'
        element={<Auth Page={SearchPage} option='login' />}
      />
      <Route
        path='/friends'
        element={<Auth Page={FriendPage} option='login' />}
      />
      <Route
        path='/notifications'
        element={<Auth Page={NotificationPage} option='login' />}
      />
      <Route path='/my' element={<Auth Page={MyPage} option='login' />} />
      <Route
        path='/my/edit'
        element={<Auth Page={ProfileEditPage} option='login' />}
      />
      <Route
        path='/my/funding/open'
        element={<Auth Page={ListOpenPage} option='login' />}
      />
      <Route
        path='/my/funding/join'
        element={<Auth Page={ListJoinPage} option='login' />}
      />
      <Route
        path='/tutorial'
        element={<Auth Page={TutorialPage} option='all' />}
      />
      <Route
        path='/funding/open'
        element={<Auth Page={FundingOpenPage} option='login' />}
      />
      <Route
        path='/funding/:fundingId'
        element={<Auth Page={FundingInfoPage} option='all' />}
      />
      <Route
        path='/funding/:fundingId/join'
        element={<Auth Page={FundingJoinPage} option='login' />}
      />
      <Route
        path='/funding/:fundingId/review/edit'
        element={<Auth Page={ReviewEditPage} option='login' />}
      />
      <Route
        path='/funding/:fundingId/message/edit'
        element={<Auth Page={MessageEditPage} option='login' />}
      />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
};

export default App;

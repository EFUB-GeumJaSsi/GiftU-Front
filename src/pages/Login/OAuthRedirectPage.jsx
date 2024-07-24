import styled from 'styled-components';
import SpinnerComponent from '../../components/common/SpinnerComponent';

const OAuthRedirectPage = () => {
  return (
    <SLayout>
      <SpinnerComponent />
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;

  height: 100svh;
`;

export default OAuthRedirectPage;

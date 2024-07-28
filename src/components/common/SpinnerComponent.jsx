import styled from 'styled-components';
import { ReactComponent as Loading } from '../../assets/common/icn_loading.svg';

const SpinnerComponent = () => {
  return <SLoading />;
};

const SLoading = styled(Loading)`
  @keyframes spin {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  animation: spin 1.3s ease infinite;
`;

export default SpinnerComponent;

import { useNavigate } from 'react-router-dom';
import * as S from './Header.style';

interface HeaderProps {
  title: string;
  showAuthButtons?: boolean;
  isStudyRoomPage?: boolean;
}

export default function Header({
  title,
  showAuthButtons,
  isStudyRoomPage,
}: HeaderProps) {
  const navigate = useNavigate();

  return (
    <S.HeaderContainer>
      <S.HeaderTitle>{title}</S.HeaderTitle>{' '}
      {isStudyRoomPage && showAuthButtons && (
        <S.ButtonWrapper>
          <S.Button onClick={() => navigate('/login')}>로그인</S.Button>
          <S.Button onClick={() => navigate('/register')}>회원가입</S.Button>
        </S.ButtonWrapper>
      )}
    </S.HeaderContainer>
  );
}

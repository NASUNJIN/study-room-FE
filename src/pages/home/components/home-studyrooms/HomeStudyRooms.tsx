import { useEffect, useState } from 'react';
import HomeStudyItem from './item/HomeStudyItem';
import * as S from './HomeStudyRooms.style';
import ToStudyRooms from './button/ToStudyRooms';
import ToPrivateButton from './button/ToPrivateButton';
import { StudyItem } from '@/types/studyRoom';
import { useNavigate } from 'react-router-dom';

const url = `${import.meta.env.VITE_REACT_APP_API_URL}/rooms?limit=6`;

function HomeStudyRooms() {
  const [rooms, setRooms] = useState<StudyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('네트워크 응답이 좋지 않습니다.');
        }
        const data = await response.json();
        setRooms(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('알 수 없는 오류가 발생했습니다.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleItemClick = () => {
    navigate('/login');
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>오류 발생: {error}</div>;
  }

  return (
    <S.HomeStudyRoomsStyle>
      <S.Title>스터디룸</S.Title>
      <S.Wrap>
        <S.StudyRoomWrap>
          {rooms.map((room) => (
            <div key={room._id} onClick={handleItemClick}>
              <HomeStudyItem
                title={room.title}
                imageUrl={room.imageUrl}
                tagList={room.tagList}
                isPublic={room.isPublic}
                isChat={room.isChat}
                maxNum={room.maxNum}
                currentNum={room.currentNum}
              />
            </div>
          ))}
        </S.StudyRoomWrap>
        <S.ButtonWrap>
          <ToPrivateButton />
          <ToStudyRooms />
        </S.ButtonWrap>
      </S.Wrap>
    </S.HomeStudyRoomsStyle>
  );
}

export default HomeStudyRooms;

import StudyProfileBox from "@/components/studyProfileBox/StudyProfileBox";
import React, { useEffect, useRef, useState } from "react";
import StartPauseButton from "./components/button/StartPauseButton";
import { useNavigate } from "react-router-dom";
import LeaveButton from "./components/button/LeaveButton";
import { ButtonContainer, InstructionText, PrivateStudyRoomStyle } from "./PrivateStudyRoomStyle";

interface PrivateStudyRoomProps {
  userId?: string; // 사용자 ID
};

const PrivateStudyRoom: React.FC<PrivateStudyRoomProps> = ({ userId = "sunjji" }) => {
  const initialCurrentTaskTime = "00:00:00"; // 초기 현재 작업 시간
  const initialTotalStudyTime = "00:05:00"; // 초기 총 공부 시간
  const profileImage = "https://via.placeholder.com/622"; // 프로필 이미지 URL

  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [currentTaskTime, setCurrentTaskTime] = useState(initialCurrentTaskTime);
  const [totalStudyTime, setTotalStudyTime] = useState(initialTotalStudyTime);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setCurrentTaskTime(prevTime => {
          const [hours, minutes, seconds] = prevTime.split(':').map(Number);
          const newSeconds = seconds + 1;
          const newMinutes = minutes + Math.floor(newSeconds / 60);
          const newHours = hours + Math.floor(newMinutes / 60);
          return `${String(newHours).padStart(2, '0')}:${String(newMinutes % 60).padStart(2, '0')}:${String(newSeconds % 60).padStart(2, '0')}`;
        });

        // totalStudyTime 업데이트
        setTotalStudyTime(prevTotalTime => {
          const [totalHours, totalMinutes, totalSeconds] = prevTotalTime.split(':').map(Number);
          const totalElapsedSeconds = totalHours * 3600 + totalMinutes * 60 + totalSeconds; // 기존 총 시간(초로 변환)
          const newTotalSeconds = totalElapsedSeconds + 1; // 1초 추가

          const newHours = Math.floor(newTotalSeconds / 3600);
          const newMinutes = Math.floor((newTotalSeconds % 3600) / 60);
          const newSecs = newTotalSeconds % 60;

          return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}:${String(newSecs).padStart(2, '0')}`;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive]);

  const handleStartPause = () => {
    const localTime = new Date().toLocaleString(); // 현재 로컬 시간
    if (!isActive) {  // 시작 버튼 클릭 시 전송할 데이터
      setIsActive(true);
      const data = {
        userId,
        currentTaskTime,
        localStartTime: localTime,
      };
      console.log("시작 버튼 클릭:", JSON.stringify(data));
    } else {  // 일시 정지 버튼 클릭 시 전송할 데이터
      setIsActive(false);
      const data = {
        userId,
        currentTaskTime,
        localPauseTime: localTime,
      };
      console.log("일시 정지 버튼 클릭:", JSON.stringify(data));
    }
  };

  const handleLeaveRoom = () => {
    const data = {
      userId,
      totalStudyTime,
      currentTaskTime,
      exitTime: new Date().toLocaleString(),
    };

    console.log("나가기 버튼 클릭: ", JSON.stringify(data));

    navigate('/study-rooms');
  }

  return (
    <PrivateStudyRoomStyle>
      <StudyProfileBox
        isGroup={false}
        userId={userId}
        initialCurrentTaskTime={currentTaskTime}
        initialTotalStudyTime={totalStudyTime}
        profileImage={profileImage}
      />
      <InstructionText>우측 사이드바의 할 일을 선택하면 타이머가 시작됩니다.</InstructionText>
      <ButtonContainer>
        <StartPauseButton
          isActive={isActive}
          onClick={handleStartPause}
        />
        <LeaveButton onClick={handleLeaveRoom} />
      </ButtonContainer>
    </PrivateStudyRoomStyle>
  );
};

export default PrivateStudyRoom;
import styled from 'styled-components';

export const ChatWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isMine'].includes(prop),
})<{ isMine: boolean }>`
  display: flex;
  width: 100%;
  padding: 0 13px;

  gap: 5px;

  ${(props) => props.isMine && 'flex-direction : row-reverse'}
`;

export const UserInfoArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 60px;
  flex-shrink: 0;
  align-items: center;
`;

export const Nickname = styled.div`
  font-size: 12px;
  margin-top: 10px;
  word-break: break-all;
`;

export const ChatInfoArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const ChatBox = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isMine'].includes(prop),
})<{ isMine: boolean }>`
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
  line-height: 24px;
  word-break: break-all;

  ${(props) =>
    props.isMine
      ? `margin-left : auto; background-color : ${props.theme.color.main};`
      : `margin-right : auto; background-color : ${props.theme.color.bgGray} ;`}
`;

export const CreatedTime = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isMine'].includes(prop),
})<{ isMine: boolean }>`
  margin-top: 2px;
  padding: 0px 5px;
  font-size: 13px;

  ${(props) => (props.isMine ? 'margin-left: auto;' : 'margin-right: auto;')}
`;

import styled from 'styled-components';

export const CheckBoxStyle = styled.div`
  display: flex;

  .checkbox-wrap {
    display: flex;
    position: relative;
    align-items: center;
    font-size: 14px;
    //margin-left: 5px;

    input {
      position: relative;
      appearance: none;
      align-items: center;
      width: 14px;
      height: 14px;
      margin: 0 5px;
      border-radius: 4px;
      cursor: pointer;
      background-color: ${({ theme }) => theme.color.bgGray};
      border: 1px solid ${({ theme }) => theme.color.plannerGray};

      &:checked {
        background-color: ${({ theme }) => theme.color.mainStrong};
        border: 1px solid #2b81ff;
      }

      &:checked::after {
        position: absolute;
        content: '✔';
        color: white;
        font-size: 10px;
        left: 2px;
        //top: 1px;
      }
    }
  }
`;

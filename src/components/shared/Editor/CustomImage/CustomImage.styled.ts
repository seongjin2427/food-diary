import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  position: relative;
`;

export const CheckBox = styled.input`
  appearance: none;
  position: absolute;
  top: 1rem;
  left: 1rem;
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.75rem;
  border: 1px solid black;

  :checked {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z' fill='rgba(255,255,255,1)'/%3E%3C/svg%3E");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: lightpink;
    border: 1px solid black;
  }

  :disabled {
    border: 1px solid grey;
    background-color: grey;
  }
`;

export const Image = styled.img`
  object-fit: contain;
`;

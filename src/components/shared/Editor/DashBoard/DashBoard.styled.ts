import styled from '@emotion/styled';

export const Container = styled.div`
  background: white;
  padding: 0.25rem 0rem;
  margin-top: 10px;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  height: 4rem;
  z-index: 1;
`;

export const ButtonBox = styled.div`
  width: 100%;
  height: 3rem;
  margin-top: 0.75rem;
  background: lightcoral;
  overflow-y: scroll;
  position: relative;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const ButtonArea = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 3rem;
  display: flex;
  padding: 0.5rem 0;
  flex-wrap: nowrap;
  align-items: center;

  svg {
    margin: 0 0.25rem;
    padding: 0.25rem;
  }
`;

export const Divider = styled.div`
  width: 0.125rem;
  height: 1.5rem;
  background: red;
  margin: 0 0.375rem;
`;

export const ColorPickerDiv = styled.div`
  width: 1.75rem;
  height: 1.75rem;
  position: relative;

  svg {
    position: absolute;
    top: -2px;
    left: -6.5px;
  }
`;

export const ColorPicker = styled.input`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 1rem;
  height: 1.125rem;
  background: none;
  border: none;
`;

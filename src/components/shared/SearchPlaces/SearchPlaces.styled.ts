import { PopUp } from '@/styles/keyframes';
import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  padding: 1rem;
`;

export const LetMeknowThePlaceTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

export const PlaceTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const PlaceTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  background: lightblue;
  border-radius: 9999px;
  animation: ${PopUp} 0.5s ease-in-out;

  svg {
    margin-left: -0.25rem;
    margin-top: 0.125rem;
  }
`;

export const Tag = styled.div`
  margin-left: 0.125rem;
`;

export const WriteDiarySearchPlaceForm = styled.form`
  display: flex;
  width: 100%;
  padding: 1rem;
  background: lightpink;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

export const WriteDiarySearchPlaceInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  background: none;
  border: none;
  margin-right: 0.5rem;
  font-size: 1.25rem;

  :focus {
    outline: none;
    border-bottom: 1px solid black;
  }
`;

export const PlaceContainer = styled.div`
  * {
    animation: ${PopUp} 0.5s ease-in-out;
  }
`;

export const PlaceBox = styled.div`
  padding: 0.75rem;
  border-top: 1px solid black;

  :last-child {
    border-bottom: 1px solid black;
  }
`;

export const PlaceName = styled.p`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const PlaceAddress = styled.p`
  font-size: 0.675rem;
  color: #767676;
`;

export const NoPlaces = styled.p`
  font-size: 1.25rem;
  text-align: center;
  margin: 5rem 0;
`;

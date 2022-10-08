import styled from '@emotion/styled';

export const Container = styled.div``;

export const DiaryContainer = styled.div`
  display: flex;
  margin: 0.5rem 0;
`;

export const DiaryImageArea = styled.div`
  width: 7rem;
  height: 7rem;
`;

export const DiaryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
`;

export const DiaryContentArea = styled.div`
  flex: 1;
  padding: 0.25rem 0.75rem;
`;

export const DiaryWrittenDate = styled.p`
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
`;

export const DiaryTitle = styled.p`
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
  font-weight: 800;
  display: -webkit-box;
  display: -ms-flexbox;
  display: box;
  overflow: hidden;
  vertical-align: top;
  text-overflow: ellipsis;
  word-break: break-all;
  line-height: 1.125;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
`;

export const DiaryContent = styled.p`
  display: -webkit-box;
  display: -ms-flexbox;
  display: box;
  overflow: hidden;
  vertical-align: top;
  text-overflow: ellipsis;
  word-break: break-all;
  line-height: 1.125;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  font-size: 0.875rem;
`;

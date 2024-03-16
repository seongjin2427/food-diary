import { FadeIn } from '@/styles/keyframes';
import styled from '@emotion/styled';

export const Container = styled.main`
  max-width: 768px;
  padding: 0.75rem;
  margin: 0 auto;
  animation: ${FadeIn} 0.5s ease-in-out;
`;

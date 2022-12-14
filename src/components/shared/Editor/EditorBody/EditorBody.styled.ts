import styled from '@emotion/styled';

export const Container = styled.div`
  .ProseMirror {
    padding: 1.5rem;
    background: #ffdddd;
    min-height: 20rem;
    line-height: 1.75;
    border-radius: 0 0 0.5rem 0.5rem;

    :focus {
      outline: none;
    }

    p {
    }

    strong {
      font-weight: bold;
    }

    em {
      font-style: italic;
    }

    h1 {
      margin-top: 1rem;
      font-size: 1.75rem;
      font-weight: 900;
    }

    h2 {
      margin-top: 1.25rem;
      font-size: 1.5rem;
      font-weight: 900;
    }

    h3 {
      margin-top: 1rem;
      font-size: 1.25rem;
      font-weight: 900;
    }

    ul {
      margin-left: 1.375rem;
      list-style: disc;
    }

    ul[data-type='taskList'] {
      margin-left: 0;
      list-style: none;

      li {
        display: flex;

        label {
          margin-right: 0.25rem;
        }
      }
    }

    ol {
      margin-left: 1.375rem;
      list-style: decimal;
    }

    img {
      width: 100%;
    }
  }
`;

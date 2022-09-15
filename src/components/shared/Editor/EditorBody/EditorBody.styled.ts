import styled from '@emotion/styled';

export const Container = styled.div`
  .ProseMirror {
    padding: 1.5rem;
    background: lightpink;
    min-height: 20rem;
    line-height: 1.75;

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
      margin-top: 1.5rem;
      font-size: 1.75rem;
    }

    h2 {
      margin-top: 1.25rem;
      font-size: 1.5rem;
    }

    h3 {
      margin-top: 1rem;
      font-size: 1.25rem;
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
  }
`;

import styled from "styled-components";

const Button = styled.button`
  background-color: #20baee;
  border-radius: 8px;
  padding: 12px 16px;
  color: white;
  border: none;
  margin-top: 1em;
  font-weight: 700;
  line-height: 19px;
  width: 150px;

  &:hover {
    background-color: #0056b3;
    color: white;
    cursor: pointer;
    transition: 1.5s;
  }
`;

export default Button;

import React, { useState } from "react";
import styled, { css } from "styled-components";
import { lighten, darken } from "polished";
import { MdAdd } from "react-icons/md";
import { useTodoNextId, useTodoDispatch } from "../TodoContext";

const CircleButton = styled.button`
  background: #38d9a9;
  &:hover {
    background: #63e6be;
  }
  &:active {
    background: ${darken(0.1, "#38d9a9")};
  }

  z-index: 5;
  cursor: pointer;
  width: 80px;
  height: 80px;

  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 50%);

  font-size: 60px;
  color: #fff;
  border-radius: 50%;

  border: none;
  outline: none;

  transition: 0.2s all ease-in;
  ${(props) =>
    props.open &&
    css`
      background: #ff6b6b;
      &:hover {
        background: ${lighten(0.1, "#ff6b6b")};
      }
      &:active {
        background: ${darken(0.15, "#ff6b6b")};
      }
      transform: translate(-50%, 50%) rotate(45deg);
    `}
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
`;

const InsertForm = styled.form`
  background: #f8f9fa;
  padding: 32px;
  padding-bottom: 72px;
  border-radius: 0 0 16px 16px;
  border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  box-sizing: border-box;
`;

function TodoCreate() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const dispatch = useTodoDispatch();
  const nextId = useTodoNextId();
  const onToggle = () => setOpen(!open);
  const onChange = (e) => setValue(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "CREATE",
      todo: {
        id: nextId.current,
        text: value,
        done: false,
      },
    });
    setValue("");
    setOpen(false);
    nextId.current += 1;
  };

  return (
    <>
      {open && (
        <InsertFormPositioner>
          <InsertForm onSubmit={onSubmit}>
            <Input
              placeholder="할 일을 입력 후, Enter 를 누르세요"
              autoFocus
              onChange={onChange}
              value={value}
            />
          </InsertForm>
        </InsertFormPositioner>
      )}
      <CircleButton onClick={onToggle} open={open}>
        <MdAdd />
      </CircleButton>
    </>
  );
}

export default React.memo(TodoCreate);

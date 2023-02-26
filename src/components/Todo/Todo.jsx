import { Text } from 'components';
import { TodoWrapper, DeleteButton, EditButton } from './Todo.styled';
import { RiDeleteBinLine } from 'react-icons/ri';

import React, { memo } from 'react';

export const Todo = memo(({ id, todo, onDelete, onShow }) => {
  console.log(id);
  //  shouldComponentUpdate(prevProps) {
  //   if (prevProps.newObj.cat === this.props.newObj.cat) {
  //     return false;
  //   }
  return (
    <TodoWrapper>
      <Text textAlign="center" marginBottom="20px">
        TODO #{id}
      </Text>
      <Text>{todo}</Text>
      <DeleteButton type="button" onClick={onDelete(id)}>
        <RiDeleteBinLine size={24} />
      </DeleteButton>
      <EditButton onClick={onShow}>Open</EditButton>
    </TodoWrapper>
  );
});

import { Text } from 'components';
import { TodoWrapper, DeleteButton, EditButton } from './Todo.styled';
import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';

import React, { PureComponent, Component } from 'react';

export class Todo extends Component {
  shouldComponentUpdate(prevProps) {
    if (prevProps.newObj.cat === this.props.newObj.cat) {
      return false;
    }
    return true;
  }

  render() {
    const { id, todo, onDelete, onShow } = this.props;
    console.log('відмалцуацу', id);
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
  }
}

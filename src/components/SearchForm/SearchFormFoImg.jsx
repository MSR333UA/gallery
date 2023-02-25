import React, { Component } from 'react';
import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchFormFoImg extends Component {
  state = {
    searchInput: '',
  };

  handleChange = e => {
    this.setState({ searchInput: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.searchInput);
  };

  render() {
    return (
      <SearchFormStyled onSubmit={this.handleSubmit}>
        <FormBtn type="submit">
          <FiSearch size="16px" />
        </FormBtn>
        <InputSearch
          placeholder="What do you want to write?"
          name="search"
          required
          autoFocus
          onChange={this.handleChange}
          value={this.state.searchInput}
        />
      </SearchFormStyled>
    );
  }
}

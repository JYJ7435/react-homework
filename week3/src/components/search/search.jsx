import Button from '../button/button';
import Form from '../form/form';
import Input from '../input/input';
import React, { useState } from 'react';

function Search({ navigate }) {
  const [input, setInput] = useState('');

  const onChangeHandler = (e) => {
    const { value } = e.target;

    setInput(value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (input.length < 2) {
      alert('2글자 이상 입력해 주세요..');
      return;
    }
    navigate(`/${encodeURIComponent(input)}`);
  };

  return (
    <Form onSubmit={onSubmitHandler}>
      <Input
        id="search-input"
        srOnly={true}
        label="아티스트 검색"
        placeholder="아티스트 검색하기"
        onChangeHandler={onChangeHandler}
        value={input}
      />
      <Button type="submit" />
    </Form>
  );
}

export default Search;

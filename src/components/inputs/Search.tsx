import React, { useState } from 'react';
import { SEARCH } from '../../utils/Constants';

export type SearchProps = {
  buttonClick: ((value: string) => void);
  placeholder?: string;
};

const Search: React.FC<SearchProps> = ({ buttonClick = () => null, placeholder = `${SEARCH}...` }) => {
  const [value, setValue] = useState('');

  return (
    <div>
      <input type="text" placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={() => buttonClick(value)}>{SEARCH}</button>
    </div>
  );
};
export default Search;

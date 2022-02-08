import {
  Autocomplete,
  Chip,
  TextField,
} from '@mui/material';
import React from 'react';

interface KeywordsFieldProps {
  recommendedKeywords: string[],
  onChange: (event:React.SyntheticEvent<Element, Event>, value: string[]) => void
}

const KeywordsField:React.FC<KeywordsFieldProps> = ({
  recommendedKeywords,
  onChange,
}):JSX.Element => (
  <Autocomplete
    multiple
    id="T"
    options={recommendedKeywords}
    freeSolo
    renderTags={(value: readonly string[], getTagProps) => value.map(
      (option: string, index: number) => (
        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
      ),
    )}
    renderInput={(params) => (
      <TextField
        {...params}
        variant="filled"
        label="Keywords"
        placeholder="for example: AMG"
      />
    )}
    onChange={onChange}
  />
);

export default KeywordsField;

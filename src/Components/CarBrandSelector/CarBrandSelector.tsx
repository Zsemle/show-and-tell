import {
  FormControl, InputLabel, MenuItem, Select, SelectChangeEvent,
} from '@mui/material';
import React from 'react';
import { CarBrand } from '../../types/demoAppModels';

const T = {
  brandInputLabel: 'Brand',
  selectNothing: 'None',
};

interface CarBrandSelectorProps {
  carBrands: CarBrand[] | null
  selectedCarBrand: string | null
  onChange: (event: SelectChangeEvent<string | null>) => void
}

const CarBrandSelector:React.FC<CarBrandSelectorProps> = ({
  selectedCarBrand,
  carBrands,
  onChange,
}):JSX.Element => (
  <FormControl fullWidth>
    <InputLabel id="car-brand-label">{T.brandInputLabel}</InputLabel>
    <Select
      labelId="car-brand-label"
      id="S1"
      value={selectedCarBrand}
      label="Car Brand"
      onChange={onChange}
    >
      {selectedCarBrand && <MenuItem value="">{T.selectNothing}</MenuItem>}
      {carBrands?.map((carBrand) => (
        <MenuItem key={carBrand.id} value={carBrand.id}>{carBrand.displayName}</MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default CarBrandSelector;

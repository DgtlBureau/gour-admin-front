import React from 'react';

type Props = {
  onDeleteCity: (cityName: string) => void;
  onAddCity: (cityName: string) => void;
  cities: string[];
};

export function CreateCities({ onDeleteCity, onAddCity, cities }: Props) {
  return <div>cities</div>;
}

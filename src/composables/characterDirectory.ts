import { useState, useEffect } from 'react';
import { charactersAPI } from '../api';

import { Character } from '../types';

const CHARS_PER_PAGE = 9;
const MAX_CHARS_FROM_API = 20;

export default function characterDirectory() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [position, setPosition] = useState(0);
  const [apiPage, setAPIPage] = useState(1);
  // const response = {}

  const fetchCharacters = () => {
    charactersAPI.getMany(apiPage).then((result) => {
      setCharacters((oldState) => {
        return [...oldState, ...result.results];
      });
    });
  };

  const nextPage = () => {
    setPosition(position + CHARS_PER_PAGE);
  };

  const previousPage = () => {
    const prevPosition = position - CHARS_PER_PAGE;

    if (prevPosition < 0) {
      return;
    }

    setPosition(prevPosition);
  };

  const paginatedList = () => {
    return characters.slice(position, position + CHARS_PER_PAGE);
  };

  const pagination = paginatedList();

  useEffect(fetchCharacters, [apiPage]);

  useEffect(() => {
    if (apiPage * MAX_CHARS_FROM_API - position < 9) {
      setAPIPage(apiPage + 1);
    }
  }, [position]);

  return {
    pagination,
    characters,
    setCharacters,
    nextPage,
    previousPage,
  };
}

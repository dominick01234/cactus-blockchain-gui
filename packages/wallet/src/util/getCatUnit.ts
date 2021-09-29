import { truncate } from 'lodash';

export default function getCatUnit(name?: string, length: number = 10): string {
  if (!name) {
    return '';
  }

  return truncate(name, {
    length,
  });
}

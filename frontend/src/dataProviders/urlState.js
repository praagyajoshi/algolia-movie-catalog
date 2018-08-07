import { UrlQueryParamTypes, UrlUpdateTypes } from 'react-url-query';

export const urlPropsQueryConfig = {
  genre: { type: UrlQueryParamTypes.array, updateType: UrlUpdateTypes.pushIn },
  rating: { type: UrlQueryParamTypes.number, updateType: UrlUpdateTypes.pushIn },
  page: { type: UrlQueryParamTypes.number, updateType: UrlUpdateTypes.pushIn }
}

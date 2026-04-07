import { materials, steps, media } from './data';

export const getMaterials = () => Promise.resolve({ data: materials });
export const getSteps = () => Promise.resolve({ data: steps });
export const getMedia = () => Promise.resolve({ data: media });

export default {
  getMaterials,
  getSteps,
  getMedia,
};

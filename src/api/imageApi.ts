import { Image } from 'types/entities/Image';

import { Path } from '../constants/routes';
import { commonApi } from './commonApi';

export const imageApi = commonApi.injectEndpoints({
  endpoints: builder => ({
    uploadImage: builder.mutation<Image, FormData>({
      query: body => ({
        url: `${Path.IMAGES}/${Path.UPLOAD}`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useUploadImageMutation } = imageApi;

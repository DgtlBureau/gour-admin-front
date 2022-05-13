import { commonApi } from './commonApi';
import { Path } from '../constants/routes';
import { Image } from '../@types/entities/Image';

export const imageApi = commonApi.injectEndpoints({
  endpoints: builder => ({
    uploadImage: builder.mutation<Image, FormData>({
      query: body => ({
        url: `${Path.IMAGES}/upload`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useUploadImageMutation } = imageApi;

import * as yup from 'yup';

// const mapRules = (map: any, rule: any) =>
//   Object.keys(map).reduce((newMap, key) => ({ ...newMap, [key]: rule }), {});

export default yup.object().shape({
  title: yup.string().required('Название не должно быть пустым'),
  // TODO: доделать валидацию
  // subCategories: yup.lazy(map =>
  //   yup.object(
  //     mapRules(
  //       map,
  //       yup.object({
  //         id: yup.number(),
  //         title: yup.string().required('Заголовок не должен быть пусты'),
  //       })
  //     )
  //   )
  // ),
});

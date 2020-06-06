import * as Yup from 'yup';

function validations() {
  return {
    point: pointValidation()
  }

  function pointValidation() {
    return Yup.object().shape({
      name: Yup.string().required('Este campo é obriatório.').max(255, 'Máximo de 255 caractéres'),
      email: Yup.string().required('Este campo é obriatório.').email('Este campod eve ser um e-mail válido').max(255, 'Máximo de 255 caractéres'),
      whatsapp: Yup.string().required('Este campo é obriatório.').max(15, 'Número de telefone inválido'),
      uf: Yup.string().required('Este campo é obriatório.').max(2, 'UF inválido'),
      city: Yup.string().required('Este campo é obriatório.'),
      items: Yup.array().of(Yup.number()).required('Selecione pelo menos 1 item de coleta').min(1, 'Selecione pelo menos 1 item de coleta'),
      latitude: Yup.number().typeError('Latitude inválida').required('Este campo é obriatório.'),
      longitude: Yup.number().typeError('Longitude inválida').required('Este campo é obriatório.'),
      // image: Yup.mixed().test('image', 'Imagem inválida. Apenas .jpg .png .jpeg', (value) => {
      //   console.log(value)
      //   return false;
      // }).required('Este campo é obriatório.'),
    })
  }
}
export default validations()
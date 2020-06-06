import { celebrate, Joi } from 'celebrate';

class PointSchema {
  schema() {
    return celebrate({
      body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().min(2),
        items: Joi.string().required(),
      })
    }, { abortEarly: false })
  }
}

export default new PointSchema();
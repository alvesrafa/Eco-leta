import knex from '../../database/connection';
const SERVER_URL = 'http://192.168.0.197:3100';

interface Point {
  name: string;
  email: string;
  whatsapp: string;
  latitude: number;
  longitude: number;
  city: string;
  uf: string;
  items: string;
  file: {
    filename: string;
  }
}
interface Arquivo {
  filename: string;
}
class PointService {
  async index(items: Number[], city: String, uf: String) {
    try {
      const points = await knex('points')
        .join('point_items', 'points.id', '=', 'point_items.point_id')
        .whereIn('point_items.item_id', items)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('points.*')
      console.log('points', points)
      const serializedPoints = points.map(point => {
        return {
          ...point,
          image_url: `${SERVER_URL}/uploads/${point.image}`
        }
      })

      return serializedPoints

    } catch (e) {
      return {
        success: false,
        message: 'Não foi possivel localizar pontos de coleta com esses parametros'
      }
    }
  }
  async show(id: number) {
    try {
      const trx = await knex.transaction()
      const point = await trx.select().from('points').where('id', id).first();

      if (!point) {
        return { success: false, message: 'Não foi possível encontrar o ponto de coleta' }
      }

      const serializedPoint = {
        ...point,
        image_url: `${SERVER_URL}/uploads/${point.image}`
      }

      const items = await trx('items')
        .join('point_items', 'items.id', '=', 'point_items.item_id')
        .where('point_items.point_id', id)
        .select('items.title')

      trx.commit()

      return { point: serializedPoint, items }

    } catch (e) {
      console.log('Erro ao buscar ponto de coleta', e)
      return { success: false, message: 'Não foi possível encontrar o ponto de coleta' }
    }
  }
  
  async create(body: Point, file: Arquivo) {

    const { name, email, whatsapp, latitude, longitude, city, uf, items } = body
    try {
      const trx = await knex.transaction()
      const point = {
        image: `${file.filename}`,
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf
      }
      const [id] = await trx('points').insert(point)
      const pointItems = items
        .split(',')
        .map((item: string) => Number(item.trim()))
        .map((item_id: number) => {
          return {
            item_id,
            point_id: id
          }
        })
      await trx('point_items').insert(pointItems)
      trx.commit()

      return {
        id,
        ...point
      }
    } catch (e) {
      return {
        success: false,
        message: e
      }
    }

  }
}

export default new PointService();
import { Request, Response } from 'express'
import knex from '../database/connection';

class PointsController {
  async index(req: Request, res: Response) {
    //cidade, uf, items
    const { city, uf, items } = req.query

    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()))

    try {

      const points = await knex('points')
        .join('point_items', 'points.id', '=', 'point_items.point_id')
        .whereIn('point_items.item_id', parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('points.*')
        
      return res.status(201).json({ success: true, points })

    } catch (e) {
      console.error('Erro ao buscar pontos de coleta', e)
      return res.status(400).json({ success: false, message: 'Erro ao buscar pontos de coleta' })
    }


  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const point = await knex.select().from('points').where('id', id).first();
      
      if (!point) {
        return res.status(400).json({ success: false, message: 'Não foi possível encontrar o ponto de coleta' })
      }
      const items = await knex('items')
        .join('point_items', 'items.id', '=', 'point_items.item_id')
        .where('point_items.point_id', id)
        .select('items.title')
      return res.status(201).json({ point, items })

    } catch (e) {
      console.log('Erro ao buscar ponto de coleta', e)
      return res.status(400).json({ success: false, message: 'Não foi possível encontrar o ponto de coleta' })
    }

  }

  async create(req: Request, res: Response) {
    console.log(req.originalUrl)


    const { name, email, whatsapp, latitude, longitude, city, uf, items } = req.body


    try {

      const trx = await knex.transaction()

      const point = {
        image: 'https://images.unsplash.com/photo-1573481078935-b9605167e06b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf
      }

      const [id] = await trx('points').insert(point)

      const pointItems = items.map((item_id: number) => {
        return {
          item_id,
          point_id: id
        }
      })

      await trx('point_items').insert(pointItems)

      trx.commit()
      return res.status(201).json({
        success: true, message: 'Ponto de coleta cadastrado com sucesso!', point: {
          id,
          ...point
        }
      })
    } catch (e) {

      console.log('Erro ao cadastrar ponto de coleta', e)
      return res.status(400).json({ success: false, message: 'Erro ao cadastrar ponto de coleta.' })
    }

  }

}

export default PointsController;
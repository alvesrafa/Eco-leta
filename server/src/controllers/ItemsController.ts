import { Request, Response } from 'express'
import knex from '../database/connection';
const SERVER_URL = 'http://192.168.0.197:3333';

class ItemsController {
  async index(req: Request, res: Response) {
    console.log(req.originalUrl)
    try {
      const items = await knex.select().from('items');

      const serializedItems = items.map(item => {
        return {
          id: item.id,
          title: item.title,
          image_url: `${SERVER_URL}/uploads/${item.image}`
        }
      })

      return res.status(201).json({ success: true, items: serializedItems })

    } catch (e) {
      console.log('Erro ao buscar itens', e)
      return res.status(400).json({ success: false, message: 'Erro ao buscar itens.' })
    }

  }
}
export default ItemsController;
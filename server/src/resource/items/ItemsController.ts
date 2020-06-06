import { Request, Response } from 'express'
import ItemService from './ItemService'


class ItemsController {
  async index(req: Request, res: Response) {
    console.log(req.originalUrl)
    try {
      
      const result = await ItemService.index()

      return res.status(201).json({ success: true, items: result })

    } catch (e) {
      console.log('Erro ao buscar itens', e)
      return res.status(400).json({ success: false, message: 'Erro ao buscar itens.' })
    }

  }
}
export default ItemsController;
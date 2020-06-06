import { Request, Response } from 'express'
import PointService from './PointService'

interface Result{
  points: string;
  point: string;
  items: string;
}

class PointsController {
  async index(req: Request, res: Response) {
    //cidade, uf, items
    const { city, uf, items } = req.query
    

    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()))

    try {

      const result = await PointService.index(parsedItems, String(city), String(uf))
      console.log('result', result)
      return res.status(201).json({ success: true, points: result })

    } catch (e) {
      console.error('Erro ao buscar pontos de coleta', e)
      return res.status(400).json({ success: false, message: 'Erro ao buscar pontos de coleta' })
    }


  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    try {

      const result = await PointService.show(Number(id));

      return res.status(201).json({
        success: true,
        ...result
      })

    } catch (e) {
      console.log('Erro ao buscar ponto de coleta', e)
      return res.status(400).json({ success: false, message: 'Não foi possível encontrar o ponto de coleta' })
    }

  }

  async create(req: Request, res: Response) {
    console.log(req.originalUrl)
    try {
      const result = await PointService.create(req.body, req.file)

      return res.status(201).json({
        success: true, message: 'Ponto de coleta cadastrado com sucesso!', point: result
      })
    } catch (e) {
      console.log('Erro ao cadastrar ponto de coleta', e)
      return res.status(400).json({ success: false, message: 'Erro ao cadastrar ponto de coleta.', error: e })
    }

  }

}

export default PointsController;
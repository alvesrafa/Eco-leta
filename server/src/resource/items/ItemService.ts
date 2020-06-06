import knex from '../../database/connection';
const SERVER_URL = 'http://192.168.0.197:3100';

class ItemService {
  async index() {
    try {
      const items = await knex.select().from('items');

      const serializedItems = items.map(item => {
        return {
          id: item.id,
          title: item.title,
          image_url: `${SERVER_URL}/uploads/${item.image}`
        }
      })
      return serializedItems;
      
    } catch (e) {
      return { success: false, message: 'Não foi possível encontrar o ponto de coleta', error: e }
    }
  }
}
export default new ItemService();
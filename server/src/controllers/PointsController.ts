import {Request, Response} from 'express'; 
import knex from '../database/connection';

class PointsController {
    async index(request: Request, response: Response){
        // cidade, uf, items (Query Params) quando for lidar com filtros pegar do query
        const {city, uf, items} = request.query;

        const parsedItems = String(items)
        .split(',')
        .map(item => Number(item.trim()));

        const points = await knex('points')
        .join('point_items', 'points.id', '=', 'point_items.point_id')
        .whereIn(' point_items.item_id', parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('points.*');

        return response.json(points);

        
;    }
    async show(request: Request, response: Response){
        const {id} = request.params;

        const point = await knex ('points').where('id',id).first();

        if (!point){
            return response.status(400).json({ message: 'Point not found.'});
        }

        /**
         * select * from items
         * join point_items on items.id = point_items.item_id
         * where point_items.point_id = {id}
         */
        const items = await knex ('items')
        .join('point_items', 'items.id', '=','point_items.item_id')
        .where('point_items.point_id', id)
        .select('items.title');

        return response.json({point, items}); 
    }

    async create (request: Request, response: Response){
        const { 
            name, // const name = request.body, as chaves mostram que deve ser feito para todos
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;
    
        const trx = await knex.transaction();

        const point = {
            image: 'image-fakehttps://images.unsplash.com/photo-1580368185100-5347908688ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
            name, // name: name não precisa escrever pois são iguais
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
    
        }
    
        const insertIds = await trx('points').insert(point);
    
        const point_id = insertIds[0]; // possui só 1 pois eles estão todos no mesmo
    
        const pointItems = items.map((item_id: number) => {
            return {
                item_id,
                point_id, 
            };
        })
    
        await trx('point_items').insert(pointItems);

        await trx.commit();
    
        return response.json({ 
            id: point_id,
            ... point, 
        });
    }
}

export default PointsController;
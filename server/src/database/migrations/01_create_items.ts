import Knex from 'knex'; // criar a tabela

export async function up(knex: Knex) {
    return knex.schema.createTable('items', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('title').notNullable();
    });
}

export async function down(knex: Knex){
// voltar atras (deletar a tabela)
    return knex.schema.dropTable('items');
}
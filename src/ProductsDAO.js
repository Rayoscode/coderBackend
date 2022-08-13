const { options } = require('../options/sqlite3');

const knex = require('knex')(options)


class ProductsDAO {

    insertMessage = async (Message, Name)=>{
        try{
            await knex('PRODUCTOS').insert({message:Message,name:Name})
        } catch(error){
            console.log(error)
        } finally{
            knex.destroy();
        }
    }

    deleteMessage = ()=>{

    }

    upgradeMessage = ()=>{

    }

    selectMessage = ()=>{

    }

    createTable = async ()=>{
    
        try {
            if(await knex.schema.hasTable('PRODUCTOS')){
                await knex.schema.dropTable('PRODUCTOS');
            }
            await knex.schema.createTable('PRODUCTOS',table =>{
                table.increments('id');
                table.string('name',30);
                table.string('message',100);

            })
        } catch (error){
            console.log(error)
        } finally{
            knex.destroy();
        }
    }



}

module.exports = ProductsDAO;
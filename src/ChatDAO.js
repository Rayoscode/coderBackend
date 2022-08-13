const { options } = require('../options/sqlite3');

const knex = require('knex')(options)


class ChatDAO {

    insertMessage = async (Message, Name)=>{
        try{
            await knex('MENSAJES').insert({message:Message,name:Name})
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
            if(await knex.schema.hasTable('MENSAJES')){
                await knex.schema.dropTable('MENSAJES');
            }
            await knex.schema.createTable('MENSAJES',table =>{
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

module.exports = ChatDAO;
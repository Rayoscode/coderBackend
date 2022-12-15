import knex from "knex";

class ChatDAO {
    constructor(TableName, Options) {
        this.knex = knex(Options);
        this.tableName = TableName;
    }
    insertMessage = async (Message, Name) => {
        try {
            await this.knex(this.tableName).insert({ message: Message, name: Name, date: new Date().toLocaleDateString() });
        } catch (error) {
            console.log(error);
        }
    };

    selectMessage = async () => {
        try {
            const DatosMensajes = await this.knex.from(this.tableName).select("*");
            return DatosMensajes;
        } catch (err) {
            console.log(err);
        }
    };

    createTable = async () => {
        try {
            if (await this.knex.schema.hasTable(this.tableName)) {
                await this.knex.schema.dropTable(this.tableName);
            }
            await this.knex.schema.createTable(this.tableName, (table) => {
                table.increments("id");
                table.string("name", 30);
                table.string("message", 100);
                table.string("date", 50)
            });
        } catch (error) {
            console.log(error);
        }
    };
}
export default ChatDAO;

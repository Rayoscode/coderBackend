import knex from 'knex'
class ProductsDAO {
    constructor(TableName, Options) {

        this.knex = knex(Options);
        this.tableName = TableName;
    }

    async insertProduct(Title, Price, Thumbnail) {
        try {
            await this.knex(this.tableName).insert({
                title: Title,
                price: Price,
                thumbnail: Thumbnail,
            });
        } catch (error) {
            console.log(error);
        }
    }

    async selectProductos() {
        try {
            const productos = await this.knex.from(this.tableName).select("*");
            return productos;
        } catch (err) {
            console.log(err);
        }
    }

    async createTable() {
        try {
            if (await this.knex.schema.hasTable(this.tableName)) {
                await this.knex.schema.dropTable(this.tableName);
            }
            await this.knex.schema.createTable(this.tableName, (table) => {
                table.increments("id");
                table.string("title", 30);
                table.string("thumbnail", 300);
                table.float("price");
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export default ProductsDAO;

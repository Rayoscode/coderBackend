
const sessionConfig =  {
        store: MongoStore.create({
            mongoOptions: {
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            mongoUrl: 'mongodb://localhost:27017/entrega9',
    
        }),
        secret: "entrega123",
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 360000 }
    }


export default sessionConfig
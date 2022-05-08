module.exports = class Application {
    #express = require('express');
    #app = this.#express();
    constructor(PORT, DB_URL) {
        this.configDataBase(DB_URL);
        this.configApplication();
        this.createRoutes();
        this.createServer(PORT);
        this.errorHanler();
    }
    configApplication() {
        const path = require('path');
        this.#app.use(this.#express.json());
        this.#app.use(this.#express.urlencoded({ extended: true }))
        this.#app.use(this.#express.static(path.join(__dirname, "..", "public")))
    }
    createServer(PORT) {
        const http = require('http');
        const server = http.createServer(this.#app);
        server.listen(PORT, () => {
            console.log(`Server run on port ${PORT}`)
        })
    }
    configDataBase(DB_URL) {
        const mongoose = require("mongoose");
        mongoose.connect(DB_URL, (err) => {
            if (err) throw err;
            return console.log('Connect to DB ...');
        });
    }
    errorHanler() {
        this.#app.use((req, res, next) => {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "صفحه مورد نظر یافت نشد"
            });
        });
        this.#app.use((error, req, res, next) => {
            const status = error?.status || 500;
            const message = error?.message || "Internal server error";
            return res.status(status).json({
                status,
                success: false,
                message
            })
        })
    }
    createRoutes() {
        const { AllRoutes } = require('./router/router');
        this.#app.get("/", (req, res) => {
            return res.json({
                msg: "test"
            })
        })
        this.#app.use(AllRoutes)
    }
}
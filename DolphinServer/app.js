const express = require("express");
const body_parser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
var YAML = require("yamljs");
const swaggerDocument = YAML.load('./swagger.yaml')
const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(body_parser.json());

app.all("*", (req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Credentials", true);
    res.set("Access-Control-Allow-Methods", "OPTIONS, GET, POST, DELETE, PUT");
    res.set(
        "Access-Control-Allow-Headers",
        "X-Requested-With, Content-Type, Authorization"
    );
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    } else {
        next();
    }
});
  


require('./routes')(app);

app.use((err, req, res, next) => {
    if (err.status) {
        return res.status(err.status).send(err.message);
    } else {
        return res.status(500).send(err.message);
    }
});

const server = app.listen(4100, "localhost", () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log("App listening at http://%s:%s", host, port);
});

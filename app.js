const http = require("http")
const url = require("url")
const PORT = 5000;

let body = "";

const users = [
    { "id": 1, "Name": "Yasir", "Position": "Chieff Of Engineer" },
    { "id": 2, "Name": "Ahmed", "Position": "CEO" },
    { "id": 3, "Name": "Khalid", "Position": "Sales Supervisor" }
];

const server = http.createServer((req, res) => {
    const parseUrl = url.parse(req.url, true)
    const method = req.method;
    const pathName = parseUrl.pathname;


    req.on("data", (chunk) => {
        body += chunk.toString()
    });

    req.on("end", () => {
        if (pathName == "/users") {

            if (method == "GET") {
                res.writeHead(200, { "Content-Type": "application/json" })
                res.end(JSON.stringify(users))
            } else if (method == "POST") {


                const newData = JSON.parse(body);
                newData.id = users.length + 1;

                users.push(newData);
                res.writeHead(200, { "Content-Type": "application/json" })
                res.end(JSON.stringify({ message: "Data has been created successfully", data: newData }))
            }
        }
    })

    //console.log(method, "=======>", pathName);

});

server.listen(PORT, () => {
    console.log("This server is running on Localhost:" + PORT)
});
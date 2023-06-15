import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { request } from 'http';

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(7777, () => console.log("Server address http://localhost:7777"));

// ---- Reservations ---- //

// GET - Get all reservations
app.get("/reservations", (request, response) => {
    fs.readFile("./reservations.json", "utf8", (err, reservationsJSON) => {
        if (err) {
            console.log("File read failed in get /reservations: " + err);
            response.status(500).send('File read failed');
            return;
        }

        console.log("GET: /reservations");
        response.send(reservationsJSON);
    })
});

// GET - Get one reservation
app.get("/reservations/:id", (request, response) => {
    fs.readFile("./reservations.json", "utf8", (err, reservationsJSON) => {
        if (err) {
            console.log("File read failed in get /reservations/" + request.params.id + ": " + err);
            response.status(500).send('File read failed');
            return;
        }

        var reservations = JSON.parse(reservationsJSON);
        console.log(reservations);
        var reservation = reservations.find(reservationTmp => reservationTmp.reservationId == request.params.id);

        if (!reservation) {
            console.log("Can't find reservation with id: " + request.params.id);
            response.status(500).send("Can't find reservation with id: " + request.params.id);
            return;
        }

        var reservationJSON = JSON.stringify(reservation);
        console.log("GET /reservations/" + request.params.id);
        response.send(reservationJSON);
    })
});

// POST - Add reservation
app.post("/reservations", (request, response) => {
    fs.readFile("./reservations.json", "utf8", (err, reservationsJSON) => {
        if (err) {
            console.log("File read failed in POST /reservations: " + err);
            response.status(500).send("File read failed");
            return;
        }

        var reservations = JSON.parse(reservationsJSON);
        var reservation = reservations.find(reservationTmp => reservationTmp.reservationId == request.body.reservationId);

        if (!reservation) {
            reservations.push(request.body);
            var newList = JSON.stringify(reservations);

            fs.writeFile("./reservations.json", newList, err => {
                if (err) {
                    console.log("Error writing file in POST /reservations: " + err);
                    response.status(500).send('Error writing file reservations.json');
                } else {
                    response.status(201).send(request.body);
                    console.log("Successfully wrote file reservations.json and added new reservation with id = " + request.body.reservationId);
                }
            });
        } else {
            console.log("Reservation by id = " + request.body.reservationId + " already exists");
            response.status(500).send("Reservation by id = " + request.body.reservationId + " already exists");
            return;
        }

    });
});

// PUT - Edit reservation
app.put("/reservations/:id", (request, response) => {
    fs.readFile("./reservations.json", "utf8", (err, reservationsJSON) => {

        if (err) {
            console.log("File read failed in POST /reservations/" + request.params.id + ": " + err);
            response.status(500).send("File read failed");
            return;
        }

        var reservations = JSON.parse(reservationsJSON);
        var reservationBody = reservations.find(reservationTMP => reservationTMP.reservationId == request.body.reservationId);

        if (reservationBody && reservationBody.reservationId != request.params.id) {
            console.log("Reservation by id = " + reservationBody.reservationId + " already exists");
            response.status(500).send("Reservation by id = " + reservationBody.reservationId + " already exists");
            return;
        }

        var reservation = reservations.find(reservationTMP => reservationTMP.reservationId == request.params.id);

        if (!reservation) {
            reservations.push(request.body);
            var newList = JSON.stringify(reservations);

            fs.writeFile("./reservations.json", newList, err => {
                if (err) {
                    console.log("Error writing file in PUT /reservations/" + request.params.id + ": " + err);
                    response.status(500).send('Error writing file reservations.json');
                } else {
                    response.status(201).send(request.body);
                    console.log("Successfully wrote file reservations.json and added new reservation with id = " + request.body.reservationId);
                }
            });

        } else {
            for (var i = 0; i < reservations.length; i++) {
                if (reservations[i].reservationId == reservation.reservationId) {
                    reservations[i] = request.body;
                }
            }

            var newList = JSON.stringify(reservations);

            fs.writeFile('./reservations.json', newList, err => {
                if (err) {
                    console.log("Error writing file in PUT /reservations/" + request.params.id + ": " + err);
                    response.status(500).send('Error writing file reservations.json');
                } else {
                    response.status(200).send(request.body);
                    console.log("Successfully wrote file reservations.json and edit reservation with old id = " + request.params.id);
                }
            });
        }
    });
});

// DELETE - Remove reservation
app.delete("/reservations/:id", (request, response) => {
    fs.readFile("./reservations.json", "utf8", (err, reservationsJSON) => {
        if (err) {
            console.log("File read failed in DELETE /reservations: " + err);
            response.status(500).send("File read failed");
            return;
        }
        var reservations = JSON.parse(reservationsJSON);
        var reservationIndex = reservations.findIndex(reservationtmp => reservationtmp.reservationId == request.params.id);
        if (reservationIndex != -1) {
            reservations.splice(reservationIndex, 1);
            var newList = JSON.stringify(reservations);
            fs.writeFile("./reservations.json", newList, err => {
                if (err) {
                    console.log("Error writing file in DELETE /reservations/" + request.params.id + ": " + err);
                    response.status(500).send("Error writing file reservations.json");
                } else {
                    response.status(204).send();
                    console.log("Successfully deleted reservation with id = " + request.params.id);
                }
            });
        } else {
            console.log("reservation by id = " + request.params.id + " does not exists");
            response.status(500).send("reservation by id = " + request.params.id + " does not exists");
            return;
        }
    });
});

// -------- Users -------- //

// GET - Get all users
app.get("/users", (request, response) => {
    fs.readFile("./users.json", "utf8", (err, usersJSON) => {
        if (err) {
            console.log("File read failed in get /users: " + err);
            response.status(500).send('File read failed');
            return;
        }

        console.log("GET: /users");
        response.send(usersJSON);
    })
});

// GET - Get one user
app.get("/users/:id", (request, response) => { });

// POST - Add user
app.post("/users", (request, response) => {
    fs.readFile("./users.json", "utf8", (err, usersJSON) => {
        if (err) {
            console.log("File read failed in POST /users: " + err);
            response.status(500).send("File read failed");
            return;
        }

        var users = JSON.parse(usersJSON);
        var user = users.find(userTmp => userTmp.userId == request.body.userId);

        if (!user) {
            users.push(request.body);
            var newList = JSON.stringify(users);

            fs.writeFile("./users.json", newList, err => {
                if (err) {
                    console.log("Error writing file in POST /users: " + err);
                    response.status(500).send('Error writing file users.json');
                } else {
                    response.status(201).send(request.body);
                    console.log("Successfully wrote file users.json and added new user with id = " + request.body.userId);
                }
            });
        } else {
            console.log("user by id = " + request.body.userId + " already exists");
            response.status(500).send("user by id = " + request.body.userId + " already exists");
            return;
        }

    });
});

// PUT - Edit user
app.put("/users/:id", (request, response) => {
    fs.readFile("./users.json", "utf8", (err, usersJSON) => {

        if (err) {
            console.log("File read failed in POST /users/" + request.params.id + ": " + err);
            response.status(500).send("File read failed");
            return;
        }

        var users = JSON.parse(usersJSON);
        var userBody = users.find(userTMP => userTMP.userId == request.body.userId);

        if (userBody && userBody.userId != request.params.id) {
            console.log("user by id = " + userBody.userId + " already exists");
            response.status(500).send("user by id = " + userBody.userId + " already exists");
            return;
        }

        var user = users.find(userTMP => userTMP.userId == request.params.id);

        if (!user) {
            users.push(request.body);
            var newList = JSON.stringify(users);

            fs.writeFile("./users.json", newList, err => {
                if (err) {
                    console.log("Error writing file in PUT /users/" + request.params.id + ": " + err);
                    response.status(500).send('Error writing file users.json');
                } else {
                    response.status(201).send(request.body);
                    console.log("Successfully wrote file users.json and added new user with id = " + request.body.userId);
                }
            });

        } else {
            for (var i = 0; i < users.length; i++) {
                if (users[i].userId == user.userId) {
                    users[i] = request.body;
                }
            }

            var newList = JSON.stringify(users);

            fs.writeFile('./users.json', newList, err => {
                if (err) {
                    console.log("Error writing file in PUT /users/" + request.params.id + ": " + err);
                    response.status(500).send('Error writing file users.json');
                } else {
                    response.status(200).send(request.body);
                    console.log("Successfully wrote file users.json and edit user with old id = " + request.params.id);
                }
            });
        }
    });
});

// Delete - Delete user
app.delete("/users/:id", (request, response) => {
    fs.readFile("./users.json", "utf8", (err, usersJSON) => {
        if (err) {
            console.log("File read failed in DELETE /users: " + err);
            response.status(500).send("File read failed");
            return;
        }
        var users = JSON.parse(usersJSON);
        var userIndex = users.findIndex(usertmp => usertmp.userId == request.params.id);
        if (userIndex != -1) {
            users.splice(userIndex, 1);
            var newList = JSON.stringify(users);
            fs.writeFile("./users.json", newList, err => {
                if (err) {
                    console.log("Error writing file in DELETE /users/" + request.params.id + ": " + err);
                    response.status(500).send("Error writing file users.json");
                } else {
                    response.status(204).send();
                    console.log("Successfully deleted user with id = " + request.params.id);
                }
            });
        } else {
            console.log("user by id = " + request.params.id + " does not exists");
            response.status(500).send("user by id = " + request.params.id + " does not exists");
            return;
        }
    });
});

// GET - Get logged in user
app.get("/loggedIn", (request, response) => {
    fs.readFile("./loggedIn.json", "utf8", (err, loggedInJSON) => {
        if (err) {
            console.log("File read failed in get /loggedIn: " + err);
            response.status(500).send('File read failed');
            return;
        }

        var users = JSON.parse(loggedInJSON);
        var user = users[0];

        console.log(users);
        if (users.length == 0) {
            console.log("GET /loggedIn empty");
            response.send(null);
        } else {
            var userJSON = JSON.stringify(user);
            console.log("GET /loggedIn");
            response.send(userJSON);
        }

    })
});

// POST - Add logged in user
app.post("/loggedIn", (request, response) => {
    fs.readFile("./loggedIn.json", "utf8", (err, usersJSON) => {
        if (err) {
            console.log("File read failed in POST /loggedIn: " + err);
            response.status(500).send("File read failed");
            return;
        }

        var users = JSON.parse(usersJSON);
        var user = users.find(userTmp => userTmp.userId == request.body.userId);

        if (!user) {
            users.push(request.body);
            var newList = JSON.stringify(users);

            fs.writeFile("./loggedIn.json", newList, err => {
                if (err) {
                    console.log("Error writing file in POST /loggedIn: " + err);
                    response.status(500).send('Error writing fileloggedIn.json');
                } else {
                    response.status(201).send(request.body);
                    console.log("Successfully wrote file loggedIn.json and added new logged user");
                }
            });
        } else {
            console.log("User already logged in");
            response.status(500).send("User already logged in");
            return;
        }

    });
});

// PUT - Edit logged in user 
app.put("/loggedIn/:id", (request, response) => {
    fs.readFile("./loggedIn.json", "utf8", (err, usersJSON) => {

        if (err) {
            console.log("File read failed in POST /loggedIn" + request.params.id + ": " + err);
            response.status(500).send("File read failed");
            return;
        }

        var users = JSON.parse(usersJSON);
        var userBody = users.find(userTMP => userTMP.userId == request.body.userId);

        if (userBody && userBody.userId != request.params.id) {
            console.log("user by id = " + userBody.userId + " already exists");
            response.status(500).send("user by id = " + userBody.userId + " already exists");
            return;
        }

        var user = users.find(userTMP => userTMP.userId == request.params.id);

        if (user) {
            for (var i = 0; i < users.length; i++) {
                if (users[i].userId == user.userId) {
                    users[i] = request.body;
                }
            }

            var newList = JSON.stringify(users);

            fs.writeFile('./loggedIn.json', newList, err => {
                if (err) {
                    console.log("Error writing file in PUT /loggedIn/" + request.params.id + ": " + err);
                    response.status(500).send('Error writing file loggedIn.json');
                } else {
                    response.status(200).send(request.body);
                    console.log("Successfully wrote file loggedIn.json and edit user with old id = " + request.params.id);
                }
            });
        }
    });
});

// DELETE - Delete logged in user
app.delete("/loggedIn", (request, response) => {
    fs.readFile("./loggedIn.json", "utf8", (err, usersJSON) => {
        if (err) {
            console.log("File read failed in DELETE /reservations: " + err);
            response.status(500).send("File read failed");
            return;
        }
        var users = JSON.parse(usersJSON);

        if (users.length == 0) {
            console.log("No user is currently logged in");
            response.status(500).send("No user is currently logged in");
        } else {
            var newUserList = [];
            var newUserListJSON = JSON.stringify(newUserList)
            fs.writeFile("./loggedIn.json", newUserListJSON, err => {
                if (err) {
                    console.log("Error writing file in DELETE /loggedIn: " + err);
                    response.status(500).send("Error writing file in DELETE /loggedIn: " + err);
                } else {
                    response.status(204).send();
                    console.log("Successfully deleted loggedIn user");
                }
            });
        }
    });
})

// -------- Orders -------- //


// GET - Get all orders
app.get("/orders", (request, response) => {
    fs.readFile("./orders.json", "utf8", (err, ordersJSON) => {
        if (err) {
            console.log("File read failed in get /orders: " + err);
            response.status(500).send('File read failed');
            return;
        }

        console.log("GET: /orders");
        response.send(ordersJSON);
    })
});

// GET - Get one order
app.get("/orders/:id", (request, response) => {
    fs.readFile("./orders.json", "utf8", (err, ordersJSON) => {
        if (err) {
            console.log("File read failed in get /orders/" + request.params.id + ": " + err);
            response.status(500).send('File read failed');
            return;
        }

        var orders = JSON.parse(ordersJSON);
        console.log(orders);
        var order = orders.find(orderTmp => orderTmp.orderId == request.params.id);

        if (!order) {
            console.log("Can't find order with id: " + request.params.id);
            response.status(500).send("Can't find order with id: " + request.params.id);
            return;
        }

        var orderJSON = JSON.stringify(order);
        console.log("GET /order/" + request.params.id);
        response.send(orderJSON);
    });
});

// POST - Add order
app.post("/orders/:id", (request, response) => {
    fs.readFile("./orders.json", "utf8", (err, ordersJSON) => {
        if (err) {
            console.log("File read failed in POST /orders: " + err);
            response.status(500).send("File read failed");
            return;
        }

        var orders = JSON.parse(ordersJSON);
        var order = orders.find(orderTmp => orderTmp.orderId == request.body.orderId);

        if (!order) {
            orders.push(request.body);
            var newList = JSON.stringify(orders);

            fs.writeFile("./orders.json", newList, err => {
                if (err) {
                    console.log("Error writing file in POST /orders: " + err);
                    response.status(500).send('Error writing file orders.json');
                } else {
                    response.status(201).send(request.body);
                    console.log("Successfully wrote file orders.json and added new order with id = " + request.body.orderId);
                }
            });
        } else {
            console.log("order by id = " + request.body.orderId + " already exists");
            response.status(500).send("Order by id = " + request.body.orderId + " already exists");
            return;
        }

    });
});

// PUT - Edit order
app.put("/orders/:id", (request, response) => {
    fs.readFile("./orders.json", "utf8", (err, ordersJSON) => {

        if (err) {
            console.log("File read failed in POST /orders/" + request.params.id + ": " + err);
            response.status(500).send("File read failed");
            return;
        }

        var orders = JSON.parse(ordersJSON);
        var orderBody = orders.find(orderTMP => orderTMP.orderId == request.body.orderId);

        if (orderBody && orderBody.orderId != request.params.id) {
            console.log("order by id = " + orderBody.orderId + " already exists");
            response.status(500).send("order by id = " + orderBody.orderId + " already exists");
            return;
        }

        var order = orders.find(orderTMP => orderTMP.orderId == request.params.id);

        if (!order) {
            orders.push(request.body);
            var newList = JSON.stringify(orders);

            fs.writeFile("./orders.json", newList, err => {
                if (err) {
                    console.log("Error writing file in PUT /orders/" + request.params.id + ": " + err);
                    response.status(500).send('Error writing file orders.json');
                } else {
                    response.status(201).send(request.body);
                    console.log("Successfully wrote file orders.json and added new order with id = " + request.body.orderId);
                }
            });

        } else {
            for (var i = 0; i < orders.length; i++) {
                if (orders[i].orderId == order.orderId) {
                    orders[i] = request.body;
                }
            }

            var newList = JSON.stringify(orders);

            fs.writeFile('./orders.json', newList, err => {
                if (err) {
                    console.log("Error writing file in PUT /orders/" + request.params.id + ": " + err);
                    response.status(500).send('Error writing file orders.json');
                } else {
                    response.status(200).send(request.body);
                    console.log("Successfully wrote file orders.json and edit order with old id = " + request.params.id);
                }
            });
        }
    });
});

// DELETE - Remove order
app.delete("/orders/:id", (request, response) => {
    fs.readFile("./orders.json", "utf8", (err, ordersJSON) => {
        if (err) {
            console.log("File read failed in DELETE /orders: " + err);
            response.status(500).send("File read failed");
            return;
        }
        var orders = JSON.parse(ordersJSON);
        var orderIndex = orders.findIndex(ordertmp => ordertmp.orderId == request.params.id);
        if (orderIndex != -1) {
            orders.splice(orderIndex, 1);
            var newList = JSON.stringify(orders);
            fs.writeFile("./orders.json", newList, err => {
                if (err) {
                    console.log("Error writing file in DELETE /orders/" + request.params.id + ": " + err);
                    response.status(500).send("Error writing file orders.json");
                } else {
                    response.status(204).send();
                    console.log("Successfully deleted order with id = " + request.params.id);
                }
            });
        } else {
            console.log("order by id = " + request.params.id + " does not exists");
            response.status(500).send("order by id = " + request.params.id + " does not exists");
            return;
        }
    });
});


// -------- Products ------- //
app.get("/products", (request, response) => {
    fs.readFile("./products.json", "utf8", (err, productsJSON) => {
        if (err) {
            console.log("File read failed in get /products: " + err);
            response.status(500).send('File read failed');
            return;
        }

        console.log("GET: /products");
        response.send(productsJSON);
    })
});
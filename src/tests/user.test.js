const request = require("supertest")
const app = require("../app");
require("../models")

let data = {
    firstname: "Marco",
    lastname: "Cardenas",
    email: "marcoacg1983@gmail.com",
    password: "12345678",
    frontBaseUrl: "http://localhost:5173/#",
    isVerified: true
}

let userId
let token

test("POST /api/v1/users should return status 201", async() => {
    const res = await request(app).post("/api/v1/users").send(data);
    userId = res.body.id
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe(data.name)
})

test("GET /api/v1/users should return status 200", async() => {
    const res = await request(app).get("/api/v1/users");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].pets).toBeDefined()
})


test("POST /api/v1/users to login should return 200", async() => {
    const res = await request(app).post(`/api/v1/users/login`)
        .send({
            email: data.email, 
            password: data.password});
    token = res.body.token
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined()
    expect(res.body.user.id).toBe(userId)
})

// test("POST /:id/genres should return status 201", async() =>{
//     const genre = await Genre.create(dataGenre);
//     const res = await request(app).post(`/artists/${artistId}/genres`).send([genre.id]);
//     await genre.destroy()
//     expect(res.statusCode).toBe(201);
//     expect(res.body.length).toBe(1)
// })


// test("PUT /api/v1/users/:id should return status 201", async() => {
//     const res = await request(app).put(`/artists/${artistId}`).send({"name": "Castro"});
//     expect(res.statusCode).toBe(200);
//     expect(res.body.name).toBe("Castro")
// })

test("DELETE /api/v1/users/:id should return status 204", async() => {
    const res = await request(app).delete(`/api/v1/users/${userId}`);
    expect(res.statusCode).toBe(204);
})

test("GET /api/v1/users/:id to getOne should return status 200", async() => {
    const res = await request(app).get(`/api/v1/users/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(data.name)
    expect(res.body.pets).toBeDefined()
    expect(res.body.status).toBe(false);
})
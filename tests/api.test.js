import request from 'supertest';
import app from '../apicalls.js';
beforeEach(() =>{

})

afterEach(() =>{
    
})

describe ('Test GET with the path /data', () => {
    test("Response to the GET", async () => { // async and sync are different, first one tells not to wait and do other things
        const response = await request(app)
            .get("/data");
        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toMatch(/json/);
    })
})

describe ('Test GET with the path /data/1', () => {
    test("Response to the POST with acceptable datat", async () => { // async and sync are different, first one tells not to wait and do other things
        const expected = {"id": "1", "Firstname": "Petri", "Surname": "Laitinen"}
        const response = await request(app)
            .get("/data/1");
        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toEqual(expected)
    })
})

describe ('Test POST with the path /data', () => {
    test("Response to the POST with not acceptable data", async () => { // async and sync are different, first one tells not to wait and do other things
        const newUser = {"id": "3", "Firstname": "New", "Surname": "User"};
        const response = await request(app)
            .post("/data")
            .send(newUser)
            .set('content-type', 'application/json');
        expect(response.status).toEqual(201);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toEqual(newUser)
    })
})

describe ('Test POST with the path /data', () => {
    test("Response to the POST", async () => { // async and sync are different, first one tells not to wait and do other things
        const newUser = {"id": "2", "Firstname": "New", "Surname": "User"}
        const response = await request(app)
            .post("/data")
            .send(newUser)
            .set('content-type', 'application/json');
        expect(response.status).toEqual(409);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toEqual({"error": "Record already exists"})
    })
})

describe('Test DELETE with the path /data/:id', () => {

    // 200
    test("Delete an existing record (200 OK)", async () => {
        const response = await request(app)
            .delete("/data/1");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: "Data deleted successfully" });
    });

    // 404
    test("Attempt to delete a non-existent record (404 Not Found)", async () => {
        const response = await request(app)
            .delete("/data/100"); 
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: "Data not found" });
    });
});
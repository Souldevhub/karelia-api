import { Router } from 'express';
import { verifyToken } from '../utils.js'; // Adjust the path as necessary

let router = Router()

let data = [
    { "id": "1", "Firstname": "Petri", "Surname": "Laitinen"},
    { "id": "2", "Firstname": "Jyri", "Surname": "Kemppainen"}
]

router.get('/verify-token', verifyToken, (req, res) => {
    res.json({ message: "Token is valid!" });
}); //token validation check

router.get('/', (req, res) => {
    res.json( data )
})

router.get('/:id', (req, res) => {
    res.json( data.find(b => b.id === req.params.id ) )
})

/*router.post('/', (req, res) => {
    if(data.find(b => b.id === req.body.id)) {
        res.status(409).json( {"error": "record already exists"} );
    } else {
        data = [...data, req.body]
        res.json(req.body)
    }

//    res.json( data.find(b => b.id === req.params.id ) )
})
*/

router.post('/', (req, res) => {
    if (req.headers['content-type'] !== 'application/json') { //content type check
        return res.status(415).json({ error: "Unsupported Media Type" });
    }

    //check if ID already exists
    if (data.find(b => b.id === req.body.id)) {
        return res.status(409).json({ error: "Record already exists" });
    } else { //response 201 created
        data = [...data, req.body];
        res.status(201).json(req.body);
    }
});

router.delete('/:id', (req, res) => {
    const index = data.findIndex(item => item.id === req.params.id);     // find with id
    if (index === -1) { //if found
        return res.status(404).json({ error: "Data not found" }); //if not
    }
    data.splice(index, 1); // Remove the item from the array
    res.status(200).json({ message: "Data deleted successfully" });
});

router.put('/:id', (req, res) => {
    // content type json check
    if (req.headers['content-type'] !== 'application/json') {
        return res.status(415).json({ error: "Unsupported Media Type" });
    }

    const id = req.params.id;
    const bodyId = req.body.id;

    // id and url should match
    if (bodyId && bodyId !== id) {
        return res.status(400).json({ error: "ID in URL and body must match" });
    }

    // find index of the item with the matching ID
    const index = data.findIndex(item => item.id === id);

    if (index !== -1) {
        // if record exists update only specific
        const existingRecord = data[index];
        
        // update only specific fields
        data[index] = { 
            ...existingRecord, 
            ...req.body,
            id           //id remains consistent
        };

        return res.status(200).json(data[index]); // 200 OK
    } else {
        // check for duplicates if id doesn't exist?
        if (data.some(item => item.id === id)) {
            return res.status(409).json({ error: "Duplicate ID" });
        }

        // create a new record
        const newData = { id, ...req.body };
        data.push(newData);
        return res.status(201).json(newData); // 201 created
    }
});



export default router;
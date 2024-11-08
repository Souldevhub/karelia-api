import { Router } from 'express';
let router = Router()

router.get('/', (req, res) => {
    res.json( {
        'name': 'home page'
    })
})

export default router; // makes it public and possibility to use it directly
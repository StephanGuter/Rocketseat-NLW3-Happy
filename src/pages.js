//const orphanages = require('./database/fakedata.js');
const Database = require('./database/db');
const saveOrphanage = require('./database/saveOrphanage');

module.exports = {
    // index: function() {} <=====> index() {}
    index(req, res) {
        const city = req.query.city;
        return res.render('index'
        //,{city}
        );
    },

    async orphanage(req, res) {
        const id = req.query.id;

        try {
            const db = await Database;
            const results = await db.all(`SELECT * FROM orphanages WHERE id = ${id}`);
            const orphanage = results[0];

            orphanage.images = orphanage.images.split(',');
            orphanage.firstImage = orphanage.images[0];

            orphanage.open_on_weekends == 0 ? orphanage.open_on_weekends = false : orphanage.open_on_weekends = true;

            return res.render('orphanage', { orphanage: orphanage });
        } catch (error) {
            console.log(error);
            return res.send('Database error!'); 
        }
    },

    async orphanages(req, res) {
        try {
            const db = await Database;
            const orphanages = await db.all('SELECT * FROM orphanages');
            return res.render('orphanages', { orphanages });    
        } catch (error) {
            console.log(error);
            return res.send('Database error!');
        }
    },

    createOrphanage(req, res)  {
        return res.render('create-orphanage');
    },

    async saveOrphanage(req, res) {
        const fields = req.body;

        // Validar se todos os campos foram preenchidos.
        if (Object.values(fields).includes('')) {
            return res.send('All fields must be filled!');
        }

        try {
            // Salvar um orphanato.

            const db = await Database;
            await saveOrphanage(db, {
                lat: fields.lat,
                lng: fields.lng,
                name: fields.name,
                description: fields.about,
                whatsapp: fields.whatsapp,
                images: fields.images.toString(),
                instructions: fields.instructions,
                opening_hours: fields.opening_hours,
                open_on_weekends: fields.open_on_weekends,
            });

            // Redirecionamento

            return res.redirect('/orphanages');
        } catch (error) {
            console.log(error);
            return res.send('Database error!');
        }
    }
}
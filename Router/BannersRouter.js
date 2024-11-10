const express = require('express');
const upload = require('../MulterUploade/multer');
const { AddBanner, GetBanners, AddOffer, GetOffers, DeleteOffers, GetOfferOne, UpdateBanner } = require('../controllers/BannersConntroll');

const ExportBanners = express.Router();

// Mock data
ExportBanners.post('/add-banner', upload.fields([
    { name: 'imageBig', maxCount: 1 },
    { name: 'imageSmall', maxCount: 1 },
    { name: 'imageMedium', maxCount: 1 }
]), AddBanner);
ExportBanners.put('/update-banner/:id', upload.fields([
    { name: 'imageBig', maxCount: 1 },
    { name: 'imageSmall', maxCount: 1 },
    { name: 'imageMedium', maxCount: 1 }
]), UpdateBanner);
ExportBanners.get('/banners', GetBanners);
ExportBanners.post('/add-offer' , upload.single('image'), AddOffer);
ExportBanners.get('/offers', GetOffers);
ExportBanners.delete('/delete-offer/:id', DeleteOffers);
ExportBanners.get('/offer/:id', GetOfferOne);





module.exports = ExportBanners;
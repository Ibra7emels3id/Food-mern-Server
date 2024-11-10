const Banners = require("../models/Banners");
const Offers = require("../models/Offers");
const cloudinary = require('cloudinary').v2;

// Add Banners
const AddBanner = async (req, res) => {
    const {
        titleBig,
        descriptionBig,
        titleSmall,
        descriptionSmall,
        titleMedium,
        descriptionMedium,
        aboutBig,
        aboutSmall,
        aboutMedium,
    } = req.body;

    // Ensure you're handling multiple files
    const { imageMedium, imageSmall, imageBig } = req.files;
    try {
        // Upload each image to Cloudinary
        const resultMedium = await cloudinary.uploader.upload(imageMedium[0].path);
        const resultSmall = await cloudinary.uploader.upload(imageSmall[0].path);
        const resultBig = await cloudinary.uploader.upload(imageBig[0].path);

        // Create banner object with Cloudinary URLs
        const banner = new Banners({
            titleBig,
            descriptionBig,
            titleSmall,
            descriptionSmall,
            titleMedium,
            descriptionMedium,
            aboutBig,
            aboutSmall,
            aboutMedium,
            imageMedium: resultMedium.secure_url,
            imageSmall: resultSmall.secure_url,
            imageBig: resultBig.secure_url,
        });
        // Save banner to database
        await banner.save();
        res.status(201).json({ message: 'Banner added successfully', banner });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to upload banner', error });
    }
};

// Update Banners
const UpdateBanner = async (req, res) => {
    const { id } = req.params;
    const {
        titleBig,
        descriptionBig,
        titleSmall,
        descriptionSmall,
        titleMedium,
        descriptionMedium,
        aboutBig,
        aboutSmall,
        aboutMedium,
    } = req.body;
    try {
        let resultMedium = req.body.imageMedium;
        let resultSmall = req.body.imageSmall;
        let resultBig = req.body.imageBig;

        if (req.files) {
            const { imageMedium, imageSmall, imageBig } = req.files;
    
            if (imageMedium && imageMedium.length > 0) {
                const resultMediumUrl = await cloudinary.uploader.upload(imageMedium[0].path);
                resultMedium = resultMediumUrl.secure_url;
            }
            if (imageSmall && imageSmall.length > 0) {
                const resultSmallUrl = await cloudinary.uploader.upload(imageSmall[0].path);
                resultSmall = resultSmallUrl.secure_url;
            }
            if (imageBig && imageBig.length > 0) {
                const resultBigUrl = await cloudinary.uploader.upload(imageBig[0].path);
                resultBig = resultBigUrl.secure_url;
            }
        }

        const banner = await Banners.findByIdAndUpdate(id, {
            titleBig,
            descriptionBig,
            titleSmall,
            descriptionSmall,
            titleMedium,
            descriptionMedium,
            aboutBig,
            aboutSmall,
            aboutMedium,
            imageMedium: resultMedium,
            imageSmall: resultSmall,
            imageBig: resultBig,
        }, { new: true })

        console.log(banner);
        res.json({ message: 'Banner updated successfully', banner });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update banner', error });
    }
}



// Get Banners 
const GetBanners = async (req, res) => {
    try {
        const banners = await Banners.find();
        res.json(banners);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch banners', error });
    }
};

// One Offer 
const GetOfferOne = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const offer = await Banners.findOne({ _id: id });
        if (!offer) return res.status(404).json({ message: 'Offer not found' });
        res.json(offer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch offer', error });
    }
};



// Add Offer
const AddOffer = async (req, res) => {
    const { code, discount } = req.body;
    const pathToFile = req.file.path;
    try {
        const result = await cloudinary.uploader.upload(pathToFile);
        const offer = new Offers({
            code,
            discount,
            image: result.secure_url
        });
        await offer.save();
        res.status(201).json({ message: 'Offer added successfully', offer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add offer', error });
    }
};


// Get Offers
const GetOffers = async (req, res) => {
    try {
        const offers = await Offers.find();
        res.json(offers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch offers', error });
    }
};

// delete Offers
const DeleteOffers = async (req, res) => {
    try {
        const offer = await Offers.findByIdAndDelete(id)
        if (!offer) return res.status(404).json({ message: 'Offer not found' });
        res.json({ message: 'Offer deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete offer', error });
    }
};

module.exports = {
    AddBanner,
    GetBanners,
    AddOffer,
    GetOffers,
    DeleteOffers,
    GetOfferOne,
    UpdateBanner,
}
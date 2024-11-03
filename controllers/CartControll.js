const CardModel = require("../models/Cart");

// Handle Add To Cart
const Cards = async (req, res) => {
    const { item, userId } = req.body;
    try {
        let cartItem = await CardModel.findOne({ userId, 'items._id': item._id });

        if (cartItem) {
            await CardModel.updateOne(
                { userId, 'items._id': item._id },
                { $inc: { 'items.$.quantity': 1 } }
            );
            res.status(200).json({ message: 'Product quantity updated' });
        } else {
            await CardModel.updateOne(
                { userId },
                { $push: { items: { ...item, quantity: 1 } } },
                { upsert: true }
            );
            res.status(200).json({ message: 'Product added to cart' });
        }
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ message: 'Error adding item to cart' });
    }
}

// -1 quantity to cart
const removeFromCart = async (req, res) => {
    const { item, userId } = req.body;
    console.log(item, userId);
    try {
        await CardModel.updateOne(
            { userId, 'items._id': item._id },
            { $inc: { 'items.$.quantity': -1 } }
        );

        // If quantity becomes 0, remove the item
        const updatedCart = await CardModel.findOneAndUpdate(
            { userId, 'items._id': item._id },
            { $pull: { items: { _id: item._id, quantity: { $lt: 1 } } } },
            { new: true }
        );

        if (!updatedCart.items.length) {
            await CardModel.findByIdAndDelete({ _id: updatedCart._id });
            res.status(200).json({ message: 'Product removed from cart' });
        } else {
            res.status(200)
                .json({ message: 'Product quantity updated' });
        }

    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ message: 'Error removing item from cart' });
    }
}

// Handle Get Cart
const getCart = async (req, res) => {
    const userId = req.query.userId;
    try {
        const cart = await CardModel.findOne({ userId });

        const totalPrice = cart?.items?.reduce((acc, item) => {
            return acc + (item.price * item.quantity);
        }, 0);

        // Cart Quantity
        const totalQuantity = cart?.items?.reduce((acc, item) => {
            return acc + item.quantity;
        }, 0);
        res.json({ cart, totalPrice, totalQuantity });
    } catch (error) {
        console.error('Error getting cart:', error);
        res.status(500).json({ message: 'Error getting cart' });
    }
}

// delete to cart 
const deleteToCart = async (req, res) => {
    const { item, userId } = req.body;
    console.log(item, userId);
    try {
        const cart = await CardModel.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items?.filter(cartItem => cartItem._id.toString() !== item._id.toString());

        await cart.save();

        return res.json(cart);
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ message: 'Error removing item from cart' });
    }
}

// delete cart 
// const deleteCart = async (req, res) => {
//     const userId = req.query.userId;
//     try {
//         await CardModel.findByIdAndDelete({ userId });
//         res.status(200).json({ message: 'Cart deleted' });
//     } catch (error) {
//         console.error('Error deleting cart:', error);
//         res.status(500).json({ message: 'Error deleting cart' });
//     }
// }



module.exports = {
    Cards,
    getCart,
    removeFromCart,
    deleteToCart,
};

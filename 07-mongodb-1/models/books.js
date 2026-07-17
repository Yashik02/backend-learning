const mongoose = require('mongoose');

const newBook = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A book title must be provided'], // Custom message for required field
        trim: true,       // Automatically removes accidental leading/trailing spaces (e.g., "  fire  " becomes "fire")
        maxLength: [100, 'Title cannot exceed 100 characters']
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'price cannot be negative, you entered {VALUE}'], 
        validate: {
            validator: function (v) {
                return v <= 1000000;
            },
            message: 'price is unrealistically high, you entered ({VALUE})'
        }
    },
    // 1. DEFAULT VALUES: Automatically sets a category if you don't provide one
    category: {
        type: String,
        default: 'Fiction' 
    },
    // 2. ENUM (Allowed Values): Restricts input to only specific choices
    status: {
        type: String,
        enum: {
            values: ['available', 'out of stock', 'discontinued'],
            message: '{VALUE} is not a valid status' // Triggered if someone sets it to 'something else'
        },
        default: 'available' // Will automatically apply to your current test books!
    },
    // 3. IMMUTABLE: A field that can be set on creation, but Mongoose blocks updates to it later
    isbn: {
        type: String,
        immutable: true,
        default: () => Math.random().toString(36).substring(2, 11).toUpperCase() // Generates a random fake code if empty
    }
}, {
    // 4. TIMESTAMPS: Automatically creates and manages 'createdAt' and 'updatedAt' fields for you!
    timestamps: true 
});

const book = mongoose.model("book", newBook);

module.exports = book;
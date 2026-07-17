const mongoose = require("mongoose");
const book = require("./models/books.js");

async function main() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/amazon");
        console.log("Connection successful");

        await book.deleteMany({});

        await createOne();
        await createMany();

        console.log("\n--- Finding Books ---");
        await findBooks();

        console.log("\n--- Updating Books ---");
        await updateBooks();

        console.log("\n--- Deleting Books ---");
        await deleteBooks();
    } catch (err) {
        console.log("connection failed : ", err);
    } finally {
        mongoose.connection.close();
    }
}

async function createOne() {
    let b1 = new book({ author: "Mohammad", title: "fire", price: 543 });
    try {
        let result = await b1.save();
        console.log("saved : ", b1);
    } catch (err) {
        console.log("failed : ", err);
    }
}

async function createMany() {
    let newBooks = [
        { author: "leo", title: "a never ending story", price: 100 },
        { author: "sing&song", title: "The world after the fall", price: 396 },
        { author: "guilty three", title: "Shadow Slave", price: 37 },
    ];
    try {
        let result = await book.insertMany(newBooks);
        console.log("saved : ", newBooks);
    } catch (err) {
        console.log("failed : ", err);
    }
}

async function findBooks() {
    try {
        let allBooks = await book.find({});
        console.log(allBooks);

        let expensiveBooks = await book.find({ price: { $gte: 120 } });
        console.log(expensiveBooks);

        let singleBook = await book.findOne({ author: "leo" });
        console.log(singleBook);
    } catch (err) {
        console.log("failed : ", err);
    }
}

async function updateBooks() {
    try {
        // filter, update, options
        let res1 = await book.updateOne({ title: "a story" }, { price: 120 });
        console.log("Update info:", res1);

        await book.updateMany(
            { author: "Mohammad" },
            { price: 40 },
            { runValidators: true }, // tells mongoose to run validators while updating data
        );

        // Update and get the updated document back immediately
        let updatedBook = await book.findOneAndUpdate(
            { title: "a story" },
            { price: 130 },
            { 
                //new: true, This option tells Mongoose to return the modified version
                returnDocument: 'after' // the {new : true} is older now so use this instead.

            }, 
        );
        console.log("Updated Book:", updatedBook);
    } catch (err) {
        console.log("failed : ", err);
    }
}

async function deleteBooks() {
    try {
        // Delete the first document that matches the criteria
        let res1 = await book.deleteOne({ title: "a story" });
        console.log("Delete info:", res1);

        // Delete all books by a specific author
        await book.deleteMany({ author: "John Smith" });

        // Find a document by ID and delete it (very common in REST APIs)
        let deletedDoc = await book.findByIdAndDelete(
            "65f123456789abcdef012345",
        );
    } catch (err) {
        console.log("failed : ", err);
    }
}

main();

const schema = require('../model/schema'); 
const fs = require("fs"); 

module.exports.firstPage = async (req, res) => {
  await schema.find({}).then((data) => {
    res.json({ data })
  })
}

module.exports.addData = async (req, res) => {
  try {
      // ✅ Backend validation: Text fields me sirf alphabets aur spaces ho
      if (!/^[a-zA-Z\s]+$/.test(req.body.title)) {
          return res.status(400).json({ error: "Title must contain only letters and spaces" });
      }
      if (!/^[a-zA-Z\s]+$/.test(req.body.description)) {
          return res.status(400).json({ error: "Description must contain only letters and spaces" });
      }
      if (!/^[a-zA-Z\s]+$/.test(req.body.category)) {
          return res.status(400).json({ error: "Category must contain only letters and spaces" });
      }

      // ✅ Backend validation: Numbers only
      if (isNaN(req.body.price) || req.body.price < 0) {
          return res.status(400).json({ error: "Price must be a positive number" });
      }
      if (isNaN(req.body.rate) || req.body.rate < 0 || req.body.rate > 5) {
          return res.status(400).json({ error: "Rate must be between 0 and 5" });
      }
      if (isNaN(req.body.count) || req.body.count < 0) {
          return res.status(400).json({ error: "Count must be a positive number" });
      }

      // ✅ Image path correction
      req.body.image = req.file.path.replace(/\\/g, "/");

      // ✅ Save data to MongoDB
      let data = await schema.create(req.body);
      res.json({ message: "Data added successfully", data });
      console.log(data);

  } catch (error) {
      res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};


module.exports.addImage = async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }
    let image = req.file.path.replace(/\\/g, "/");
    let data = await schema.create({ image });
    
    res.json({ message: "Image uploaded successfully", data });
  
};



module.exports.deleteData = async (req, res) => {
  const singleData = await schema.findById(req.params.id);
  fs.unlinkSync(singleData.image);  
 await schema.findByIdAndDelete(req.params.id).then(() => {
    res.json('/')
  })
}

module.exports.updateData = async (req, res) => {
  try {
    const { title, price, description, category, rate, count } = req.body;
    const editID = req.params.id;

    const singleData = await schema.findById(editID);
    if (!singleData) return res.status(404).json({ error: "Data not found" });

    // ✅ Preserve old image if no new image is uploaded
    let img = singleData.image;
    if (req.file) {
      if (singleData.image) fs.unlinkSync(singleData.image); // Delete old image
      img = req.file.path.replace(/\\/g, "/");
    }

    const updatedData = await schema.findByIdAndUpdate(
      editID,
      { title, price, description, category, rate, count, image: img }, // ✅ Keep old image if no new image uploaded
      { new: true }
    );

    res.json({ message: "Data updated successfully", updatedData });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};







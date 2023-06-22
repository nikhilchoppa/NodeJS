const router = require('express').Router();
const Blog = require('../models/Blog')

// Fetch blogs
router.get('/blog', async(req,res)=>{
    try{
        const {page, search} = req.query;
        const perPage = 5;
        const skip = (page - 1)*perPage;

        let query = {};

        if (search) {
            query.topic = { $regex: this.search, $options: 'i' };
        }

        const blogs = await Blog.find(query)
        .skip(skip)
        .limit(perPage);

        res.json({
            satus: 'success',
            result: blogs,
        });

    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({
            status: 'error',
            message:'server_error',
    });
    }
});

// Create a blog
router.post('/blog', async(req, res) =>{
    try {
        const {topic, description, posted_at, posted_by, views} = req.body;

        const blog = new Blog ({
            topic,
            description, 
            posted_at, 
            posted_by,
            views
        });

        const savedBlog = await blog.save();

        res.json ({
            satus: 'success',
            result: savedBlog,
        });

    } catch (error) {
        console.log("Error creating the blog:", error);
        res.status(500).json({
            status: "error",
            message:"server_error"
            
        });
    }
});

// Update blog
router.put('/blog/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const {topic, description, posted_at, posted_by, views} = req.body;

        const updateBlog = await Blog.findByIdAndUpdate(
            id,
            {
            topic,
            description, 
            posted_at, 
            posted_by,
            views
            },
            { new: true}
        );

        res.json ({
            status: 'success',
            result: updateBlog,
        });

    } catch (error) {
        console.log('Error updating a blog:', error);
        res.status(500).json({
            status: "error",
            message:"server_error"
            
        });
        
    }

});

// Delete blog
router.delete('/blog/:id', async (req, res) =>{
    try {
        const {id} = req.params;

        const deletedBlog = await Blog.findByIdAndDelete(id);

        res.json ({
            status:'success',
            result:deletedBlog,
        });
    } catch (error) {
        console.log("Error deleting the post:", error);
        console.log('Error updating a blog:', error);
        res.status(500).json({
            status: "error",
            message:"server_error"
            
        });
    }
});

module.exports = router;
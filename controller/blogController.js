import { 
    createBlog, 
    getBlogs, 
    getBlogById, 
    updateBlog, 
    deleteBlog 
  } from '../services/blogService.js';
  
  import { SuccessResponse } from '../helpers/successResponse.js';
  import { ErrorResponse } from '../helpers/errorResponse.js';
  
  /**
   * @desc Create a new blog post
   * @route POST /api/blogs
   * @access Private (Requires Authentication)
   */
  export const create = async (req, res, next) => {
    try {
        console.log("Request User ID:", req.user.userId);
        console.log("Request Body:", req.body);

        // Check if userId is defined
        if (!req.user || !req.user.userId) {
            return res.status(400).json({ success: false, message: 'User ID is required.' });
        }

        const blog = await createBlog(req.user.userId, req.body);
        SuccessResponse.created(res, 'Blog created successfully', blog);
    } catch (error) {
        console.error("Error creating blog:", error);
        next(ErrorResponse.badRequest(res, error.message));
    }
};
  
  /**
   * @desc Get all blog posts
   * @route GET /api/blogs
   * @access Public
   */
  export const getAll = async (req, res, next) => {
    try {
      const blogs = await getBlogs();
      SuccessResponse.ok(res, 'Fetched all blogs successfully', blogs);
    } catch (error) {
      next(ErrorResponse.internalServerError(error.message));
    }
  };
  
  /**
   * @desc Get a single blog post by ID
   * @route GET /api/blogs/:id
   * @access Public
   */
  export const getById = async (req, res, next) => {
    try {
      const blog = await getBlogById(req.params.id);
      SuccessResponse.ok(res, 'Fetched blog successfully', blog);
    } catch (error) {
      next(ErrorResponse.notFound(error.message));
    }
  };
  
  /**
   * @desc Update a blog post
   * @route PUT /api/blogs/:id
   * @access Private (Only Author Can Update)
   */
// blogController.js
// blogController.js
export const update = async (req, res, next) => {
    try {
        // Check if userId is defined
        if (!req.user || !req.user.userId) {
            return res.status(400).json({ success: false, message: 'User ID is required.' });
        }

        // Call the service to update the blog post
        const blog = await updateBlog(req.params.id, req.user.userId, req.body);

        // Check if the blog was found and updated
        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found or not updated.' });
        }

        SuccessResponse.ok(res, 'Blog updated successfully', blog);
    } catch (error) {
        console.error("Error updating blog:", error);
        
        // Ensure that you pass res correctly to ErrorResponse
        next(ErrorResponse.unauthorized(res, error.message));
    }
};


  
  /**
   * @desc Delete a blog post
   * @route DELETE /api/blogs/:id
   * @access Private (Only Author Can Delete)
   */
 // blogController.js
export const remove = async (req, res, next) => {
    try {
    
        if (!req.user || !req.user.userId) {
            return res.status(400).json({ success: false, message: 'User ID is required.' });
        }

   
        const result = await deleteBlog(req.params.id, req.user.userId);

      
        if (!result) {
            return res.status(404).json({ success: false, message: 'Blog not found or already deleted.' });
        }

        SuccessResponse.noContent(res, 'Blog deleted successfully');
    } catch (error) {
        console.error("Error deleting blog:", error);
        
   
        next(ErrorResponse.unauthorized(res, error.message));
    }
};

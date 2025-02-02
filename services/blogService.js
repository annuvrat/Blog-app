import Blog from '../models/Blog.js';

export const createBlog = async (userId, data) => {
  return await Blog.create({ ...data, author: userId });
};

export const getBlogs = async () => {
  return await Blog.find().populate('author', 'username');
};

export const getBlogById = async (id) => {
  const blog = await Blog.findById(id).populate('author', 'username');
  if (!blog) throw new Error('Blog not found');
  return blog;
};

// blogService.js
export const updateBlog = async (blogId, userId, data) => {
    
    const blog = await Blog.findOne({ _id: blogId });

    if (!blog) {
        throw new Error('Blog not found');
    }

    if (!blog.author.equals(userId)) {
        throw new Error('Unauthorized to update this blog');
    }
    return await Blog.findByIdAndUpdate(blogId, { $set: data }, { new: true });
};


export const deleteBlog = async (id, userId) => {
  const blog = await Blog.findById(id);
  if (!blog) throw new Error('Blog not found');

  if (blog.author.toString() !== userId) throw new Error('Unauthorized to delete this blog');

  await blog.deleteOne();
};

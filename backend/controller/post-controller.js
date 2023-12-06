
import Post from '../model/post.js';


export const createPost = async (request, response) => {
    try {
        const post = await new Post(request.body);
        post.save();

        console.log('Post saved successfully')
        response.status(200).json('Post saved successfully');
    } catch (error) {
        console.log('Post saved error')
        response.status(500).json(error);
    }
}

export const updatePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        if (!post) {
            console.log('Post not found')
            response.status(404).json({ msg: 'Post not found' })
        }
        
        await Post.findByIdAndUpdate( request.params.id, { $set: request.body })

        console.log('Post updated successfully')
        response.status(200).json('post updated successfully');
    } catch (error) {
        console.log('Post updated error')
        response.status(500).json(error);
    }
}

export const deletePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        
        await post.delete()

        console.log('Post deleted successfully')
        response.status(200).json('post deleted successfully');
    } catch (error) {
        console.log('Post deleted error')
        response.status(500).json(error)
    }
}

export const getPost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        console.log('Post get successful')
        response.status(200).json(post);
    } catch (error) {
        console.log('Post get error')
        response.status(500).json(error)
    }
}

export const getAllPosts = async (request, response) => {
    let username = request.query.username;
    let category = request.query.category;
    let posts;
    try {
        if(username) 
            posts = await Post.find({ username: username });
        else if (category) 
            posts = await Post.find({ categories: category });
        else 
            posts = await Post.find({});
            
        console.log('Posts get successful')
        response.status(200).json(posts);
    } catch (error) {
        console.log('Posts get error')
        response.status(500).json(error)
    }
}
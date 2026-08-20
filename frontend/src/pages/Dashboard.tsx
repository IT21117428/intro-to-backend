import { useState, useEffect } from 'react';

interface Post {
  _id: string;
  name: string;
  description: string;
  age: number;
}

interface DashboardProps {
  setIsLoggedIn: (value: boolean) => void;
}

function Dashboard({ setIsLoggedIn }: DashboardProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  
  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  // Fetch posts when component loads
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/v1/posts/getPosts');
      const data = await response.json();
      if (response.ok) {
        setPosts(data.data || data);
      }
    } catch (err) {
      console.error('Failed to fetch posts', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare data
    const postData = { name, description, age: Number(age) };

    if (editingPostId) {
      // Update existing post
      try {
        const response = await fetch(`http://localhost:4000/api/v1/posts/update/${editingPostId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(postData),
        });

        if (response.ok) {
          resetForm();
          fetchPosts(); // Refresh list
        } else {
          alert('Failed to update post');
        }
      } catch (err) {
        alert('Error updating post');
      }
    } else {
      // Create new post
      try {
        const response = await fetch('http://localhost:4000/api/v1/posts/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(postData),
        });

        if (response.ok) {
          resetForm();
          fetchPosts(); // Refresh list
        } else {
          alert('Failed to create post');
        }
      } catch (err) {
        alert('Error creating post');
      }
    }
  };

  const handleEdit = (post: Post) => {
    setEditingPostId(post._id);
    setName(post.name);
    setDescription(post.description);
    setAge(post.age);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/posts/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchPosts(); // Refresh list after delete
        if (editingPostId === id) resetForm(); // If deleting currently editing post
      }
    } catch (err) {
      alert('Error deleting post');
    }
  };

  const resetForm = () => {
    setEditingPostId(null);
    setName('');
    setDescription('');
    setAge('');
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:4000/api/v1/users/logout', { method: 'POST' });
    } catch (err) {}
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center bg-white p-4 rounded shadow mb-6">
        <h1 className="text-2xl font-bold">My Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Logout
        </button>
      </div>

      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {editingPostId ? 'Update Post' : 'Create New Post'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            placeholder="Name" 
            className="w-full border p-2 rounded" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input 
            type="number" 
            placeholder="Age" 
            className="w-full border p-2 rounded" 
            value={age}
            onChange={(e) => setAge(e.target.value ? Number(e.target.value) : '')}
            required
            min="1"
            max="150"
            title="Age must be between 1 and 150"
          />
          <textarea 
            placeholder="Description" 
            className="w-full border p-2 rounded h-24"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          
          <div className="flex gap-2">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              {editingPostId ? 'Update Post' : 'Submit Post'}
            </button>
            {editingPostId && (
              <button 
                type="button" 
                onClick={resetForm} 
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">All Posts</h2>
        {posts.length === 0 ? <p className="text-gray-500">No posts available.</p> : null}
        
        {posts.map((post) => (
          <div key={post._id} className="bg-white p-4 rounded shadow flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Name: {post.name}</h3>
              <p className="text-sm text-gray-500 font-semibold mb-2">Age: {post.age}</p>
              <p className="text-gray-700">{post.description}</p>
            </div>
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => handleEdit(post)}
                className="text-blue-500 hover:text-blue-700 text-sm font-medium"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(post._id)}
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;

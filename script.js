// ==================================================
// Marion Louijie M. Cortez
// BS in Information Systems | 2nd Year
// Week 7: Fetch API & Asynchronous Data
// ==================================================

const fetchBtn = document.getElementById('fetchBtn');
const statusArea = document.getElementById('statusArea');
const postsContainer = document.getElementById('postsContainer');
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

async function fetchPosts() {
    try {
        // Loading state
        fetchBtn.disabled = true;
        statusArea.textContent = 'Loading...';
        postsContainer.innerHTML = '';

        // Fetch data
        const res = await fetch(API_URL);
        
        // Error handling (Fetch API quirk)
        if (!res.ok) throw new Error(`Error: ${res.status}`);

        const posts = await res.json();

        // Empty state
        if (posts.length === 0) {
            postsContainer.textContent = 'No posts found.';
            return;
        }

        // Show first 5 posts — SAFE DOM (textContent)
        posts.slice(0, 5).forEach(post => {
            const div = document.createElement('div');
            div.style.margin = '10px 0';
            div.style.padding = '8px';
            div.style.border = '1px solid #ccc';
            
            const h3 = document.createElement('h3');
            h3.textContent = post.title;
            
            const p = document.createElement('p');
            p.textContent = post.body;
            
            div.appendChild(h3);
            div.appendChild(p);
            postsContainer.appendChild(div);
        });

    } catch (err) {
        postsContainer.textContent = 'Failed: ' + err.message;
    } finally {
        // Re-enable button = RETRY
        fetchBtn.disabled = false;
        statusArea.textContent = '';
    }
}

// No page refresh
fetchBtn.addEventListener('click', e => {
    e.preventDefault();
    fetchPosts();
});
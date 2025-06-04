// Dynamically load blog previews
async function loadBlogPreviews(limit = 4) {
  const res = await fetch('../data/posts.json');
  const data = await res.json();
  const posts = data.posts.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, limit);
  const container = document.getElementById('blog-preview-list');
  if (!container) return;
  container.innerHTML = posts.map(post => `
    <div class="card mb-6">
      <div class="card-title">${post.title}</div>
      <div class="card-date">${post.date}</div>
      <div class="card-excerpt">${post.excerpt}</div>
      <a href="../blogs/${post.slug}.html" class="text-blue-400 hover:underline">Read More →</a>
    </div>
  `).join('');
}

if (window.location.pathname.endsWith('/index.html') || window.location.pathname === '/') {
  document.addEventListener('DOMContentLoaded', () => loadBlogPreviews(4));
}

// utils/blog.js
import { getCurrentUser, isAdmin } from './auth';
export const  initialBlogs = [
  {
    id: 1,
    title: 'Exploring the Temples of Bali',
    summary: 'A spiritual journey through Bali\'s most sacred temples',
    content: `Bali, known as the "Island of the Gods," is home to thousands of temples. During my two-week journey, I visited some of the most spectacular ones.

## Tanah Lot
Perched on a rocky outcrop in the sea, Tanah Lot is one of Bali's most iconic temples. The sunset views here are breathtaking.

## Besakih Temple
Known as the "Mother Temple," Besakih is Bali's largest and holiest temple complex. The mountain setting adds to its spiritual atmosphere.

Pro Tip: Remember to wear a sarong when visiting temples as a sign of respect.`,
    date: '2024-11-15',
    image: '/images/bali1.jpg',
    location: 'Bali, Indonesia',
    author:'admin'
  },
  {
    id: 2,
    title: 'Hiking the Swiss Alps',
    summary: 'My unforgettable trek through the breathtaking Swiss mountains',
    content: `The Swiss Alps offer some of the most spectacular hiking in the world. Here are my top experiences:

## Jungfrau Region
The train to Jungfraujoch, the "Top of Europe," is an engineering marvel. The views from the observation deck are worth every franc.

## Matterhorn Trail
Hiking around the iconic Matterhorn was challenging but rewarding. The mountain huts serve delicious cheese fondue!

Essential Gear:
- Sturdy hiking boots
- Layered clothing
- Sun protection (the alpine sun is strong!)`,
    date: '2024-09-22',
    image: '/images/swiss.jpg',
    location: 'Swiss Alps',
    author:'admin'
  },
  {
    id: 3,
    title: 'Golden Triangle of India',
    summary: 'A cultural odyssey through Delhi, Agra, and Jaipur',
    content: `Discovering India's rich history through its iconic landmarks:

## Taj Mahal, Agra
Witnessing the sunrise over this white marble wonder was magical. The intricate pietra dura inlay work is mesmerizing up close.

## Amber Fort, Jaipur
The elephant ride up to this hilltop fort offered stunning views. The Sheesh Mahal (Mirror Palace) is a architectural marvel.

## Qutub Minar, Delhi
This 73-meter tall minaret from 1193 AD showcases incredible Indo-Islamic architecture.

Travel Tip: Hire authorized guides at monuments for deeper historical insights.`,
    date: '2024-08-10',
    image: '/images/india1.jpg',
    location: 'North India',
    author:'admin'
  },
  {
    id: 4,
    title: 'Sakura Season in Tokyo',
    summary: 'Cherry blossom viewing in Japan\'s vibrant capital',
    content: `Experiencing Japan's iconic cherry blossoms:

## Ueno Park
Picnicking under blooming sakura trees with locals was unforgettable. Try sakura-flavored treats!

## Meguro River
Evening walks along the canal with illuminated blossoms created a magical atmosphere.

## Traditional Tea Ceremony
Participated in a hanami-themed ceremony using seasonal utensils.

Best Time: Late March to early April`,
    date: '2025-04-05',
    image: '/images/japan.jpg',
    location: 'Tokyo, Japan',
    author:'admin'
  },
  {
    id: 5,
    title: 'Amalfi Coast Road Trip',
    summary: 'Mediterranean charm along Italy\'s spectacular coastline',
    content: `Driving through Italy's most picturesque coastal towns:

## Positano
The vertical village with pastel houses tumbling down to sea. Don't miss lemon granita!

## Ravello
Cliff-top gardens with breathtaking views. Attend a summer music festival if possible.

## Capri Day Trip
The Blue Grotto lives up to its name - arrive early to beat crowds.

Driving Tip: Get the smallest rental car available for narrow roads.`,
    date: '2025-06-15',
    image: '/images/amalfi.jpg',
    location: 'Italy',
    author:'admin'
  },
  {
    id: 6,
    title: 'Northern Lights in Norway',
    summary: 'Chasing auroras in the Arctic Circle',
    content: `A winter wonderland adventure:

## Tromsø
Saw green/purple auroras dance across the sky during a reindeer sledding tour.

## Lofoten Islands
Fished for Arctic cod and stayed in traditional rorbuer cabins.

## Dog Sledding
Mushed through snow-covered forests with enthusiastic huskies.

Pro Tip: Use a DSLR with tripod for best northern lights photos.`,
    date: '2025-02-20',
    image: '/images/norway.jpg',
    location: 'Arctic Norway',
    author:'admin'
  },
  {
    id: 7,
    title: 'Kerala Backwaters Cruise',
    summary: 'Serene houseboat journey through tropical canals',
    content: `Exploring India's southern paradise:

## Alleppey Houseboats
Lived on a traditional kettuvallam with modern amenities. Watched village life glide by.

## Kumarakom Bird Sanctuary
Spotted kingfishers, egrets, and otters during morning canoe rides.

## Ayurvedic Treatment
Tried authentic abhyanga massage using herbal oils - incredibly rejuvenating!

Best Time: November to February`,
    date: '2025-01-10',
    image: '/images/india2.jpg',
    location: 'Kerala, India',
    author:'admin'
  }
];
const BLOG_STORAGE_KEY = 'travel-blogs';

function getClientBlogs() {
  if (typeof window === 'undefined') return initialBlogs;
  try {
    const saved = localStorage.getItem(BLOG_STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialBlogs;
  } catch (error) {
    console.error('Error loading blogs:', error);
    return initialBlogs;
  }
}

export function getAllBlogs() {
  return getClientBlogs().sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getBlogById(id) {
  const blogs = getClientBlogs();
  return blogs.find(blog => blog.id === parseInt(id)) || null;
}
export function canDeleteBlog(blog) {
  const user = getCurrentUser();
  return user && (isAdmin() || blog.author === user.username);
}


export function addBlog(blogData) {
  const user = getCurrentUser();
  if (!user) throw new Error('You must be logged in to add a blog');
  
  const blogs = getClientBlogs();
  const newBlog = {
    id: Date.now(),
    title: blogData.title,
    summary: blogData.content.substring(0, 120) + '...',
    content: blogData.content,
    date: blogData.date,
    image: blogData.image || '/images/default-travel.jpg',
    location: blogData.location || 'Unknown',
    author: user.username
  };
  
  const updatedBlogs = [newBlog, ...blogs];
  localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(updatedBlogs));
  return newBlog;
}
// utils/blog.js
export function deleteBlog(id) {
  return new Promise((resolve, reject) => {
    try {
      const user = getCurrentUser();
      if (!user) {
        return reject(new Error('You must be logged in to delete a blog'));
      }

      const blogs = getClientBlogs();
      const blogToDelete = blogs.find(blog => blog.id === parseInt(id));
      
      if (!blogToDelete) {
        return reject(new Error('Blog not found'));
      }

      if (!isAdmin() && blogToDelete.author !== user.username) {
        return reject(new Error('You are not authorized to delete this blog'));
      }

      const updatedBlogs = blogs.filter(blog => blog.id !== parseInt(id));
      localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(updatedBlogs));
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}
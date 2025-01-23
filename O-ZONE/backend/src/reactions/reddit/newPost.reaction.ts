import { REDDIT_SERVICE_CONFIG } from "../../config/services/reddit.config";


async function getRandomSubreddit(): Promise<string> {
    const response = await fetch('https://www.reddit.com/r/random/.json', {
      headers: {
        'User-Agent': REDDIT_SERVICE_CONFIG.userAgent || ''
    },
    });
  
    if (!response.ok) {
      throw new Error(`Failed to fetch random subreddit: ${response.statusText}`);
    }
  
    const data = await response.json();
    const subreddit = data[0]?.data?.children[0]?.data?.subreddit;
  
    if (!subreddit) {
      throw new Error('No subreddit found.');
    }
  
    return subreddit;
  }
  
async function getRandomPost(subreddit: string, accessToken: string): Promise<{ title: string; url: string }> {
    const response = await fetch(`https://oauth.reddit.com/r/${subreddit}/hot?limit=50`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'User-Agent': REDDIT_SERVICE_CONFIG.userAgent || '',
      },
    });
  
    if (!response.ok) {
      throw new Error(`Failed to fetch posts from subreddit: ${response.statusText}`);
    }
  
    const data = await response.json();
    const posts = data.data.children;
  
    if (!posts.length) {
      throw new Error('No posts found in this subreddit.');
    }
  
    const randomIndex = Math.floor(Math.random() * posts.length);
    const post = posts[randomIndex].data;
  
    return {
      title: post.title,
      url: `https://reddit.com${post.permalink}`,
    };
  }
  
async function getUsersFromSubreddit(subreddit: string, accessToken: string): Promise<string[]> {
    const response = await fetch(`https://oauth.reddit.com/r/${subreddit}/comments`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'User-Agent': REDDIT_SERVICE_CONFIG.userAgent || '',
      },
    });
  
    if (!response.ok) {
      throw new Error(`Failed to fetch comments from subreddit: ${response.statusText}`);
    }
  
    const data = await response.json();
    const posts = data[1]?.data?.children || []; // Liste des commentaires associés au post principal
  
    if (!posts.length) {
      throw new Error('No comments found in this subreddit.');
    }

    const users = new Set<string>();
  
    // Extraire les auteurs des posts et des commentaires
    for (const post of posts) {
      const author = post.data.author;
      if (author && author !== '[deleted]') {
        users.add(author);
      }
    }
  
    return Array.from(users);
}

async function getRandomUserFromRandomSubreddit(accessToken: string): Promise<{ user: string; subreddit: string }> {
  console.log('Fetching random subreddit...');
  const subreddit = await getRandomSubreddit();
  console.log(`Random subreddit: ${subreddit}`);

  console.log('Fetching users from subreddit...');
  const users = await getUsersFromSubreddit(subreddit, accessToken);

  if (users.length === 0) {
    throw new Error(`No users found in subreddit: r/${subreddit}.`);
  }

  const randomIndex = Math.floor(Math.random() * users.length);
  return { user: users[randomIndex], subreddit };
}

export async function sendRandomMessageRandomUser(accessToken: string): Promise<string> {
    try {
      const post = await getRandomPost(await getRandomSubreddit(), accessToken);
      const { user, subreddit } = await getRandomUserFromRandomSubreddit(accessToken);

      const subject = `Check out this post from r/${subreddit}`;
      const body = `Hey! Here's a random post from r/${subreddit}:\n\n${post.title}\n\n${post.url}`;

      const response = await fetch('https://oauth.reddit.com/api/compose', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': REDDIT_SERVICE_CONFIG.userAgent || '',
        },
        body: new URLSearchParams({
          api_type: 'json',
          subject,
          text: body,
          to: user,
        }),
      });
    
      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.statusText}`);
      }
    
      const data = await response.json();
    
      if (data.json.errors.length) {
        throw new Error(`Reddit API Error: ${JSON.stringify(data.json.errors)}`);
      }
    
      return 'Message sent successfully!';
    } catch (error) {
      console.error('Error sending message:', error);
      return 'Failed to send message';
    }
}

export async function sendRandomMessage(targetUser: string, accessToken: string): Promise<string> {
  try {
    const subreddit = await getRandomSubreddit();
    const post = await getRandomPost(subreddit, accessToken);

    const subject = `Check out this post from r/${subreddit}`;
    const body = `Hey! Here's a random post from r/${subreddit}:\n\n${post.title}\n\n${post.url}`;

    const response = await fetch('https://oauth.reddit.com/api/compose', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': REDDIT_SERVICE_CONFIG.userAgent || '',
      },
      body: new URLSearchParams({
        api_type: 'json',
        subject,
        text: body,
        to: targetUser,
      }),
    });
  
    if (!response.ok) {
      throw new Error(`Failed to send message: ${response.statusText}`);
    }
  
    const data = await response.json();
  
    if (data.json.errors.length) {
      throw new Error(`Reddit API Error: ${JSON.stringify(data.json.errors)}`);
    }
  
    return 'Message sent successfully!';
  } catch (error) {
    console.error('Error sending message:', error);
    return 'Failed to send message';
  }
}
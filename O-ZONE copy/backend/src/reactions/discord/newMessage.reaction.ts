export async function sendDiscordMessageByWebhookURL(webhookUrl: string, message: string): Promise<void> {
  const url = webhookUrl;
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = JSON.stringify({ content: message });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body
    });

    if (!response.ok) {
      throw new Error(`Failed to send message to Discord`);
    }

  } catch (error) {
    console.error('Error sending message:', error);
  }
}

async function sendDiscordMessageByDM(accesToken: string, channelId: string, message: string): Promise<void> {
  const url = `https://discord.com/api/v8/channels/${channelId}/messages`;
  const headers = {
    Authorization: accesToken,
    'Content-Type': 'application/json',
  };
  const body = JSON.stringify({ content: message });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body
    });

    if (!response.ok) {
      throw new Error(`Failed to send message: ${response.statusText}`);
    }

  } catch (error) {
    console.error('Error sending message:', error);
  }
}

async function getDiscordUserDM(accessToken: string): Promise<{ id: string; name: string }[]> {
  const url = 'https://discord.com/api/v9/users/@me/channels';
  const headers = {
    Authorization: accessToken,
  };

  try {
    const response = await fetch(url, { method: 'GET', headers });
    if (!response.ok) {
      throw new Error(`Failed to fetch DMs: ${response.statusText}`);
    }

    const channels = await response.json();
    return channels
      .filter((channel: any) => channel.type === 1)
      .map((channel: any) => ({
        id: channel.id,
        name: channel.recipients?.[0]?.username || 'Unknown',
      }));
  } catch (error) {
    console.error('Error fetching DMs:', error);
    throw new Error('Failed to fetch DM channels');
  }
}

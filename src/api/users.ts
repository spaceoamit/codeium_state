export async function fetchUsers() {
  try {
    const response = await fetch('https://amitpatoliya.app.n8n.cloud/webhook/getdata');
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}
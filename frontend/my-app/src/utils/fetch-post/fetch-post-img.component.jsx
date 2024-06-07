const fetchPostImg = async (data) => {
  let url =`http://localhost:8001/user/img`

  const formData = new FormData();
  formData.append('image', data);
  const imageFile = formData.get('image');

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageData: imageFile }),
      mode: 'cors'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData
  } catch (error) {
    console.error('Error in fetchPostImg:', error);
    throw error;
  }
};

export default fetchPostImg;
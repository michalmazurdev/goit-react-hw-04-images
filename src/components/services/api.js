import axios from 'axios';

export async function getPictures(searchedPhrase, page) {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '36302590-ce388341fd0bce6375bf0ebc2',
        q: encodeURIComponent(searchedPhrase.trim()),
        image_type: 'photo',
        safesearch: true,
        orientation: 'horizontal',
        per_page: 12,
        page: page,
      },
    });
    return response.data.hits;
  } catch (error) {
    console.error(error);
  }
}

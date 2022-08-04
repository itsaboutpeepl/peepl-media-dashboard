import globalState from '../hooks/globalState';

export async function postData(url = '', data = {}) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer '.concat(globalState.get().authToken)
      },
      body: JSON.stringify(data)
    });
    return response.json();
  } catch (error) {
    return [];
  }
}

export async function getData(url = '') {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: 'Bearer '.concat(globalState.get().authToken)
      }
    });
    return response.json();
  } catch (error) {
    return [];
  }
}

export async function delData(url = '') {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer '.concat(globalState.get().authToken)
      }
    });
    return response.json();
  } catch (error) {
    return [];
  }
}

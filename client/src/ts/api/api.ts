import { BASE_URL } from '../constants/constants';

const API = {
  async getUsers() {
    const response = await fetch(`${BASE_URL}/record`);
    const data = await response.json();
    return data;
  },

  async addUser(body: { name: string }) {
    //body - данные, пришедшие из инпута в попапе при выигрыше
    const response = await fetch(`${BASE_URL}/record`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const result = await response.json();
    return result; // возвращаем созданный объект
  },

  async initTime(body: { time: number }) {
    // метод для инициализации таймера на бэке при начале новой игры и при загрузке данных с локал стореджа
    const response = await fetch(`${BASE_URL}/timer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const result = await response.json();
    return result;
  }
};

export default API;

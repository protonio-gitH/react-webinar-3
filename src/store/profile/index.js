import StoreModule from '../module';

class Profile extends StoreModule {
  initState() {
    return {
      profileInfo: {},
      error: null, // Для обработки ошибок
      loading: false, // Для индикации загрузки
    };
  }

  async getProfile() {
    this.setLoading(true); // Устанавливаем статус загрузки

    try {
      const response = await this.fetchWithToken('api/v1/users/self?fields=*');
      const data = await response.json();

      if (response.ok) {
        this.setState({
          ...this.getState(),
          profileInfo: data,
          error: null, // Сбрасываем ошибку при успешном запросе
        });
      } else {
        // Обработка ошибок на уровне ответа
        this.setError(data.error?.message || 'Ошибка получения профиля.');
      }
    } catch (error) {
      console.error(error);
      this.setError('Произошла ошибка при получении профиля.'); // Сообщение об ошибке
    } finally {
      this.setLoading(false); // Устанавливаем статус завершения загрузки
    }
  }

  // Вспомогательная функция для выполнения запросов с токеном
  async fetchWithToken(url, method = 'GET') {
    const token = JSON.parse(localStorage.getItem('token'))?.token;

    const response = await fetch(url, {
      method,
      headers: {
        'X-token': token,
        'Content-Type': 'application/json',
      },
    });

    return response; // Возвращаем ответ для дальнейшей обработки
  }

  setLoading(loading) {
    this.setState({
      ...this.getState(),
      loading,
    });
  }

  setError(error) {
    this.setState({
      ...this.getState(),
      error,
    });
  }
}

export default Profile;

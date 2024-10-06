import StoreModule from '../module';

class Authorization extends StoreModule {
  initState() {
    return {
      token: null,
      exception: null,
      isAuth: !!this.getState()?.token,
      waiting: false,
      profile: {},
    };
  }

  async recoverySession() {
    this.setWaiting(true);
    const token = localStorage.getItem('token');
    this.setAuthState(token, false);
    const response = await this.fetchWithToken('api/v1/users/self?fields=*');
    if (response?.error) {
      this.setAuthState(null, false);
    } else {
      this.setProfileState(response.result);
      this.setAuthState(token, true);
    }
  }

  async login(login, password) {
    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        body: JSON.stringify({ login, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      const json = await response.json();
      if (json?.error) {
        this.setException(json.error.data.issues[0].message);
        return;
      }

      const token = json.result?.token;
      localStorage.setItem('token', token);
      this.setAuthState(token, true);
      this.clearException();

      // Получение профиля пользователя после успешного входа
      await this.recoverySession();
    } catch (error) {
      console.error('Login error:', error);
      this.setException('Произошла ошибка при входе. Попробуйте позже.');
    }
  }

  async exit() {
    try {
      await this.fetchWithToken('/api/v1/users/sign', 'DELETE');
      localStorage.removeItem('token');
      this.setAuthState(null, false);
      this.setProfileState({});
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  clearException() {
    this.setException(null);
  }

  // Вспомогательные методы
  async fetchWithToken(url, method = 'GET') {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'X-token': this.getState().token,
          'Content-Type': 'application/json',
        },
      });

      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw new Error('Ошибка сети. Пожалуйста, попробуйте снова.');
    }
  }

  setProfileState(profile) {
    this.setState({
      ...this.getState(),
      profile,
    });
  }

  setAuthState(token, isAuth) {
    this.setState({
      ...this.getState(),
      token,
      isAuth,
      waiting: false,
    });
  }

  setWaiting(isWaiting) {
    this.setState({
      ...this.getState(),
      waiting: isWaiting,
    });
  }

  setException(message) {
    this.setState({
      ...this.getState(),
      exception: message,
    });
  }
}

export default Authorization;

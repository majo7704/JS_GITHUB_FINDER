class Github {
  constructor() {
    this.client_id = 'd6d22a8ff294d2301bbc';
    this.client_secret = '0d509f4d64917e755adb5b9a8dba5fee97799ac2';
    this.repos_sort = 'updated_at';
  }

  async getUser(user, update) {
    const profileResponse = await fetch(
      `https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`
    );
    const reposResponse = await fetch(
      `https://api.github.com/users/${user}/repos?sort=${this.repos_sort}:>${update}&client_id=${this.client_id}&client_secret=${this.client_secret}`
    );

    const profile = await profileResponse.json();
    const repos = await reposResponse.json();
    return {
      profile,
      repos,
    };
  }
  // async getRepos(user, update) {
  //   const url = `https://api.github.com/search/repositories?q=${user}&sort=${this.repos_sort}:>=${update}`;

  //   const headers = {
  //     Accept: 'application / vnd.github.mercy - preview + json',
  //   };
  //   const response = await fetch(url, {
  //     method: 'GET',
  //     headers: headers,
  //   });
  //   const result = await response.json();
  //   return result;
  // }
}

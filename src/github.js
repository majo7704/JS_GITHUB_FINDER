/**
 * Class to create new instance of Github object
 */
class Github {
  constructor() {
    /**
     * @property {number} client.id
     * @property {number} client_secret
     * @property {date} repos_sort
     */
    this.client_id = 'd6d22a8ff294d2301bbc';
    this.client_secret = '0d509f4d64917e755adb5b9a8dba5fee97799ac2';
    this.repos_sort = new Date('updated_at');
  }
  /**
   * @property {Function} getUser fetching user data from github api
   * @param {Object} user - User data fetched from github api
   * @param {string} update - Repos updated_at data
   */
  async getUser(user, update) {
    /**
     * Await response of the fetch call
     */
    const profileResponse = await fetch(
      `https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`
    );
    const reposResponse = await fetch(
      `https://api.github.com/users/${user}/repos?sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`
    );
    /**
     * Profile
     * @type {Object}
     */
    const profile = await profileResponse.json();
    /**
     * Repos
     * @type {Object}
     */
    const repos = await reposResponse.json();

    return {
      profile,
      repos,
    };
  }
}

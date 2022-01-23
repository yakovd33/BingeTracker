export default class AuthHelper {
    static isLogged () {
        return (this.getUser());
    }

    static saveUser (user : any) {
        // User is an object
        localStorage.setItem("user", JSON.stringify(user))
    }

    static getUser () {
        if (typeof window !== 'undefined') {
            return JSON.parse(localStorage.getItem("user")!);
        }

        return {};
    }

    static logout () {
        localStorage.removeItem('user');
    }

    static getAccessToken () {
        return this.getUser().token;
    }

    static getUserId () {
        return this.getUser().id;
    }
}
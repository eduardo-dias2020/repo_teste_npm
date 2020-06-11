class User {
    constructor(name, age, email) {
        this.name = name;
        this.age = age;
        this.email = email;
    }

    getUserStats() {
        return `
        Name: ${this.name}
        Age: ${this.age}
        Email: ${this.email}
      `;
    }

    static teste() {
        return 2 + 1
    }
}

module.exports = User;
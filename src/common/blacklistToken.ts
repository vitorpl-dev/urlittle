export class BlacklistToken {
  private readonly blacklist: string[];

  constructor() {
    this.blacklist = [];
  }

  async execute(token: string) {
    this.blacklist.push(token);
  }

  async isTokenBlacklisted(token: string) {
    return this.blacklist.includes(token);
  }
}

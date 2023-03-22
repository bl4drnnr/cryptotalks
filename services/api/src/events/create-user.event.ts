export class CreateUserEvent {
  constructor(
    private readonly email: string,
    private readonly password: string,
    private readonly username: string,
    private readonly tac: boolean,
    private readonly firstName?: string,
    private readonly lastName?: string,
    private readonly twitter?: string,
    private readonly linkedIn?: string,
    private readonly personalWebsite?: string,
    private readonly title?: string,
    private readonly bio?: string,
    private readonly publicEmail?: boolean
  ) {}

  toString() {
    return JSON.stringify({
      email: this.email,
      password: this.password,
      username: this.username,
      tac: this.tac,
      firstName: this.firstName,
      lastName: this.lastName,
      twitter: this.twitter,
      linkedIn: this.linkedIn,
      personalWebsite: this.personalWebsite,
      title: this.title,
      bio: this.bio,
      publicEmail: this.publicEmail,
    })
  }
}

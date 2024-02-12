export interface User {
  image: string;
  user: PrimaryUser;
  partner: PrimaryUser;
}

interface PrimaryUser {
  name: string;
  address: string;
}

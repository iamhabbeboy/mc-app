export interface User {
  id?: string;
  image: string;
  user: PrimaryUser;
  partner: PrimaryUser;
}

interface PrimaryUser {
  name: string;
  address: string;
}

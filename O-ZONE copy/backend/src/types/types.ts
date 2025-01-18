import { User, UserService } from "@prisma/client";

export type UserWithServices = User & {
  services: UserService[];
};


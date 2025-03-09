import prismaClient from "../../prisma";

interface CreateGroupServiceProps {
  name: string;
  description: string;
  ownerId: string;
}

class CreateGroupService {
  async execute({ name, description, ownerId }: CreateGroupServiceProps) {
    const ownerExists = await prismaClient.customer.findUnique({
      where: {
        id: ownerId,
      },
    });

    if (!ownerExists) {
      throw new Error("Owner not found");
    }

    const group = await prismaClient.groups.create({
      data: {
        name,
        description,
        ownerId,
      },
    });
    return group;
  }
}

export { CreateGroupService };

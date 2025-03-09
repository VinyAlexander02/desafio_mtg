import prismaClient from "../../prisma";

class ListGroupService {
  async execute() {
    const groups = await prismaClient.groups.findMany();

    return groups;
  }
}

export { ListGroupService };

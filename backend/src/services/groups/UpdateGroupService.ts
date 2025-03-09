import prismaClient from "../../prisma";

interface UpdateGroupServiceProps {
  id: string;
  name: string;
  description: string;
  ownerId: string;
}

class UpdateGroupService {
  async execute({ id, name, description, ownerId }: UpdateGroupServiceProps) {
    if (!id) {
      throw new Error("Id do Grupo é obrigatório");
    }

    const groupExists = await prismaClient.groups.findUnique({
      where: {
        id,
      },
    });

    if (!groupExists) {
      throw new Error("Nenhum grupo com ID encontrado");
    }

    const updateGroup = await prismaClient.groups.update({
      where: { id },
      data: {
        name,
        description,
        ownerId,
      },
    });

    return { message: "Grupo atualizado com sucesso", updateGroup };
  }
}

export { UpdateGroupService };

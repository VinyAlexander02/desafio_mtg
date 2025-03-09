import prismaClient from "../../prisma";

interface DeleteGroupServiceProps {
  id: string;
}

class DeleteGroupService {
  async execute({ id }: DeleteGroupServiceProps) {
    if (!id) {
      throw new Error("Solicitação Inválida");
    }

    const findGroup = await prismaClient.groups.findFirst({
      where: {
        id: id,
      },
    });

    if (!findGroup) {
      throw new Error("Group não encontrado");
    }

    await prismaClient.groups.delete({
      where: {
        id: findGroup.id,
      },
    });

    return { message: "Group deletado com sucesso" };
  }
}

export { DeleteGroupService };

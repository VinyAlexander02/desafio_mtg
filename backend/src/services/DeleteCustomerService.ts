import prismaClient from "../prisma";

interface DeleteCustomerServiceProps {
  id: string;
}
class DeleteCustomerService {
  async execute({ id }: DeleteCustomerServiceProps) {
    if (!id) {
      throw new Error("Solicitação Inválida");
    }

    const findCustomer = await prismaClient.customer.findFirst({
      where: {
        id: id,
      },
    });

    if (!findCustomer) {
      throw new Error("Cliente não existe");
    }

    await prismaClient.customer.delete({
      where: {
        id: findCustomer.id,
      },
    });

    return { message: "Deletado com sucesso" };
  }
}

export { DeleteCustomerService };

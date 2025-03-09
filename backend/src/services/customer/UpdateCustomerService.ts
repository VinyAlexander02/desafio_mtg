import prismaClient from "../../prisma";

interface UpdateCustomerServiceProps {
  id: string;
  name: string;
  email: string;
  password: string;
  status: boolean;
}

class UpdateCustomerService {
  async execute({
    id,
    name,
    email,
    password,
    status,
  }: UpdateCustomerServiceProps) {
    if (!id) {
      throw new Error("ID do usuário é obrigatório");
    }

    const customerExists = await prismaClient.customer.findUnique({
      where: {
        id,
      },
    });

    if (!customerExists) {
      throw new Error("Nenhum usuário com esse ID encontrado");
    }

    const updateCustomer = await prismaClient.customer.update({
      where: { id },
      data: {
        name,
        email,
        password,
        status,
      },
    });

    return updateCustomer;
  }
}

export { UpdateCustomerService };

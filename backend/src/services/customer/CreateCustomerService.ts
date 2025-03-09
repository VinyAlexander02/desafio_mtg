import prismaClient from "../../prisma";

interface createCustomerServiceProps {
  name: string;
  email: string;
  password: string;
  status: boolean;
  groupIds: string[];
}

class CreateCustomerService {
  async execute({
    name,
    email,
    password,
    status,
    groupIds,
  }: createCustomerServiceProps) {
    if (!name || !email || !password || status === undefined || !groupIds) {
      throw new Error("Preencha todos os campos");
    }

    const emailExists = await prismaClient.customer.findFirst({
      where: { email },
    });

    if (emailExists) {
      throw new Error("Email já cadastrado");
    }

    const groupExists = await prismaClient.groups.findMany({
      where: {
        id: { in: groupIds },
      },
    });

    if (groupExists.length !== groupIds.length) {
      throw new Error("Um ou mais grupos não existentes");
    }

    const customer = await prismaClient.customer.create({
      data: {
        name,
        email,
        password,
        status,
        Groups:
          groupIds && groupIds.length > 0
            ? {
                connect: groupIds.map((id) => ({ id })),
              }
            : undefined,
      },
      include: {
        Groups: true,
      },
    });

    return customer;
  }
}

export { CreateCustomerService };

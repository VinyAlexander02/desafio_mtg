import prismaClient from "../../prisma";

interface createCustomerServiceProps {
  name: string;
  email: string;
  password: string;
  status: boolean;
}

class CreateCustomerService {
  async execute({ name, email, password, status }: createCustomerServiceProps) {
    if (!name || !email || !password || !status) {
      throw new Error("Preencha todos os campos");
    }

    const emailExists = await prismaClient.customer.findFirst({
      where: {
        email: email,
      },
    });

    if (emailExists) {
      throw new Error("Email já cadastrado");
    }

    const customer = await prismaClient.customer.create({
      data: {
        name,
        email,
        password,
        status: true,
      },
    });

    return customer;
  }
}

export { CreateCustomerService };
